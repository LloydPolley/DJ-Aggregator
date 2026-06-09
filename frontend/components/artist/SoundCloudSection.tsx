import { SoundCloudData } from "@/lib/mock-data";
import { IMAGE_FILTER } from "@/lib/platform-config";
import Waveform from "./Waveform";

interface SoundCloudSectionProps {
  data: SoundCloudData;
  avatarSeed: string;
}

export default function SoundCloudSection({ data, avatarSeed }: SoundCloudSectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="text-soundcloud">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 14.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zm2-1.5v5a.5.5 0 001 0v-5a.5.5 0 00-1 0zm2-1v6a.5.5 0 001 0v-6a.5.5 0 00-1 0zm2-1.2v7a.5.5 0 001 0v-7a.5.5 0 00-1 0zM10.5 9v9a.5.5 0 00.5.5h8.2a3.3 3.3 0 00.3-6.59 5.2 5.2 0 00-9.06-2.65.6.6 0 00.06.74V9z" />
            </svg>
          </span>
          <span className="font-display font-semibold tracking-tight text-fg" style={{ fontSize: 21 }}>SoundCloud</span>
        </div>
        <a href="#" className="font-ui text-[11px] text-faint hover:text-muted transition-colors duration-150" style={{ letterSpacing: "0.03em" }}>
          Open in SoundCloud ↗
        </a>
      </div>

      <a href="#" className="flex items-center gap-3 p-3 mb-6 border border-line rounded-[10px] bg-panel hover:bg-panel2 hover:border-line2 transition-all duration-150">
        <img
          src={`https://picsum.photos/seed/${avatarSeed}-sc/400/400`}
          className="w-10 h-10 rounded-full object-cover shrink-0"
          style={{ filter: IMAGE_FILTER }}
          alt=""
        />
        <div className="flex-1 min-w-0">
          <div className="font-ui text-[13px] text-fg mb-0.5">{data.handle}</div>
          <div className="font-ui text-[11px] text-faint">{data.stat}</div>
        </div>
        <span className="font-ui text-[11px] text-muted whitespace-nowrap" style={{ letterSpacing: "0.03em" }}>
          View profile ↗
        </span>
      </a>

      <div className="font-ui text-[11px] font-semibold uppercase text-muted mb-3.5" style={{ letterSpacing: "0.08em" }}>
        Search Results
      </div>

      {data.searchResults.map((track, i) => (
        <div key={i} className="flex items-center gap-4 px-3 py-3.5 rounded-lg hover:bg-panel cursor-pointer">
          <button
            className="rounded-full border border-line2 flex items-center justify-center shrink-0 hover:border-soundcloud transition-colors duration-150 cursor-pointer bg-transparent"
            style={{ width: 34, height: 34 }}
          >
            <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid #f1efea", marginLeft: 2 }} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-3 mb-1.5">
              <span className="font-ui text-[13px] text-fg/85 truncate">{track.title}</span>
              <span className="font-ui text-[11px] text-faint shrink-0">{track.dur}</span>
            </div>
            <div className="flex items-center gap-3">
              <Waveform />
              <span className="font-ui text-[11px] text-faint shrink-0 whitespace-nowrap">
                {track.uploader} · {track.plays} plays
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
