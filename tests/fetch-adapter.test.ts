import { describe, expect, test } from "bun:test";
import { DiscogsForbiddenError, DiscogsNotFoundError, DiscogsUnauthorizedError } from "../src/errors.js";
import { FetchAdapter } from "../src/http/fetch-adapter.js";

function withMockedFetch(mockFetch: typeof fetch, testFn: () => Promise<void>) {
  return async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mockFetch;

    try {
      await testFn();
    } finally {
      globalThis.fetch = originalFetch;
    }
  };
}

describe("FetchAdapter", () => {
  test(
    "returns Discogs rate limit metadata",
    withMockedFetch(
      ((() =>
        Promise.resolve(
          new Response(JSON.stringify({ ok: true }), {
            status: 200,
            statusText: "OK",
            headers: {
              "content-type": "application/json",
              "x-discogs-ratelimit": "60",
              "x-discogs-ratelimit-remaining": "59",
              "x-discogs-ratelimit-used": "1",
            },
          }),
        )) as unknown) as typeof fetch,
      async () => {
        const client = new FetchAdapter({ baseURL: "https://api.discogs.com/" });

        const response = await client.get("ok");

        expect(response.rateLimit).toEqual({ limit: 60, remaining: 59, used: 1 });
      },
    ),
  );

  test(
    "throws typed Discogs errors with rate limit metadata",
    withMockedFetch(
      ((() =>
        Promise.resolve(
          new Response(JSON.stringify({ message: "not found" }), {
            status: 404,
            statusText: "Not Found",
            headers: {
              "content-type": "application/json",
              "x-discogs-ratelimit": "60",
              "x-discogs-ratelimit-remaining": "58",
              "x-discogs-ratelimit-used": "2",
            },
          }),
        )) as unknown) as typeof fetch,
      async () => {
        const client = new FetchAdapter({ baseURL: "https://api.discogs.com/" });

        try {
          await client.get("missing");
          throw new Error("Expected request to fail");
        } catch (error) {
          expect(error).toBeInstanceOf(DiscogsNotFoundError);
          expect((error as DiscogsNotFoundError).discogsMessage).toBe("not found");
          expect((error as DiscogsNotFoundError).rateLimit).toEqual({ limit: 60, remaining: 58, used: 2 });
        }
      },
    ),
  );
  test(
    "adds setup guidance to authentication failures",
    withMockedFetch(
      ((() =>
        Promise.resolve(
          new Response(JSON.stringify({ message: "You must authenticate to access this resource." }), {
            status: 401,
            statusText: "Unauthorized",
            headers: { "content-type": "application/json" },
          }),
        )) as unknown) as typeof fetch,
      async () => {
        const client = new FetchAdapter({ baseURL: "https://api.discogs.com/" });

        try {
          await client.get("oauth/identity");
          throw new Error("Expected request to fail");
        } catch (error) {
          expect(error).toBeInstanceOf(DiscogsUnauthorizedError);
          expect((error as Error).message).toContain("configure a valid Discogs personal access token");
          expect((error as DiscogsUnauthorizedError).status).toBe(401);
          expect((error as DiscogsUnauthorizedError).discogsMessage).toBe("You must authenticate to access this resource.");
        }
      },
    ),
  );

  test(
    "adds permission guidance to forbidden failures",
    withMockedFetch(
      ((() =>
        Promise.resolve(
          new Response(JSON.stringify({ message: "You don't have permission to access this resource." }), {
            status: 403,
            statusText: "Forbidden",
            headers: { "content-type": "application/json" },
          }),
        )) as unknown) as typeof fetch,
      async () => {
        const client = new FetchAdapter({ baseURL: "https://api.discogs.com/" });

        try {
          await client.get("users/example/wants");
          throw new Error("Expected request to fail");
        } catch (error) {
          expect(error).toBeInstanceOf(DiscogsForbiddenError);
          expect((error as Error).message).toContain("check that the token has access");
          expect((error as DiscogsForbiddenError).status).toBe(403);
          expect((error as DiscogsForbiddenError).discogsMessage).toBe("You don't have permission to access this resource.");
        }
      },
    ),
  );
});
