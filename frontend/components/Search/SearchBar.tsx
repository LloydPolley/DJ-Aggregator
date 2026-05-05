"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import AppTextInput from "../inputs/AppTextInput";

interface Props {
  onSearch: (name: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 w-full max-w-2xl mx-auto"
    >
      <div className="w-full relative">
        <AppTextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for a DJ, artist or producer"
          leftIcon={<Search className="w-5 h-5 text-gray-400" />}
        />
      </div>
    </form>
  );
}
