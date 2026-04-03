// This fan-out service calls all external APIs concurrently
// and merges the results into a single response

import { searchSpotify } from "./spotify.service";
import { searchYoutube } from "./youtube.service";
import redisClient from "../lib/redis";

const CACHE_TTL = 60 * 60; // 1 hour

export const aggregateDJData = async (name: string) => {
  const cacheKey = `dj:${name.toLocaleLowerCase().trim()}`;

  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("Cache hit for", cacheKey);
    return JSON.parse(cached);
  }

  console.log(`Cache miss for: ${name} — fetching from APIs`);

  const [spotify, youtube] = await Promise.allSettled([
    searchSpotify(name),
    searchYoutube(name),
  ]);

  const result = {
    dj: name,
    spotify: spotify.status === "fulfilled" ? spotify.value : null,
    youtube: youtube.status === "fulfilled" ? youtube.value : null,
  };

  await redisClient.set(cacheKey, JSON.stringify(result), { EX: CACHE_TTL });

  return result;
};
