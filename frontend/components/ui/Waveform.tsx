"use client";

import { useMemo } from "react";

interface WaveformProps {
  seed: string;
  playing: boolean;
  progress?: number;
  height?: number;
}

export default function Waveform({ seed, playing, progress = 0.35, height = 48 }: WaveformProps) {
  const bars = useMemo(() => {
    const arr: number[] = [];
    let s = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    for (let i = 0; i < 80; i++) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      arr.push(0.15 + (Math.abs(s) / 0xffffffff) * 0.85);
    }
    return arr;
  }, [seed]);

  return (
    <div className="flex items-end overflow-hidden gap-[1.5px]" style={{ height }}>
      {bars.map((h, i) => {
        const played = i / bars.length < progress;
        return (
          <div
            key={i}
            className="flex-1 transition-[background] duration-100 origin-bottom"
            style={{
              height: `${h * 100}%`,
              background: played ? "rgba(240,237,232,0.7)" : "rgba(240,237,232,0.15)",
              animation: playing && played ? `waveAnim ${0.4 + h * 0.6}s ease-in-out ${i * 0.02}s infinite` : "none",
            }}
          />
        );
      })}
    </div>
  );
}
