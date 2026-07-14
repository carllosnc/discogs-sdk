import { describe, expect, mock, test } from "bun:test";
import { UserClient } from "../src/client/user/index.js";
import { type HttpClient } from "../src/http/types.js";
import { collectionFieldsFixture, collectionFieldValueFixture } from "./fixtures/discogs.js";

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
});
