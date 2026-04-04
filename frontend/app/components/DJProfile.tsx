"use client";

import Link from "next/link";

interface Props {
  data: any;
}

export default function DJProfile({ data }: Props) {
  const { spotify, youtube } = data;

  console.log("data", data);

  return (
    <div className="mt-12 space-y-10">
      {/* Spotify Section */}
      {spotify && (
        <section>
          <div className="flex items-center gap-6 mb-8">
            {spotify.image && (
              <img
                src={spotify.image}
                alt={spotify.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-3xl font-bold">{spotify.name}</h2>
              <p className="text-gray-400 mt-1">
                {/* {spotify.followers.toLocaleString()} Spotify followers */}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Latest Releases</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {spotify.albums.map((album: any) => (
              <Link
                key={album.url}
                href={"/"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors group"
              >
                {album.image && (
                  <img
                    src={album.image}
                    alt={album.name}
                    className="w-full aspect-square object-cover"
                  />
                )}
                <div className="p-3">
                  <p className="font-medium text-sm truncate group-hover:text-purple-400 transition-colors">
                    {album.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {album.releaseDate}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* YouTube Section */}
      {/* {youtube && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Latest Videos</h3>
            <a
              href={youtube.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              {youtube.channelName} →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {youtube.latestVideos.map((video: any) => (
              <a
                key={video.videoId}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors group"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
                    {video.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(video.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )} */}
    </div>
  );
}
