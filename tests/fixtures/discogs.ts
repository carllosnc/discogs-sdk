import {
  type DiscogsCollectionFieldValueResponse,
  type DiscogsCollectionFieldsResponse,
  type DiscogsMarketplaceStats,
  type DiscogsRelease,
  type DiscogsSearchResponse,
} from "../../src/index.js";

export const searchResponseFixture = {
  pagination: {
    page: 1,
    pages: 171,
    per_page: 1,
    items: 171,
    urls: {
      last: "https://api.discogs.com/database/search?q=Daft+Punk+Discovery&type=release&per_page=1&page=171",
      next: "https://api.discogs.com/database/search?q=Daft+Punk+Discovery&type=release&per_page=1&page=2",
    },
  },
  results: [
    {
      country: "Europe",
      year: "2001",
      format: ["Vinyl", "LP", "Album", "Stereo"],
      label: ["Virgin", "Daft Life"],
      type: "release",
      genre: ["Electronic"],
      style: ["Disco", "House", "Electro", "French House"],
      id: 2879,
      barcode: ["724384960612"],
      master_id: 26647,
      master_url: "https://api.discogs.com/masters/26647",
      uri: "/release/2879-Daft-Punk-Discovery",
      catno: "V2940",
      title: "Daft Punk - Discovery",
      thumb: "",
      cover_image: "",
      resource_url: "https://api.discogs.com/releases/2879",
      community: { want: 21955, have: 28298 },
      format_quantity: 2,
      formats: [
        {
          name: "Vinyl",
          qty: "2",
          descriptions: ["LP", "Album", "Stereo"],
        },
      ],
    },
  ],
} satisfies DiscogsSearchResponse;

export const releaseFixture = {
  id: 249504,
  status: "Accepted",
  year: 1987,
  resource_url: "https://api.discogs.com/releases/249504",
  uri: "https://www.discogs.com/release/249504-Rick-Astley-Never-Gonna-Give-You-Up",
  artists: [
    {
      name: "Rick Astley",
      anv: "",
      join: "",
      role: "",
      tracks: "",
      id: 72872,
      resource_url: "https://api.discogs.com/artists/72872",
      thumbnail_url: "https://i.discogs.com/artist.jpeg",
    },
  ],
  artists_sort: "Rick Astley",
  labels: [
    {
      name: "RCA",
      catno: "PB 41447",
      entity_type: "1",
      entity_type_name: "Label",
      id: 895,
      resource_url: "https://api.discogs.com/labels/895",
      thumbnail_url: "https://i.discogs.com/label.jpeg",
    },
  ],
  series: [],
  companies: [
    {
      name: "BMG Records (UK) Ltd.",
      catno: "",
      entity_type: "13",
      entity_type_name: "Phonographic Copyright (p)",
      id: 82835,
      resource_url: "https://api.discogs.com/labels/82835",
    },
  ],
  formats: [
    {
      name: "Vinyl",
      qty: "1",
      descriptions: ["7\"", "45 RPM", "Single", "Stereo"],
    },
  ],
  data_quality: "Correct",
  community: {
    have: 4062,
    want: 580,
    rating: { count: 233, average: 3.84 },
    submitter: {
      username: "memory",
      resource_url: "https://api.discogs.com/users/memory",
    },
    contributors: [
      {
        username: "memory",
        resource_url: "https://api.discogs.com/users/memory",
      },
    ],
    data_quality: "Correct",
    status: "Accepted",
  },
  format_quantity: 1,
  date_added: "2004-04-30T12:10:05-03:00",
  date_changed: "2022-08-03T07:03:28-03:00",
  num_for_sale: 122,
  lowest_price: 0.89,
  master_id: 96559,
  master_url: "https://api.discogs.com/masters/96559",
  title: "Never Gonna Give You Up",
  country: "UK",
  released: "1987-07-00",
  notes: "UK Release has a black label.",
  released_formatted: "Jul 1987",
  identifiers: [
    { type: "Barcode", value: "5012394144777" },
    { type: "Matrix / Runout", value: "PB 41447 A2 UTOPIA MS", description: "A side runout" },
  ],
  videos: [
    {
      uri: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)",
      description: "Official video.",
      duration: 214,
      embed: true,
    },
  ],
  genres: ["Electronic", "Pop"],
  styles: ["Euro-Disco"],
  tracklist: [
    {
      position: "A",
      type_: "track",
      title: "Never Gonna Give You Up",
      duration: "3:32",
    },
  ],
  extraartists: [
    {
      name: "Stock, Aitken & Waterman",
      anv: "Stock / Aitken / Waterman",
      role: "Producer, Written-By",
      tracks: "",
      id: 20942,
      resource_url: "https://api.discogs.com/artists/20942",
    },
  ],
  images: [
    {
      type: "primary",
      uri: "https://i.discogs.com/release.jpeg",
      resource_url: "https://i.discogs.com/release.jpeg",
      uri150: "https://i.discogs.com/release-150.jpeg",
      width: 600,
      height: 600,
    },
  ],
  thumb: "https://i.discogs.com/release-150.jpeg",
  estimated_weight: 230,
  blocked_from_sale: false,
  is_offensive: false,
} satisfies DiscogsRelease;

export const marketplaceStatsFixture = {
  num_for_sale: 122,
  lowest_price: {
    value: 0.67,
    currency: "USD",
  },
  blocked_from_sale: false,
} satisfies DiscogsMarketplaceStats;
export const collectionFieldsFixture = {
  fields: [
    {
      id: 1,
      name: "Media Condition",
      type: "dropdown",
      position: 1,
      public: false,
      options: ["Mint (M)", "Near Mint (NM or M-)", "Very Good Plus (VG+)"],
    },
    {
      id: 3,
      name: "Notes",
      type: "textarea",
      position: 3,
      public: false,
      lines: 3,
    },
  ],
} satisfies DiscogsCollectionFieldsResponse;

export const collectionFieldValueFixture = {
  value: "Near Mint (NM or M-)",
} satisfies DiscogsCollectionFieldValueResponse;
