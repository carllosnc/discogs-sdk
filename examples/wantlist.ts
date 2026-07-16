import { DiscogsClient } from "../src/index.js";

const discogs = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN,
  userAgent: "discogs-sdk-example/0.1",
});

const username = process.env.DISCOGS_USERNAME ?? "discogs";
const wantlist = await discogs.user.getWantlist(username, { perPage: 5 });

for (const item of wantlist.wants) {
  console.log(`${item.id}: ${item.basic_information.title}`);
}