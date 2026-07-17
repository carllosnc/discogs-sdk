# Contributing

## Branches

Create short-lived branches from `main`:

- `feat/<short-name>` for new SDK capabilities.
- `fix/<short-name>` for bug fixes.
- `docs/<short-name>` for documentation-only changes.
- `test/<short-name>` for test-only changes.
- `ci/<short-name>` for workflow changes.

Keep branches focused. If a change needs unrelated refactors, split it. Delete merged branches; the repository is configured to delete PR branches after merge.

## Commits

Use Conventional Commits:

- `feat(database): add collection fields`
- `fix(http): preserve rate limit metadata on errors`
- `docs: update authentication examples`
- `test: add marketplace fixtures`
- `ci: update release workflow`

Do not commit `.env`, tokens, `node_modules/`, or `dist/`. Build output in `dist/` is generated locally for validation and package publishing, but the repository keeps it ignored to avoid generated diffs.

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
bun run docs
```

Live Discogs tests are optional and only run when `DISCOGS_TOKEN` is present.

## Review and merge

`main` is protected. Changes merge through PRs after required CI passes. PRs opened by `carllosnc` are automatically set to squash auto-merge; PRs from other authors require manual merge by a maintainer.

Prefer squash merge for small PRs and regular merge only when preserving multiple meaningful commits helps review or release notes.

## Releases

Releases are published automatically when code lands on `main`. The release workflow runs for changes to source, tests, examples, scripts, package metadata, TypeScript config, Bun lockfile, or the release workflow itself.

On each eligible `main` push, GitHub Actions:

1. Installs dependencies with Bun.
2. Runs typecheck, tests, and build.
3. Runs `npm pack --dry-run` to verify the package contents.
4. Reads the latest published npm version for `@carlosnc/discogs-sdk`.
5. Publishes the next patch version to npm through Trusted Publishing/OIDC.
6. Creates and pushes a matching semver tag, e.g. `v0.1.1`.

The repository `package.json` version is treated as the initial fallback version. After the first publish, npm is the source of truth for calculating the next patch version.

Before the workflow can publish, configure the package trusted publisher on npmjs.com:

- Publisher: GitHub Actions.
- Organization or user: `carllosnc`.
- Repository: `discogs-sdk`.
- Workflow filename: `release.yml`.
- Allowed actions: `npm publish`.

Trusted Publishing uses short-lived OIDC credentials instead of a long-lived npm access token. After the first successful Trusted Publishing release, remove or restrict any old npm automation token that is no longer needed.

Manual publishing should only be used to recover from a failed release.
