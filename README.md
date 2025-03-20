# vite-plugin-valibot-env

> A Vite plugin to validate environment variables against a Valibot schema.

[![License](https://img.shields.io/github/license/idleberg/vite-plugin-valibot-env?color=blue&style=for-the-badge)](https://github.com/idleberg/vite-plugin-valibot-env/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/vite-plugin-valibot-env?style=for-the-badge)](https://www.npmjs.org/package/vite-plugin-valibot-env)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/vite-plugin-valibot-env?style=for-the-badge)](https://jsr.io/@idleberg/vite-plugin-valibot-env)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/vite-plugin-valibot-env/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/vite-plugin-valibot-env/actions/workflows/node.yml)
[![CI: Deno](https://img.shields.io/github/actions/workflow/status/idleberg/vite-plugin-valibot-env/deno.yml?logo=deno&logoColor=white&style=for-the-badge)](https://github.com/idleberg/vite-plugin-valibot-env/actions/workflows/deno.yml)

## Why?

It's generally a good idea to check that you're all set up early in the development process. Validating that your environment variables have been defined and are of the expected type is a part of that – for yourself and your colleagues. While there are _many_ libraries to validate against a schema, [Valibot](https://valibot.dev/) stands out for its versatility and modularity. The small footprint already makes it an ideal candidate for validation in the frontend. So why not use it in your development process as well?

## Installation

```shell
npm install -D vite-plugin-valibot-env valibot
```

## Usage

Let's start with a very basic example

```javascript
import { defineConfig } from 'vite';
import * as v from 'valibot';
import valibot from 'vite-plugin-valibot-env';

const schema = v.object({
	VITE_API_ENDPOINT: v.pipe(v.string(), v.url()),
	VITE_LOCALE: v.literal('en_US'),
});

export default defineConfig({
	plugins: [
		valibot(schema),
	]
});
```

> [!TIP]
> You might want to use [`loadEnv`](https://v4.vitejs.dev/config/#using-environment-variables-in-config) in your configuration to load `.env` files.

### API

`valibot(schema, options?)`

### Options

#### `options.ignoreEnvPrefix`

Type: `boolean`  
Default: `false`  

Setting this to `true` will also validate unprefixed environment variables.

> [!TIP]
> Vite uses a [prefix](https://vitejs.dev/config/shared-options.html#envprefix) to prevent leaking all environment variables into your code. The same limitation applies to the validator. However, there might be use cases where you want validate unprefixed environment variables as well, e.g. `HOST` and `PORT` to configure the Vite server. 

#### `options.transformValues`

Type: `boolean`  
Default: `false`  

Setting this to `true` will try and transform string values to their respective types. Supports booleans, integers, floats, and `null`.

#### `options.language`

Type: `string`  
Default: `undefined`  

Language ID for localized error messages.

> [!NOTE]
> When using this option, you need to install `@valibot/i18n` and import it into your Vite config.

#### `options.onBeforeIssues`

Type: `function`  
Default: `undefined`  

A callback function executed after any issues have been printed.

#### `options.onAfterIssues`

Type: `function`  
Default: `undefined`  

A callback function executed after all issues have been printed.

> [!TIP]
> You could use this to point collaborators to the documentation of your project's environment variables.

#### `options.throwError`

Type: `boolean`  
Default: `false`  

> [!CAUTION]
> This option exists for testing purposes and is not recommended for use.

Throws an error rather than exiting gracefully when issues have been found in the schema.

## Related

- [esbuild-plugin-valibot-env](https://github.com/idleberg/esbuild-plugin-valibot-env)

## License

This work is licensed under [The MIT License](LICENSE).
