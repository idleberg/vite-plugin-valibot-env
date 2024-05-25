/* eslint-disable */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'unicorn'],
	extends: ['eslint:recommended', 'plugin:jsonc/recommended-with-json', 'plugin:@typescript-eslint/recommended'],
	globals: {
		Deno: 'readonly',
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'unicorn/prefer-node-protocol': 'error',
	},
	overrides: [
		{
			files: ['tsconfig.json'],
			rules: {
				'jsonc/no-comments': 'off'
			}
		},
	],
};
