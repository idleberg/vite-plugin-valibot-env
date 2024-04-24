/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
		"@typescript-eslint/no-explicit-any": "off"
	},
  ignorePatterns: [
    'test/**/*'
  ],
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
