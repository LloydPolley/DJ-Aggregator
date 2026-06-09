export type Platform = "spotify" | "youtube" | "soundcloud";

export interface Track {
  t: string;
  d: string;
}
export interface Video {
  t: string;
  v: string;
  views: string;
}
export interface Mix {
  t: string;
  dur: string;
  plays: string;
}

export interface ArtistResult {
  id: number;
  platform: Platform;
  name: string;
  handle: string;
  genres: string[];
  stat: string;
  verified: boolean;
  imgSeed: string;
  tracks?: Track[];
  videos?: Video[];
  mixes?: Mix[];
}

export const MOCK_DATA: ArtistResult[] = [
  {
    id: 1,
    platform: "spotify",
    name: "Peggy Gou",
    handle: "@peggygou",
    genres: ["House", "Techno"],
    stat: "3.4M monthly",
    verified: true,
    imgSeed: "peggy-gou-dj",
    tracks: [
      { t: "(It Goes Like) Nanana", d: "3:42" },
      { t: "Rockaway", d: "6:18" },
      { t: "You & Me", d: "4:51" },
      { t: "Starry Night", d: "5:22" },
      { t: "Nabi", d: "7:03" },
    ],
  },
  {
    id: 2,
    platform: "spotify",
    name: "Four Tet",
    handle: "@fourtet",
    genres: ["Electronic", "Ambient"],
    stat: "2.1M monthly",
    verified: true,
    imgSeed: "four-tet-electronic",
    tracks: [
      { t: "Baby", d: "5:16" },
      { t: "Teenage Birdsong", d: "4:03" },
      { t: "Lush", d: "6:44" },
      { t: "Two Thousand and Seventeen", d: "3:28" },
      { t: "Parallel Jalebi", d: "5:50" },
    ],
  },
  {
    id: 3,
    platform: "spotify",
    name: "DJ Koze",
    handle: "@djkoze",
    genres: ["Deep House", "Minimal"],
    stat: "1.2M monthly",
    verified: false,
    imgSeed: "dj-koze-minimal",
    tracks: [
      { t: "Pick Up", d: "5:08" },
      { t: "XTC", d: "6:39" },
      { t: "Seeing Aliens", d: "4:55" },
      { t: "Knee Deep in the North Sea", d: "7:11" },
      { t: "DJ Heartstring", d: "5:44" },
    ],
  },
  {
    id: 4,
    platform: "spotify",
    name: "Floating Points",
    handle: "@floatingpoints",
    genres: ["Jazz", "Electronic"],
    stat: "1.5M monthly",
    verified: true,
    imgSeed: "floating-points-jazz",
    tracks: [
      { t: "Silhouettes (I, II & III)", d: "6:12" },
      { t: "Bias", d: "4:48" },
      { t: "Vocoder", d: "5:30" },
      { t: "Problems Vs Promises", d: "7:22" },
      { t: "Nespole", d: "4:17" },
    ],
  },
  {
    id: 5,
    platform: "youtube",
    name: "Peggy Gou",
    handle: "@PeggyGouOfficial",
    genres: ["House", "Techno"],
    stat: "890K subs",
    verified: true,
    imgSeed: "peggy-gou-live",
    videos: [
      { t: "Peggy Gou — Boiler Room Berlin", v: "9k:42", views: "12M" },
      { t: "Peggy Gou b2b Objekt @ Fabric", v: "4:18:02", views: "3.2M" },
      { t: "Peggy Gou — Time Warp 2023", v: "2:11:44", views: "1.8M" },
    ],
  },
  {
    id: 6,
    platform: "youtube",
    name: "Four Tet",
    handle: "@FourTetLive",
    genres: ["Live Sets"],
    stat: "340K subs",
    verified: false,
    imgSeed: "four-tet-live-set",
    videos: [
      { t: "Four Tet — Live at Alexandra Palace", v: "1:42:18", views: "4.1M" },
      { t: "Four Tet — Glastonbury 2022", v: "1:08:33", views: "2.6M" },
      { t: "Four Tet — Coachella 2023", v: "58:44", views: "1.3M" },
    ],
  },
  {
    id: 7,
    platform: "youtube",
    name: "Boiler Room",
    handle: "@BoilerRoom",
    genres: ["Techno", "House", "D&B"],
    stat: "4.2M subs",
    verified: true,
    imgSeed: "boiler-room-techno",
    videos: [
      { t: "Objekt — Boiler Room Berlin", v: "1:38:02", views: "6.8M" },
      { t: "Avalon Emerson — Boiler Room NYC", v: "1:11:55", views: "4.4M" },
      { t: "Call Super — Boiler Room London", v: "1:02:18", views: "2.9M" },
    ],
  },
  {
    id: 8,
    platform: "youtube",
    name: "DJ Koze",
    handle: "@DJKoze",
    genres: ["Techno", "Deep House"],
    stat: "210K subs",
    verified: false,
    imgSeed: "dj-koze-techno",
    videos: [
      { t: "DJ Koze — Fabric 95", v: "1:59:22", views: "1.2M" },
      {
        t: "DJ Koze b2b Motor City Drum Ensemble",
        v: "3:04:18",
        views: "890K",
      },
      { t: "DJ Koze — Sonar Festival", v: "1:14:08", views: "640K" },
    ],
  },
  {
    id: 9,
    platform: "soundcloud",
    name: "Peggy Gou",
    handle: "peggygou",
    genres: ["House", "Techno"],
    stat: "560K follows",
    verified: true,
    imgSeed: "peggy-gou-sc",
    mixes: [
      { t: "Peggy Gou — DJ Kicks", dur: "1:12:44", plays: "2.1M" },
      { t: "HÖR Berlin Set", dur: "58:22", plays: "890K" },
      { t: "Mixmag Cover Mix", dur: "1:04:11", plays: "640K" },
      { t: "NTS Radio Session", dur: "2:02:18", plays: "420K" },
    ],
  },
  {
    id: 10,
    platform: "soundcloud",
    name: "Four Tet",
    handle: "four-tet",
    genres: ["Electronic"],
    stat: "720K follows",
    verified: true,
    imgSeed: "four-tet-sc",
    mixes: [
      { t: "Essential Mix 2021", dur: "2:00:00", plays: "3.4M" },
      { t: "Fabric 59", dur: "1:22:08", plays: "1.1M" },
      { t: "BBC Radio 6 Residency", dur: "1:00:00", plays: "780K" },
      { t: "RBMA Mix", dur: "48:33", plays: "340K" },
    ],
  },
  {
    id: 11,
    platform: "soundcloud",
    name: "DJ Koze",
    handle: "djkoze",
    genres: ["Minimal", "Deep House"],
    stat: "430K follows",
    verified: false,
    imgSeed: "dj-koze-sc",
    mixes: [
      { t: "Pampa Radio #01", dur: "1:08:44", plays: "980K" },
      { t: "Fabric 65", dur: "1:18:22", plays: "760K" },
      { t: "Kompakt Total 14 Mix", dur: "1:04:18", plays: "520K" },
      { t: "Resident Advisor Podcast", dur: "58:11", plays: "410K" },
    ],
  },
  {
    id: 12,
    platform: "soundcloud",
    name: "Objekt",
    handle: "objekt",
    genres: ["Techno", "Breaks"],
    stat: "210K follows",
    verified: false,
    imgSeed: "objekt-techno",
    mixes: [
      { t: "Fabric 70", dur: "1:21:08", plays: "1.4M" },
      {
        t: "Objekt & Dj Stingray — Boiler Room",
        dur: "1:44:22",
        plays: "980K",
      },
      { t: "NTS Radio Mix", dur: "1:02:18", plays: "320K" },
      { t: "RA Podcast 402", dur: "1:15:44", plays: "280K" },
    ],
  },
];

export const PLATFORMS: Record<string, { label: string }> = {
  spotify: { label: "Spotify" },
  youtube: { label: "YouTube" },
  soundcloud: { label: "SoundCloud" },
};
