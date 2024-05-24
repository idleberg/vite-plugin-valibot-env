# vite-plugin-valibot-env

> A Vite plugin to validate environment variables against a Valibot schema.

[![License](https://img.shields.io/github/license/idleberg/vite-plugin-valibot-env?color=blue&style=for-the-badge)](https://github.com/idleberg/vite-plugin-valibot-env/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/vite-plugin-valibot-env?style=for-the-badge)](https://www.npmjs.org/package/vite-plugin-valibot-env)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/vite-plugin-valibot-env/tests.yml?style=for-the-badge)](https://github.com/idleberg/vite-plugin-valibot-env/actions)

## Installation

`npm install -D vite-plugin-valibot-env`

## Usage

Let's start with very a basic example

```js
import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibot from 'vite-plugin-valibot-env';

const envSchema = v.object({
	VITE_API_ENDPOINT: v.string([v.url()]),
	VITE_ENABLE_LOGGING: v.boolean(),
});

export default defineConfig({
	plugins: [
		valibot(envSchema),
	]
});
```

### API

`valibot(schema, options?)`

### Options

#### `options.ignoreEnvPrefix`

Type: `Boolean`  
Default: `false`  

Setting this to `true` will also validate unprefixed environment variables.

> [!TIP]
> Vite uses a [prefix](https://vitejs.dev/config/shared-options.html#envprefix) to prevent leaking all environment variables into your code. However, there might be use cases where you want validate unprefixed environment variables as well, e.g. `HOST` and `PORT` to configure the Vite server.

## License

This work is licensed under [The MIT License](LICENSE).
