"use client";

import { RefObject, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchFieldProps {
  inputRef?: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  loading?: boolean;
  large?: boolean;
}

export default function SearchField({ inputRef, value, onChange, onSubmit, loading, large }: SearchFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(e); }} className="w-full">
      <div
        className="flex items-center gap-[14px] bg-[var(--s1)] transition-[border-color,box-shadow] duration-200"
        style={{
          border: `1px solid ${focused ? "var(--bd2)" : "var(--bd)"}`,
          boxShadow: focused ? "0 0 0 4px rgba(241,239,234,0.04)" : "none",
          borderRadius: large ? 16 : 12,
          padding: large ? "17px 18px" : "12px 14px",
        }}
      >
        <Search
          size={large ? 18 : 15}
          className="shrink-0 transition-colors duration-200"
          style={{ color: focused || value ? "var(--text)" : "var(--mid)" }}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={large ? "Search artists, DJs, genres…" : "Search again…"}
          className="flex-1 bg-transparent border-none outline-none text-[var(--text)] font-body tracking-[-0.01em]"
          style={{ fontSize: large ? 18 : 15 }}
        />

        {value && !loading && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex p-1 rounded-[6px] text-[var(--mid)] hover:text-[var(--text)] transition-colors duration-150 cursor-pointer border-none bg-transparent"
          >
            <X size={14} />
          </button>
        )}

        {loading ? (
          <div
            className="w-[15px] h-[15px] rounded-full shrink-0"
            style={{ border: "2px solid var(--bd2)", borderTopColor: "var(--text)", animation: "djSpin 0.8s linear infinite" }}
          />
        ) : value ? (
          <button
            type="submit"
            className="shrink-0 bg-[var(--text)] text-[var(--bg)] font-body text-[13px] font-semibold rounded-[9px] transition-opacity duration-150 hover:opacity-85 cursor-pointer border-none"
            style={{ padding: large ? "9px 16px" : "7px 13px" }}
          >
            Search
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 shrink-0 font-body text-[11px] font-semibold text-[var(--mid)] bg-[var(--s2)] border border-[var(--bd)] rounded-[7px] px-2 py-1">
            ⌘ K
          </span>
        )}
      </div>
    </form>
  );
}
