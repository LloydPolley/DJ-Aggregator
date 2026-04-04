"use client";

import { useState } from "react";

interface Props {
  onSearch: (name: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 w-full max-w-2xl mx-auto"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a DJ..."
        className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-lg"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
