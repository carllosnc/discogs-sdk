import { type HttpClient } from "../../http/types.js";
import {
  type DiscogsListing,
  type DiscogsMarketplaceStats,
  type DiscogsPriceSuggestions,
} from "../../types/marketplace.js";

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
}