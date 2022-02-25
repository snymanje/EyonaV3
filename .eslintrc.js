module.exports = {
	'env': {
		'browser': true,
		'react-native/react-native': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parser': '@babel/eslint-parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': ['react', 'react-native'],
	'rules': {
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
		'react-native/no-inline-styles': 2,
		'react-native/no-color-literals': 2,
	/* 	'react-native/no-raw-text': false, */
		'react-native/sort-styles': [
			'error',
			'asc',
			{
				ignoreClassNames: false,
				ignoreStyleProperties: false,
			},
		],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	},
};
