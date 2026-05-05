import Hero from "@/components/layout/Hero";
import { searchDj } from "@/lib/api";
import DJProfile from "@/components/profile/DJProfile";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name } = await searchParams;

  const data = await searchDj(name || "");

  console.log(data);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="max-w-4xl flex-1">
        <Hero />
        <div id="embed-iframe"></div>

        {data && <DJProfile data={data} />}
      </div>
    </main>
  );
}
