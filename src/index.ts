import { cwd, exit } from 'node:process';
import { bgRed } from 'kleur/colors';
import { loadEnv, normalizePath, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { safeParse, type InferIssue, type ObjectSchema } from 'valibot';
import logSymbols from 'log-symbols';

type PluginOptions = {
	/**
	 * Setting this to `true` will include unprefixed environment variables in the validation. This is useful
	 * validate unprefixed environment variables as well, e.g. `HOST` and `PORT` to configure the Vite server.
	 */
	ignoreEnvPrefix?: boolean;

	/**
	 * While all environment variable values are actually of type `string`, this setting allows transforming
	 * booleans, integers, floats, and null to their respective type.
	 */
	transformValues?: boolean;

	/**
	 * Language ID for localized error messages. Requires `@valibot/i18n`.
	 */
	language?: string;

	/**
	 * A callback function executed after any issues have been printed.
	 */
	onBeforeIssues?: () => void;

	/**
	 * A callback function executed after all issues have been printed.
	 */
	onAfterIssues?: () => void;

	/**
	 * Throws an error rather than exiting gracefully when issues have been found in the schema. This is used for testing
	 * mostly.
	 */
	throwError?: boolean;
};

/**
 * Exports a Vite plugin that validates environment variables against a schema.
 * @param schema
 * @param options
 * @returns
 *
 * @example
 * ```ts
 * import { defineConfig } from 'vite';
 * import * as v from 'valibot';
 * import valibot from 'vite-plugin-valibot-env';
 *
 * const envSchema = v.object({
 * 	VITE_API_ENDPOINT: v.pipe(v.string(), v.url()),
 * 	VITE_LOCALE: v.literal('en_US'),
 * });
 *
 * export default defineConfig({
 * 	plugins: [
 * 		valibot(envSchema),
 * 	]
 * });
 * ```
 */
export default function ValibotEnvPlugin<T extends ObjectSchema<any, any> = ObjectSchema<any, any>>(
	schema: T,
	options: PluginOptions = {
		ignoreEnvPrefix: false,
		transformValues: false,
		throwError: false,
	},
): Plugin {
	return {
		name: 'valibot-env',
		config(userConfig, { command, isPreview, mode }) {
			const rootDir = userConfig.root || cwd();
			const envDir = userConfig.envDir ? normalizePath(resolve(rootDir, userConfig.envDir)) : rootDir;
			const rawEnv = loadEnv(mode, envDir, options.ignoreEnvPrefix ? '' : userConfig.envPrefix);
			const env = options.transformValues === true ? transformEnvironment(rawEnv) : rawEnv;

			const parserConfig =
				typeof options.language !== 'string'
					? undefined
					: {
							lang: options.language,
						};

			const { issues, success } = safeParse(schema, env, parserConfig);

			if (success) {
				return userConfig;
			}

			if (typeof options?.onBeforeIssues === 'function') {
				options.onBeforeIssues();
			}

			for (const issue of issues) {
				if (typeof issue === 'undefined') {
					continue;
				}

				if (options?.throwError) {
					throw new TypeError((issue as InferIssue<any>).message);
				}

				logIssue(issue);
			}

			if (typeof options?.onAfterIssues === 'function') {
				options.onAfterIssues();
			}

			const isBuild = command === 'build';
			const isPreviewServer = command === 'serve' && isPreview;

			if (isBuild || isPreviewServer) {
				exit(1);
			}
		},
	};
}

/**
 * Logger for printing well-formed schema issues.
 * @param issue
 * @returns
 */
function logIssue(issue: InferIssue<any>) {
	if (!issue.path) {
		return;
	}

	const label = bgRed(` ${issue.path[0].key} `);

	console.error(logSymbols.error, label, issue.message);
}

/**
 * Transforms values of an environment variables object to their respective types.
 * @param env
 * @returns
 */
function transformEnvironment(env: Record<string, string>): Record<string, unknown> {
	return Object.fromEntries(
		Object.entries(env).map(([key, value]) => {
			return [key, transformString(value)];
		}),
	);
}

/**
 * Transforms a string to its respective primitive type.
 * @param value
 * @returns
 */
function transformString(value: string): unknown {
	switch (true) {
		case value === 'null':
		case value === 'true':
		case value === 'false':
			return JSON.parse(value);

		case /^-?\d+$/.test(value):
			return parseInt(value, 10);

		case /^-?\d+\.\d+$/.test(value):
			return parseFloat(value);

		default:
			return value;
	}
}
