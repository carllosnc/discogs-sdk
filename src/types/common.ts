export interface DiscogsPaginationUrls {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}

export interface DiscogsPagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls?: DiscogsPaginationUrls;
}

export interface DiscogsPaginatedResponse<T> {
  pagination: DiscogsPagination;
  results: T[];
}

export interface DiscogsPaginationParams {
  page?: number;
  perPage?: number;
}

export type DiscogsSortOrder = "asc" | "desc";