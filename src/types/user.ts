import { type DiscogsPaginatedResponse, type DiscogsPaginationParams, type DiscogsSortOrder } from "./common.js";
import { type DiscogsRelease, type DiscogsSearchResult } from "./database.js";

export interface DiscogsIdentity {
  id: number;
  username: string;
  resource_url: string;
  consumer_name?: string;
}

export interface DiscogsUserProfile {
  id: number;
  username: string;
  name?: string;
  email?: string;
  profile?: string;
  home_page?: string;
  location?: string;
  registered?: string;
  rank?: number;
  num_pending?: number;
  num_for_sale?: number;
  num_lists?: number;
  releases_contributed?: number;
  releases_rated?: number;
  rating_avg?: number;
  inventory_url?: string;
  collection_folders_url?: string;
  collection_fields_url?: string;
  wantlist_url?: string;
  resource_url: string;
  uri?: string;
  avatar_url?: string;
  banner_url?: string;
}

export interface DiscogsCollectionFolder {
  id: number;
  name: string;
  count: number;
  resource_url: string;
}

export interface DiscogsCollectionFoldersResponse {
  folders: DiscogsCollectionFolder[];
}

export type DiscogsCollectionFieldType = "dropdown" | "textarea" | "text" | "checkbox" | string;

export interface DiscogsCollectionField {
  id: number;
  name: string;
  type: DiscogsCollectionFieldType;
  position: number;
  public: boolean;
  options?: string[];
  lines?: number;
}

export interface DiscogsCollectionFieldsResponse {
  fields: DiscogsCollectionField[];
}

export type DiscogsCollectionFieldValue = string | number | boolean | null;

export interface DiscogsCollectionFieldValueResponse {
  value: DiscogsCollectionFieldValue;
}

export interface DiscogsUpdateCollectionFieldValuePayload {
  value: DiscogsCollectionFieldValue;
}

export interface DiscogsCollectionItem {
  id: number;
  instance_id: number;
  folder_id: number;
  rating?: number;
  basic_information: DiscogsSearchResult;
  date_added?: string;
}

export interface DiscogsCollectionItemsParams extends DiscogsPaginationParams {
  sort?: "label" | "artist" | "title" | "catno" | "format" | "rating" | "added" | "year";
  sortOrder?: DiscogsSortOrder;
}

export type DiscogsCollectionItemsResponse = DiscogsPaginatedResponse<DiscogsCollectionItem>;

export interface DiscogsWantlistItem {
  id: number;
  rating?: number;
  notes?: string;
  date_added?: string;
  basic_information: DiscogsRelease;
  resource_url: string;
}

export interface DiscogsWantlistParams extends DiscogsPaginationParams {
  sort?: "added" | "artist" | "label" | "title" | "year";
  sortOrder?: DiscogsSortOrder;
}

export type DiscogsWantlistResponse = DiscogsPaginatedResponse<DiscogsWantlistItem>;
