"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DJProfile from "@/components/DJProfile";

export default function Home() {
  const [djData, setDjData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (name: string) => {
    setLoading(true);
    setError(null);
    setDjData(null);

    try {
      const res = await fetch(
        `http://localhost:3001/api/dj/search?name=${encodeURIComponent(name)}`,
      );
      if (!res.ok) throw new Error("Failed to fetch DJ data");
      const data = await res.json();
      setDjData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">DJ Search</h1>
          <p className="text-gray-400 text-lg">
            Search any DJ to see their music, videos and more
          </p>
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && <p className="text-red-400 text-center mt-8">{error}</p>}

        {djData && <DJProfile data={djData} />}
      </div>
    </main>
  );
}
