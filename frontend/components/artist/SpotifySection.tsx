import { SpotifyData } from "@/lib/mock-data";

export default function SpotifySection({ data }: { data: SpotifyData }) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="text-spotify">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.8-.87 7.07-.5 9.71 1.11.3.18.39.57.22.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.66-6.79-2.14-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.49.71.25 1.07zm.1-2.85C14.82 8.98 9.5 8.8 6.42 9.73a.93.93 0 11-.54-1.78c3.53-1.07 9.4-.86 13.1 1.33a.93.93 0 11-.95 1.6z" />
            </svg>
          </span>
          <span className="font-display font-semibold tracking-tight text-fg" style={{ fontSize: 21 }}>Spotify</span>
        </div>
        <a href="#" className="font-ui text-[11px] text-faint hover:text-muted transition-colors duration-150" style={{ letterSpacing: "0.03em" }}>
          Open in Spotify ↗
        </a>
      </div>

      <div className="font-ui text-[11px] text-faint mb-[18px]" style={{ letterSpacing: "0.03em" }}>
        {data.handle} · {data.stat}
      </div>

      {data.topTracks.map((track, i) => (
        <div
          key={i}
          className="grid items-center px-3 py-3 rounded-lg hover:bg-panel cursor-pointer"
          style={{ gridTemplateColumns: "24px 1fr auto", columnGap: 16 }}
        >
          <span className="font-ui text-xs text-faint text-center">{i + 1}</span>
          <div className="min-w-0">
            <div className="font-ui text-[13px] text-fg/85 truncate">{track.name}</div>
            <div className="font-ui text-[11px] text-faint truncate">{track.album}</div>
          </div>
          <span className="font-ui text-xs text-faint">{track.dur}</span>
        </div>
      ))}
    </section>
  );
}
