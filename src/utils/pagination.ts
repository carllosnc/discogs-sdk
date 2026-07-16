import { type DiscogsPagination, type DiscogsPaginationParams } from "../types/common.js";

export interface DiscogsPage<TItem> {
  pagination: DiscogsPagination;
  items: TItem[];
}

export type DiscogsPageFetcher<TResponse> = (
  params: DiscogsPaginationParams,
) => Promise<TResponse>;

export type DiscogsPageItems<TResponse, TItem> = (response: TResponse) => TItem[];

export function hasNextPage(response: { pagination: DiscogsPagination }): boolean {
  return Boolean(response.pagination.urls?.next) || response.pagination.page < response.pagination.pages;
}

export function hasPreviousPage(response: { pagination: DiscogsPagination }): boolean {
  return Boolean(response.pagination.urls?.prev) || response.pagination.page > 1;
}

export function getNextPageParams(
  response: { pagination: DiscogsPagination },
  params: DiscogsPaginationParams = {},
): DiscogsPaginationParams | undefined {
  if (!hasNextPage(response)) return undefined;

  return {
    ...params,
    page: response.pagination.page + 1,
  };
}

export function getPreviousPageParams(
  response: { pagination: DiscogsPagination },
  params: DiscogsPaginationParams = {},
): DiscogsPaginationParams | undefined {
  if (!hasPreviousPage(response)) return undefined;

  return {
    ...params,
    page: response.pagination.page - 1,
  };
}

export async function* paginateDiscogs<TResponse extends { pagination: DiscogsPagination }, TItem>(
  fetchPage: DiscogsPageFetcher<TResponse>,
  getItems: DiscogsPageItems<TResponse, TItem>,
  params: DiscogsPaginationParams = {},
): AsyncGenerator<TItem, void> {
  let pageParams: DiscogsPaginationParams | undefined = { ...params, page: params.page ?? 1 };

  while (pageParams) {
    const response = await fetchPage(pageParams);

    for (const item of getItems(response)) {
      yield item;
    }

    pageParams = getNextPageParams(response, pageParams);
  }
}