import dotenv from 'dotenv';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { build } from 'vite';

import valibotPlugin from '../src/index.ts';
import { schema } from './fixtures/schema.valid.ts';

const fixtures = resolve(cwd(), 'tests/fixtures');

dotenv.config({
	path: resolve(fixtures, '.env.valid'),
});

test(`Testing valid environment variables`, async () => {
	await build({
		envPrefix: 'PLUGIN_TEST__',
		plugins: [valibotPlugin(schema)],
		root: fixtures,
	});

	assert.ok(true);
});

test.run();
