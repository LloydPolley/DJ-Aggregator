"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_DATA, ArtistResult, Platform } from "@/lib/mock-data";
import SearchField from "@/components/search/SearchField";

const SUGGESTIONS = ["Peggy Gou", "Four Tet", "DJ Koze", "Techno"];

const PLATFORM_CONFIG = {
  spotify: {
    label: "Spotify",
    color: "text-spotify",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.8-.87 7.07-.5 9.71 1.11.3.18.39.57.22.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.66-6.79-2.14-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.49.71.25 1.07zm.1-2.85C14.82 8.98 9.5 8.8 6.42 9.73a.93.93 0 11-.54-1.78c3.53-1.07 9.4-.86 13.1 1.33a.93.93 0 11-.95 1.6z" />
      </svg>
    ),
  },
  soundcloud: {
    label: "SoundCloud",
    color: "text-soundcloud",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 14.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zm2-1.5v5a.5.5 0 001 0v-5a.5.5 0 00-1 0zm2-1v6a.5.5 0 001 0v-6a.5.5 0 00-1 0zm2-1.2v7a.5.5 0 001 0v-7a.5.5 0 00-1 0zM10.5 9v9a.5.5 0 00.5.5h8.2a3.3 3.3 0 00.3-6.59 5.2 5.2 0 00-9.06-2.65.6.6 0 00.06.74V9z" />
      </svg>
    ),
  },
  youtube: {
    label: "YouTube",
    color: "text-youtube",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.5 7.2a2.7 2.7 0 00-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 001.5 7.2 28 28 0 001 12a28 28 0 00.5 4.8 2.7 2.7 0 001.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 001.9-1.9A28 28 0 0023 12a28 28 0 00-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
      </svg>
    ),
  },
} as const;

const IMAGE_FILTER = "grayscale(35%) contrast(1.02) brightness(0.95) saturate(0.9)";

function VerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-verified text-[#0b3d1e] shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function SkeletonRow() {
  return (
    <div className="grid items-center py-5 border-b border-line" style={{ gridTemplateColumns: "56px 1fr auto", columnGap: 18 }}>
      <div className="w-14 h-14 rounded-lg bg-panel2" style={{ animation: "shimmer 1.4s ease infinite", background: "linear-gradient(90deg,#1d1d20 25%,#262629 50%,#1d1d20 75%)", backgroundSize: "300% 100%" }} />
      <div className="flex flex-col gap-2">
        <div className="h-5 w-36 rounded bg-panel2" style={{ animation: "shimmer 1.4s ease infinite", background: "linear-gradient(90deg,#1d1d20 25%,#262629 50%,#1d1d20 75%)", backgroundSize: "300% 100%" }} />
        <div className="h-3 w-48 rounded bg-panel2" style={{ animation: "shimmer 1.4s ease 0.1s infinite", background: "linear-gradient(90deg,#1d1d20 25%,#262629 50%,#1d1d20 75%)", backgroundSize: "300% 100%" }} />
      </div>
      <div className="h-3 w-16 rounded bg-panel2" style={{ animation: "shimmer 1.4s ease 0.2s infinite", background: "linear-gradient(90deg,#1d1d20 25%,#262629 50%,#1d1d20 75%)", backgroundSize: "300% 100%" }} />
    </div>
  );
}

