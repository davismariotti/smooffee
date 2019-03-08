module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': ['airbnb', 'prettier', 'prettier/react'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'window': true,
    'document': true,
    'localStorage': true,
    'FormData': true,
    'FileReader': true,
    'Blob': true,
    'navigator': true
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'prettier'
  ],
  'rules': {
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 1,
    'react/prefer-stateless-function': 0,
    'react/no-unused-state': 1,
    'quotes': [2, 'single', 'avoid-escape'],
    'no-unused-vars': 1,
    'no-console': 0,
    'class-methods-use-this': 1,
    'import/order': 1,
    'import/prefer-default-export': 0
  }
};