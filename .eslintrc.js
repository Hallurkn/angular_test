module.exports = {
	rules: {
		indent: [
			'error',
			'tab',
			{ SwitchCase: 1 }
		],
		quotes: [
			'error',
			'single',
			{ allowTemplateLiterals: true }
		],
		semi: [
			'error',
			'always'
		],
		'comma-dangle': [
			'off',
			'always-multiline'
		],
		'no-console': [
			'warn',
		],
		'no-unused-vars': [
			'warn',
		]
	},
	env: {
		node: true,
		es6: true
	},
	extends: 'eslint:recommended',
	parser: 'babel-eslint'
};
