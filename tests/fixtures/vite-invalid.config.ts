import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibotPlugin from '../../index';

const envSchema = v.object({
	VITE_INVALID_BIC: v.string([v.bic()]),
	VITE_INVALID_CREDITCARD: v.string([v.creditCard()]),
	VITE_INVALID_CUID2: v.string([v.cuid2()]),
	VITE_INVALID_EMAIL: v.string([v.email()]),
	VITE_INVALID_EMOJI: v.string([v.emoji()]),
	VITE_INVALID_HASH_ADLER32: v.string([v.hash(['adler32'])]),
	VITE_INVALID_HASH_CRC32: v.string([v.hash(['crc32'])]),
	VITE_INVALID_HASH_CRC32B: v.string([v.hash(['crc32b'])]),
	VITE_INVALID_HASH_MD4: v.string([v.hash(['md4'])]),
	VITE_INVALID_HASH_MD5: v.string([v.hash(['md5'])]),
	VITE_INVALID_HASH_RIPEMD128: v.string([v.hash(['ripemd128'])]),
	VITE_INVALID_HASH_RIPEMD160: v.string([v.hash(['ripemd160'])]),
	VITE_INVALID_HASH_SHA1: v.string([v.hash(['sha1'])]),
	VITE_INVALID_HASH_SHA256: v.string([v.hash(['sha256'])]),
	VITE_INVALID_HASH_SHA384: v.string([v.hash(['sha384'])]),
	VITE_INVALID_HASH_SHA512: v.string([v.hash(['sha512'])]),
	VITE_INVALID_HASH_TIGER128: v.string([v.hash(['tiger128'])]),
	VITE_INVALID_HASH_TIGER160: v.string([v.hash(['tiger160'])]),
	VITE_INVALID_HEXADECIMAL: v.string([v.hexadecimal()]),
	VITE_INVALID_HEXCOLOR_LONG: v.string([v.hexColor()]),
	VITE_INVALID_HEXCOLOR_SHORT: v.string([v.hexColor()]),
	VITE_INVALID_IMEI: v.string([v.imei()]),
	VITE_INVALID_IP: v.string([v.ip()]),
	VITE_INVALID_IPV4: v.string([v.ipv4()]),
	VITE_INVALID_IPV6_LONG: v.string([v.ipv6()]),
	VITE_INVALID_IPV6_SHORT: v.string([v.ipv6()]),
	VITE_INVALID_ISODATE: v.string([v.isoDate()]),
	VITE_INVALID_ISODATETIME: v.string([v.isoDateTime()]),
	VITE_INVALID_ISOTIME: v.string([v.isoTime()]),
	VITE_INVALID_ISOTIMESECOND: v.string([v.isoTimeSecond()]),
	VITE_INVALID_ISOTIMESTAMP: v.string([v.isoTimestamp()]),
	VITE_INVALID_ISOWEEK: v.string([v.isoWeek()]),
	VITE_INVALID_LITERAL: v.union([
		v.literal('a'),
		v.literal('b'),
		v.literal('c'),
	]),
	VITE_INVALID_MAC: v.string([v.mac()]),
	VITE_INVALID_MAC48: v.string([v.mac48()]),
	VITE_INVALID_MAC64: v.string([v.mac64()]),
	VITE_INVALID_OCTAL: v.string([v.octal()]),
	VITE_INVALID_STRING: v.string(),
	VITE_INVALID_ULID: v.string([v.ulid()]),
	VITE_INVALID_URL: v.string([v.url()]),
	VITE_INVALID_UUID: v.string([v.uuid()]),
});

export default defineConfig({
	plugins: [
		valibotPlugin(envSchema)
	]
});
