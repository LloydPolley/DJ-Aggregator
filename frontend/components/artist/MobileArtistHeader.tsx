import { ArtistResult } from "@/lib/mock-data";
import { IMAGE_FILTER } from "@/lib/platform-config";

interface MobileArtistHeaderProps {
  artist: ArtistResult;
  onBack: () => void;
}

export default function MobileArtistHeader({ artist, onBack }: MobileArtistHeaderProps) {
  return (
    <div className="lg:hidden px-4 pt-6 pb-4 border-b border-line">
      <button
        onClick={onBack}
        className="font-ui text-xs text-muted hover:text-fg flex items-center gap-2 mb-4 transition-colors duration-150 cursor-pointer bg-transparent border-none"
        style={{ letterSpacing: "0.03em" }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back to results
      </button>

      <div className="flex items-center gap-4">
        <img
          src={`https://picsum.photos/seed/${artist.avatarSeed}/400/400`}
          className="rounded-full object-cover shrink-0"
          style={{ filter: IMAGE_FILTER, width: 64, height: 64 }}
          alt=""
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-display font-bold text-xl tracking-tight text-fg leading-tight truncate">
              {artist.name}
            </h1>
            {artist.verified && (
              <span className="inline-flex items-center justify-center rounded-full bg-verified text-[#0b3d1e] shrink-0" style={{ width: 15, height: 15 }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
            )}
          </div>
          <div className="font-ui text-xs text-muted mb-2" style={{ letterSpacing: "0.03em" }}>
            {artist.handle}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {artist.genres.map((g) => (
              <span key={g} className="font-ui text-[11px] font-medium text-faint border border-line rounded-full" style={{ padding: "2px 8px" }}>
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
