import { type HttpClient, type HttpRequestConfig, type HttpResponse } from "../http/types.js";

export interface RetryConfig {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  retryOnStatus?: number[];
}

const DEFAULT_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  retryOnStatus: [429, 502, 503, 504],
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function withRetry(client: HttpClient, config?: RetryConfig): HttpClient {
  const { maxRetries, baseDelay, maxDelay, retryOnStatus } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  async function executeWithRetry<T>(fn: () => Promise<HttpResponse<T>>): Promise<HttpResponse<T>> {
    let lastError: any;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        const status = error.status ?? error.statusCode;
        if (attempt < maxRetries && typeof status === "number" && retryOnStatus.includes(status)) {
          const delay = Math.min(baseDelay * Math.pow(2, attempt) + Math.random() * 500, maxDelay);
          await sleep(delay);
        } else {
          throw error;
        }
      }
    }
    throw lastError;
  }

  return {
    get: <T>(url: string, config?: HttpRequestConfig) =>
      executeWithRetry(() => client.get<T>(url, config)),
    post: <T>(url: string, data?: any, config?: HttpRequestConfig) =>
      executeWithRetry(() => client.post<T>(url, data, config)),
    put: <T>(url: string, data?: any, config?: HttpRequestConfig) =>
      executeWithRetry(() => client.put<T>(url, data, config)),
    delete: <T>(url: string, config?: HttpRequestConfig) =>
      executeWithRetry(() => client.delete<T>(url, config)),
  };
}