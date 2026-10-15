import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';

/**
 * Module boundaries (see docs/architecture.md):
 *   app -> features -> shared
 * Shared code never imports features or routes, and features import each
 * other only through their public index file.
 */
const featureInternals = {
  group: ['@/features/*/*'],
  message: 'Import a feature through its public entry point: @/features/<name>.',
};

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import/no-cycle': 'error',
    },
  },
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: { 'no-restricted-imports': ['error', { patterns: [featureInternals] }] },
  },
  {
    files: ['features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            featureInternals,
            { group: ['@/app/*'], message: 'Features must not import from app/.' },
          ],
        },
      ],
    },
  },
  {
    files: ['shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*', '@/app/*'],
              message: 'Shared code must not depend on features or routes.',
            },
          ],
        },
      ],
    },
  },
  {
    // Playwright fixtures call a parameter named "use", which is not React's use().
    files: ['tests/e2e/**/*.ts'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'storybook-static/**',
    'playwright-report/**',
    'test-results/**',
    '.lighthouseci/**',
    'next-env.d.ts',
  ]),
]);
