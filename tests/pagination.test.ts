import { describe, expect, test } from "bun:test";
import {
  getNextPageParams,
  getPreviousPageParams,
  hasNextPage,
  hasPreviousPage,
  paginateDiscogs,
  type DiscogsPagination,
} from "../src/index.js";

function pagination(page: number, pages: number): DiscogsPagination {
  return {
    page,
    pages,
    per_page: 2,
    items: pages * 2,
  };
}

describe("pagination helpers", () => {
  test("detects next and previous pages from pagination metadata", () => {
    const middlePage = { pagination: pagination(2, 3) };

    expect(hasNextPage(middlePage)).toBe(true);
    expect(hasPreviousPage(middlePage)).toBe(true);
    expect(getNextPageParams(middlePage, { perPage: 2 })).toEqual({ perPage: 2, page: 3 });
    expect(getPreviousPageParams(middlePage, { perPage: 2 })).toEqual({ perPage: 2, page: 1 });
  });

  test("uses pagination urls when Discogs returns them", () => {
    const response = {
      pagination: {
        ...pagination(1, 1),
        urls: {
          next: "https://api.discogs.com/database/search?page=2",
        },
      },
    };

    expect(hasNextPage(response)).toBe(true);
    expect(getNextPageParams(response, { page: 1, perPage: 50 })).toEqual({ page: 2, perPage: 50 });
  });

  test("returns undefined when no adjacent page exists", () => {
    const onlyPage = { pagination: pagination(1, 1) };

    expect(hasNextPage(onlyPage)).toBe(false);
    expect(hasPreviousPage(onlyPage)).toBe(false);
    expect(getNextPageParams(onlyPage)).toBeUndefined();
    expect(getPreviousPageParams(onlyPage)).toBeUndefined();
  });

  test("iterates items across paginated responses", async () => {
    const requestedPages: number[] = [];
    const fetchPage = async ({ page = 1 }: { page?: number; perPage?: number }) => {
      requestedPages.push(page);

      return {
        pagination: pagination(page, 3),
        results: [`release-${page}-1`, `release-${page}-2`],
      };
    };

    const releases: string[] = [];
    for await (const release of paginateDiscogs(fetchPage, (response) => response.results, { perPage: 2 })) {
      releases.push(release);
    }

    expect(requestedPages).toEqual([1, 2, 3]);
    expect(releases).toEqual([
      "release-1-1",
      "release-1-2",
      "release-2-1",
      "release-2-2",
      "release-3-1",
      "release-3-2",
    ]);
  });
});