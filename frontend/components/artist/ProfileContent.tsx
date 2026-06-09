"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArtistResult, Platform } from "@/lib/mock-data";
import ArtistSidebar from "./ArtistSidebar";
import MobileArtistHeader from "./MobileArtistHeader";
import MobilePlatformTabs from "./MobilePlatformTabs";
import SpotifySection from "./SpotifySection";
import SoundCloudSection from "./SoundCloudSection";
import YouTubeSection from "./YouTubeSection";

interface ProfileContentProps {
  artist: ArtistResult;
}

export default function ProfileContent({ artist }: ProfileContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Platform>(artist.platforms[0]);
  const [enabledPlatforms, setEnabledPlatforms] = useState<Set<Platform>>(new Set(artist.platforms));

  function handleBack() {
    router.back();
  }

  function togglePlatform(p: Platform) {
    setEnabledPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(p) && next.size > 1) {
        next.delete(p);
      } else {
        next.add(p);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-ink">
      <MobileArtistHeader artist={artist} onBack={handleBack} />
      <MobilePlatformTabs platforms={artist.platforms} active={activeTab} onChange={setActiveTab} />

      <div
        className="mx-auto px-4 sm:px-8 py-8 lg:py-16 lg:grid lg:gap-16"
        style={{ maxWidth: 1100, gridTemplateColumns: "220px 1fr" } as React.CSSProperties}
      >
        <ArtistSidebar
          artist={artist}
          backUrl="/"
          onBack={handleBack}
          enabledPlatforms={enabledPlatforms}
          onTogglePlatform={togglePlatform}
        />

        <main className="min-w-0">
          {artist.spotify && (
            <div className={`${activeTab === "spotify" ? "block" : "hidden"} ${enabledPlatforms.has("spotify") ? "lg:block" : "lg:hidden"}`}>
              <SpotifySection data={artist.spotify} />
            </div>
          )}
          {artist.soundcloud && (
            <div className={`${activeTab === "soundcloud" ? "block" : "hidden"} ${enabledPlatforms.has("soundcloud") ? "lg:block" : "lg:hidden"}`}>
              <SoundCloudSection data={artist.soundcloud} avatarSeed={artist.avatarSeed} />
            </div>
          )}
          {artist.youtube && (
            <div className={`${activeTab === "youtube" ? "block" : "hidden"} ${enabledPlatforms.has("youtube") ? "lg:block" : "lg:hidden"}`}>
              <YouTubeSection data={artist.youtube} avatarSeed={artist.avatarSeed} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
