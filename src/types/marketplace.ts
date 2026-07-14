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