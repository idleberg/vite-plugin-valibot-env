import * as v from 'valibot';

export const schema = v.object({
	PLUGIN_TEST__TRUE: v.boolean(),
	PLUGIN_TEST__FALSE: v.boolean(),
	PLUGIN_TEST__NULL: v.null_(),
	PLUGIN_TEST__INT: v.pipe(v.number(), v.integer()),
	PLUGIN_TEST__FLOAT: v.number(),
});
