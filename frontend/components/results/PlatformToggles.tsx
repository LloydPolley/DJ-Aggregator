import { Platform } from "@/lib/mock-data";
import { PLATFORM_CONFIG } from "@/lib/platform-config";

interface PlatformTogglesProps {
  enabled: Set<Platform>;
  counts: Record<Platform, number>;
  onToggle: (p: Platform) => void;
}

export default function PlatformToggles({ enabled, counts, onToggle }: PlatformTogglesProps) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap mb-2">
      <span className="font-ui text-[10px] font-semibold uppercase text-faint mr-0.5" style={{ letterSpacing: "0.1em" }}>
        Platforms
      </span>
      {(["spotify", "soundcloud", "youtube"] as Platform[]).map((p) => {
        const on = enabled.has(p);
        return (
          <button
            key={p}
            onClick={() => onToggle(p)}
            className={`flex items-center gap-2 rounded-full font-ui text-xs font-medium border transition-all duration-150 cursor-pointer ${
              on ? "border-line2 bg-panel2 text-fg" : "border-line text-faint opacity-65"
            }`}
            style={{ padding: "7px 14px" }}
          >
            <span className={on ? PLATFORM_CONFIG[p].color : "text-faint"}>
              {PLATFORM_CONFIG[p].icon}
            </span>
            {PLATFORM_CONFIG[p].label}
            <span className={`text-[10px] font-semibold ${on ? "text-muted" : ""}`}>
              {counts[p]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
