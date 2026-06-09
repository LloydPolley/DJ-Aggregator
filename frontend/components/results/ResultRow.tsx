import { ArtistResult } from "@/lib/mock-data";
import { PLATFORM_CONFIG, IMAGE_FILTER } from "@/lib/platform-config";
import VerifiedBadge from "@/components/ui/VerifiedBadge";

interface ResultRowProps {
  artist: ArtistResult;
  isLast: boolean;
  onView: () => void;
}

export default function ResultRow({ artist, isLast, onView }: ResultRowProps) {
  return (
    <div
      onClick={onView}
      className={`grid items-center py-5 cursor-pointer group ${isLast ? "" : "border-b border-line"}`}
      style={{ gridTemplateColumns: "56px 1fr auto", columnGap: 18 }}
    >
      <img
        src={`https://picsum.photos/seed/${artist.avatarSeed}/400/400`}
        className="w-14 h-14 rounded-lg object-cover"
        style={{ filter: IMAGE_FILTER }}
        alt=""
      />

      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-display font-semibold text-2xl tracking-tight leading-none whitespace-nowrap text-fg">
            {artist.name}
          </span>
          {artist.verified && <VerifiedBadge />}
        </div>
        <div className="flex items-center gap-3.5 flex-wrap">
          <span className="font-ui text-xs text-muted">{artist.handle}</span>
          <span className="flex items-center gap-2">
            {artist.platforms.map((p) => (
              <span key={p} className={`${PLATFORM_CONFIG[p].color} opacity-85`}>
                {PLATFORM_CONFIG[p].icon}
              </span>
            ))}
          </span>
          <span className="flex gap-1.5">
            {artist.genres.slice(0, 3).map((g) => (
              <span key={g} className="font-ui text-[11px] font-medium text-faint border border-line rounded-full" style={{ padding: "3px 9px" }}>
                {g}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 font-ui text-xs text-faint group-hover:text-fg whitespace-nowrap transition-colors duration-150">
        <span className="hidden sm:inline">View profile</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-150 group-hover:translate-x-[3px]">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
