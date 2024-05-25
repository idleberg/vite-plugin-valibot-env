import { execa, type ExecaError } from 'execa';
import { resolve } from 'node:path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

const viteArgs = ['vite', 'build', '--config', 'vite-no-prefix.config.ts'];

const validEnvironmentVariables = {
	NODE_ENV: 'development',
	VITE_STRING: 'DEADBEEF',
};

test(`Testing valid environment variables`, async () => {
	try {
		await execa('npx', viteArgs, {
			cwd: resolve(process.cwd(), 'tests/fixtures'),
			env: validEnvironmentVariables,
		});
	} catch (error) {
		throw new Error((error as ExecaError).message);
	}

	assert.ok(true);
});

test.run();
