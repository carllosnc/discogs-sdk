import { describe, expect, mock, test } from "bun:test";
import { DiscogsClient } from "../src/client.js";

describe("DiscogsClient", () => {
  test("uses injected http client", async () => {
    const get = mock(() => Promise.resolve({ data: { id: 1 } }));
    const client = new DiscogsClient({ httpClient: { get } as any });

    await client.database.getRelease(1);

    expect(get).toHaveBeenCalledWith("releases/1");
  });

  test("creates namespaces", () => {
    const client = new DiscogsClient({ httpClient: { get: mock() } as any });

    expect(client.database).toBeDefined();
    expect(client.inventory).toBeDefined();
    expect(client.marketplace).toBeDefined();
    expect(client.user).toBeDefined();
  });

  test("uses configured base URL for default fetch client", async () => {
    const originalFetch = globalThis.fetch;
    const fetchCalls: string[] = [];
    globalThis.fetch = ((input: RequestInfo | URL) => {
      fetchCalls.push(String(input));
      return Promise.resolve(
        new Response(JSON.stringify({ id: 1 }), {
          status: 200,
          statusText: "OK",
          headers: { "content-type": "application/json" },
        }),
      );
    }) as typeof fetch;

    try {
      const client = new DiscogsClient({ baseURL: "https://example.test/discogs/" });

      await client.database.getRelease(1);

      expect(fetchCalls[0]).toBe("https://example.test/discogs/releases/1");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
