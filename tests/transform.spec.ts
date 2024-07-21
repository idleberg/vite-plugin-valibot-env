import { cwd } from 'node:process';
import { execa, type ExecaError } from 'execa';
import { resolve } from 'node:path';
import { test } from 'uvu';
import { viteBuild } from './helper.ts';
import * as assert from 'uvu/assert';

const { command, args } = viteBuild('vite-transform.config.ts');

const validEnvironmentVariables = {
	VITE_TRUE: 'true',
	VITE_FALSE: 'false',
	VITE_NULL: 'null',
	VITE_INT: '1',
	VITE_FLOAT: '1.1',
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
