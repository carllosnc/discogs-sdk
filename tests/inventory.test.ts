import { describe, expect, mock, test } from "bun:test";
import { InventoryClient } from "../src/client/inventory/index.js";
import { type HttpClient } from "../src/http/types.js";

const get = mock(() => Promise.resolve({ data: {} }));

describe("InventoryClient", () => {
  test("gets user inventory", async () => {
    const client = new InventoryClient({ get } as unknown as HttpClient);
    await client.getUserInventory("seller", { status: "For Sale", sortOrder: "asc" });
    expect(get).toHaveBeenCalledWith("users/seller/inventory", {
      params: { status: "For Sale", sort_order: "asc" },
    });
  });
});