"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MOCK_DATA, PLATFORMS, ArtistResult, Platform } from "@/lib/mock-data";
import SearchField from "@/components/search/SearchField";
import Filters from "@/components/search/Filters";
import ArtistCard from "@/components/artists/ArtistCard";
import ArtistRow from "@/components/artists/ArtistRow";
import ArtistModal from "@/components/artists/ArtistModal";
import SkeletonCard from "@/components/ui/SkeletonCard";

type FilterValue = "all" | Platform;

const SUGGESTIONS = ["Peggy Gou", "Four Tet", "DJ Koze", "Techno"];

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);
  const [results, setResults] = useState<ArtistResult[]>([]);
  const [loading, setLoading] = useState(!!initialQ);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [isNew, setIsNew] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQ);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runSearch = useCallback((q: string) => {
    setLoading(true);
    setFilter("all");
    setIsNew(false);
    setSelectedId(null);
    setTimeout(() => {
      const ql = q.toLowerCase();
      const found = MOCK_DATA.filter(
        (r) =>
          r.name.toLowerCase().includes(ql) ||
          r.genres.some((g) => g.toLowerCase().includes(ql)) ||
          r.handle.toLowerCase().includes(ql),
      );
      setResults(found);
      setSubmitted(q);
      setLoading(false);
      setIsNew(true);
      setHasSearched(true);
      setTimeout(() => setIsNew(false), 1600);
    }, 700);
  }, []);

  useEffect(() => {
    if (initialQ) runSearch(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQ]);

  const doSearch = useCallback(
    (q: string) => {
      if (!q.trim()) return;
      router.replace(`/?q=${encodeURIComponent(q.trim())}`);
    },
    [router],
  );

  const handleSubmit = useCallback(() => {
    doSearch(query);
  }, [query, doSearch]);

  const clearAll = () => {
    setQuery("");
    setResults([]);
    setSubmitted("");
    setHasSearched(false);
    setFilter("all");
    setSelectedId(null);
    router.replace("/");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const counts = {
    all: results.length,
    spotify: results.filter((r) => r.platform === "spotify").length,
    youtube: results.filter((r) => r.platform === "youtube").length,
    soundcloud: results.filter((r) => r.platform === "soundcloud").length,
  };

  const visible =
    filter === "all" ? results : results.filter((r) => r.platform === filter);
  const selectedResult = results.find((r) => r.id === selectedId);

  return (
    <div className="min-h-screen flex flex-col items-center px-12">
      {selectedResult && (
        <ArtistModal
          result={selectedResult}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* ── HERO ── */}
      {!hasSearched && (
        <div
          className="w-full max-w-[640px] flex flex-col items-center pt-[16vh]"
          style={{ animation: "fadeUp 0.7s ease both" }}
        >
          {/* Headline */}
          <div className="text-center mb-14 w-full">
            <div className="inline-flex items-center gap-2 font-body font-medium text-[12.5px] text-[var(--mid)] mb-6 px-[15px] py-[7px] border border-[var(--bd)] rounded-full bg-[var(--s1)]">
              <span
                className="w-[6px] h-[6px] rounded-full bg-[#4ade80] inline-block"
                style={{ boxShadow: "0 0 8px #4ade80" }}
              />
              Search every platform at once
            </div>
            <h1 className="font-display font-bold text-[72px] tracking-[-0.035em] leading-[0.95] text-[var(--text)] whitespace-nowrap">
              Find any DJ.
            </h1>
            <p className="font-body text-[16px] text-[var(--mid)] mt-[14px] leading-relaxed">
              One search across Spotify, YouTube &amp; SoundCloud.
            </p>
          </div>

          <div className="w-full mb-6">
            <SearchField
              inputRef={inputRef}
              value={query}
              onChange={setQuery}
              onSubmit={handleSubmit}
              loading={loading}
              large
            />
          </div>

          {/* Suggestion chips */}
          <div className="flex gap-[6px] flex-wrap justify-center mb-14">
            {SUGGESTIONS.map((hint) => (
              <button
                key={hint}
                onClick={() => {
                  setQuery(hint);
                  router.replace(`/?q=${encodeURIComponent(hint)}`);
                }}
                className="bg-[var(--s1)] border border-[var(--bd)] px-4 py-2 rounded-full font-body text-[13px] font-medium text-[var(--mid)] cursor-pointer transition-[color,border-color] duration-150 hover:text-[var(--text)] hover:border-[var(--mid)]"
              >
                {hint}
              </button>
            ))}
          </div>

          {/* Platform badges */}
          <div className="flex gap-[10px]">
            {["Spotify", "YouTube", "SoundCloud"].map((p) => (
              <span
                key={p}
                className="font-body text-[12.5px] font-medium text-[var(--mid)] px-[15px] py-[7px] border border-[var(--bd)] rounded-full bg-[var(--s1)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {hasSearched && (
        <div className="w-full max-w-[1100px] pt-10 pb-[100px]">
          {/* Nav bar */}
          <div
            className="flex items-center justify-between border-b border-[var(--bd)] pb-5 mb-8"
            style={{ animation: "fadeIn 0.4s ease both" }}
          >
            <button
              onClick={clearAll}
              className="flex items-center gap-[10px] bg-transparent border-none cursor-pointer font-body text-[12px] tracking-[0.03em] text-[var(--mid)] hover:text-[var(--text)] transition-colors duration-150"
            >
              <ArrowLeft size={12} />
              New Search
            </button>
            <div className="flex items-center gap-1">
              <span className="font-display font-semibold text-[16px] tracking-[-0.01em] text-[var(--text)]">
                &quot;{submitted}&quot;
              </span>
              <span className="font-body text-[11px] text-[var(--dim)] ml-2">
                {results.length} results
              </span>
            </div>
          </div>

          {/* Compact search */}
          <div
            className="max-w-[500px] mb-10"
            style={{ animation: "fadeIn 0.4s ease both" }}
          >
            <SearchField
              inputRef={inputRef}
              value={query}
              onChange={(v) => {
                setQuery(v);
                if (!v) clearAll();
              }}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          {/* No results */}
          {!loading && results.length === 0 && (
            <div
              className="pt-20 text-center"
              style={{ animation: "fadeUp 0.5s ease both" }}
            >
              <p className="font-display font-semibold text-[30px] tracking-[-0.02em] text-[var(--text)] mb-3">
                Nothing found
              </p>
              <p className="font-body text-[12px] tracking-[0.04em] text-[var(--dim)]">
                Try &quot;Peggy Gou&quot; · &quot;Techno&quot; · &quot;Four
                Tet&quot;
              </p>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-4 gap-x-5 gap-y-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </div>
          )}

          {/* All view — 3 columns by platform */}
          {!loading && results.length > 0 && filter === "all" && (
            <>
              <div
                className="mb-9"
                style={{ animation: "fadeIn 0.4s ease 0.1s both" }}
              >
                <Filters active={filter} onChange={setFilter} counts={counts} />
              </div>

              {!selectedId && (
                <div
                  className="mb-5"
                  style={{ animation: "fadeIn 0.4s ease 0.2s both" }}
                >
                  <span className="font-body text-[11px] tracking-[0.03em] text-[var(--dim)]">
                    Select an artist to preview across platforms
                  </span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-x-12">
                {(["spotify", "youtube", "soundcloud"] as Platform[]).map(
                  (p, ci) => {
                    const items = results.filter((r) => r.platform === p);
                    if (items.length === 0) return null;
                    return (
                      <div key={p} className="flex flex-col">
                        <div className="flex justify-between font-body text-[12px] tracking-[0.05em] text-[var(--mid)] pb-4 mb-6 border-b border-[var(--bd)]">
                          <span>{PLATFORMS[p].label}</span>
                          <span className="text-[var(--dim)]">{items.length}</span>
                        </div>
                        <div className="flex flex-col gap-9">
                          {items.map((r, i) => (
                            <ArtistCard
                              key={r.id}
                              result={r}
                              index={ci * 4 + i}
                              isNew={isNew}
                              onSelect={() => setSelectedId(r.id)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </>
          )}

          {/* Filtered list view */}
          {!loading && results.length > 0 && filter !== "all" && (
            <div style={{ animation: "fadeIn 0.3s ease both" }}>
              <div className="mb-9">
                <Filters
                  active={filter}
                  onChange={(f) => {
                    setFilter(f);
                    setSelectedId(null);
                  }}
                  counts={counts}
                />
              </div>
              {visible.length === 0 ? (
                <div className="py-[60px] text-center">
                  <p className="font-display font-semibold text-[22px] tracking-[-0.02em] text-[var(--text)]">
                    No {PLATFORMS[filter].label} results
                  </p>
                </div>
              ) : (
                <div>
                  {visible.map((r, i) => (
                    <ArtistRow
                      key={r.id}
                      result={r}
                      index={i}
                      isNew={isNew}
                      isLast={i === visible.length - 1}
                      onSelect={() => setSelectedId(r.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
