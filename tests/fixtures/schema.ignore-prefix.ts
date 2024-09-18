import * as v from 'valibot';

export const schema = v.object({
	NODE_ENV: v.union([v.literal('development'), v.literal('production')]),
	PLUGIN_TEST__STRING: v.string(),
});
