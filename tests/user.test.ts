import { describe, expect, mock, test } from "bun:test";
import { UserClient } from "../src/client/user/index.js";
import { type HttpClient } from "../src/http/types.js";
import { collectionFieldsFixture } from "./fixtures/discogs.js";

const get = mock(async (): Promise<any> => Promise.resolve({ data: {} }));

function createClient() {
  get.mockClear();
  return new UserClient({ get } as unknown as HttpClient);
}

describe("UserClient", () => {
  test("gets identity", async () => {
    const client = createClient();
    await client.getIdentity();
    expect(get).toHaveBeenCalledWith("oauth/identity");
  });

  test("gets collection fields", async () => {
    const client = createClient();
    await client.getCollectionFields("carllosnc");
    expect(get).toHaveBeenCalledWith("users/carllosnc/collection/fields");
  });

  test("returns fixture-backed collection fields", async () => {
    get.mockResolvedValueOnce({ data: collectionFieldsFixture });
    const client = createClient();

    const response = await client.getCollectionFields("carllosnc");

    expect(response.fields[0]?.options).toContain("Mint (M)");
    expect(response.fields[1]?.lines).toBe(3);
  });

  test("gets collection items", async () => {
    const client = createClient();
    await client.getCollectionItems("carllosnc", 0, { perPage: 10, sortOrder: "desc" });
    expect(get).toHaveBeenCalledWith("users/carllosnc/collection/folders/0/releases", {
      params: { per_page: 10, sort_order: "desc" },
    });
  });
});
