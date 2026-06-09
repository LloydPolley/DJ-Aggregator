export type Platform = "spotify" | "youtube" | "soundcloud";

export interface SpotifyData {
  handle: string;
  stat: string;
  topTracks: { name: string; album: string; dur: string }[];
}

export interface SoundCloudData {
  handle: string;
  stat: string;
  searchResults: { title: string; uploader: string; dur: string; plays: string }[];
}

export interface YouTubeData {
  handle: string;
  stat: string;
  searchResults: { title: string; channel: string; views: string; date: string; dur: string }[];
}

export interface ArtistResult {
  id: number;
  name: string;
  handle: string;
  genres: string[];
  verified: boolean;
  avatarSeed: string;
  platforms: Platform[];
  spotify?: SpotifyData;
  soundcloud?: SoundCloudData;
  youtube?: YouTubeData;
}

export const MOCK_DATA: ArtistResult[] = [
  {
    id: 1,
    name: "Peggy Gou",
    handle: "@peggygou",
    genres: ["House", "Techno", "Disco"],
    verified: true,
    avatarSeed: "peggy-gou-dj-portrait",
    platforms: ["spotify", "soundcloud", "youtube"],
    spotify: {
      handle: "@peggygou",
      stat: "3.4M monthly listeners",
      topTracks: [
        { name: "(It Goes Like) Nanana", album: "I Hear You", dur: "3:42" },
        { name: "Starry Night", album: "Once", dur: "5:22" },
        { name: "It Makes You Forget (Itgehane)", album: "Once", dur: "6:54" },
        { name: "I Go", album: "I Hear You", dur: "4:11" },
        { name: "Nabi (feat. Lenny Kravitz)", album: "I Hear You", dur: "7:03" },
      ],
    },
    soundcloud: {
      handle: "@peggygou",
      stat: "560K followers",
      searchResults: [
        { title: "Peggy Gou ID — unreleased edit (rip)", uploader: "club_rips", dur: "4:08", plays: "210K" },
        { title: "Best of Peggy Gou — mixed by @selecta", uploader: "selecta", dur: "1:02:00", plays: "88K" },
        { title: "Peggy Gou — DJ Kicks (Full Mix)", uploader: "djkicksmix", dur: "1:12:44", plays: "2.1M" },
      ],
    },
    youtube: {
      handle: "@PeggyGouOfficial",
      stat: "890K subscribers",
      searchResults: [
        { title: "Peggy Gou b2b Objekt @ Fabric London", channel: "Fabric", views: "3.2M", date: "3 years ago", dur: "4:18:02" },
        { title: "Peggy Gou — Time Warp 2023 (Full Set)", channel: "Time Warp", views: "1.8M", date: "2 years ago", dur: "2:11:44" },
        { title: "How Peggy Gou Built Her Sound", channel: "Resident Advisor", views: "640K", date: "1 year ago", dur: "14:22" },
      ],
    },
  },
  {
    id: 2,
    name: "Four Tet",
    handle: "@fourtet",
    genres: ["Electronic", "Ambient", "Experimental"],
    verified: true,
    avatarSeed: "four-tet-electronic",
    platforms: ["spotify", "soundcloud", "youtube"],
    spotify: {
      handle: "@fourtet",
      stat: "2.1M monthly listeners",
      topTracks: [
        { name: "Baby", album: "There Is Love In You", dur: "5:16" },
        { name: "Teenage Birdsong", album: "Teenage Birdsong", dur: "4:03" },
        { name: "Lush", album: "Rounds", dur: "6:44" },
        { name: "Two Thousand and Seventeen", album: "New Energy", dur: "3:28" },
        { name: "Parallel Jalebi", album: "New Energy", dur: "5:50" },
      ],
    },
    soundcloud: {
      handle: "@four-tet",
      stat: "720K followers",
      searchResults: [
        { title: "Four Tet — Essential Mix 2021", uploader: "BBC Radio 1", dur: "2:00:00", plays: "3.4M" },
        { title: "Four Tet — Fabric 59", uploader: "fabriclive", dur: "1:22:08", plays: "1.1M" },
        { title: "Four Tet — RBMA Mix", uploader: "rbma", dur: "48:33", plays: "340K" },
      ],
    },
    youtube: {
      handle: "@FourTetLive",
      stat: "340K subscribers",
      searchResults: [
        { title: "Four Tet — Live at Alexandra Palace", channel: "Four Tet", views: "4.1M", date: "2 years ago", dur: "1:42:18" },
        { title: "Four Tet — Glastonbury 2022", channel: "BBC Music", views: "2.6M", date: "3 years ago", dur: "1:08:33" },
        { title: "Four Tet — Coachella 2023", channel: "Coachella", views: "1.3M", date: "2 years ago", dur: "58:44" },
      ],
    },
  },
  {
    id: 3,
    name: "DJ Koze",
    handle: "@djkoze",
    genres: ["Deep House", "Minimal"],
    verified: false,
    avatarSeed: "dj-koze-minimal-portrait",
    platforms: ["spotify", "soundcloud", "youtube"],
    spotify: {
      handle: "@djkoze",
      stat: "1.2M monthly listeners",
      topTracks: [
        { name: "Pick Up", album: "Knock Knock", dur: "5:08" },
        { name: "XTC", album: "Knock Knock", dur: "6:39" },
        { name: "Seeing Aliens", album: "Amygdala", dur: "4:55" },
        { name: "Knee Deep in the North Sea", album: "DJ Koze Hits", dur: "7:11" },
        { name: "DJ Heartstring", album: "Reincarnations", dur: "5:44" },
      ],
    },
    soundcloud: {
      handle: "@djkoze",
      stat: "430K followers",
      searchResults: [
        { title: "DJ Koze — Pampa Radio #01", uploader: "pamparecords", dur: "1:08:44", plays: "980K" },
        { title: "DJ Koze — Fabric 65", uploader: "fabriclive", dur: "1:18:22", plays: "760K" },
        { title: "DJ Koze — Resident Advisor Podcast", uploader: "ra", dur: "58:11", plays: "410K" },
      ],
    },
    youtube: {
      handle: "@DJKoze",
      stat: "210K subscribers",
      searchResults: [
        { title: "DJ Koze — Fabric 95", channel: "Fabric", views: "1.2M", date: "4 years ago", dur: "1:59:22" },
        { title: "DJ Koze b2b Motor City Drum Ensemble", channel: "Boiler Room", views: "890K", date: "5 years ago", dur: "3:04:18" },
        { title: "DJ Koze — Sonar Festival", channel: "Sónar", views: "640K", date: "3 years ago", dur: "1:14:08" },
      ],
    },
  },
  {
    id: 4,
    name: "Objekt",
    handle: "@objekt",
    genres: ["Techno", "Breaks", "Bass"],
    verified: false,
    avatarSeed: "objekt-techno-portrait",
    platforms: ["soundcloud", "youtube"],
    soundcloud: {
      handle: "@objekt",
      stat: "210K followers",
      searchResults: [
        { title: "Objekt — Fabric 70", uploader: "fabriclive", dur: "1:21:08", plays: "1.4M" },
        { title: "Objekt & DJ Stingray — Boiler Room", uploader: "boilerroom", dur: "1:44:22", plays: "980K" },
        { title: "Objekt — NTS Radio Mix", uploader: "ntsradio", dur: "1:02:18", plays: "320K" },
      ],
    },
    youtube: {
      handle: "@ObjektMusic",
      stat: "85K subscribers",
      searchResults: [
        { title: "Objekt — Boiler Room Berlin", channel: "Boiler Room", views: "6.8M", date: "5 years ago", dur: "1:38:02" },
        { title: "Objekt — Dekmantel 2019", channel: "Dekmantel", views: "1.1M", date: "5 years ago", dur: "1:22:44" },
        { title: "Objekt — RA Exchange", channel: "Resident Advisor", views: "280K", date: "2 years ago", dur: "52:18" },
      ],
    },
  },
  {
    id: 5,
    name: "Avalon Emerson",
    handle: "@avalonemerson",
    genres: ["Techno", "House", "Trance"],
    verified: false,
    avatarSeed: "avalon-emerson-portrait",
    platforms: ["spotify", "soundcloud", "youtube"],
    spotify: {
      handle: "@avalonemerson",
      stat: "480K monthly listeners",
      topTracks: [
        { name: "Sandrail Silhouette", album: "& Diamonds", dur: "4:54" },
        { name: "A Silhouette at the Edge of the World", album: "& Diamonds", dur: "6:12" },
        { name: "Double High C", album: "On The Edge of Heaven", dur: "5:33" },
        { name: "Narcissus Pool", album: "DJ Kicks", dur: "7:01" },
        { name: "Thru the Pass", album: "& Diamonds", dur: "5:48" },
      ],
    },
    soundcloud: {
      handle: "@avalonemerson",
      stat: "180K followers",
      searchResults: [
        { title: "Avalon Emerson — Boiler Room NYC", uploader: "boilerroom", dur: "1:11:55", plays: "4.4M" },
        { title: "Avalon Emerson — HÖR Berlin", uploader: "horberlin", dur: "1:30:00", plays: "1.2M" },
        { title: "Avalon Emerson — DJ Kicks", uploader: "k7records", dur: "1:18:22", plays: "640K" },
      ],
    },
    youtube: {
      handle: "@AvaloneEmerson",
      stat: "62K subscribers",
      searchResults: [
        { title: "Avalon Emerson — Boiler Room NYC", channel: "Boiler Room", views: "4.4M", date: "4 years ago", dur: "1:11:55" },
        { title: "Avalon Emerson — Dekmantel 2022", channel: "Dekmantel", views: "820K", date: "3 years ago", dur: "1:15:30" },
        { title: "Avalon Emerson — Printworks London", channel: "Printworks", views: "560K", date: "2 years ago", dur: "1:08:44" },
      ],
    },
  },
];
