"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_DATA, ArtistResult } from "@/lib/mock-data";
import HeroSection from "./HeroSection";
import ResultsSection from "./ResultsSection";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);
  const [results, setResults] = useState<ArtistResult[]>([]);
  const [loading, setLoading] = useState(!!initialQ);
  const [hasSearched, setHasSearched] = useState(!!initialQ);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runSearch = useCallback((q: string) => {
    setLoading(true);
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
    [router],
  );

  const clearAll = () => {
    setQuery("");
    setResults([]);
    setSubmitted("");
    setHasSearched(false);
    router.replace("/");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-8 bg-ink">
      {!hasSearched && (
        <HeroSection
          inputRef={inputRef}
          query={query}
          loading={loading}
          onChange={setQuery}
          onSubmit={() => doSearch(query)}
          onSuggestion={(hint) => {
            setQuery(hint);
            router.replace(`/?q=${encodeURIComponent(hint)}`);
          }}
        />
      )}

      {hasSearched && (
        <ResultsSection
          inputRef={inputRef}
          submitted={submitted}
          query={query}
          results={results}
          visible={results}
          loading={loading}
          onChange={setQuery}
          onSubmit={() => doSearch(query)}
          onClear={clearAll}
          onViewArtist={(id) =>
            router.push(
              `/artist/${id}?back=${encodeURIComponent(`/?q=${encodeURIComponent(submitted)}`)}`,
            )
          }
        />
      )}
    </div>
  );
}
