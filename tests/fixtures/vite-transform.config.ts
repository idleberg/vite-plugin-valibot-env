import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibotPlugin from '../../index';

const envSchema = v.object({
	VITE_TRUE: v.boolean(),
	VITE_FALSE: v.boolean(),
	VITE_NULL: v.null_(),
	VITE_INT: v.pipe(v.number(), v.integer()),
	VITE_FLOAT: v.number(),
});

export default defineConfig({
	plugins: [
		valibotPlugin(envSchema, {
			transformValues: true,
		}),
	],
});
