"use client";

import { useState } from "react";
import { ArtistResult } from "@/lib/mock-data";
import Photo from "@/components/ui/Photo";

const EQBar = ({ delay }: { delay: string }) => (
  <div className="w-1 h-5 bg-[var(--text)]/80 rounded-sm" style={{ animation: `waveAnim 0.6s ease-in-out ${delay} infinite` }} />
);

const PlayTriangle = ({ size = "large" }: { size?: "large" | "small" }) =>
  size === "large" ? (
    <div className="w-0 h-0 ml-1" style={{ borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "18px solid rgba(240,237,232,0.9)" }} />
  ) : (
    <div className="w-0 h-0 ml-0.5" style={{ borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid rgba(240,237,232,0.7)" }} />
  );

export default function YouTubePlayer({ result }: { result: ArtistResult }) {
  const [active, setActive]   = useState(0);
  const [playing, setPlaying] = useState(false);
  const videos = result.videos || [];

  return (
    <div className="flex flex-col">
      {/* Hero video */}
      <div className="relative cursor-pointer mb-[18px]" onClick={() => setPlaying(!playing)}>
        <div className="relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
          <Photo seed={result.imgSeed + "-yt-" + active} name={result.name} aspectPct="56.25%" size={800} radius={0} />

          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ border: "1.5px solid rgba(240,237,232,0.6)", backdropFilter: "blur(4px)" }}>
                <PlayTriangle size="large" />
              </div>
            </div>
          )}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
              <div className="flex gap-1 items-center">
                <EQBar delay="0s" />
                <EQBar delay="0.15s" />
                <EQBar delay="0.3s" />
              </div>
            </div>
          )}

          <div className="absolute bottom-[10px] right-[10px] font-body text-[12px] text-[var(--text)] bg-black/70 px-[7px] py-[3px]">
            {videos[active]?.v}
          </div>
        </div>

        <div className="pt-3 pb-2">
          <div className="font-display font-light text-[17px] tracking-[-0.01em] mb-[6px]">{videos[active]?.t}</div>
          <div className="font-body text-[11px] tracking-[0.02em] text-[var(--mid)]">{videos[active]?.views} views</div>
        </div>
      </div>

      {/* Video list */}
      <div className="border-t border-[var(--bd)] pt-3 flex flex-col">
        {videos.map((v, i) => (
          <div
            key={i}
            onClick={() => { setActive(i); setPlaying(false); }}
            className={[
              "grid gap-x-3 items-center px-2 py-[10px] cursor-pointer rounded-lg transition-[background] duration-150",
              active === i ? "bg-[var(--s2)]" : "hover:bg-[var(--s1)]",
            ].join(" ")}
            style={{ gridTemplateColumns: "80px 1fr auto" }}
          >
            <div className="h-11 overflow-hidden relative">
              <Photo seed={result.imgSeed + "-yt-" + i} name={result.name} aspectPct="56.25%" size={200} radius={4} />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayTriangle size="small" />
              </div>
            </div>
            <div>
              <div className={`font-body text-[10px] leading-[1.4] mb-1 ${active === i ? "text-[var(--text)]" : "text-[var(--text)]/70"}`}>{v.t}</div>
              <div className="font-body text-[11px] text-[var(--dim)] tracking-[0.01em]">{v.views} views</div>
            </div>
            <span className="font-body text-[12px] text-[var(--dim)]">{v.v}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-3 pt-3 border-t border-[var(--bd)]">
        <span className="font-body text-[11px] tracking-[0.02em] text-[var(--dim)]">Open in YouTube ↗</span>
      </div>
    </div>
  );
}
