import { cwd, exit } from 'node:process';
import { bgRed } from 'kleur/colors';
import { loadEnv, normalizePath, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { safeParse, type InferIssue, type ObjectSchema } from 'valibot';
import logSymbols from 'log-symbols';

type PluginOptions = {
	ignoreEnvPrefix?: boolean;
	transformValues?: boolean;
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
 * 	VITE_API_ENDPOINT: v.pipe([v.string(), v.url()]),
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
	},
): Plugin {
	return {
		name: 'valibot-env',
		config(userConfig, { mode }) {
			const rootDir = userConfig.root || cwd();
			const envDir = userConfig.envDir ? normalizePath(resolve(rootDir, userConfig.envDir)) : rootDir;
			const rawEnv = loadEnv(mode, envDir, options.ignoreEnvPrefix ? '' : userConfig.envPrefix);
			const env = options.transformValues === true ? transformEnvironment(rawEnv) : rawEnv;

			const { issues, success } = safeParse(schema, env);

			if (success) {
				return userConfig;
			}

			for (const issue of issues) {
				if (typeof issue === 'undefined') {
					continue;
				}

				logIssue(issue);
			}

			exit(1);
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
