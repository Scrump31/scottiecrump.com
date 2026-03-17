Development guide (concise)

This file documents a quick, reproducible developer workflow for ScottieCrump.com.

Prerequisites

- Node.js >= 20.9.0
- npm (or yarn)

Setup

```bash
cp .env.example .env.local
npm install
npm run prepare
```

Run locally

```bash
# Development server with hot reload
npm run dev

# Start content watch (used by some workflows)
npm start
```

Common scripts

- `npm run dev` — Next.js dev server
- `npm start` — next-remote-watch content watching
- `npm run build` — Build for production
- `npm run serve` — Serve the built app
- `npm run lint` — Run ESLint
- `npm test` — Run unit tests (Vitest)
- `npm run playwright` — Run Playwright E2E tests

Debugging tips

- Check `playwright-report/` and `allure-results/` for E2E artifacts.
- Use `npm run analyze` to inspect bundle size.
- When changing styles, run the dev server and test responsive breakpoints in the browser.

Architecture notes

- Next.js App Router (app/). Prefer server components unless client interactivity is required.
- Tailwind is used for styling — prefer utility classes and small, re-usable components.
- Tests: Vitest + React Testing Library conventions are used for component/unit tests.

Maintainer contact

- Open issues for larger changes and ping the owner for review and approvals.
