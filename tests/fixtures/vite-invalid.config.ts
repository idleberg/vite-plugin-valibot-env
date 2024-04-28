import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibotPlugin from '../../index';

const envSchema = v.object({
	INVALID_BIC: v.string([v.bic()]),
	INVALID_CREDITCARD: v.string([v.creditCard()]),
	INVALID_CUID2: v.string([v.cuid2()]),
	INVALID_EMAIL: v.string([v.email()]),
	INVALID_EMOJI: v.string([v.emoji()]),
	INVALID_HASH_ADLER32: v.string([v.hash(['adler32'])]),
	INVALID_HASH_CRC32: v.string([v.hash(['crc32'])]),
	INVALID_HASH_CRC32B: v.string([v.hash(['crc32b'])]),
	INVALID_HASH_MD4: v.string([v.hash(['md4'])]),
	INVALID_HASH_MD5: v.string([v.hash(['md5'])]),
	INVALID_HASH_RIPEMD128: v.string([v.hash(['ripemd128'])]),
	INVALID_HASH_RIPEMD160: v.string([v.hash(['ripemd160'])]),
	INVALID_HASH_SHA1: v.string([v.hash(['sha1'])]),
	INVALID_HASH_SHA256: v.string([v.hash(['sha256'])]),
	INVALID_HASH_SHA384: v.string([v.hash(['sha384'])]),
	INVALID_HASH_SHA512: v.string([v.hash(['sha512'])]),
	INVALID_HASH_TIGER128: v.string([v.hash(['tiger128'])]),
	INVALID_HASH_TIGER160: v.string([v.hash(['tiger160'])]),
	INVALID_HEXADECIMAL: v.string([v.hexadecimal()]),
	INVALID_HEXCOLOR_LONG: v.string([v.hexColor()]),
	INVALID_HEXCOLOR_SHORT: v.string([v.hexColor()]),
	INVALID_IMEI: v.string([v.imei()]),
	INVALID_IP: v.string([v.ip()]),
	INVALID_IPV4: v.string([v.ipv4()]),
	INVALID_IPV6_LONG: v.string([v.ipv6()]),
	INVALID_IPV6_SHORT: v.string([v.ipv6()]),
	INVALID_ISODATE: v.string([v.isoDate()]),
	INVALID_ISODATETIME: v.string([v.isoDateTime()]),
	INVALID_ISOTIME: v.string([v.isoTime()]),
	INVALID_ISOTIMESECOND: v.string([v.isoTimeSecond()]),
	INVALID_ISOTIMESTAMP: v.string([v.isoTimestamp()]),
	INVALID_ISOWEEK: v.string([v.isoWeek()]),
	INVALID_LITERAL: v.union([
		v.literal('a'),
		v.literal('b'),
		v.literal('c'),
	]),
	INVALID_MAC: v.string([v.mac()]),
	INVALID_MAC48: v.string([v.mac48()]),
	INVALID_MAC64: v.string([v.mac64()]),
	// INVALID_MIMETYPE: v.string([v.mimeType()]),
	INVALID_OCTAL: v.string([v.octal()]),
	INVALID_STRING: v.string(),
	INVALID_ULID: v.string([v.ulid()]),
	INVALID_URL: v.string([v.url()]),
	INVALID_UUID: v.string([v.uuid()]),
});

export default defineConfig({
	plugins: [
		valibotPlugin(envSchema)
	]
});
