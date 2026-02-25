Contributing to ScottieCrump.com

Thank you for your interest in contributing. This document gives a concise technical onboarding and rules for contributions.

1. Get the repo

```bash
git clone https://github.com/Scrump31/scottiecrump.com.git
cd scottiecrump
npm install
```

2. Branching

- Use a feature branch named `feat/<short-desc>` or `fix/<short-desc>`.
- Rebase or merge latest `main` before opening a PR.

3. Tests (Enforced)

- Unit tests are required on PRs. This repository uses Vitest for unit and component tests.
- Run unit tests locally and ensure they pass before opening a PR:

```bash
npm test
```

- E2E tests (Playwright) are recommended but not required on every PR.

4. Linting & formatting

- Run the linter and formatters locally before committing:

```bash
npm run lint
npm run format
```

- Husky hooks may run on commit; `npm run prepare` sets up hooks.

5. PR checklist

- [ ] Branch is up-to-date with `main`.
- [ ] Unit tests pass (`npm test`).
- [ ] New logic has unit tests covering typical and edge cases.
- [ ] If you add a new dependency, justify it in the PR description.
- [ ] CI passes and PR title and description are clear.
- [ ] Documentation is updated if necessary.

6. Commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages. See [.github/git-commit-instructions.md](.github/git-commit-instructions.md) for more detailed instructions and examples.

**Format**: `<type>(<scope>): <description>`

**Examples**:

- `feat(ui): add search bar`
- `fix(auth): correct password validation logic`
- `docs: update deployment instructions`

7. Major or risky changes

- For breaking changes, open an issue first and discuss the approach.
- Avoid changes to CI, workflow secrets, or deployment credentials without explicit owner approval.

8. Contact

- If unsure, open a draft PR and mention the maintainer in the description.
