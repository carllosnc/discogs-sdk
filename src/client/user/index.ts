import { type HttpClient } from "../../http/types.js";
import {
  type DiscogsCollectionFieldsResponse,
  type DiscogsCollectionFoldersResponse,
  type DiscogsCollectionItemsParams,
  type DiscogsCollectionItemsResponse,
  type DiscogsIdentity,
  type DiscogsUserProfile,
  type DiscogsWantlistParams,
  type DiscogsWantlistResponse,
} from "../../types/user.js";
import { buildQueryParams } from "../../utils/query.js";

export class UserClient {
  constructor(private httpClient: HttpClient) {}

  async getIdentity(): Promise<DiscogsIdentity> {
    const response = await this.httpClient.get<DiscogsIdentity>("oauth/identity");
    return response.data;
  }

  async getProfile(username: string): Promise<DiscogsUserProfile> {
    const response = await this.httpClient.get<DiscogsUserProfile>(`users/${username}`);
    return response.data;
  }

  async getCollectionFolders(username: string): Promise<DiscogsCollectionFoldersResponse> {
    const response = await this.httpClient.get<DiscogsCollectionFoldersResponse>(`users/${username}/collection/folders`);
    return response.data;
  }

  async getCollectionFields(username: string): Promise<DiscogsCollectionFieldsResponse> {
    const response = await this.httpClient.get<DiscogsCollectionFieldsResponse>(`users/${username}/collection/fields`);
    return response.data;
  }

  async getCollectionItems(
    username: string,
    folderId: number | "all" = 0,
    params?: DiscogsCollectionItemsParams,
  ): Promise<DiscogsCollectionItemsResponse> {
    const response = await this.httpClient.get<DiscogsCollectionItemsResponse>(
      `users/${username}/collection/folders/${folderId}/releases`,
      { params: buildQueryParams(params) },
    );
    return response.data;
  }

  async getWantlist(username: string, params?: DiscogsWantlistParams): Promise<DiscogsWantlistResponse> {
    const response = await this.httpClient.get<DiscogsWantlistResponse>(`users/${username}/wants`, {
      params: buildQueryParams(params),
    });
    return response.data;
  }
}
