"use client";

import { useState } from "react";
import { ArtistResult, PLATFORMS } from "@/lib/mock-data";
import Photo from "@/components/ui/Photo";
import VerifiedBadge from "./VerifiedBadge";

interface ArtistRowProps {
  result: ArtistResult;
  index: number;
  isNew: boolean;
  isLast: boolean;
  onSelect: () => void;
}

export default function ArtistRow({ result, index, isNew, isLast, onSelect }: ArtistRowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      className={[
        "grid grid-cols-[72px_1fr_auto] gap-x-6 items-center py-[22px] cursor-pointer transition-opacity duration-200",
        !isLast && "border-b border-[var(--bd)]",
        hovered ? "opacity-100" : "opacity-75",
      ].filter(Boolean).join(" ")}
      style={{ animation: isNew ? `fadeUp 0.4s ease ${index * 0.04}s both` : "none" }}
    >
      <div className="w-[72px] h-[72px] overflow-hidden">
        <Photo seed={result.imgSeed} name={result.name} aspectPct="100%" size={150} radius={8} />
      </div>

      <div>
        <div className="flex items-center gap-2 font-display font-semibold text-[22px] tracking-[-0.02em] leading-[1.05] text-[var(--text)] mb-2">
          {result.name}
          {result.verified && <VerifiedBadge />}
        </div>
        <span className="font-body text-[12px] tracking-[0.02em] text-[var(--mid)]">
          {result.handle} · {result.genres.join(", ")}
        </span>
      </div>

      <div className="text-right">
        <div className="font-body text-[11px] tracking-[0.02em] text-[var(--mid)] mb-[6px]">
          {PLATFORMS[result.platform].label}
        </div>
        <div className="font-body text-[12px] text-[var(--dim)]">{result.stat}</div>
      </div>
    </div>
  );
}
