# Backlog

This backlog is based on the current SDK shape and spot checks against the Discogs API v2 root, `database/search`, `releases/{id}`, and `marketplace/stats/{release_id}`.

## P0 - Stabilize the Public SDK

- [x] Add rate-limit metadata to responses or errors.
  - Endpoints: all API calls.
  - Why: Discogs returns rate-limit headers; SDK users need a typed way to react before they hit request failures.
  - Acceptance: expose response headers through a documented path and add tests for header propagation.

- [x] Document supported authentication modes with runnable examples.
  - Endpoints: `oauth/identity`, authenticated collection, wantlist, inventory, and marketplace endpoints.
  - Why: the client supports token and raw OAuth headers, but users need clear setup paths.
  - Acceptance: README examples cover personal token and OAuth header usage without exposing secrets.

- [x] Finish type coverage for release, master, artist, label, and search payloads.
  - Endpoints: `database/search`, `releases/{id}`, `masters/{id}`, `artists/{id}`, `labels/{id}`.
  - Why: several rich nested fields are currently typed as `unknown`.
  - Acceptance: replace common `unknown` fields with reusable types for companies, labels, formats, identifiers, videos, ratings, and community data.

- [x] Add integration test fixtures from real Discogs responses.
  - Endpoints: public database and marketplace read endpoints.
  - Why: live tests are useful but optional; fixtures catch type drift without a token.
  - Acceptance: fixtures cover at least one search result, one release, and one marketplace stats response.

## P1 - Expand Read API Coverage

- [ ] Add collection field endpoints.
  - Endpoints: `users/{username}/collection/fields`.
  - Why: collection item metadata depends on custom fields.
  - Acceptance: expose `user.getCollectionFields(username)` with typed field definitions and tests.

- [ ] Add collection value endpoints.
  - Endpoints: `users/{username}/collection/folders/{folder_id}/releases/{release_id}/instances/{instance_id}/fields/{field_id}`.
  - Why: apps that display a collection need access to user-specific field values.
  - Acceptance: expose read/update helpers if allowed by auth, with fixture-backed tests.

- [ ] Add user list endpoints.
  - Endpoints: `users/{username}/lists`, `lists/{list_id}`.
  - Why: Discogs lists are a common discovery and curation feature missing from the SDK.
  - Acceptance: expose list summaries and list item reads with pagination.

- [ ] Add marketplace search/browse helpers.
  - Endpoints: marketplace listing search endpoints where available.
  - Why: the SDK can inspect a listing by id, but cannot yet discover listings.
  - Acceptance: expose typed params for release, condition, currency, seller, sorting, and pagination.

- [ ] Add order endpoints for sellers/buyers.
  - Endpoints: marketplace order endpoints.
  - Why: authenticated commerce workflows require order reads and updates.
  - Acceptance: typed order reads first; mutating operations can be added behind explicit method names.

## P2 - Improve Runtime Ergonomics

- [ ] Add an optional `baseURL` config.
  - Why: tests, proxies, and future mock servers should not need a custom `HttpClient` for a different base URL.
  - Acceptance: default remains `https://api.discogs.com/`; tests prove override behavior.

- [ ] Add pagination helpers.
  - Endpoints: all paginated endpoints.
  - Why: Discogs responses include `pagination.urls`; consumers repeatedly need `next page` or `iterate all`.
  - Acceptance: provide a tiny helper or async iterator without changing existing methods.

- [ ] Normalize query parameter naming in public docs.
  - Endpoints: all methods with `sortOrder`, `perPage`, and similar camelCase params.
  - Why: SDK params are camelCase while Discogs params are snake_case.
  - Acceptance: README documents the mapping and tests cover every mapped key.

- [ ] Improve error messages for authentication failures.
  - Endpoints: authenticated endpoints.
  - Why: 401/403 errors should tell users whether token/auth header setup is likely missing.
  - Acceptance: errors keep status/body/url and add a clear message for auth failures.

- [ ] Add abort/timeout examples.
  - Endpoints: all API calls through `FetchAdapter`.
  - Why: `signal` is supported at the HTTP layer but not documented at SDK level.
  - Acceptance: README or examples show `AbortController` usage.

## P3 - Packaging and Documentation

- [ ] Publish generated API docs.
  - Tooling: `typedoc`.
  - Why: package consumers need a browsable reference for namespaces and response types.
  - Acceptance: `bun run docs` output is publishable and linked from README.

- [ ] Add more examples.
  - Examples: search by barcode, fetch release marketplace stats, inspect collection folders, read wantlist.
  - Why: examples are the fastest way to validate SDK ergonomics.
  - Acceptance: each example is small, typed, and runnable with `bun`.

- [ ] Add contribution notes.
  - Why: the project has tests and build scripts but no contributor workflow.
  - Acceptance: document setup, test commands, live-test token behavior, and style expectations.

- [ ] Decide whether `dist/` should stay committed.
  - Why: the repository currently includes build output; this affects diffs and release flow.
  - Acceptance: document the decision or update `.gitignore` and release process.

## Done

- [x] Base `DiscogsClient` with token, raw auth header, user agent, retry, and custom `HttpClient` support.
- [x] Fetch-based HTTP adapter with JSON parsing and typed Discogs errors.
- [x] Database client for search, releases, masters, artists, and labels.
- [x] Marketplace client for listing, stats, and price suggestions.
- [x] User client for identity, profile, collection folders/items, and wantlist.
- [x] Inventory client for user inventory reads.
- [x] Bun test coverage for current clients.
