"use client";

import { useState } from "react";
import { ArtistResult, PLATFORMS } from "@/lib/mock-data";
import Photo from "@/components/ui/Photo";
import VerifiedBadge from "./VerifiedBadge";

interface ArtistCardProps {
  result: ArtistResult;
  index: number;
  isNew: boolean;
  onSelect: () => void;
}

export default function ArtistCard({ result, index, isNew, onSelect }: ArtistCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      className="cursor-pointer transition-transform duration-[250ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
      style={{
        animation: isNew ? `fadeUp 0.5s ease ${index * 0.06}s both` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      <Photo seed={result.imgSeed} name={result.name} aspectPct="118%" radius={10} />

      <div className="pt-[14px]">
        <div className="flex items-center gap-2 font-display font-semibold text-[18px] tracking-[-0.02em] leading-[1.05] text-[var(--text)] mb-[10px]">
          {result.name}
          {result.verified && <VerifiedBadge />}
        </div>
        <div className="flex items-center justify-between border-t border-[var(--bd)] pt-[9px]">
          <span className="font-body text-[11px] tracking-[0.02em] text-[var(--mid)]">
            {result.genres.join(" · ")}
          </span>
          <span className="font-body text-[11px] tracking-[0.02em] text-[var(--dim)]">
            {PLATFORMS[result.platform].label}
          </span>
        </div>
      </div>
    </div>
  );
}
