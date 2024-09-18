import { build } from 'vite';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { schema } from './fixtures/schema.transform.ts';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import dotenv from 'dotenv';
import valibotPlugin from '../src/index.ts';

const fixtures = resolve(cwd(), 'tests/fixtures');

dotenv.config({
	path: resolve(fixtures, '.env.transform'),
});

test(`Testing valid environment variables`, async () => {
	await build({
		envPrefix: 'PLUGIN_TEST__',
		plugins: [
			valibotPlugin(schema, {
				transformValues: true,
			}),
		],
		root: fixtures,
	});

	assert.ok(true);
});

test.run();
