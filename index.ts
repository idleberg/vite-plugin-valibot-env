import { bgRed } from 'kleur/colors';
import { loadEnv, normalizePath, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { safeParse, type ObjectSchema, type SchemaIssue } from 'valibot';
import logSymbols from 'log-symbols';

type PluginOptions = {
	ignoreEnvPrefix: boolean,
};

/**
 * Exports a Vite plugin that validates environment variables against a schema.
 * @param {ObjectSchema} schema
 * @param {PluginOptions} options
 * @returns {Plugin}
 *
 * @example
 * ```ts
 * import { defineConfig } from 'vite';
 * import * as v from 'valibot';
 * import valibot from 'vite-plugin-valibot-env';
 *
 * const envSchema = v.object({
 * 	VITE_API_ENDPOINT: v.string([v.url()]),
 * 	VITE_ENABLE_LOGGING: v.boolean(),
 * });
 *
 * export default defineConfig({
 * 	plugins: [
 * 		valibot(envSchema),
 * 	]
 * });
 * ```
 */
export default function ValibotEnvPlugin<T extends ObjectSchema<any, any> = ObjectSchema<any, any>>(schema: T, options: PluginOptions = {
	ignoreEnvPrefix: false
}): Plugin {
	return {
		name: 'valibot-env',
		config(userConfig, { mode }) {
			const rootDir = userConfig.root || process.cwd();

			const envDir = userConfig.envDir
				? normalizePath(resolve(rootDir, userConfig.envDir))
				: rootDir

			const env = loadEnv(mode, envDir, options.ignoreEnvPrefix ? '' : userConfig.envPrefix);
			const { issues, success } = safeParse(schema, env);

			if (!success) {
				for (const issue of issues) {
					if (typeof issue === 'undefined') {
						continue;
					}

					logIssue(issue);
				}

				console.log(/* let it breathe */)
				process.exit(1);
			}

			return userConfig;
		}
	}
}

/**
 * Logger for printing well-formed schema issues.
 * @param {SchemaIssue} issue
 * @returns
 */
function logIssue(issue: SchemaIssue) {
	if (!issue.path) {
		return
	}

	const label = bgRed(` ${String(issue.path[0]?.key || '<undefined>')} `);

	console.error(logSymbols.error, label, issue.message);
}
