/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
		'unicorn',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
	globals: {
		Deno: 'readonly'
	},
  rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'unicorn/prefer-node-protocol': 'error',
	},
  overrides: [
    {
      files: [
				'tsconfig.json'
			],
      rules: {
        'json/*': [
					'error',
					'allowComments'
				]
      }
    }
  ]
};
