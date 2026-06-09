"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ArtistResult, Platform, PLATFORMS } from "@/lib/mock-data";
import SpotifyPlayer    from "@/components/players/SpotifyPlayer";
import YouTubePlayer    from "@/components/players/YouTubePlayer";
import SoundCloudPlayer from "@/components/players/SoundCloudPlayer";

interface ArtistModalProps {
  result: ArtistResult;
  onClose: () => void;
}

const TABS: Platform[] = ["spotify", "youtube", "soundcloud"];

export default function ArtistModal({ result, onClose }: ArtistModalProps) {
  const [tab, setTab] = useState<Platform>(result.platform);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex" style={{ animation: "fadeIn 0.3s ease both" }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(10,10,13,0.78)", backdropFilter: "blur(10px)" }}
      />

      {/* Panel */}
      <div
        className="relative z-10 grid w-full overflow-hidden m-auto bg-[var(--bg)] border border-[var(--bd)]"
        style={{
          gridTemplateColumns: "42% 58%",
          maxWidth: 1200,
          maxHeight: "92vh",
          borderRadius: 18,
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
          animation: "fadeUp 0.35s ease both",
        }}
      >
        {/* Left — full-bleed photo + identity */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={`https://picsum.photos/seed/${encodeURIComponent(result.imgSeed)}/800/1200`}
              alt={result.name}
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(35%) contrast(1.03) brightness(0.82) saturate(0.9)" }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #141417 0%, rgba(20,20,23,0.45) 50%, transparent 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 pb-9">
            <div className="font-body text-[11px] tracking-[0.05em] text-[var(--mid)] mb-[10px]">
              {result.genres.join(" · ")}
            </div>
            <div className="font-display font-bold text-[44px] tracking-[-0.03em] leading-none text-[var(--text)] mb-[10px]">
              {result.name}
            </div>
            <div className="flex items-center gap-3 font-body text-[11px] tracking-[0.03em] text-[var(--mid)]">
              <span>{result.handle}</span>
              <span className="text-[var(--dim)]">·</span>
              <span>{result.stat}</span>
              {result.verified && <><span className="text-[var(--dim)]">·</span><span>Verified</span></>}
            </div>
          </div>
        </div>

        {/* Right — player */}
        <div className="flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center justify-between px-8 border-b border-[var(--bd)] shrink-0">
            <div className="flex">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={[
                    "bg-transparent border-none cursor-pointer px-5 py-4 font-body text-[12px] tracking-[0.03em] transition-colors duration-150",
                    "-mb-px border-b",
                    tab === t ? "text-[var(--text)] border-[var(--text)]" : "text-[var(--mid)] border-transparent",
                  ].join(" ")}
                >
                  {PLATFORMS[t].label}
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="flex p-2 text-[var(--mid)] hover:text-[var(--text)] transition-colors duration-150 bg-transparent border-none cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable player */}
          <div className="flex-1 overflow-y-auto p-8">
            <div key={tab} style={{ animation: "fadeIn 0.25s ease both" }}>
              {tab === "spotify"    && <SpotifyPlayer    result={result} />}
              {tab === "youtube"    && <YouTubePlayer    result={result} />}
              {tab === "soundcloud" && <SoundCloudPlayer result={result} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
