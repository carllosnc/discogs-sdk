import { DiscogsClient } from "../src/index.js";

const discogs = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN,
  userAgent: "discogs-sdk-example/0.1",
});

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000);

try {
  const response = await discogs.http.get("database/search", {
    params: { q: "Boards of Canada", type: "release", per_page: 5 },
    signal: controller.signal,
  });

  console.log(response.data);
} finally {
  clearTimeout(timeout);
}