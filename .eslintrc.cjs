// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^react(.*)'],
          ['^@?\\w'],
          ['^'],
          ['^\\.'],
          ['\\.css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': 'warn',
    'react/jsx-uses-react': 'off',
  },
};
