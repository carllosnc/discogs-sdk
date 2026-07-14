import { describe, expect, mock, test } from "bun:test";
import { MarketplaceClient } from "../src/client/marketplace/index.js";
import { type HttpClient } from "../src/http/types.js";
import { marketplaceStatsFixture, orderFixture, orderMessagesFixture, ordersFixture } from "./fixtures/discogs.js";

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

  test("gets orders", async () => {
    const client = createClient();

    await client.getOrders({ status: "Payment Received", sort: "created", sortOrder: "desc", page: 2, perPage: 25 });

    expect(get).toHaveBeenCalledWith("marketplace/orders", {
      params: {
        status: "Payment Received",
        sort: "created",
        sort_order: "desc",
        page: 2,
        per_page: 25,
      },
    });
  });

  test("gets order by id", async () => {
    const client = createClient();
    await client.getOrder("1-1");
    expect(get).toHaveBeenCalledWith("marketplace/orders/1-1");
  });

  test("gets order messages", async () => {
    const client = createClient();
    await client.getOrderMessages("1-1");
    expect(get).toHaveBeenCalledWith("marketplace/orders/1-1/messages");
  });

  test("returns fixture-backed orders", async () => {
    get.mockResolvedValueOnce({ data: ordersFixture });
    const client = createClient();

    const response = await client.getOrders();

    expect(response.orders[0]?.status).toBe("Payment Received");
    expect(response.orders[0]?.items?.[0]?.release?.id).toBe(249504);
  });

  test("returns fixture-backed order", async () => {
    get.mockResolvedValueOnce({ data: orderFixture });
    const client = createClient();

    const response = await client.getOrder("1-1");

    expect(response.buyer?.username).toBe("buyer");
    expect(response.total?.currency).toBe("USD");
  });

  test("returns fixture-backed order messages", async () => {
    get.mockResolvedValueOnce({ data: orderMessagesFixture });
    const client = createClient();

    const response = await client.getOrderMessages("1-1");

    expect(response.messages[0]?.actor?.username).toBe("seller");
    expect(response.messages[0]?.order?.id).toBe("1-1");
  });
});
