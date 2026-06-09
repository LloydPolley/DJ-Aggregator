"use client";

import { useState } from "react";

interface PhotoProps {
  seed: string;
  name: string;
  size?: number;
  radius?: number;
  aspectPct?: string;
}

export default function Photo({ seed, name, size = 400, radius = 10, aspectPct = "100%" }: PhotoProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      className="relative w-full bg-[var(--s1)] overflow-hidden shrink-0"
      style={{ paddingTop: aspectPct, borderRadius: radius }}
    >
      {!error && (
        <img
          src={`https://picsum.photos/seed/${encodeURIComponent(seed)}/${size}/${size}`}
          alt={name}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms]"
          style={{
            filter: "grayscale(35%) contrast(1.02) brightness(0.96) saturate(0.9)",
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
      {(!loaded || error) && (
        <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-[var(--text)]/[0.16] tracking-[-0.02em] text-[clamp(28px,8vw,46px)]">
          {initials}
        </div>
      )}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(20,20,23,0.55) 0%, transparent 100%)" }}
      />
    </div>
  );
}
