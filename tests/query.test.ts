import { describe, expect, test } from "bun:test";
import { buildQueryParams, toSnakeCase } from "../src/utils/query.js";

describe("query params", () => {
  test("converts public camelCase params to Discogs snake_case params", () => {
    expect(
      buildQueryParams({
        page: 2,
        perPage: 25,
        sortOrder: "desc",
        releaseTitle: "Discovery",
      }),
    ).toEqual({
      page: 2,
      per_page: 25,
      sort_order: "desc",
      release_title: "Discovery",
    });
  });

  test("omits undefined params and keeps existing API param names stable", () => {
    expect(
      buildQueryParams({
        query: "Daft Punk",
        type: "release",
        barcode: undefined,
        catno: "V 2940",
      }),
    ).toEqual({
      query: "Daft Punk",
      type: "release",
      catno: "V 2940",
    });
  });

  test("converts arbitrary camelCase keys predictably", () => {
    expect(toSnakeCase("marketplaceListingId")).toBe("marketplace_listing_id");
  });
});