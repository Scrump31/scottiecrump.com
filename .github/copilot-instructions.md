# GitHub Copilot / Assistant Instructions for this repository

Purpose

- Help contributors and automation agents make safe, high-quality edits to the ScottieCrump.com site.
- Provide repository-specific guidance, preferred styles, and boundaries for automated suggestions.

Quick rules (concise)

- Keep changes minimal and focused: prefer small PRs that do one thing.
- Preserve existing patterns (Next.js App Router, Tailwind, Vitest).
- Unit tests are required on PRs (see `CONTRIBUTING.md`).
- Do not add or modify secrets, CI tokens, or credentials in code or workflow files.

Do / Don't

- Do: add or update unit tests (Vitest) when changing logic.
- Do: run `npm run lint` and `npm test` locally before proposing changes.
- Do: follow existing TypeScript and Tailwind conventions; keep components small and accessible.
- Don't: change deployment credentials, secrets, or workflow tokens.
- Don't: remove or rewrite entire directories without explicit approval from the repo owner.

Sensitive files / boundaries

- Do not modify: any files containing secrets or tokens (there are none committed intentionally).
- Avoid editing CI secret references in `.github/workflows/*` or any place that references `secrets.*`.
- Don't modify `package.json` scripts that affect CI unless necessary and describe why in the PR.

Where automated agents can help

- Generate small component or page implementations that follow the existing patterns.
- Draft unit tests for new logic (Vitest).
- Propose accessibility improvements and small Tailwind refactors.

Where to be cautious

- Changes that alter the public API of components used across the site.
- Infrastructure/CI/workflow changes. Ask maintainers or open an issue first.

Example assistant prompts

- "Add a unit test for src/components/XYZ that verifies it renders the title and calls the onClick handler when clicked. Use Vitest and React Testing Library conventions in this repo."
- "Create a small responsive component under `components/` that shows a user avatar and fallback initials. Use existing styling conventions and TypeScript. Include a unit test."
- "Refactor the `app/layout.tsx` theme toggle to use the existing `useTheme` hook and keep behavior identical; include updated tests for the toggle behavior."

Example prompts to avoid

- "Replace the CI configuration with my preferred CI provider."
- "Add my API key to the project."

Formatting and style hints

- Use concise, self-contained changes.
- Add or update tests for any logic changes.
- Keep TypeScript types explicit where the repo already uses them.

Contact / escalation

- When in doubt, open an issue or a draft PR and ping the repository owner for review.
