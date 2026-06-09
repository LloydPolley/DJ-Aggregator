"use client";

import { useState, useEffect } from "react";
import { ArtistResult } from "@/lib/mock-data";
import Photo from "@/components/ui/Photo";

export default function SpotifyPlayer({ result }: { result: ArtistResult }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const tracks = result.tracks || [];

  useEffect(() => {
    if (playing === null) return;
    const t = setInterval(() => setProgress((p) => (p >= 1 ? 0 : p + 0.004)), 100);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 pb-[18px] border-b border-[var(--bd)] mb-2">
        <div className="w-[52px] h-[52px] overflow-hidden shrink-0">
          <Photo seed={result.imgSeed + "-sq"} name={result.name} aspectPct="100%" size={100} radius={6} />
        </div>
        <div>
          <div className="font-display font-light text-[18px] tracking-[-0.01em] mb-1">{result.name}</div>
          <div className="font-body text-[11px] tracking-[0.04em] text-[var(--mid)]">Spotify · {result.stat}</div>
        </div>
      </div>

      {/* Tracks */}
      {tracks.map((track, i) => {
        const isPlaying = playing === i;
        return (
          <div
            key={i}
            onClick={() => { setPlaying(isPlaying ? null : i); setProgress(0); }}
            className={[
              "grid items-center gap-x-[14px] px-[10px] py-[11px] rounded-lg cursor-pointer transition-[background] duration-150",
              isPlaying ? "bg-[var(--s2)]" : "hover:bg-[var(--s1)]",
            ].join(" ")}
            style={{ gridTemplateColumns: "20px 1fr auto" }}
          >
            <span className={`font-body text-[12px] text-center ${isPlaying ? "text-[var(--text)]" : "text-[var(--dim)]"}`}>
              {isPlaying ? "▶" : i + 1}
            </span>
            <div>
              <div className={`font-body text-[11px] mb-0.5 ${isPlaying ? "text-[var(--text)]" : "text-[var(--text)]/80"}`}>
                {track.t}
              </div>
              {isPlaying && (
                <div className="h-[2px] bg-[var(--bd2)] rounded-sm mt-1 overflow-hidden">
                  <div className="h-full bg-[var(--text)] transition-[width] duration-100 linear" style={{ width: `${progress * 100}%` }} />
                </div>
              )}
            </div>
            <span className="font-body text-[12px] text-[var(--dim)] tracking-[0.05em]">{track.d}</span>
          </div>
        );
      })}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--bd)]">
        <span className="font-body text-[11px] tracking-[0.03em] text-[var(--dim)]">Top Tracks</span>
        <span className="font-body text-[11px] tracking-[0.02em] text-[var(--dim)]">Open in Spotify ↗</span>
      </div>
    </div>
  );
}
