"use client";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/Search/SearchBar";

export default function Hero() {
  const router = useRouter();

  const onSearch = (name: string) => {
    router.push(`?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 text-center">
      <div className="space-y-2 my-10">
        <p className="">AN ODYSSEY THROUGH SOUND</p>
        <h1 className="text-2xl font-bold">Find any DJ, artist or producer</h1>
      </div>
      <SearchBar onSearch={onSearch} loading={false} />
    </div>
  );
}
