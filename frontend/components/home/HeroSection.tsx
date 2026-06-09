import { RefObject } from "react";
import { Platform } from "@/lib/mock-data";
import { PLATFORM_CONFIG } from "@/lib/platform-config";
import SearchField from "@/components/search/SearchField";

const SUGGESTIONS = ["Peggy Gou", "Four Tet", "DJ Koze", "Techno"];

interface HeroSectionProps {
  inputRef: RefObject<HTMLInputElement | null>;
  query: string;
  loading: boolean;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onSuggestion: (hint: string) => void;
}

export default function HeroSection({
  inputRef,
  query,
  loading,
  onChange,
  onSubmit,
  onSuggestion,
}: HeroSectionProps) {
  return (
    <div
      className="w-full max-w-[640px] flex flex-col items-center"
      style={{ paddingTop: "15vh", animation: "fadeUp 0.7s ease both" }}
    >
      <div className="inline-flex items-center gap-2 font-ui font-medium text-[12.5px] text-muted mb-[30px] px-[15px] py-[7px] border border-line rounded-full bg-panel">
        <span
          className="rounded-full shrink-0"
          style={{ width: 6, height: 6, background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
        />
        Search every platform at once
      </div>

      <div className="text-center mb-[52px] w-full">
        <h1
          className="font-display font-bold text-fg"
          style={{ fontSize: "clamp(40px, 12vw, 72px)", letterSpacing: "-0.035em", lineHeight: 0.95 }}
        >
          Find any DJ.
        </h1>
        <p className="font-ui text-base text-muted mt-4">
          One search across Spotify, YouTube &amp; SoundCloud.
        </p>
      </div>

      <div className="w-full mb-[22px]">
        <SearchField
          inputRef={inputRef}
          value={query}
          onChange={onChange}
          onSubmit={onSubmit}
          loading={loading}
          large
        />
      </div>

      <div className="flex gap-1.5 flex-wrap justify-center mb-[52px]">
        {SUGGESTIONS.map((hint) => (
          <button
            key={hint}
            onClick={() => onSuggestion(hint)}
            className="bg-panel border border-line rounded-full font-ui text-[13px] font-medium text-muted hover:text-fg hover:border-muted transition-[color,border-color] duration-150 whitespace-nowrap cursor-pointer"
            style={{ padding: "8px 16px" }}
          >
            {hint}
          </button>
        ))}
      </div>

      <div className="flex gap-[18px] items-center">
        {(["spotify", "youtube", "soundcloud"] as Platform[]).map((p) => (
          <span key={p} className="flex items-center gap-2 font-ui text-[12.5px] font-medium text-muted">
            <span className={PLATFORM_CONFIG[p].color}>{PLATFORM_CONFIG[p].icon}</span>
            {PLATFORM_CONFIG[p].label}
          </span>
        ))}
      </div>
    </div>
  );
}
