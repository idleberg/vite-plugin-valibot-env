import { bgRed } from 'kleur/colors';
import { loadEnv, normalizePath, type Plugin } from 'vite';
import { resolve } from 'node:path';
import { safeParse, type ObjectSchema, type SchemaIssue } from 'valibot';
import logSymbols from 'log-symbols';

export default function ValibotEnvPlugin<T extends ObjectSchema<any, any> = ObjectSchema<any, any>>(schema: T): Plugin {
	return {
		name: 'valibot-env',
		config(userConfig, { mode }) {
			const rootDir = userConfig.root || process.cwd();

			const envDir = userConfig.envDir
				? normalizePath(resolve(rootDir, userConfig.envDir))
				: rootDir

			const env = loadEnv(mode, envDir, userConfig.envPrefix)
			const { issues, success } = safeParse(schema, env);

			if (!success) {
				for (const issue of issues) {
					logIssue(issue)
				}

				console.log(/* let it breathe */)
				process.exit(1);
			}

			return userConfig;
		}
	}
}

function logIssue(issue: SchemaIssue | undefined) {
	if (!issue?.path) {
		return
	}

	const label = bgRed(` ${String(issue.path[0]?.key || '<undefined>')} `);

	console.error(logSymbols.error, label, issue.message);
}
