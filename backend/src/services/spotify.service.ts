import axios from "axios";

// We store the token in memory so we don't request a new one every search
let accessToken: string | null = null;
let tokenExpiry: number = 0;

const getAccessToken = async (): Promise<string> => {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return accessToken as string;
};

export const searchSpotify = async (djName: string) => {
  const token = await getAccessToken();

  const artistRes = await axios.get("https://api.spotify.com/v1/search", {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: djName, type: "artist", limit: 1 },
  });

  const artist = artistRes.data.artists.items[0];
  if (!artist) return null;

  const albumsRes = await axios.get(
    `https://api.spotify.com/v1/artists/${artist.id}/albums`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 10, include_groups: "album,single", market: "GB" },
    },
  );

  const data = {
    name: artist.name,
    url: artist.external_urls.spotify,
    image: artist.images[0]?.url ?? null,
    albums: albumsRes.data.items,
  };

  return data;
};
