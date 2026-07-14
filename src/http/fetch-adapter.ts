import { createDiscogsError, parseDiscogsErrorBody } from "../errors.js";
import { type DiscogsRateLimit, type HttpClient, type HttpRequestConfig, type HttpResponse } from "./types.js";

export interface FetchAdapterConfig {
  baseURL: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

export class FetchAdapter implements HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultParams: Record<string, string>;

  constructor(config: FetchAdapterConfig) {
    this.baseURL = config.baseURL;
    this.defaultHeaders = { ...config.headers };
    this.defaultParams = { ...config.params };
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, "GET", undefined, config);
  }

  async post<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, "POST", data, config);
  }

  async put<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, "PUT", data, config);
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, "DELETE", config?.data, config);
  }

  private async request<T>(
    url: string,
    method: string,
    body: any,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    const fullUrl = this.buildURL(url, config?.params);
    const headers: Record<string, string> = { ...this.defaultHeaders, ...config?.headers };

    if (body !== undefined && !(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body !== undefined ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
      signal: config?.signal,
    });

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    const rateLimit = this.parseRateLimit(responseHeaders);

    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await response.json() as T
      : await response.text() as unknown as T;

    if (!response.ok) {
      throw createDiscogsError({
        status: response.status,
        body: parseDiscogsErrorBody(data),
        url: this.redactURL(fullUrl),
        message: response.statusText,
        rateLimit,
      });
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      rateLimit,
    };
  }

  private parseRateLimit(headers: Record<string, string>): DiscogsRateLimit | undefined {
    const limit = Number(headers["x-discogs-ratelimit"]);
    const remaining = Number(headers["x-discogs-ratelimit-remaining"]);
    const used = Number(headers["x-discogs-ratelimit-used"]);

    if ([limit, remaining, used].some((value) => !Number.isFinite(value))) {
      return undefined;
    }

    return { limit, remaining, used };
  }

  private redactURL(urlString: string): string {
    try {
      const url = new URL(urlString);
      for (const param of ["token", "oauth_token", "oauth_consumer_key", "oauth_signature"]) {
        if (url.searchParams.has(param)) {
          url.searchParams.set(param, "***");
        }
      }
      return url.toString();
    } catch {
      return urlString;
    }
  }

  private buildURL(path: string, params?: Record<string, any>): string {
    const url = new URL(path, this.baseURL);
    const mergedParams = { ...this.defaultParams, ...params };

    for (const [key, value] of Object.entries(mergedParams)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    }

    return url.toString();
  }
}
