// This fan-out service calls all external APIs concurrently
// and merges the results into a single response

import { searchSpotify } from "./spotify.service";
import { searchYoutube } from "./youtube.service";

export const aggregateDJData = async (name: string) => {
  // Promise.allSettled means if one API fails, the others still return
  const [spotify, youtube] = await Promise.allSettled([
    searchSpotify(name),
    searchYoutube(name),
  ]);

  return {
    dj: name,
    spotify: spotify.status === "fulfilled" ? spotify.value : null,
    youtube: youtube.status === "fulfilled" ? youtube.value : null,
  };
};
