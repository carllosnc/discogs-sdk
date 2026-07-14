import { type HttpClient } from "../../http/types.js";
import {
  type DiscogsInventoryParams,
  type DiscogsInventoryResponse,
} from "../../types/inventory.js";
import { buildQueryParams } from "../../utils/query.js";

export class InventoryClient {
  constructor(private httpClient: HttpClient) {}

  async getUserInventory(username: string, params?: DiscogsInventoryParams): Promise<DiscogsInventoryResponse> {
    const response = await this.httpClient.get<DiscogsInventoryResponse>(`users/${username}/inventory`, {
      params: buildQueryParams(params),
    });
    return response.data;
  }
}