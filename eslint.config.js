import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';

export default [
  { ignores: ['dist', 'build', 'node_modules', 'public', 'playwright-report', 'test-results'] },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    ...jsxA11y.configs.recommended,
    languageOptions: {
      ...jsxA11y.configs.recommended.languageOptions,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { ...jsxA11y.configs.recommended.plugins, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: [
      'scripts/**/*.mjs',
      'tests/**/*.mjs',
      'e2e/**/*.mjs',
      'server.mjs',
      'api/**/*.js',
      '*.config.{js,mjs}',
      'eslint.config.js',
    ],
    languageOptions: { globals: globals.node },
  },
  {
    // Los tests E2E ejecutan funciones dentro del navegador (page.evaluate).
    files: ['e2e/**/*.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
];
