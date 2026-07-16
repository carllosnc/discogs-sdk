import { DiscogsClient } from "../src/index.js";

const discogs = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN,
  userAgent: "discogs-sdk-example/0.1",
});

const releaseId = Number(process.env.DISCOGS_RELEASE_ID ?? 249504);
const stats = await discogs.marketplace.getReleaseStats(releaseId);

console.log(`For sale: ${stats.num_for_sale}`);
console.log(`Lowest price: ${stats.lowest_price?.value ?? "n/a"} ${stats.lowest_price?.currency ?? ""}`.trim());