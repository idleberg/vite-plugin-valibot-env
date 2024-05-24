import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibotPlugin from '../../index';

const envSchema = v.object({
	VITE_VALID_BIC: v.string([v.bic()]),
	VITE_VALID_CREDITCARD: v.string([v.creditCard()]),
	VITE_VALID_CUID2: v.string([v.cuid2()]),
	VITE_VALID_EMAIL: v.string([v.email()]),
	VITE_VALID_EMOJI: v.string([v.emoji()]),
	VITE_VALID_HASH_ADLER32: v.string([v.hash(['adler32'])]),
	VITE_VALID_HASH_CRC32: v.string([v.hash(['crc32'])]),
	VITE_VALID_HASH_CRC32B: v.string([v.hash(['crc32b'])]),
	VITE_VALID_HASH_MD4: v.string([v.hash(['md4'])]),
	VITE_VALID_HASH_MD5: v.string([v.hash(['md5'])]),
	VITE_VALID_HASH_RIPEMD128: v.string([v.hash(['ripemd128'])]),
	VITE_VALID_HASH_RIPEMD160: v.string([v.hash(['ripemd160'])]),
	VITE_VALID_HASH_SHA1: v.string([v.hash(['sha1'])]),
	VITE_VALID_HASH_SHA256: v.string([v.hash(['sha256'])]),
	VITE_VALID_HASH_SHA384: v.string([v.hash(['sha384'])]),
	VITE_VALID_HASH_SHA512: v.string([v.hash(['sha512'])]),
	VITE_VALID_HASH_TIGER128: v.string([v.hash(['tiger128'])]),
	VITE_VALID_HASH_TIGER160: v.string([v.hash(['tiger160'])]),
	VITE_VALID_HEXADECIMAL: v.string([v.hexadecimal()]),
	VITE_VALID_HEXCOLOR_LONG: v.string([v.hexColor()]),
	VITE_VALID_HEXCOLOR_SHORT: v.string([v.hexColor()]),
	VITE_VALID_IMEI: v.string([v.imei()]),
	VITE_VALID_IP: v.string([v.ip()]),
	VITE_VALID_IPV4: v.string([v.ipv4()]),
	VITE_VALID_IPV6_LONG: v.string([v.ipv6()]),
	VITE_VALID_IPV6_SHORT: v.string([v.ipv6()]),
	VITE_VALID_ISODATE: v.string([v.isoDate()]),
	VITE_VALID_ISODATETIME: v.string([v.isoDateTime()]),
	VITE_VALID_ISOTIME: v.string([v.isoTime()]),
	VITE_VALID_ISOTIMESECOND: v.string([v.isoTimeSecond()]),
	VITE_VALID_ISOTIMESTAMP: v.string([v.isoTimestamp()]),
	VITE_VALID_ISOWEEK: v.string([v.isoWeek()]),
	VITE_VALID_LITERAL: v.union([
		v.literal('a'),
		v.literal('b'),
		v.literal('c'),
	]),
	VITE_VALID_MAC: v.string([v.mac()]),
	VITE_VALID_MAC48: v.string([v.mac48()]),
	VITE_VALID_MAC64: v.string([v.mac64()]),
	VITE_VALID_OCTAL: v.string([v.octal()]),
	VITE_VALID_STRING: v.string(),
	VITE_VALID_ULID: v.string([v.ulid()]),
	VITE_VALID_URL: v.string([v.url()]),
	VITE_VALID_UUID: v.string([v.uuid()]),
});

export default defineConfig({
	plugins: [
		valibotPlugin(envSchema)
	]
});
