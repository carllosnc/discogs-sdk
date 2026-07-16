import { DiscogsClient } from "../src/index.js";

const discogs = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN,
  userAgent: "discogs-sdk-example/0.1",
});

const barcode = process.env.DISCOGS_BARCODE ?? "724384960650";
const response = await discogs.database.search({ barcode, type: "release", perPage: 5 });

for (const result of response.results) {
  console.log(`${result.id}: ${result.title}`);
}