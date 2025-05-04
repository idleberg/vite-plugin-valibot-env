import { resolve } from 'node:path';
import { cwd, env } from 'node:process';
import { test } from 'uvu';
import { build } from 'vite';
const fixtures = resolve(cwd(), 'tests/fixtures');
import * as assert from 'uvu/assert';
import * as v from 'valibot';

import valibotPlugin from '../src/index.ts';

const invalidEnvironmentVariables = {
	PLUGIN_TEST__INVALID_BIC: 'BIC',
	PLUGIN_TEST__INVALID_CREDITCARD: 'credit card',
	PLUGIN_TEST__INVALID_CUID2: 'Cuid2',
	PLUGIN_TEST__INVALID_EMAIL: 'email',
	PLUGIN_TEST__INVALID_EMOJI: 'emoji',
	PLUGIN_TEST__INVALID_HASH_ADLER32: 'hash',
	PLUGIN_TEST__INVALID_HASH_CRC32: 'hash',
	PLUGIN_TEST__INVALID_HASH_CRC32B: 'hash',
	PLUGIN_TEST__INVALID_HASH_MD4: 'hash',
	PLUGIN_TEST__INVALID_HASH_MD5: 'hash',
	PLUGIN_TEST__INVALID_HASH_RIPEMD128: 'hash',
	PLUGIN_TEST__INVALID_HASH_RIPEMD160: 'hash',
	PLUGIN_TEST__INVALID_HASH_SHA1: 'hash',
	PLUGIN_TEST__INVALID_HASH_SHA256: 'hash',
	PLUGIN_TEST__INVALID_HASH_SHA384: 'hash',
	PLUGIN_TEST__INVALID_HASH_SHA512: 'hash',
	PLUGIN_TEST__INVALID_HASH_TIGER128: 'hash',
	PLUGIN_TEST__INVALID_HASH_TIGER160: 'hash',
	PLUGIN_TEST__INVALID_HEXADECIMAL: 'hexadecimal',
	PLUGIN_TEST__INVALID_HEXCOLOR_LONG: 'hex color',
	PLUGIN_TEST__INVALID_HEXCOLOR_SHORT: 'hex color',
	PLUGIN_TEST__INVALID_IMEI: 'IMEI',
	PLUGIN_TEST__INVALID_IP: 'IP',
	PLUGIN_TEST__INVALID_IPV4: 'IPv4',
	PLUGIN_TEST__INVALID_IPV6_LONG: 'IPv6',
	PLUGIN_TEST__INVALID_IPV6_SHORT: 'IPv6',
	PLUGIN_TEST__INVALID_ISODATE: 'date',
	PLUGIN_TEST__INVALID_ISODATETIME: 'date-time',
	PLUGIN_TEST__INVALID_ISOTIME: 'time',
	PLUGIN_TEST__INVALID_ISOTIMESECOND: 'time second',
	PLUGIN_TEST__INVALID_ISOTIMESTAMP: 'timestamp',
	PLUGIN_TEST__INVALID_ISOWEEK: 'week',
	PLUGIN_TEST__INVALID_LITERAL: '"a" | "b" | "c"',
	PLUGIN_TEST__INVALID_MAC: 'MAC',
	PLUGIN_TEST__INVALID_MAC48: '48-bit MAC',
	PLUGIN_TEST__INVALID_MAC64: '64-bit MAC',
	PLUGIN_TEST__INVALID_OCTAL: 'octal',
	PLUGIN_TEST__INVALID_STRING: 'string',
	PLUGIN_TEST__INVALID_ULID: 'ULID',
	PLUGIN_TEST__INVALID_URL: 'URL',
	PLUGIN_TEST__INVALID_UUID: 'UUID',
};

for (const [key, type] of Object.entries(invalidEnvironmentVariables)) {
	test(`Testing invalid environment variable ${key}`, async () => {
		const schema = v.object({
			[key]: v.undefined_(),
		});

		env[key] = type;

		try {
			await build({
				envPrefix: 'PLUGIN_TEST__',
				plugins: [
					valibotPlugin(schema, {
						throwError: true,
					}),
				],
				root: fixtures,
			});

			assert.unreachable('should have thrown');
		} catch (error) {
			assert.instance(error, TypeError);
			assert.match((error as TypeError).message, `Invalid type: Expected undefined but received "${type}"`);
		}
	});
}
test.run();