function ResultRow({ artist, isLast, onView }: { artist: ArtistResult; isLast: boolean; onView: () => void }) {
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
        View profile{" "}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-150 group-hover:translate-x-[3px]">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);
  const [results, setResults] = useState<ArtistResult[]>([]);
  const [loading, setLoading] = useState(!!initialQ);
  const [hasSearched, setHasSearched] = useState(!!initialQ);
  const [enabledPlatforms, setEnabledPlatforms] = useState<Set<Platform>>(
    new Set(["spotify", "soundcloud", "youtube"])
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runSearch = useCallback((q: string) => {
    setLoading(true);
    setEnabledPlatforms(new Set(["spotify", "soundcloud", "youtube"]));
    setTimeout(() => {
      const ql = q.toLowerCase();
      const found = MOCK_DATA.filter(
        (r) =>
          r.name.toLowerCase().includes(ql) ||
          r.genres.some((g) => g.toLowerCase().includes(ql)) ||
          r.handle.toLowerCase().includes(ql)
      );
      setResults(found);
      setSubmitted(q);
      setLoading(false);
      setHasSearched(true);
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
    [router]
  );

  const clearAll = () => {
    setQuery("");
    setResults([]);
    setSubmitted("");
    setHasSearched(false);
    setEnabledPlatforms(new Set(["spotify", "soundcloud", "youtube"]));
    router.replace("/");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const togglePlatform = (p: Platform) => {
    setEnabledPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const platformCounts = (["spotify", "soundcloud", "youtube"] as Platform[]).reduce(
    (acc, p) => {
      acc[p] = results.filter((r) => r.platforms.includes(p)).length;
      return acc;
    },
    {} as Record<Platform, number>
  );

  const visible = results.filter((r) =>
    r.platforms.some((p) => enabledPlatforms.has(p))
  );

  return (
    <div className="min-h-screen flex flex-col items-center px-8 bg-ink">
      {/* ── HOME ── */}
      {!hasSearched && (
        <div
          className="w-full max-w-[640px] flex flex-col items-center"
          style={{ paddingTop: "15vh", animation: "fadeUp 0.7s ease both" }}
        >
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 font-ui font-medium text-[12.5px] text-muted mb-[30px] px-[15px] py-[7px] border border-line rounded-full bg-panel">
            <span
              className="rounded-full shrink-0"
              style={{ width: 6, height: 6, background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
            />
            Search every platform at once
          </div>

          {/* Headline */}
          <div className="text-center mb-[52px] w-full">
            <h1
              className="font-display font-bold text-fg"
              style={{ fontSize: 72, letterSpacing: "-0.035em", lineHeight: 0.95 }}
            >
              Find any DJ.
            </h1>
            <p className="font-ui text-base text-muted mt-4">
              One search across Spotify, YouTube &amp; SoundCloud.
            </p>
          </div>

          {/* Search field */}
          <div className="w-full mb-[22px]">
            <SearchField
              inputRef={inputRef}
              value={query}
              onChange={setQuery}
              onSubmit={() => doSearch(query)}
              loading={loading}
              large
            />
          </div>

          {/* Suggestion chips */}
          <div className="flex gap-1.5 flex-wrap justify-center mb-[52px]">
            {SUGGESTIONS.map((hint) => (
              <button
                key={hint}
                onClick={() => {
                  setQuery(hint);
                  router.replace(`/?q=${encodeURIComponent(hint)}`);
                }}
                className="bg-panel border border-line rounded-full font-ui text-[13px] font-medium text-muted hover:text-fg hover:border-muted transition-[color,border-color] duration-150 whitespace-nowrap cursor-pointer"
                style={{ padding: "8px 16px" }}
              >
                {hint}
              </button>
            ))}
          </div>

          {/* Platform badges */}
          <div className="flex gap-[18px] items-center">
            {(["spotify", "youtube", "soundcloud"] as Platform[]).map((p) => (
              <span key={p} className="flex items-center gap-2 font-ui text-[12.5px] font-medium text-muted">
                <span className={PLATFORM_CONFIG[p].color}>
                  {/* 16px icon */}
                  {p === "spotify" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.8-.87 7.07-.5 9.71 1.11.3.18.39.57.22.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.66-6.79-2.14-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.49.71.25 1.07zm.1-2.85C14.82 8.98 9.5 8.8 6.42 9.73a.93.93 0 11-.54-1.78c3.53-1.07 9.4-.86 13.1 1.33a.93.93 0 11-.95 1.6z" />
                    </svg>
                  )}
                  {p === "youtube" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.5 7.2a2.7 2.7 0 00-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 001.5 7.2 28 28 0 001 12a28 28 0 00.5 4.8 2.7 2.7 0 001.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 001.9-1.9A28 28 0 0023 12a28 28 0 00-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
                    </svg>
                  )}
                  {p === "soundcloud" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 14.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zm2-1.5v5a.5.5 0 001 0v-5a.5.5 0 00-1 0zm2-1v6a.5.5 0 001 0v-6a.5.5 0 00-1 0zm2-1.2v7a.5.5 0 001 0v-7a.5.5 0 00-1 0zM10.5 9v9a.5.5 0 00.5.5h8.2a3.3 3.3 0 00.3-6.59 5.2 5.2 0 00-9.06-2.65.6.6 0 00.06.74V9z" />
                    </svg>
                  )}
                </span>
                {PLATFORM_CONFIG[p].label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {hasSearched && (
        <div
          className="w-full max-w-[760px] pt-10 pb-24"
          style={{ animation: "fadeIn 0.4s ease both" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-line pb-5 mb-7">
            <button
              onClick={clearAll}
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

          {/* Compact search */}
          <div className="max-w-[500px] mb-[18px]">
            <SearchField
              inputRef={inputRef}
              value={query}
              onChange={(v) => {
                setQuery(v);
                if (!v) clearAll();
              }}
              onSubmit={() => doSearch(query)}
              loading={loading}
            />
          </div>

          {/* Platform toggles */}
          <div className="flex items-center gap-2.5 flex-wrap mb-2">
            <span className="font-ui text-[10px] font-semibold uppercase text-faint mr-0.5" style={{ letterSpacing: "0.1em" }}>
              Platforms
            </span>
            {(["spotify", "soundcloud", "youtube"] as Platform[]).map((p) => {
              const on = enabledPlatforms.has(p);
              return (
                <button
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`flex items-center gap-2 rounded-full font-ui text-xs font-medium border transition-all duration-150 cursor-pointer ${
                    on
                      ? "border-line2 bg-panel2 text-fg"
                      : "border-line text-faint opacity-65"
                  }`}
                  style={{ padding: "7px 14px" }}
                >
                  <span className={on ? PLATFORM_CONFIG[p].color : "text-faint"}>
                    {PLATFORM_CONFIG[p].icon}
                  </span>
                  {PLATFORM_CONFIG[p].label}
                  <span className={`text-[10px] font-semibold ${on ? "text-muted" : ""}`}>
                    {platformCounts[p]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          )}

          {/* No results */}
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

          {/* No matches after platform filter */}
          {!loading && results.length > 0 && visible.length === 0 && (
            <div className="pt-20 text-center" style={{ animation: "fadeUp 0.5s ease both" }}>
              <p className="font-display font-semibold text-[22px] tracking-tight text-fg">
                No matches on the selected platforms
              </p>
            </div>
          )}

          {/* Result rows */}
          {!loading && visible.length > 0 && (
            <div style={{ animation: "fadeIn 0.3s ease both" }}>
              {visible.map((artist, i) => (
                <ResultRow
                  key={artist.id}
                  artist={artist}
                  isLast={i === visible.length - 1}
                  onView={() => router.push(`/artist/${artist.id}?back=${encodeURIComponent(`/?q=${encodeURIComponent(submitted)}`)}`)}
                />
              ))}
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
