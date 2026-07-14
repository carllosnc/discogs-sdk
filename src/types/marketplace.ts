import { type DiscogsPaginatedResponse, type DiscogsPaginationParams, type DiscogsSortOrder } from "./common.js";

export interface DiscogsListing {
  id: number;
  status: string;
  condition: string;
  sleeve_condition?: string;
  comments?: string;
  ships_from?: string;
  posted?: string;
  uri?: string;
  resource_url: string;
  audio?: boolean;
  price?: DiscogsMoney;
  original_price?: DiscogsMoney;
  shipping_price?: DiscogsMoney;
  seller?: DiscogsSeller;
  release?: DiscogsListingRelease;
}

export interface DiscogsMoney {
  value: number;
  currency: string;
}

export interface DiscogsSeller {
  id: number;
  username: string;
  resource_url?: string;
  avatar_url?: string;
  stats?: {
    rating?: string;
    total?: number;
  };
}

export interface DiscogsListingRelease {
  id: number;
  description?: string;
  resource_url?: string;
  catalog_number?: string;
}

export interface DiscogsMarketplaceStats {
  num_for_sale: number;
  blocked_from_sale?: boolean;
  lowest_price?: DiscogsMoney;
}

export interface DiscogsPriceSuggestion {
  condition: string;
  value: number;
  currency: string;
}

export type DiscogsPriceSuggestions = Record<string, DiscogsPriceSuggestion>;
export type DiscogsOrderStatus =
  | "New Order"
  | "Buyer Contacted"
  | "Invoice Sent"
  | "Payment Pending"
  | "Payment Received"
  | "Shipped"
  | "Merged"
  | "Order Changed"
  | "Cancelled"
  | "Refund Sent";

export interface DiscogsOrdersParams extends DiscogsPaginationParams {
  status?: DiscogsOrderStatus;
  sort?: "created" | "last_activity";
  sortOrder?: DiscogsSortOrder;
}

export interface DiscogsOrderParticipant {
  id?: number;
  username: string;
  resource_url?: string;
  avatar_url?: string;
}

export interface DiscogsOrderItemRelease {
  id: number;
  description?: string;
  resource_url?: string;
}

export interface DiscogsOrderItem {
  id: number;
  release?: DiscogsOrderItemRelease;
  price?: DiscogsMoney;
  media_condition?: string;
  sleeve_condition?: string;
}

export interface DiscogsOrderShipping {
  value?: number;
  currency?: string;
  method?: string;
  address?: string;
}

export interface DiscogsOrder {
  id: string;
  resource_url: string;
  messages_url?: string;
  uri?: string;
  status: DiscogsOrderStatus | string;
  next_status?: string[];
  fee?: DiscogsMoney;
  created?: string;
  last_activity?: string;
  buyer?: DiscogsOrderParticipant;
  seller?: DiscogsOrderParticipant;
  items?: DiscogsOrderItem[];
  shipping?: DiscogsOrderShipping;
  total?: DiscogsMoney;
  additional_instructions?: string;
  archived?: boolean;
}

export interface DiscogsOrdersResponse {
  pagination: DiscogsPaginatedResponse<DiscogsOrder>["pagination"];
  orders: DiscogsOrder[];
}

export interface DiscogsOrderMessage {
  id: number;
  type?: string;
  subject?: string;
  message?: string;
  timestamp?: string;
  actor?: DiscogsOrderParticipant;
  from?: DiscogsOrderParticipant;
  order?: {
    id: string;
    resource_url?: string;
  };
}

export interface DiscogsOrderMessagesResponse {
  messages: DiscogsOrderMessage[];
}
