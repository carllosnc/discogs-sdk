import { type DiscogsPaginatedResponse, type DiscogsPaginationParams, type DiscogsSortOrder } from "./common.js";
import { type DiscogsListing } from "./marketplace.js";

export interface DiscogsInventoryParams extends DiscogsPaginationParams {
  status?: "For Sale" | "Draft" | "Expired" | "Sold" | "Deleted" | "Violation" | "Suspended";
  sort?: "listed" | "price" | "item" | "artist" | "label" | "catno" | "audio" | "status" | "location";
  sortOrder?: DiscogsSortOrder;
}

export type DiscogsInventoryResponse = DiscogsPaginatedResponse<DiscogsListing>;