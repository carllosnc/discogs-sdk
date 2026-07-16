# API Reference

Generated from the TypeScript source with `bun run docs`.

This reference lists the public classes, helpers, and types exported by the SDK. See `README.md` for runnable usage examples.

## Client

- `DiscogsClientConfig`
- `DiscogsClient`

## HTTP Adapter

- `FetchAdapterConfig`
- `FetchAdapter`

## HTTP Types

- `HttpRequestConfig`
- `DiscogsRateLimit`
- `HttpResponse`
- `HttpClient`

## Errors

- `DiscogsErrorBody`
- `DiscogsError`
- `DiscogsClientError`
- `DiscogsUnauthorizedError`
- `DiscogsForbiddenError`
- `DiscogsNotFoundError`
- `DiscogsValidationError`
- `DiscogsRateLimitError`
- `DiscogsServerError`
- `DiscogsErrorInfo`
- `parseDiscogsErrorBody`
- `createDiscogsError`

## Retry Utilities

- `RetryConfig`
- `withRetry`

## Pagination Utilities

- `DiscogsPage`
- `DiscogsPageFetcher`
- `DiscogsPageItems`
- `hasNextPage`
- `hasPreviousPage`
- `getNextPageParams`
- `getPreviousPageParams`
- `paginateDiscogs`

## Database

- `DatabaseClient`

## Marketplace

- `MarketplaceClient`

## Inventory

- `InventoryClient`

## User

- `UserClient`

## Common Types

- `DiscogsPaginationUrls`
- `DiscogsPagination`
- `DiscogsPaginatedResponse`
- `DiscogsPaginationParams`
- `DiscogsSortOrder`

## Database Types

- `DiscogsSearchType`
- `DiscogsSearchParams`
- `DiscogsSearchResult`
- `DiscogsSearchResponse`
- `DiscogsImage`
- `DiscogsArtistSummary`
- `DiscogsReleaseEntity`
- `DiscogsFormat`
- `DiscogsIdentifier`
- `DiscogsVideo`
- `DiscogsCommunityUser`
- `DiscogsCommunity`
- `DiscogsTrack`
- `DiscogsRelease`
- `DiscogsMaster`
- `DiscogsArtist`
- `DiscogsLabel`
- `DiscogsVersionsParams`
- `DiscogsVersionsResponse`

## Marketplace Types

- `DiscogsListing`
- `DiscogsMoney`
- `DiscogsSeller`
- `DiscogsListingRelease`
- `DiscogsMarketplaceStats`
- `DiscogsPriceSuggestion`
- `DiscogsPriceSuggestions`
- `DiscogsOrderStatus`
- `DiscogsOrdersParams`
- `DiscogsOrderParticipant`
- `DiscogsOrderItemRelease`
- `DiscogsOrderItem`
- `DiscogsOrderShipping`
- `DiscogsOrder`
- `DiscogsOrdersResponse`
- `DiscogsOrderMessage`
- `DiscogsOrderMessagesResponse`

## Inventory Types

- `DiscogsInventoryParams`
- `DiscogsInventoryResponse`

## User Types

- `DiscogsIdentity`
- `DiscogsUserProfile`
- `DiscogsUserSummary`
- `DiscogsCollectionFolder`
- `DiscogsCollectionFoldersResponse`
- `DiscogsCollectionFieldType`
- `DiscogsCollectionField`
- `DiscogsCollectionFieldsResponse`
- `DiscogsCollectionFieldValue`
- `DiscogsCollectionFieldValueResponse`
- `DiscogsUpdateCollectionFieldValuePayload`
- `DiscogsCollectionItem`
- `DiscogsCollectionItemsParams`
- `DiscogsCollectionItemsResponse`
- `DiscogsUserListsParams`
- `DiscogsUserListSummary`
- `DiscogsUserListsResponse`
- `DiscogsListItemType`
- `DiscogsListItemCommunityStats`
- `DiscogsListItem`
- `DiscogsUserList`
- `DiscogsWantlistItem`
- `DiscogsWantlistParams`
- `DiscogsWantlistResponse`
