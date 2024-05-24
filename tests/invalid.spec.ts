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
	VITE_INVALID_BIC: 'BIC',
	VITE_INVALID_CREDITCARD: 'credit card',
	VITE_INVALID_CUID2: 'Cuid2',
	VITE_INVALID_EMAIL: 'email',
	VITE_INVALID_EMOJI: 'emoji',
	VITE_INVALID_HASH_ADLER32: 'hash',
	VITE_INVALID_HASH_CRC32: 'hash',
	VITE_INVALID_HASH_CRC32B: 'hash',
	VITE_INVALID_HASH_MD4: 'hash',
	VITE_INVALID_HASH_MD5: 'hash',
	VITE_INVALID_HASH_RIPEMD128: 'hash',
	VITE_INVALID_HASH_RIPEMD160: 'hash',
	VITE_INVALID_HASH_SHA1: 'hash',
	VITE_INVALID_HASH_SHA256: 'hash',
	VITE_INVALID_HASH_SHA384: 'hash',
	VITE_INVALID_HASH_SHA512: 'hash',
	VITE_INVALID_HASH_TIGER128: 'hash',
	VITE_INVALID_HASH_TIGER160: 'hash',
	VITE_INVALID_HEXADECIMAL: 'hexadecimal',
	VITE_INVALID_HEXCOLOR_LONG: 'hex color',
	VITE_INVALID_HEXCOLOR_SHORT: 'hex color',
	VITE_INVALID_IMEI: 'IMEI',
	VITE_INVALID_IP: 'IP',
	VITE_INVALID_IPV4: 'IPv4',
	VITE_INVALID_IPV6_LONG: 'IPv6',
	VITE_INVALID_IPV6_SHORT: 'IPv6',
	VITE_INVALID_ISODATE: 'date',
	VITE_INVALID_ISODATETIME: 'date-time',
	VITE_INVALID_ISOTIME: 'time',
	VITE_INVALID_ISOTIMESECOND: 'time second',
	VITE_INVALID_ISOTIMESTAMP: 'timestamp',
	VITE_INVALID_ISOWEEK: 'week',
	// VITE_INVALID_LITERAL: '"a" | "b" | "c"',
	VITE_INVALID_MAC: 'MAC',
	VITE_INVALID_MAC48: '48-bit MAC',
	VITE_INVALID_MAC64: '64-bit MAC',
	VITE_INVALID_OCTAL: 'octal',
	// VITE_INVALID_STRING: 'string',
	VITE_INVALID_ULID: 'ULID',
	VITE_INVALID_URL: 'URL',
	// VITE_INVALID_UUID: 'UUID',
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
