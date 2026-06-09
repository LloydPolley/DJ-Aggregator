import { YouTubeData } from "@/lib/mock-data";
import { IMAGE_FILTER } from "@/lib/platform-config";

interface YouTubeSectionProps {
  data: YouTubeData;
  avatarSeed: string;
}

export default function YouTubeSection({ data, avatarSeed }: YouTubeSectionProps) {
  return (
    <section className="mb-16 last:mb-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="text-youtube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.5 7.2a2.7 2.7 0 00-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 001.5 7.2 28 28 0 001 12a28 28 0 00.5 4.8 2.7 2.7 0 001.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 001.9-1.9A28 28 0 0023 12a28 28 0 00-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
            </svg>
          </span>
          <span className="font-display font-semibold tracking-tight text-fg" style={{ fontSize: 21 }}>YouTube</span>
        </div>
        <a href="#" className="font-ui text-[11px] text-faint hover:text-muted transition-colors duration-150" style={{ letterSpacing: "0.03em" }}>
          Open in YouTube ↗
        </a>
      </div>

      <a href="#" className="flex items-center gap-3 p-3 mb-6 border border-line rounded-[10px] bg-panel hover:bg-panel2 hover:border-line2 transition-all duration-150">
        <img
          src={`https://picsum.photos/seed/${avatarSeed}-yt/400/400`}
          className="w-10 h-10 rounded-full object-cover shrink-0"
          style={{ filter: IMAGE_FILTER }}
          alt=""
        />
        <div className="flex-1 min-w-0">
          <div className="font-ui text-[13px] text-fg mb-0.5">{data.handle}</div>
          <div className="font-ui text-[11px] text-faint">{data.stat}</div>
        </div>
        <span className="font-ui text-[11px] text-muted whitespace-nowrap" style={{ letterSpacing: "0.03em" }}>
          View channel ↗
        </span>
      </a>

      <div className="font-ui text-[11px] font-semibold uppercase text-muted mb-3.5" style={{ letterSpacing: "0.08em" }}>
        Search Results
      </div>

      <div className="flex flex-col gap-5">
        {data.searchResults.map((video, i) => (
          <a key={i} href="#" className="grid gap-4 items-start" style={{ gridTemplateColumns: "minmax(0,160px) 1fr" }}>
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden bg-panel" style={{ paddingTop: "56.25%" }}>
                <img
                  src={`https://picsum.photos/seed/${avatarSeed}-yts-${i}/480/270`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "grayscale(30%) brightness(0.9)" }}
                  alt=""
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="rounded-full border border-white/55 bg-black/25 flex items-center justify-center"
                    style={{ width: 34, height: 34, backdropFilter: "blur(3px)" }}
                  >
                    <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "9px solid rgba(240,237,232,.85)", marginLeft: 2 }} />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-1.5 right-1.5 font-ui text-[10px] text-white bg-black/80 px-1.5 py-0.5 rounded">
                {video.dur}
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-ui text-[13px] text-fg leading-snug mb-1.5">{video.title}</div>
              <div className="font-ui text-[11px] text-faint mb-0.5">{video.channel}</div>
              <div className="font-ui text-[11px] text-faint">{video.views} views · {video.date}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
