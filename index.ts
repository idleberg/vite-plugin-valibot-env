import { Plugin, loadEnv } from 'vite';
import { safeParse, type ObjectSchema, type SchemaIssue } from 'valibot';
import { yellow } from 'kleur';
import logSymbols from 'log-symbols';

export default function ValibotEnvPlugin<T extends ObjectSchema<any, any> = ObjectSchema<any, any>>(schema: T): Plugin {
	return {
		name: 'valibot-env',
		config(userConfig, { mode }) {
			const env = loadEnv(mode, process.cwd(), '')
			const { issues, success } = safeParse(schema, env);

			if (!success) {
				for (const issue of issues) {
					logIssue(issue)
				}

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

	console.error(logSymbols.error, yellow(String(issue.path[0]?.key || '<undefined>')), issue.message);
}
