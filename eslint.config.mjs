import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import nextTypescript from 'eslint-config-next/typescript';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...nextTypescript,
  ...nextCoreWebVitals,
  ...compat.config({
    extends: [
      'plugin:tailwindcss/recommended',
      'plugin:prettier/recommended',
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'plugin:react-hooks/recommended',
    ],

    plugins: ['import', 'tailwindcss', 'react-hooks', 'prettier'],

    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          parser: 'typescript',
          avoidEscape: true,
          trailingComma: 'es5',
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@tanstack/query/exhaustive-deps': 'warn',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'import/order': [
        1,
        {
          'newlines-between': 'always',
          groups: [
            ['builtin'],
            'sibling',
            'parent',
            'external',
            'internal',
            'index',
          ],
        },
      ],
    },
  }),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];
