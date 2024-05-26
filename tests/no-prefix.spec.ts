import { cwd } from 'node:process';
import { execa, type ExecaError } from 'execa';
import { resolve } from 'node:path';
import { test } from 'uvu';
import { viteBuild } from './helper';
import * as assert from 'uvu/assert';

const { command, args } = viteBuild('vite-no-prefix.config.ts');

const validEnvironmentVariables = {
	NODE_ENV: 'development',
	VITE_STRING: 'DEADBEEF',
};

test(`Testing valid environment variables`, async () => {
	try {
		await execa(command, args, {
			cwd: resolve(cwd(), 'tests/fixtures'),
			env: validEnvironmentVariables,
		});
	} catch (error) {
		throw new Error((error as ExecaError).message);
	}

	assert.ok(true);
});

test.run();
