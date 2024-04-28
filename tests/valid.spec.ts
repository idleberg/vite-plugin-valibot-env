import { execa, type ExecaError } from 'execa';
import { resolve } from 'path';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

const viteArgs = [
	'vite',
	'build',
	'--config',
	'vite-valid.config.ts'
];

const validEnvironmentVariables = {
	VALID_BIC: 'BOFAUS3NXXX',
	VALID_CREDITCARD: '4111111111111111',
	VALID_CUID2: 'tz4a98xxat96iws9zmbrgj3a',
	VALID_EMAIL: 'idleberg@users.noreply.github.com',
	VALID_EMOJI: '🌈',
	VALID_HASH_ADLER32: '1bd40469',
	VALID_HASH_CRC32: '8abd2bbc',
	VALID_HASH_CRC32B: 'e79aa9c2',
	VALID_HASH_MD4: '7e4bc8427e80e07ddc51669511ee9231',
	VALID_HASH_MD5: 'a7966bf58e23583c9a5a4059383ff850',
	VALID_HASH_RIPEMD128: '7758a6c3004b430219f29dffae291cce',
	VALID_HASH_RIPEMD160: '6b821cc6af170f0eab424f9c644b2dd0b4e7dc08',
	VALID_HASH_SHA1: '7b4758d4baa20873585b9597c7cb9ace2d690ab8',
	VALID_HASH_SHA256: '37980c33951de6b0e450c3701b219bfeee930544705f637cd1158b63827bb390',
	VALID_HASH_SHA384: '11f799113b85b59bfde24e9d473b752085eac02603d0cf5ec927753f575430e42630f685607997636cafcd3be3b22a04',
	VALID_HASH_SHA512: '959c0bdfa9877d3466c5848f55264f72f132c657b002b79fda65dbe36c67f4bb3d2a3e2e9925cb5896a53c76169c5bb71b7853bd90192068dc77f4b20159a1d8',
	VALID_HASH_TIGER128: 'bbd72efa9e5588ae0363038ba6006d24',
	VALID_HASH_TIGER160: 'bbd72efa9e5588ae0363038ba6006d245d390d74',
	VALID_HEXADECIMAL: 'DEADBEEF',
	VALID_HEXCOLOR_LONG: '#ffffff',
	VALID_HEXCOLOR_SHORT: '#fff',
	VALID_IMEI: '35-209900-176148-1',
	VALID_IP: '127.0.0.1',
	VALID_IPV4: '127.0.0.1',
	VALID_IPV6_LONG: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
	VALID_IPV6_SHORT: '2001:db8::8a2e:370:7334',
	VALID_ISODATE: '2023-06-31',
	VALID_ISODATETIME: '2023-06-31T00:00',
	VALID_ISOTIME: '00:00',
	VALID_ISOTIMESECOND: '00:00:00',
	VALID_ISOTIMESTAMP: '2023-06-31T00:00:00.000Z',
	VALID_ISOWEEK: '2023-W24',
	VALID_LITERAL: 'a',
	VALID_MAC: '00:1A:2B:3C:4D:5E',
	VALID_MAC48: '00:1A:2B:3C:4D:5E',
	VALID_MAC64: '00:1A:2B:FF:FE:3C:4D:5E',
	// VALID_MIMETYPE: 'application/json',
	VALID_OCTAL: '34',
	VALID_STRING: 'test',
	VALID_ULID: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
	VALID_URL: 'https://github.com/idleberg',
	VALID_UUID: '550e8400-e29b-41d4-a716-446655440000',
};

test(`Testing valid environment variables`, async () => {
	try {
		await execa('npx', viteArgs, {
			cwd: resolve(process.cwd(), 'tests/fixtures'),
			env: validEnvironmentVariables
		});
	} catch (error) {
		throw new Error((error as ExecaError).message);
	}

	assert.ok(true);
});

test.run();