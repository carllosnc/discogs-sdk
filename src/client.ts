import { DatabaseClient } from "./client/database/index.js";
import { InventoryClient } from "./client/inventory/index.js";
import { MarketplaceClient } from "./client/marketplace/index.js";
import { UserClient } from "./client/user/index.js";
import { FetchAdapter, type HttpClient } from "./http/index.js";
import { withRetry, type RetryConfig } from "./utils/retry.js";

export interface DiscogsClientConfig {
  token?: string;
  authHeader?: string;
  userAgent?: string;
  baseURL?: string;
  retry?: boolean | RetryConfig;
  httpClient?: HttpClient;
}

export class DiscogsClient {
  public http: HttpClient;
  public database: DatabaseClient;
  public inventory: InventoryClient;
  public marketplace: MarketplaceClient;
  public user: UserClient;

  constructor(config: DiscogsClientConfig = {}) {
    if (config.httpClient) {
      this.http = config.httpClient;
    } else {
      const headers: Record<string, string> = {};

      if (config.authHeader) {
        headers.Authorization = config.authHeader;
      } else if (config.token) {
        headers.Authorization = `Discogs token=${config.token}`;
      }

      if (config.userAgent) {
        headers["User-Agent"] = config.userAgent;
      }

      let client: HttpClient = new FetchAdapter({
        baseURL: config.baseURL ?? "https://api.discogs.com/",
        headers,
      });

      if (config.retry) {
        client = withRetry(client, config.retry === true ? undefined : config.retry);
      }

      this.http = client;
    }

    this.database = new DatabaseClient(this.http);
    this.inventory = new InventoryClient(this.http);
    this.marketplace = new MarketplaceClient(this.http);
    this.user = new UserClient(this.http);
  }
}
