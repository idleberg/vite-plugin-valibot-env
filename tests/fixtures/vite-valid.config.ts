import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibotPlugin from '../../index';

const envSchema = v.object({
	VALID_BIC: v.string([v.bic()]),
	VALID_CREDITCARD: v.string([v.creditCard()]),
	VALID_CUID2: v.string([v.cuid2()]),
	VALID_EMAIL: v.string([v.email()]),
	VALID_EMOJI: v.string([v.emoji()]),
	VALID_HASH_ADLER32: v.string([v.hash(['adler32'])]),
	VALID_HASH_CRC32: v.string([v.hash(['crc32'])]),
	VALID_HASH_CRC32B: v.string([v.hash(['crc32b'])]),
	VALID_HASH_MD4: v.string([v.hash(['md4'])]),
	VALID_HASH_MD5: v.string([v.hash(['md5'])]),
	VALID_HASH_RIPEMD128: v.string([v.hash(['ripemd128'])]),
	VALID_HASH_RIPEMD160: v.string([v.hash(['ripemd160'])]),
	VALID_HASH_SHA1: v.string([v.hash(['sha1'])]),
	VALID_HASH_SHA256: v.string([v.hash(['sha256'])]),
	VALID_HASH_SHA384: v.string([v.hash(['sha384'])]),
	VALID_HASH_SHA512: v.string([v.hash(['sha512'])]),
	VALID_HASH_TIGER128: v.string([v.hash(['tiger128'])]),
	VALID_HASH_TIGER160: v.string([v.hash(['tiger160'])]),
	VALID_HEXADECIMAL: v.string([v.hexadecimal()]),
	VALID_HEXCOLOR_LONG: v.string([v.hexColor()]),
	VALID_HEXCOLOR_SHORT: v.string([v.hexColor()]),
	VALID_IMEI: v.string([v.imei()]),
	VALID_IP: v.string([v.ip()]),
	VALID_IPV4: v.string([v.ipv4()]),
	VALID_IPV6_LONG: v.string([v.ipv6()]),
	VALID_IPV6_SHORT: v.string([v.ipv6()]),
	VALID_ISODATE: v.string([v.isoDate()]),
	VALID_ISODATETIME: v.string([v.isoDateTime()]),
	VALID_ISOTIME: v.string([v.isoTime()]),
	VALID_ISOTIMESECOND: v.string([v.isoTimeSecond()]),
	VALID_ISOTIMESTAMP: v.string([v.isoTimestamp()]),
	VALID_ISOWEEK: v.string([v.isoWeek()]),
	VALID_LITERAL: v.union([
		v.literal('a'),
		v.literal('b'),
		v.literal('c'),
	]),
	VALID_MAC: v.string([v.mac()]),
	VALID_MAC48: v.string([v.mac48()]),
	VALID_MAC64: v.string([v.mac64()]),
	// VALID_MIMETYPE: v.string([v.mimeType()]),
	VALID_OCTAL: v.string([v.octal()]),
	VALID_STRING: v.string(),
	VALID_ULID: v.string([v.ulid()]),
	VALID_URL: v.string([v.url()]),
	VALID_UUID: v.string([v.uuid()]),
});

export default defineConfig({
	plugins: [
		valibotPlugin(envSchema)
	]
});
