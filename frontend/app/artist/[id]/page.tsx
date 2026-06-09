import { Suspense } from "react";
import { use } from "react";
import { MOCK_DATA } from "@/lib/mock-data";
import ProfileContent from "@/components/artist/ProfileContent";

function ArtistLoader({ id }: { id: string }) {
  const artist = MOCK_DATA.find((a) => a.id === parseInt(id));

  if (!artist) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <p className="font-display font-semibold text-2xl text-fg">Artist not found</p>
      </div>
    );
  }

  return <ProfileContent artist={artist} />;
}

export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense>
      <ArtistLoader id={id} />
    </Suspense>
  );
}
