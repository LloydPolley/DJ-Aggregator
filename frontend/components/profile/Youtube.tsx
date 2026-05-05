import Link from "next/link";
import Image from "next/image";

export default function Youtube({
  youtube,
}: {
  youtube: {
    url: string;
    channelName: string;
    videos: {
      id: { videoId: string };
      url: string;
      snippet: { thumbnails: { high: { url: string } }; title: string };
      publishedAt: string;
    }[];
  };
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Latest Videos</h3>
        <Link
          href={youtube.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:text-red-300 text-sm transition-colors"
        >
          {youtube.channelName} →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {youtube.videos.map((video) => (
          <a
            key={video.id.videoId}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors group"
          >
            <Image
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="w-full aspect-video object-cover"
              width={400}
              height={225}
            />
            <div className="p-3">
              <p className="font-medium text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
                {video.snippet.title}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {new Date(video.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
