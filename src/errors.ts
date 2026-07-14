import { type DiscogsRateLimit } from "./http/types.js";

export interface DiscogsErrorBody {
  message?: string;
  error?: string;
  errors?: unknown;
}

export class DiscogsError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public discogsMessage: string | null,
    public url: string | null,
    public rateLimit?: DiscogsRateLimit,
  ) {
    super(message);
    this.name = "DiscogsError";
  }

  get status(): number {
    return this.statusCode;
  }
}

export class DiscogsClientError extends DiscogsError {
  constructor(
    message: string,
    statusCode: number,
    discogsMessage: string | null,
    url: string | null,
    rateLimit?: DiscogsRateLimit,
  ) {
    super(message, statusCode, discogsMessage, url, rateLimit);
    this.name = "DiscogsClientError";
  }
}

export class DiscogsUnauthorizedError extends DiscogsClientError {
  constructor(message: string, discogsMessage: string | null, url: string | null, rateLimit?: DiscogsRateLimit) {
    super(message, 401, discogsMessage, url, rateLimit);
    this.name = "DiscogsUnauthorizedError";
  }
}

export class DiscogsForbiddenError extends DiscogsClientError {
  constructor(message: string, discogsMessage: string | null, url: string | null, rateLimit?: DiscogsRateLimit) {
    super(message, 403, discogsMessage, url, rateLimit);
    this.name = "DiscogsForbiddenError";
  }
}

export class DiscogsNotFoundError extends DiscogsClientError {
  constructor(message: string, discogsMessage: string | null, url: string | null, rateLimit?: DiscogsRateLimit) {
    super(message, 404, discogsMessage, url, rateLimit);
    this.name = "DiscogsNotFoundError";
  }
}

export class DiscogsValidationError extends DiscogsClientError {
  constructor(
    message: string,
    statusCode: number,
    discogsMessage: string | null,
    url: string | null,
    rateLimit?: DiscogsRateLimit,
  ) {
    super(message, statusCode, discogsMessage, url, rateLimit);
    this.name = "DiscogsValidationError";
  }
}

export class DiscogsRateLimitError extends DiscogsClientError {
  constructor(message: string, discogsMessage: string | null, url: string | null, rateLimit?: DiscogsRateLimit) {
    super(message, 429, discogsMessage, url, rateLimit);
    this.name = "DiscogsRateLimitError";
  }
}

export class DiscogsServerError extends DiscogsError {
  constructor(
    message: string,
    statusCode: number,
    discogsMessage: string | null,
    url: string | null,
    rateLimit?: DiscogsRateLimit,
  ) {
    super(message, statusCode, discogsMessage, url, rateLimit);
    this.name = "DiscogsServerError";
  }
}

export interface DiscogsErrorInfo {
  status: number;
  body: DiscogsErrorBody | null;
  url: string | null;
  message: string;
  rateLimit?: DiscogsRateLimit;
}

export function parseDiscogsErrorBody(data: unknown): DiscogsErrorBody | null {
  if (!data || typeof data !== "object") return null;
  if ("message" in data || "error" in data || "errors" in data) {
    return data as DiscogsErrorBody;
  }
  return null;
}

export function createDiscogsError(info: DiscogsErrorInfo): DiscogsError {
  const { status, body, url, message, rateLimit } = info;
  const discogsMessage =
    typeof body?.message === "string"
      ? body.message
      : typeof body?.error === "string"
        ? body.error
        : null;
  const errorMessage = discogsMessage ? `Discogs API error (${status}): ${discogsMessage}` : message;

  switch (status) {
    case 400:
    case 422:
      return new DiscogsValidationError(errorMessage, status, discogsMessage, url, rateLimit);
    case 401:
      return new DiscogsUnauthorizedError(errorMessage, discogsMessage, url, rateLimit);
    case 403:
      return new DiscogsForbiddenError(errorMessage, discogsMessage, url, rateLimit);
    case 404:
      return new DiscogsNotFoundError(errorMessage, discogsMessage, url, rateLimit);
    case 429:
      return new DiscogsRateLimitError(errorMessage, discogsMessage, url, rateLimit);
    default:
      if (status >= 400 && status < 500) {
        return new DiscogsClientError(errorMessage, status, discogsMessage, url, rateLimit);
      }
      if (status >= 500) {
        return new DiscogsServerError(errorMessage, status, discogsMessage, url, rateLimit);
      }
      return new DiscogsError(errorMessage, status, discogsMessage, url, rateLimit);
  }
}
