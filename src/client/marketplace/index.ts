import { type HttpClient } from "../../http/types.js";
import {
  type DiscogsListing,
  type DiscogsMarketplaceStats,
  type DiscogsOrder,
  type DiscogsOrderMessagesResponse,
  type DiscogsOrdersParams,
  type DiscogsOrdersResponse,
  type DiscogsPriceSuggestions,
} from "../../types/marketplace.js";
import { buildQueryParams } from "../../utils/query.js";

export class MarketplaceClient {
  constructor(private httpClient: HttpClient) {}

  async getListing(listingId: number): Promise<DiscogsListing> {
    const response = await this.httpClient.get<DiscogsListing>(`marketplace/listings/${listingId}`);
    return response.data;
  }

  async getReleaseStats(releaseId: number): Promise<DiscogsMarketplaceStats> {
    const response = await this.httpClient.get<DiscogsMarketplaceStats>(`marketplace/stats/${releaseId}`);
    return response.data;
  }

  async getPriceSuggestions(releaseId: number): Promise<DiscogsPriceSuggestions> {
    const response = await this.httpClient.get<DiscogsPriceSuggestions>(`marketplace/price_suggestions/${releaseId}`);
    return response.data;
  }

  async getOrders(params?: DiscogsOrdersParams): Promise<DiscogsOrdersResponse> {
    const response = await this.httpClient.get<DiscogsOrdersResponse>("marketplace/orders", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  async getOrder(orderId: string | number): Promise<DiscogsOrder> {
    const response = await this.httpClient.get<DiscogsOrder>(`marketplace/orders/${orderId}`);
    return response.data;
  }

  async getOrderMessages(orderId: string | number): Promise<DiscogsOrderMessagesResponse> {
    const response = await this.httpClient.get<DiscogsOrderMessagesResponse>(`marketplace/orders/${orderId}/messages`);
    return response.data;
  }
}
