import { cwd } from 'node:process';
import { execa, type ExecaError } from 'execa';
import { resolve } from 'node:path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

const isDeno = typeof Deno !== 'undefined' && Deno?.version?.deno;
const command = isDeno ? 'deno' : 'npx';
const viteArgs = ['vite', 'build', '--config', 'vite-no-prefix.config.ts'];

if (isDeno) {
	viteArgs.unshift('run', '--allow-all', 'npm:vite');
}

const validEnvironmentVariables = {
	NODE_ENV: 'development',
	VITE_STRING: 'DEADBEEF',
};

test(`Testing valid environment variables`, async () => {
	try {
		await execa(command, viteArgs, {
			cwd: resolve(cwd(), 'tests/fixtures'),
			env: validEnvironmentVariables,
		});
	} catch (error) {
		throw new Error((error as ExecaError).message);
	}

	assert.ok(true);
});

test.run();
