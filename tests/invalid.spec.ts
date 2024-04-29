import { execa, type ExecaError } from 'execa';
import { resolve } from 'path';
import { test } from 'uvu';
import { v4 as uuidv4 } from '@lukeed/uuid';
import * as assert from 'uvu/assert';
import stripAnsi from 'strip-ansi';

const viteArgs = [
	'vite',
	'build',
	'--config',
	'vite-invalid.config.ts'
];

const invalidEnvironmentVariables = {
	INVALID_BIC: 'BIC',
	INVALID_CREDITCARD: 'credit card',
	INVALID_CUID2: 'Cuid2',
	INVALID_EMAIL: 'email',
	INVALID_EMOJI: 'emoji',
	INVALID_HASH_ADLER32: 'hash',
	INVALID_HASH_CRC32: 'hash',
	INVALID_HASH_CRC32B: 'hash',
	INVALID_HASH_MD4: 'hash',
	INVALID_HASH_MD5: 'hash',
	INVALID_HASH_RIPEMD128: 'hash',
	INVALID_HASH_RIPEMD160: 'hash',
	INVALID_HASH_SHA1: 'hash',
	INVALID_HASH_SHA256: 'hash',
	INVALID_HASH_SHA384: 'hash',
	INVALID_HASH_SHA512: 'hash',
	INVALID_HASH_TIGER128: 'hash',
	INVALID_HASH_TIGER160: 'hash',
	INVALID_HEXADECIMAL: 'hexadecimal',
	INVALID_HEXCOLOR_LONG: 'hex color',
	INVALID_HEXCOLOR_SHORT: 'hex color',
	INVALID_IMEI: 'IMEI',
	INVALID_IP: 'IP',
	INVALID_IPV4: 'IPv4',
	INVALID_IPV6_LONG: 'IPv6',
	INVALID_IPV6_SHORT: 'IPv6',
	INVALID_ISODATE: 'date',
	INVALID_ISODATETIME: 'date-time',
	INVALID_ISOTIME: 'time',
	INVALID_ISOTIMESECOND: 'time second',
	INVALID_ISOTIMESTAMP: 'timestamp',
	INVALID_ISOWEEK: 'week',
	// INVALID_LITERAL: '"a" | "b" | "c"',
	INVALID_MAC: 'MAC',
	INVALID_MAC48: '48-bit MAC',
	INVALID_MAC64: '64-bit MAC',
	INVALID_OCTAL: 'octal',
	// INVALID_STRING: 'string',
	INVALID_ULID: 'ULID',
	INVALID_URL: 'URL',
	// INVALID_UUID: 'UUID',
};

Object.entries(invalidEnvironmentVariables).forEach(([key, type]) => {
	test(`Testing invalid environment variable ${key}`, async () => {
		const uuid = uuidv4();

		try {
			await execa('npx', viteArgs, {
				cwd: resolve(process.cwd(), 'tests/fixtures'),
				env: {
					[key]: uuid
				}
			});
		} catch (error) {
			const stderr = stripAnsi((error as ExecaError).stderr);

			assert.match(stderr, `Invalid ${type}: Received "${uuid}"`);
		}
	});
});

test.run();
