import { RefObject } from "react";
import { ArtistResult } from "@/lib/mock-data";
import SearchField from "@/components/search/SearchField";
import ResultRow from "@/components/results/ResultRow";
import SkeletonRow from "@/components/results/SkeletonRow";

interface ResultsSectionProps {
  inputRef: RefObject<HTMLInputElement | null>;
  submitted: string;
  query: string;
  results: ArtistResult[];
  visible: ArtistResult[];
  loading: boolean;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  onViewArtist: (id: number) => void;
}

export default function ResultsSection({
  inputRef,
  submitted,
  query,
  results,
  visible,
  loading,
  onChange,
  onSubmit,
  onClear,
  onViewArtist,
}: ResultsSectionProps) {
  return (
    <div
      className="w-full max-w-[760px] pt-10 pb-24"
      style={{ animation: "fadeIn 0.4s ease both" }}
    >
      <div className="flex items-center justify-between border-b border-line pb-5 mb-7">
        <button
          onClick={onClear}
          className="font-ui text-xs text-muted hover:text-fg flex items-center gap-2.5 transition-colors duration-150 cursor-pointer bg-transparent border-none"
          style={{ letterSpacing: "0.03em" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          New Search
        </button>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-semibold text-base text-fg" style={{ letterSpacing: "-0.01em" }}>
            &quot;{submitted}&quot;
          </span>
          <span className="font-ui text-[11px] text-faint">{results.length} results</span>
        </div>
      </div>

      <div className="max-w-[500px] mb-6">
        <SearchField
          inputRef={inputRef}
          value={query}
          onChange={(v) => {
            onChange(v);
            if (!v) onClear();
          }}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>

      {loading && (
        <div className="mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="pt-20 text-center" style={{ animation: "fadeUp 0.5s ease both" }}>
          <p className="font-display font-semibold text-[28px] tracking-tight text-fg mb-3">
            Nothing found
          </p>
          <p className="font-ui text-[12px] text-faint">
            Try &quot;Peggy Gou&quot; · &quot;Techno&quot; · &quot;Four Tet&quot;
          </p>
        </div>
      )}

      {!loading && visible.length > 0 && (
        <div style={{ animation: "fadeIn 0.3s ease both" }}>
          {visible.map((artist, i) => (
            <ResultRow
              key={artist.id}
              artist={artist}
              isLast={i === visible.length - 1}
              onView={() => onViewArtist(artist.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
