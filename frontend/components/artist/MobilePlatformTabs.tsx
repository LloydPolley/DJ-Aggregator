import { Platform } from "@/lib/mock-data";
import { PLATFORM_CONFIG } from "@/lib/platform-config";

interface MobilePlatformTabsProps {
  platforms: Platform[];
  active: Platform;
  onChange: (p: Platform) => void;
}

export default function MobilePlatformTabs({ platforms, active, onChange }: MobilePlatformTabsProps) {
  return (
    <div className="lg:hidden sticky top-0 z-10 bg-ink border-b border-line flex gap-1 px-4 py-3">
      {platforms.map((p) => {
        const on = active === p;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`flex items-center gap-2 rounded-full font-ui text-xs font-medium border transition-all duration-150 cursor-pointer ${
              on ? "border-line2 bg-panel2 text-fg" : "border-transparent text-faint"
            }`}
            style={{ padding: "6px 12px" }}
          >
            <span className={on ? PLATFORM_CONFIG[p].color : "text-faint"}>
              {PLATFORM_CONFIG[p].icon}
            </span>
            {PLATFORM_CONFIG[p].label}
          </button>
        );
      })}
    </div>
  );
}
