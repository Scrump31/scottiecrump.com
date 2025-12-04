// ESLint v9 flat config (CommonJS to avoid ESM warnings without type:module)
const next = require('eslint-config-next/core-web-vitals')
const globals = require('globals')
const playwright = require('eslint-plugin-playwright')

// Try to reuse Playwright's recommended flat config if available
const playwrightRecommended = (playwright.configs && playwright.configs.recommended) || null

module.exports = [
  // Top-level ignores (replacement for legacy .eslintignore)
  {
    ignores: [
      'node_modules',
      '.next',
      'out',
      'dist',
      'coverage',
      'allure-results',
      'playwright-report',
      'test-results',
    ],
  },

  // Next.js base rules (Core Web Vitals)
  ...next,

  // Project-wide JS/TS settings and a small rule tweak kept from the old config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Common Vitest globals to avoid undefined warnings in tests
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      'react/no-unescaped-entities': 'off',
      // New React Hooks rules introduced with eslint-config-next/React 19
      // are flagging existing patterns in this codebase. Keep them off
      // to match previous behavior and avoid blocking commits.
      'react-hooks/static-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },

  // E2E tests (Playwright)
  // If the plugin exposes a flat recommended config, apply it to e2e specs.
  ...(playwrightRecommended
    ? [
        {
          ...playwrightRecommended,
          files: ['e2e/**/*.spec.{js,ts,jsx,tsx}'],
        },
      ]
    : [
        {
          files: ['e2e/**/*.spec.{js,ts,jsx,tsx}'],
          plugins: { playwright },
        },
      ]),
]
