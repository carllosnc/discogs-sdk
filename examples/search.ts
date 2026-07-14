import { DiscogsClient } from "../src/index.js";

const client = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN,
});

const response = await client.database.search({
  query: "Aphex Twin Selected Ambient Works",
  type: "release",
  perPage: 5,
});

for (const result of response.results) {
  console.log(`${result.id}: ${result.title}`);
}