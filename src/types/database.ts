import { type DiscogsPaginatedResponse, type DiscogsPaginationParams } from "./common.js";

export type DiscogsSearchType = "release" | "master" | "artist" | "label";

export interface DiscogsSearchParams extends DiscogsPaginationParams {
  query?: string;
  type?: DiscogsSearchType;
  title?: string;
  releaseTitle?: string;
  credit?: string;
  artist?: string;
  anv?: string;
  label?: string;
  genre?: string;
  style?: string;
  country?: string;
  year?: string | number;
  format?: string;
  catno?: string;
  barcode?: string;
  track?: string;
  submitter?: string;
  contributor?: string;
}

export interface DiscogsSearchResult {
  id: number;
  type: DiscogsSearchType;
  title: string;
  uri?: string;
  resource_url: string;
  thumb?: string;
  cover_image?: string;
  master_id?: number;
  master_url?: string;
  country?: string;
  year?: string;
  format?: string[];
  label?: string[];
  genre?: string[];
  style?: string[];
  catno?: string;
  barcode?: string[];
  community?: Pick<DiscogsCommunity, "have" | "want">;
  format_quantity?: number;
  formats?: DiscogsFormat[];
}

export type DiscogsSearchResponse = DiscogsPaginatedResponse<DiscogsSearchResult>;

export interface DiscogsImage {
  type: "primary" | "secondary" | string;
  uri: string;
  resource_url: string;
  uri150?: string;
  width?: number;
  height?: number;
}

export interface DiscogsArtistSummary {
  id?: number;
  name: string;
  anv?: string;
  join?: string;
  role?: string;
  tracks?: string;
  resource_url?: string;
  thumbnail_url?: string;
}

export interface DiscogsReleaseEntity {
  id?: number;
  name: string;
  catno?: string;
  entity_type?: string;
  entity_type_name?: string;
  resource_url?: string;
  thumbnail_url?: string;
}

export interface DiscogsFormat {
  name: string;
  qty?: string;
  text?: string;
  descriptions?: string[];
}

export interface DiscogsIdentifier {
  type: string;
  value: string;
  description?: string;
}

export interface DiscogsVideo {
  uri: string;
  title: string;
  description?: string;
  duration?: number;
  embed?: boolean;
}

export interface DiscogsCommunityUser {
  username: string;
  resource_url: string;
}

export interface DiscogsCommunity {
  have: number;
  want: number;
  rating?: {
    count: number;
    average: number;
  };
  submitter?: DiscogsCommunityUser;
  contributors?: DiscogsCommunityUser[];
  data_quality?: string;
  status?: string;
}

export interface DiscogsTrack {
  position: string;
  type_: string;
  title: string;
  duration?: string;
  extraartists?: DiscogsArtistSummary[];
}

export interface DiscogsRelease {
  id: number;
  title: string;
  artists: DiscogsArtistSummary[];
  artists_sort?: string;
  data_quality?: string;
  thumb?: string;
  community?: DiscogsCommunity;
  companies?: DiscogsReleaseEntity[];
  country?: string;
  date_added?: string;
  date_changed?: string;
  estimated_weight?: number;
  extraartists?: DiscogsArtistSummary[];
  format_quantity?: number;
  formats?: DiscogsFormat[];
  genres?: string[];
  identifiers?: DiscogsIdentifier[];
  images?: DiscogsImage[];
  labels?: DiscogsReleaseEntity[];
  lowest_price?: number;
  master_id?: number;
  master_url?: string;
  notes?: string;
  num_for_sale?: number;
  released?: string;
  released_formatted?: string;
  resource_url: string;
  series?: DiscogsReleaseEntity[];
  status?: string;
  styles?: string[];
  tracklist?: DiscogsTrack[];
  uri?: string;
  videos?: DiscogsVideo[];
  year?: number;
  blocked_from_sale?: boolean;
  is_offensive?: boolean;
}

export interface DiscogsMaster {
  id: number;
  title: string;
  artists: DiscogsArtistSummary[];
  data_quality?: string;
  genres?: string[];
  images?: DiscogsImage[];
  lowest_price?: number;
  main_release?: number;
  main_release_url?: string;
  most_recent_release?: number;
  most_recent_release_url?: string;
  num_for_sale?: number;
  resource_url: string;
  styles?: string[];
  tracklist?: DiscogsTrack[];
  uri?: string;
  versions_url?: string;
  videos?: DiscogsVideo[];
  year?: number;
}

export interface DiscogsArtist {
  id: number;
  name: string;
  realname?: string;
  profile?: string;
  releases_url?: string;
  resource_url: string;
  uri?: string;
  urls?: string[];
  namevariations?: string[];
  aliases?: DiscogsArtistSummary[];
  groups?: DiscogsArtistSummary[];
  members?: DiscogsArtistSummary[];
  images?: DiscogsImage[];
}

export interface DiscogsLabel {
  id: number;
  name: string;
  profile?: string;
  contact_info?: string;
  data_quality?: string;
  parent_label?: DiscogsArtistSummary;
  sublabels?: DiscogsArtistSummary[];
  urls?: string[];
  images?: DiscogsImage[];
  releases_url?: string;
  resource_url: string;
  uri?: string;
}

export interface DiscogsVersionsParams extends DiscogsPaginationParams {
  format?: string;
  label?: string;
  released?: string;
  country?: string;
  sort?: "released" | "title" | "format" | "label" | "catno" | "country";
  sortOrder?: "asc" | "desc";
}

export type DiscogsVersionsResponse = DiscogsPaginatedResponse<DiscogsSearchResult>;
