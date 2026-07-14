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
});