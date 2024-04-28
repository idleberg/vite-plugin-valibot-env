import { defineConfig } from 'tsup';

export default defineConfig({
	target: 'esnext',
  clean: true,
  dts: true,
  entry: ['index.ts'],
  format: 'esm',
  minify: true,
  treeshake: 'recommended'
});
