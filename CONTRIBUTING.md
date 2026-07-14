# Contributing

## Branches

Create short-lived branches from `main`:

- `feat/<short-name>` for new SDK capabilities.
- `fix/<short-name>` for bug fixes.
- `docs/<short-name>` for documentation-only changes.
- `test/<short-name>` for test-only changes.
- `ci/<short-name>` for workflow changes.

Keep branches focused. If a change needs unrelated refactors, split it.

## Commits

Use Conventional Commits:

- `feat(database): add collection fields`
- `fix(http): preserve rate limit metadata on errors`
- `docs: update authentication examples`
- `test: add marketplace fixtures`
- `ci: update release workflow`

Do not commit `.env`, tokens, `node_modules/`, or `dist/`.

## Pull requests

Open PRs against `main`. Every PR should include:

- A concise summary.
- Validation commands run locally.
- Public API impact, if any.
- Documentation updates when behavior or public types change.

Expected validation for code changes:

```bash
bun run typecheck
bun test
bun run build
```

Live Discogs tests are optional and only run when `DISCOGS_TOKEN` is present.

## Review and merge

`main` is protected. Changes should merge through PRs after CI passes and required approval is present.

Prefer squash merge for small PRs and regular merge only when preserving multiple meaningful commits helps review or release notes.

## Releases

Releases are tag-driven. To publish:

1. Update `package.json` and `CHANGELOG.md`.
2. Merge the release PR into `main`.
3. Create and push a semver tag, e.g. `v0.1.1`.

```bash
git tag v0.1.1
git push origin v0.1.1
```

The release workflow publishes to npm when `NPM_TOKEN` is configured in GitHub Actions secrets.
