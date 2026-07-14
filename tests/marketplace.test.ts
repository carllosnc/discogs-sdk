import { describe, expect, mock, test } from "bun:test";
import { MarketplaceClient } from "../src/client/marketplace/index.js";
import { type HttpClient } from "../src/http/types.js";
import { marketplaceStatsFixture } from "./fixtures/discogs.js";

const get = mock(() => Promise.resolve({ data: {} }));

function createClient() {
  get.mockClear();
  return new MarketplaceClient({ get } as unknown as HttpClient);
}

describe("MarketplaceClient", () => {
  test("gets listing", async () => {
    const client = createClient();
    await client.getListing(123);
    expect(get).toHaveBeenCalledWith("marketplace/listings/123");
  });

  test("gets release stats", async () => {
    const client = createClient();
    await client.getReleaseStats(456);
    expect(get).toHaveBeenCalledWith("marketplace/stats/456");
  });

  test("returns fixture-backed marketplace stats", async () => {
    get.mockResolvedValueOnce({ data: marketplaceStatsFixture });
    const client = createClient();

    const response = await client.getReleaseStats(249504);

    expect(response.num_for_sale).toBe(122);
    expect(response.lowest_price?.currency).toBe("USD");
  });

  test("gets price suggestions", async () => {
    const client = createClient();
    await client.getPriceSuggestions(789);
    expect(get).toHaveBeenCalledWith("marketplace/price_suggestions/789");
  });
});
