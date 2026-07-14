# AGENTS.md

Guidance for Codex and other coding agents working in this repository.

## Project

`@carlosnc/discogs-sdk` is a lightweight, fully typed TypeScript SDK for the Discogs API v2.

Keep the SDK small: prefer existing clients, types, helpers, and tests before adding new structure. Add abstractions only when they remove real duplication across namespaces.

## Stack

- Runtime/package manager: Bun.
- Language: TypeScript, ESM modules.
- Source: `src/`.
- Tests: `tests/`, using `bun:test`.
- Build output: `dist/`.

## Commands

Run these from the repository root:

```bash
bun run typecheck
bun test
bun run build
bun run docs
```

Use `bun run typecheck` for documentation-only changes only when TypeScript files were touched nearby or when you need a quick sanity check. Use `bun test` for client/type behavior changes.

Live Discogs tests are optional and depend on `DISCOGS_TOKEN`; do not require a token for normal test coverage.

## Code Style

- Match the existing client namespace pattern in `src/client/*/index.ts`.
- Keep public SDK params camelCase and convert to Discogs snake_case through existing query helpers.
- Keep response types in `src/types/*` grouped by Discogs API area.
- Preserve typed errors and secret redaction behavior in the HTTP layer.
- Do not add dependencies unless the standard library and current code cannot cover the case cleanly.
- Avoid broad refactors while adding endpoint coverage.

## Git and GitHub Workflow

- Work on short-lived branches named by intent, e.g. `feat/collection-fields`, `fix/auth-errors`, `docs/readme-auth`.
- Keep `main` releasable. Do not commit directly to `main` unless the user explicitly asks for a local-only checkpoint.
- Before committing, run `git status` and inspect the diff. Never commit `.env`, tokens, generated secrets, `node_modules/`, or `dist/` unless a release process explicitly requires it.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`, `ci:`, or `build:`. Add a scope when useful, e.g. `feat(database): add release versions`.
- Prefer small commits that each pass `bun run typecheck` and the relevant tests.
- For SDK behavior changes, include or update tests in the same commit.
- For public API changes, update `README.md`, `BACKLOG.md`, or examples in the same branch.
- Open PRs against `main` with a concise summary, validation notes, and any API compatibility impact.
- Expect branch protection on `main`: PR required and CI required; owner PRs are auto-merged after checks pass.
- Do not force-push shared branches unless the user explicitly asks.
- When pushing, use the configured `origin` remote for `carllosnc/discogs-sdk`.
- Always delete merged branches locally and remotely; GitHub is configured to delete PR branches on merge.
- Publish releases by pushing semver tags like `v0.1.1`; the release workflow expects `NPM_TOKEN` in repository secrets.

## Discogs API Notes

Default API base URL:

- https://api.discogs.com/

Official documentation:

- Main docs: https://www.discogs.com/developers
- Docs home: https://www.discogs.com/developers/#page:home
- Authentication: https://www.discogs.com/developers/#page:authentication
- Database: https://www.discogs.com/developers/#page:database
- Marketplace: https://www.discogs.com/developers/#page:marketplace
- Inventory: https://www.discogs.com/developers/#page:inventory
- User: https://www.discogs.com/developers/#page:user
- User collection: https://www.discogs.com/developers/#page:user-collection
- User wantlist: https://www.discogs.com/developers/#page:user-wantlist

When adding or changing endpoint support, check the official docs and, when network access is available, spot-check one public API response with a `User-Agent` header. Keep any real response fixtures small and free of tokens or private account data.

## Backlog and Docs

- Use `BACKLOG.md` for planned SDK work and endpoint gaps.
- Keep `README.md` focused on project overview, installation, authentication, and practical usage examples.
- Add runnable examples under `examples/` when they clarify a real SDK workflow.
