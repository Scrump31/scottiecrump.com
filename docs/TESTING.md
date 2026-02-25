Testing guide (concise)

This repository uses Vitest for unit/component tests and Playwright for E2E tests.

Unit tests (Vitest)

- Run unit tests:

```bash
npm test
```

- Run tests in watch mode during development:

```bash
npm run test:watch
```

- Run tests with coverage:

```bash
npm run test:coverage
```

- The project has a test setup (`vitest.setup.ts`) and shared test utils (`test-utils.tsx`). Follow existing patterns when adding tests.

Playwright (E2E)

- Run Playwright tests:

```bash
npm run playwright
```

- Interactive runs:

```bash
npm run playwright:interactive
npm run playwright:interactive:local
```

- Update browsers (if new Playwright version requires it):

```bash
npm run playwright:update-browsers
```

Reporting

- Allure results are written to `allure-results/`. Generate and serve the report with:

```bash
npm run allure-report
```

Best practices

- Unit tests are required for PRs. Aim for small, focused tests that exercise behavior and edge cases.
- Mock external network calls and heavy computations; keep unit tests fast.
- E2E tests are recommended for user flows but keep them limited and stable.

Troubleshooting

- If tests fail on CI but pass locally, ensure Node version matches (`.nvmrc` if present) and that any environment variables required for tests are set in CI.
- If Playwright tests are flaky, capture screenshots/videos and add retries or stabilization steps in the test.
