# Git Commit Instructions

To ensure that git commits in this repository consistently follow the [Conventional Commits](https://www.conventionalcommits.org/) specification, please follow these guidelines.

## Format

`<type>(<scope>): <description>`

## Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

## Rules

- Use the imperative, present tense: "change" not "changed" nor "changes".
- Don't capitalize the first letter.
- No dot (.) at the end.

## Examples

- `feat(auth): add login functionality`
- `fix(ui): correct color of the submit button`
- `docs(readme): update installation instructions`
- `refactor(utils): clean up old helper functions`
- `test(components): add tests for the Tag component`
