import { cwd } from 'node:process';
import { execa, type ExecaError } from 'execa';
import { resolve } from 'node:path';
import { test } from 'uvu';
import { viteBuild } from './helper';
import * as assert from 'uvu/assert';

const { command, args } = viteBuild('vite-valid.config.ts');

const validEnvironmentVariables = {
	VITE_VALID_BIC: 'BOFAUS3NXXX',
	VITE_VALID_CREDITCARD: '4111111111111111',
	VITE_VALID_CUID2: 'tz4a98xxat96iws9zmbrgj3a',
	VITE_VALID_EMAIL: 'idleberg@users.noreply.github.com',
	VITE_VALID_EMOJI: '🌈',
	VITE_VALID_HASH_ADLER32: '1bd40469',
	VITE_VALID_HASH_CRC32: '8abd2bbc',
	VITE_VALID_HASH_CRC32B: 'e79aa9c2',
	VITE_VALID_HASH_MD4: '7e4bc8427e80e07ddc51669511ee9231',
	VITE_VALID_HASH_MD5: 'a7966bf58e23583c9a5a4059383ff850',
	VITE_VALID_HASH_RIPEMD128: '7758a6c3004b430219f29dffae291cce',
	VITE_VALID_HASH_RIPEMD160: '6b821cc6af170f0eab424f9c644b2dd0b4e7dc08',
	VITE_VALID_HASH_SHA1: '7b4758d4baa20873585b9597c7cb9ace2d690ab8',
	VITE_VALID_HASH_SHA256: '37980c33951de6b0e450c3701b219bfeee930544705f637cd1158b63827bb390',
	VITE_VALID_HASH_SHA384:
		'11f799113b85b59bfde24e9d473b752085eac02603d0cf5ec927753f575430e42630f685607997636cafcd3be3b22a04',
	VITE_VALID_HASH_SHA512:
		'959c0bdfa9877d3466c5848f55264f72f132c657b002b79fda65dbe36c67f4bb3d2a3e2e9925cb5896a53c76169c5bb71b7853bd90192068dc77f4b20159a1d8',
	VITE_VALID_HASH_TIGER128: 'bbd72efa9e5588ae0363038ba6006d24',
	VITE_VALID_HASH_TIGER160: 'bbd72efa9e5588ae0363038ba6006d245d390d74',
	VITE_VALID_HEXADECIMAL: 'DEADBEEF',
	VITE_VALID_HEXCOLOR_LONG: '#ffffff',
	VITE_VALID_HEXCOLOR_SHORT: '#fff',
	VITE_VALID_IMEI: '35-209900-176148-1',
	VITE_VALID_IP: '127.0.0.1',
	VITE_VALID_IPV4: '127.0.0.1',
	VITE_VALID_IPV6_LONG: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
	VITE_VALID_IPV6_SHORT: '2001:db8::8a2e:370:7334',
	VITE_VALID_ISODATE: '2023-06-31',
	VITE_VALID_ISODATETIME: '2023-06-31T00:00',
	VITE_VALID_ISOTIME: '00:00',
	VITE_VALID_ISOTIMESECOND: '00:00:00',
	VITE_VALID_ISOTIMESTAMP: '2023-06-31T00:00:00.000Z',
	VITE_VALID_ISOWEEK: '2023-W24',
	VITE_VALID_LITERAL: 'a',
	VITE_VALID_MAC: '00:1A:2B:3C:4D:5E',
	VITE_VALID_MAC48: '00:1A:2B:3C:4D:5E',
	VITE_VALID_MAC64: '00:1A:2B:FF:FE:3C:4D:5E',
	VITE_VALID_OCTAL: '34',
	VITE_VALID_STRING: 'test',
	VITE_VALID_ULID: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
	VITE_VALID_URL: 'https://github.com/idleberg',
	VITE_VALID_UUID: '550e8400-e29b-41d4-a716-446655440000',
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
