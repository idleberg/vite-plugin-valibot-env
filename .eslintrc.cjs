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
		'@typescript-eslint/ban-ts-comment': 0
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
