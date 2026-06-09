import { ArtistResult, Platform } from "@/lib/mock-data";
import { IMAGE_FILTER, PLATFORM_CONFIG } from "@/lib/platform-config";

interface ArtistSidebarProps {
  artist: ArtistResult;
  backUrl: string;
  onBack: () => void;
  enabledPlatforms: Set<Platform>;
  onTogglePlatform: (p: Platform) => void;
}

export default function ArtistSidebar({ artist, onBack, enabledPlatforms, onTogglePlatform }: ArtistSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col sticky" style={{ top: 48 }}>
      <button
        onClick={onBack}
        className="font-ui text-xs text-muted hover:text-fg flex items-center gap-2.5 mb-9 transition-colors duration-150 cursor-pointer bg-transparent border-none self-start"
        style={{ letterSpacing: "0.03em" }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to results
      </button>

      <img
        src={`https://picsum.photos/seed/${artist.avatarSeed}/400/400`}
        className="rounded-full object-cover"
        style={{ filter: IMAGE_FILTER, width: 104, height: 104 }}
        alt=""
      />

      <div className="flex items-center gap-2.5 mt-5 mb-3">
        <h1 className="font-display font-bold text-3xl tracking-tight text-fg whitespace-nowrap" style={{ lineHeight: 1.05 }}>
          {artist.name}
        </h1>
        {artist.verified && (
          <span className="inline-flex items-center justify-center rounded-full bg-verified text-[#0b3d1e] shrink-0" style={{ width: 17, height: 17 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
        )}
      </div>

      <div className="font-ui text-xs text-muted mb-[18px]" style={{ letterSpacing: "0.03em" }}>
        {artist.handle}
      </div>

      <div className="flex gap-1.5 flex-wrap mb-[26px]">
        {artist.genres.map((g) => (
          <span key={g} className="font-ui text-[11px] font-medium text-faint border border-line rounded-full" style={{ padding: "3px 9px" }}>
            {g}
          </span>
        ))}
      </div>

      <div className="font-ui text-[10px] font-semibold uppercase text-faint mb-3.5" style={{ letterSpacing: "0.1em" }}>
        Platforms
      </div>
      <div className="flex flex-col gap-2">
        {artist.platforms.map((p) => {
          const on = enabledPlatforms.has(p);
          const cfg = PLATFORM_CONFIG[p];
          return (
            <button
              key={p}
              onClick={() => onTogglePlatform(p)}
              className={`flex items-center gap-2.5 rounded-[9px] border transition-all duration-150 cursor-pointer text-left ${
                on
                  ? "border-line2 bg-panel2"
                  : "border-line bg-panel opacity-40"
              }`}
              style={{ padding: "8px 12px" }}
            >
              <span className={on ? cfg.color : "text-faint"}>
                {cfg.icon}
              </span>
              <span className={`font-ui text-xs font-medium ${on ? "text-fg" : "text-faint"}`}>
                {cfg.label}
              </span>
              <span className={`ml-auto font-ui text-[10px] transition-colors duration-150 ${on ? "text-muted" : "text-faint"}`}>
                {on ? "on" : "off"}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
