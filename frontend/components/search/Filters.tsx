"use client";

import { Platform } from "@/lib/mock-data";

type FilterValue = "all" | Platform;

interface FiltersProps {
  active: FilterValue;
  onChange: (f: FilterValue) => void;
  counts: Record<string, number>;
}

const TABS: { id: FilterValue; label: string }[] = [
  { id: "all",        label: "All" },
  { id: "spotify",    label: "Spotify" },
  { id: "youtube",    label: "YouTube" },
  { id: "soundcloud", label: "SoundCloud" },
];

export default function Filters({ active, onChange, counts }: FiltersProps) {
  return (
    <div className="inline-flex gap-1 p-1 bg-[var(--s1)] border border-[var(--bd)] rounded-full">
      {TABS.map((tab) => {
        const isA  = active === tab.id;
        const count = tab.id === "all" ? counts.all : (counts[tab.id] || 0);
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={[
              "inline-flex items-center gap-[7px] px-4 py-2 rounded-full border-none cursor-pointer",
              "font-body font-medium text-[13px] transition-[background,color] duration-150",
              isA ? "bg-[var(--text)] text-[var(--bg)]" : "bg-transparent text-[var(--mid)] hover:text-[var(--text)]",
            ].join(" ")}
          >
            {tab.label}
            <span
              className="text-[11px] font-semibold px-[7px] py-px rounded-full"
              style={{ background: isA ? "rgba(20,20,23,0.14)" : "var(--s2)" }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
