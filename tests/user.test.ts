import { describe, expect, mock, test } from "bun:test";
import { UserClient } from "../src/client/user/index.js";
import { type HttpClient } from "../src/http/types.js";
import {
  collectionFieldsFixture,
  collectionFieldValueFixture,
  userListFixture,
  userListsFixture,
} from "./fixtures/discogs.js";

const get = mock(async (): Promise<any> => Promise.resolve({ data: {} }));
const post = mock(async (): Promise<any> => Promise.resolve({ data: {} }));

function createClient() {
  get.mockClear();
  post.mockClear();
  return new UserClient({ get, post } as unknown as HttpClient);
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

  test("gets collection field value", async () => {
    const client = createClient();
    await client.getCollectionFieldValue("carllosnc", 0, 249504, 123, 1);
    expect(get).toHaveBeenCalledWith(
      "users/carllosnc/collection/folders/0/releases/249504/instances/123/fields/1",
    );
  });

  test("returns fixture-backed collection field value", async () => {
    get.mockResolvedValueOnce({ data: collectionFieldValueFixture });
    const client = createClient();

    const response = await client.getCollectionFieldValue("carllosnc", 0, 249504, 123, 1);

    expect(response.value).toBe("Near Mint (NM or M-)");
  });

  test("updates collection field value", async () => {
    const client = createClient();
    await client.updateCollectionFieldValue("carllosnc", 0, 249504, 123, 1, "Very Good Plus (VG+)");
    expect(post).toHaveBeenCalledWith(
      "users/carllosnc/collection/folders/0/releases/249504/instances/123/fields/1",
      { value: "Very Good Plus (VG+)" },
    );
  });

  test("gets collection items", async () => {
    const client = createClient();
    await client.getCollectionItems("carllosnc", 0, { perPage: 10, sortOrder: "desc" });
    expect(get).toHaveBeenCalledWith("users/carllosnc/collection/folders/0/releases", {
      params: { per_page: 10, sort_order: "desc" },
    });
  });

  test("gets user lists with pagination", async () => {
    const client = createClient();
    await client.getLists("discogs", { page: 2, perPage: 10 });
    expect(get).toHaveBeenCalledWith("users/discogs/lists", {
      params: { page: 2, per_page: 10 },
    });
  });

  test("returns fixture-backed user lists", async () => {
    get.mockResolvedValueOnce({ data: userListsFixture });
    const client = createClient();

    const response = await client.getLists("discogs", { perPage: 1 });

    expect(response.pagination.items).toBe(185);
    expect(response.lists[0]?.name).toContain("Most expensive items");
  });

  test("gets list by id", async () => {
    const client = createClient();
    await client.getList(1338741);
    expect(get).toHaveBeenCalledWith("lists/1338741");
  });

  test("returns fixture-backed list items", async () => {
    get.mockResolvedValueOnce({ data: userListFixture });
    const client = createClient();

    const response = await client.getList(1338741);

    expect(response.items[0]?.display_title).toBe("Gila (2) - Gila");
    expect(response.items[0]?.stats?.community?.in_wantlist).toBe(1352);
  });
  test("gets user wantlist with pagination", async () => {
    get.mockResolvedValueOnce({
      data: {
        pagination: { page: 1, pages: 1, per_page: 5, items: 0 },
        wants: [],
      },
    });
    const client = createClient();
    const response = await client.getWantlist("discogs", { perPage: 5 });

    expect(get).toHaveBeenCalledWith("users/discogs/wants", {
      params: { per_page: 5 },
    });
    expect(response.wants).toEqual([]);
  });
});
