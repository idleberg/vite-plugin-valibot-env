import { resolve } from 'node:path';
import { cwd } from 'node:process';
import dotenv from 'dotenv';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { build } from 'vite';

import valibotPlugin from '../src/index.ts';
import { schema } from './fixtures/schema.ignore-prefix.ts';

const fixtures = resolve(cwd(), 'tests/fixtures');

dotenv.config({
	path: resolve(fixtures, '.env.ignore-prefix'),
});

test('Testing valid environment variables', async () => {
	await build({
		envPrefix: 'PLUGIN_TEST__',
		plugins: [
			valibotPlugin(schema, {
				ignoreEnvPrefix: true,
			}),
		],
		root: fixtures,
	});

	assert.ok(true);
});

test.run();
