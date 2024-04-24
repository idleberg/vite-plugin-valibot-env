# vite-plugin-valibot-env

> A Vite plugin to validate environment variables against a Valibot schema

[![License](https://img.shields.io/github/license/idleberg/vite-plugin-valibot-env?color=blue&style=for-the-badge)](https://github.com/idleberg/vite-plugin-valibot-env/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/vite-plugin-valibot-env?style=for-the-badge)](https://www.npmjs.org/package/vite-plugin-valibot-env)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/vite-plugin-valibot-env/tests.yml?style=for-the-badge)](https://github.com/idleberg/vite-plugin-valibot-env/actions)

## Installation

`npm install -D vite-plugin-valibot-env`

## Usage

```js
import { defineConfig } from 'vite';
import v from 'valibot';
import valibot from 'vite-plugin-valibot-env';

const envSchema = v.object({
	NODE_ENV: v.union([
		v.literal('development'),
		v.literal('staging'),
		v.literal('production'),
	])
});

export default defineConfig({
	plugins: [
		valibot(envSchema)
	]
});
```

## License

This work is licensed under [The MIT License](LICENSE)
