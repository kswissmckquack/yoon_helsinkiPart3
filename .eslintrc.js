module.exports = {
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'env': {
    'node': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 11,
  },
  'rules': {
    'indent':[
      'error',
      2
    ],
    'eqeqeq':'error',
    'no-trailing-spaces':'error',
    'object-curly-spacing':[
      'error','always'
    ],
    'arrow-spacing': [
      'error', { 'before':true, 'after': true }
    ],
    'no-console':0,
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes':[
      'error',
      'single'
    ],
    'semi':[
      'error',
      'never'
    ]
  },
}
