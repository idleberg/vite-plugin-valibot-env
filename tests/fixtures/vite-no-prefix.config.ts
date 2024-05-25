import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibotPlugin from '../../index';

const envSchema = v.object({
	NODE_ENV: v.literal('development'),
	VITE_STRING: v.string(),
});

export default defineConfig({
	plugins: [
		valibotPlugin(envSchema, {
			ignoreEnvPrefix: true,
		}),
	],
});
