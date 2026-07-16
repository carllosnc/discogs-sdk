import { DiscogsClient } from "../src/index.js";

const discogs = new DiscogsClient({
  token: process.env.DISCOGS_TOKEN,
  userAgent: "discogs-sdk-example/0.1",
});

const username = process.env.DISCOGS_USERNAME ?? "discogs";
const folders = await discogs.user.getCollectionFolders(username);

for (const folder of folders.folders) {
  console.log(`${folder.id}: ${folder.name} (${folder.count})`);
}