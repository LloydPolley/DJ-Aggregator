import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const searchYoutube = async (djName: string) => {
  const channelRes = await axios.get(`${BASE_URL}/search`, {
    params: {
      part: "snippet",
      q: djName,
      type: "channel",
      key: process.env.YOUTUBE_API_KEY,
      maxResults: 1,
    },
  });

  const channel = channelRes.data.items[0];
  if (!channel) return null;

  const channelId = channel.id.channelId;

  const videoRes = await axios.get(`${BASE_URL}/search`, {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      part: "snippet",
      q: djName,
      maxResults: 6,
      type: "video",
      // videoCategoryId: "10",
    },
  });

  console.log("video res", videoRes.data);

  return {
    channelName: channel.snippet.channelTitle,
    image: channel.snippet.thumbnails?.high?.url,
    url: `https://www.youtube.com/channel/${channelId}`,
    description: channel.snippet.description,
    videos: videoRes.data.items,
  };
};
