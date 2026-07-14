import { type HttpClient } from "../../http/types.js";
import {
  type DiscogsArtist,
  type DiscogsLabel,
  type DiscogsMaster,
  type DiscogsRelease,
  type DiscogsSearchParams,
  type DiscogsSearchResponse,
  type DiscogsVersionsParams,
  type DiscogsVersionsResponse,
} from "../../types/database.js";
import { buildQueryParams } from "../../utils/query.js";

export class DatabaseClient {
  constructor(private httpClient: HttpClient) {}

  async search(params: DiscogsSearchParams): Promise<DiscogsSearchResponse> {
    const response = await this.httpClient.get<DiscogsSearchResponse>("database/search", {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  async getRelease(releaseId: number): Promise<DiscogsRelease> {
    const response = await this.httpClient.get<DiscogsRelease>(`releases/${releaseId}`);
    return response.data;
  }

  async getMaster(masterId: number): Promise<DiscogsMaster> {
    const response = await this.httpClient.get<DiscogsMaster>(`masters/${masterId}`);
    return response.data;
  }

  async getMasterVersions(masterId: number, params?: DiscogsVersionsParams): Promise<DiscogsVersionsResponse> {
    const response = await this.httpClient.get<DiscogsVersionsResponse>(`masters/${masterId}/versions`, {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  async getArtist(artistId: number): Promise<DiscogsArtist> {
    const response = await this.httpClient.get<DiscogsArtist>(`artists/${artistId}`);
    return response.data;
  }

  async getArtistReleases(artistId: number, params?: DiscogsVersionsParams): Promise<DiscogsVersionsResponse> {
    const response = await this.httpClient.get<DiscogsVersionsResponse>(`artists/${artistId}/releases`, {
      params: buildQueryParams(params),
    });
    return response.data;
  }

  async getLabel(labelId: number): Promise<DiscogsLabel> {
    const response = await this.httpClient.get<DiscogsLabel>(`labels/${labelId}`);
    return response.data;
  }

  async getLabelReleases(labelId: number, params?: DiscogsVersionsParams): Promise<DiscogsVersionsResponse> {
    const response = await this.httpClient.get<DiscogsVersionsResponse>(`labels/${labelId}/releases`, {
      params: buildQueryParams(params),
    });
    return response.data;
  }
}