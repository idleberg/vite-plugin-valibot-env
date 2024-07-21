import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibotPlugin from '../../index.ts';

const envSchema = v.object({
	NODE_ENV: v.union([v.literal('development'), v.literal('production')]),
	VITE_STRING: v.string(),
});

export default defineConfig({
	plugins: [
		valibotPlugin(envSchema, {
			ignoreEnvPrefix: true,
		}),
	],
});
