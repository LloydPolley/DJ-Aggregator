"use client";

import { RefObject, useState } from "react";

interface SearchFieldProps {
  inputRef?: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  large?: boolean;
}

export default function SearchField({
  inputRef,
  value,
  onChange,
  onSubmit,
  loading,
  large,
}: SearchFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full"
    >
      <div
        className="flex items-center gap-3.5 bg-panel transition-[border-color,box-shadow] duration-200"
        style={{
          border: `1px solid ${focused ? "#34343a" : "#232326"}`,
          boxShadow: focused ? "0 0 0 4px rgba(241,239,234,0.04)" : "none",
          borderRadius: large ? 16 : 12,
          padding: large ? "17px 18px" : "12px 14px",
        }}
      >
        {/* Search icon */}
        <span className="shrink-0" style={{ color: focused || value ? "#f1efea" : "#8b8b91" }}>
          <svg width={large ? 18 : 15} height={large ? 18 : 15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={large ? "Search artists, DJs, genres…" : "Search again…"}
          className="flex-1 bg-transparent border-none outline-none font-ui text-fg placeholder:text-muted"
          style={{ fontSize: large ? 18 : 15, letterSpacing: "-0.01em" }}
        />

        {value && !loading && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 text-muted hover:text-fg transition-colors duration-150 cursor-pointer border-none bg-transparent p-0.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}

        {loading ? (
          <div
            className="w-4 h-4 rounded-full shrink-0"
            style={{
              border: "2px solid #34343a",
              borderTopColor: "#f1efea",
              animation: "spin 0.8s linear infinite",
            }}
          />
        ) : value ? (
          <button
            type="submit"
            className="shrink-0 bg-fg text-ink font-ui text-[13px] font-semibold rounded-[9px] hover:opacity-85 transition-opacity cursor-pointer border-none"
            style={{ padding: large ? "9px 16px" : "7px 13px" }}
          >
            Search
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 shrink-0 font-ui text-[11px] font-semibold text-muted bg-panel2 border border-line rounded-[7px] px-2 py-1">
            ⌘ K
          </span>
        )}
      </div>
    </form>
  );
}
