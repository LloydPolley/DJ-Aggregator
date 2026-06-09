"use client";

import { useState, useEffect } from "react";
import { ArtistResult } from "@/lib/mock-data";
import Photo from "@/components/ui/Photo";
import Waveform from "@/components/ui/Waveform";

export default function SoundCloudPlayer({ result }: { result: ArtistResult }) {
  const [active, setActive]     = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const mixes = result.mixes || [];

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => (p >= 1 ? 0 : p + 0.003)), 100);
    return () => clearInterval(t);
  }, [playing]);

  const handleSelect = (i: number) => { setActive(i); setPlaying(false); setProgress(0); };

  return (
    <div>
      {/* Active mix */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-[14px]">
          <div className="w-12 h-12 overflow-hidden shrink-0">
            <Photo seed={result.imgSeed + "-sc-" + active} name={result.name} aspectPct="100%" size={100} radius={6} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display font-light text-[17px] tracking-[-0.01em] mb-1 truncate">
              {mixes[active]?.t}
            </div>
            <div className="font-body text-[11px] tracking-[0.03em] text-[var(--mid)]">
              {result.name} · {mixes[active]?.dur}
            </div>
          </div>
          <button
            onClick={() => setPlaying(!playing)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text)] bg-transparent cursor-pointer shrink-0 transition-[border-color] duration-150 hover:border-[var(--mid)]"
            style={{ border: "1px solid var(--bd2)" }}
          >
            {playing
              ? <span className="text-[10px]">⏸</span>
              : <div className="w-0 h-0 ml-[3px]" style={{ borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "12px solid var(--text)" }} />
            }
          </button>
        </div>

        <div className="mb-2 cursor-pointer" onClick={() => setPlaying(!playing)}>
          <Waveform seed={result.imgSeed + active} playing={playing} progress={progress} height={52} />
        </div>

        <div className="flex items-center gap-[10px]">
          <span className="font-body text-[11px] text-[var(--dim)] shrink-0">{Math.floor(progress * 100)}%</span>
          <div className="flex-1 h-px bg-[var(--bd2)] cursor-pointer">
            <div className="h-full bg-[var(--mid)] transition-[width] duration-100 linear" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="font-body text-[11px] text-[var(--dim)] shrink-0">{mixes[active]?.dur}</span>
        </div>
      </div>

      {/* Mix list */}
      <div className="border-t border-[var(--bd)] pt-2">
        {mixes.map((mix, i) => (
          <div
            key={i}
            onClick={() => handleSelect(i)}
            className={[
              "flex items-center justify-between px-[10px] py-[11px] cursor-pointer rounded-lg transition-[background] duration-150",
              active === i ? "bg-[var(--s2)]" : "hover:bg-[var(--s1)]",
            ].join(" ")}
          >
            <div className="flex-1 min-w-0 mr-3">
              <div className={`font-body text-[11px] mb-[3px] truncate ${active === i ? "text-[var(--text)]" : "text-[var(--text)]/70"}`}>
                {mix.t}
              </div>
              <div className="font-body text-[11px] text-[var(--dim)] tracking-[0.01em]">
                {mix.plays} plays · {mix.dur}
              </div>
            </div>
            {active === i && playing && (
              <div className="flex gap-0.5 items-center shrink-0">
                {[0, 1, 2].map((b) => (
                  <div key={b} className="w-0.5 h-[14px] bg-[var(--mid)] rounded-sm" style={{ animation: `waveAnim 0.5s ease-in-out ${b * 0.15}s infinite` }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-3 pt-3 border-t border-[var(--bd)]">
        <span className="font-body text-[11px] tracking-[0.02em] text-[var(--dim)]">Open in SoundCloud ↗</span>
      </div>
    </div>
  );
}
