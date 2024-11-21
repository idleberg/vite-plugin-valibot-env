// @ts-check
import eslint from '@eslint/js';
import jsonc from 'eslint-plugin-jsonc';
import perfectionist from 'eslint-plugin-perfectionist';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...jsonc.configs['flat/recommended-with-json'],
	{
		plugins: {
			unicorn: unicorn,
			perfectionist,
		},
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off',

			 'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],

			'unicorn/filename-case': 'error',
			'unicorn/new-for-builtins': 'error',
			'unicorn/prefer-node-protocol': 'error',
		},
	},
	{
		files: ['tsconfig.json'],
		rules: {
			'jsonc/no-comments': 'off'
		}
	},
);
