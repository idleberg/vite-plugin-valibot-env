import { defineConfig } from 'tsup';

export default defineConfig((options) => {
	return {
		target: 'node18',
		clean: true,
		dts: true,
		entry: ['index.ts'],
		format: 'esm',
		minify: !options.watch,
		treeshake: 'recommended',
	};
});
