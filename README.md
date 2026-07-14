# Discogs SDK

[![CI](https://github.com/carllosnc/discogs-sdk/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/carllosnc/discogs-sdk/actions/workflows/ci.yml)

A lightweight, fully typed TypeScript client for the [Discogs API](https://www.discogs.com/developers).

The project wraps the Discogs API v2 base URL, `https://api.discogs.com/`, with small namespace clients for the parts most useful to apps that search music metadata, inspect marketplace data, and read authenticated user data.

## Status

This package is early-stage (`0.1.0`). It already covers the core read paths for:

- `database`: search, releases, masters, master versions, artists, artist releases, labels, and label releases.
- `marketplace`: listing details, release marketplace stats, price suggestions, and authenticated order reads.
- `inventory`: user inventory reads.
- `user`: identity, public profile, collection folders/items, lists, and wantlist.

The next planned work is tracked in [BACKLOG.md](./BACKLOG.md).

## Install

```bash
bun add @carlosnc/discogs-sdk
```

Node.js 18+ is supported because the default adapter uses global `fetch`.

## Usage

```ts
import { DiscogsClient } from "@carlosnc/discogs-sdk";

const discogs = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN!,
  userAgent: "my-app/1.0",
});

const results = await discogs.database.search({
  query: "Daft Punk Discovery",
  type: "release",
  perPage: 10,
});

console.log(results.results[0]?.title);
```

### Public database lookup

```ts
const release = await discogs.database.getRelease(249504);

console.log(release.title);
console.log(release.artists[0]?.name);
```

### Marketplace stats

```ts
const stats = await discogs.marketplace.getReleaseStats(249504);

console.log(stats.num_for_sale);
console.log(stats.lowest_price?.value, stats.lowest_price?.currency);
```

### Marketplace orders

```ts
const orders = await discogs.marketplace.getOrders({
  status: "Payment Received",
  sort: "created",
  sortOrder: "desc",
  perPage: 10,
});

const order = await discogs.marketplace.getOrder(orders.orders[0]!.id);
const messages = await discogs.marketplace.getOrderMessages(order.id);

console.log(order.status);
console.log(messages.messages.length);
```
### Collection fields

```ts
const fields = await discogs.user.getCollectionFields("carllosnc");

console.log(fields.fields.map((field) => field.name));
```

### User lists

```ts
const lists = await discogs.user.getLists("discogs", { perPage: 5 });
const list = await discogs.user.getList(lists.lists[0]!.id);

console.log(list.name);
console.log(list.items[0]?.display_title);
```

### Custom HTTP client

Use `baseURL` for tests, proxies, or mock servers while keeping the default fetch client.

```ts
const discogs = new DiscogsClient({
  baseURL: "https://proxy.example.com/discogs/",
});
```

You can also inject your own `HttpClient` for tracing, caching, or custom runtimes.

```ts
const discogs = new DiscogsClient({ httpClient });
```

### Rate limits

Low-level `HttpResponse` objects expose Discogs rate-limit headers as `response.rateLimit`.

```ts
const response = await discogs.http.get("database/search", {
  params: { q: "Daft Punk", type: "release" },
});

console.log(response.rateLimit); // { limit, remaining, used }
```

Typed Discogs errors also expose `error.rateLimit` when the API includes those headers.

## Authentication

Create a local `.env` from `.env.example` and set your personal Discogs token:

```env
DISCOGS_TOKEN=your_discogs_token_here
```

Personal access tokens are sent as `Authorization: Discogs token=...`:

```ts
import { DiscogsClient } from "@carlosnc/discogs-sdk";

const discogs = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN!,
  userAgent: "my-app/1.0",
});

const identity = await discogs.user.getIdentity();
console.log(identity.username);
```

For OAuth flows, pass a complete authorization header:

```ts
const discogs = new DiscogsClient({
  authHeader: "OAuth oauth_consumer_key=..., oauth_token=...",
  userAgent: "my-app/1.0",
});
```

Some public endpoints work without authentication, but authenticated requests are expected for identity, collection, wantlist, and inventory workflows.

## Framework Adapters

The package exports convenience adapters for framework-specific usage:

```ts
import createDiscogsNextClient from "@carlosnc/discogs-sdk/nextjs";
import createDiscogsSvelteKitClient from "@carlosnc/discogs-sdk/sveltekit";
```

## Development

```bash
bun install
bun run typecheck
bun test
bun run build
```

Live tests use `DISCOGS_TOKEN` when it is present in the environment and are skipped otherwise.

## API References

- [Discogs developer documentation](https://www.discogs.com/developers)
- [Discogs API root](https://api.discogs.com/)
