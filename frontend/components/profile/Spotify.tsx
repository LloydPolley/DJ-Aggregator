import Image from "next/image";
import Link from "next/link";

export default function Spotify({ spotify }: { spotify: any }) {
  return (
    <section>
      <div className="flex items-center gap-6 mb-8">
        {spotify.image && (
          <Image
            src={spotify.image}
            alt={spotify.name}
            className="w-24 h-24 rounded-full object-cover"
            width={96}
            height={96}
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
          <button
            key={album.uri}
            data-spotify-id={album.uri}
            className="episode font-medium text-sm truncate group-hover:text-purple-400 transition-colors"
          >
            {album.name}
          </button>
        ))}
      </div>
    </section>
  );
}
