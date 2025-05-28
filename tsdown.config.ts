import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node18',
		clean: isProduction,
		dts: isProduction,
		entry: ['src/plugin.ts'],
		format: 'esm',
		minify: isProduction,
	};
});
