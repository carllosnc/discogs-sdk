export { DiscogsClient, type DiscogsClientConfig } from "./client.js";
export {
  FetchAdapter,
  type DiscogsRateLimit,
  type FetchAdapterConfig,
  type HttpClient,
  type HttpRequestConfig,
  type HttpResponse,
} from "./http/index.js";
export { withRetry, type RetryConfig } from "./utils/retry.js";
export {
  getNextPageParams,
  getPreviousPageParams,
  hasNextPage,
  hasPreviousPage,
  paginateDiscogs,
  type DiscogsPage,
  type DiscogsPageFetcher,
  type DiscogsPageItems,
} from "./utils/pagination.js";
export {
  DiscogsClientError,
  DiscogsError,
  DiscogsForbiddenError,
  DiscogsNotFoundError,
  DiscogsRateLimitError,
  DiscogsServerError,
  DiscogsUnauthorizedError,
  DiscogsValidationError,
  type DiscogsErrorBody,
} from "./errors.js";
export { DatabaseClient } from "./client/database/index.js";
export { InventoryClient } from "./client/inventory/index.js";
export { MarketplaceClient } from "./client/marketplace/index.js";
export { UserClient } from "./client/user/index.js";
export * from "./types/common.js";
export * from "./types/database.js";
export * from "./types/inventory.js";
export * from "./types/marketplace.js";
export * from "./types/user.js";
