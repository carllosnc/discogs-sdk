import { describe, expect, mock, test } from "bun:test";
import { DatabaseClient } from "../src/client/database/index.js";
import { type HttpClient } from "../src/http/types.js";
import { DiscogsClient } from "../src/index.js";

const get = mock(() =>
  Promise.resolve({
    data: {
      pagination: { page: 1, pages: 1, per_page: 50, items: 0 },
      results: [],
    },
  })
);

function createClient() {
  get.mockClear();
  return new DatabaseClient({ get } as unknown as HttpClient);
}

describe("DatabaseClient", () => {
  test("searches database with Discogs params", async () => {
    const client = createClient();
    const response = await client.search({
      query: "Daft Punk",
      type: "release",
      perPage: 25,
      releaseTitle: "Discovery",
    });

    expect(get).toHaveBeenCalledWith("database/search", {
      params: {
        query: "Daft Punk",
        type: "release",
        per_page: 25,
        release_title: "Discovery",
      },
    });
    expect(response.pagination.page).toBe(1);
  });

  test("gets release by id", async () => {
    const client = createClient();
    await client.getRelease(249504);
    expect(get).toHaveBeenCalledWith("releases/249504");
  });

  test("gets master versions with pagination", async () => {
    const client = createClient();
    await client.getMasterVersions(18533, { page: 2, perPage: 10, sortOrder: "desc" });
    expect(get).toHaveBeenCalledWith("masters/18533/versions", {
      params: { page: 2, per_page: 10, sort_order: "desc" },
    });
  });

  const token = process.env.DISCOGS_TOKEN;

  if (token) {
    test("searches live Discogs API", async () => {
      const client = new DiscogsClient({ token });
      const response = await client.database.search({ query: "Daft Punk Discovery", type: "release" });
      expect(response.pagination.page).toBeTypeOf("number");
      expect(Array.isArray(response.results)).toBe(true);
    });
  } else {
    test.skip("live database tests (requires DISCOGS_TOKEN in env)", () => {});
  }
});