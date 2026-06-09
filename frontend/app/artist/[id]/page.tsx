"use client";

import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MOCK_DATA } from "@/lib/mock-data";

const IMAGE_FILTER = "grayscale(35%) contrast(1.02) brightness(0.95) saturate(0.9)";

const WAVEFORM_HEIGHTS = [51,43,35,26,29,48,58,48,55,28,35,28,43,32,44,25,43,44,55,24,39,48,58,20,40,48,52,35,43,27,27,30,48,42,55,55,23,44,59,27,29,51,24,36,44,29,37,46,42,18,39,35,46,29,50,18];

function Waveform() {
  return (
    <div className="flex items-center gap-[1.5px] flex-1 min-w-0" style={{ height: 30 }}>
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-[1px]"
          style={{ height: `${h}%`, background: "rgba(255,85,0,.30)" }}
        />
      ))}
    </div>
  );
}

function ProfileContent({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const backUrl = searchParams.get("back") ?? "/";

  const artist = MOCK_DATA.find((a) => a.id === parseInt(id));

  if (!artist) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <p className="font-display font-semibold text-2xl text-fg">Artist not found</p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-16 items-start mx-auto bg-ink min-h-screen"
      style={{ maxWidth: 1140, gridTemplateColumns: "260px 1fr", padding: "48px 48px 120px" }}
    >
      {/* ── Sidebar ── */}
      <aside className="sticky flex flex-col" style={{ top: 48 }}>
        <button
          onClick={() => router.push(backUrl)}
          className="font-ui text-xs text-muted hover:text-fg flex items-center gap-2.5 mb-9 transition-colors duration-150 cursor-pointer bg-transparent border-none self-start"
          style={{ letterSpacing: "0.03em" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to results
        </button>

        <img
          src={`https://picsum.photos/seed/${artist.avatarSeed}/400/400`}
          className="rounded-full object-cover"
          style={{ filter: IMAGE_FILTER, width: 104, height: 104 }}
          alt=""
        />

        <div className="flex items-center gap-2.5 mt-5 mb-3">
          <h1
            className="font-display font-bold text-3xl tracking-tight text-fg whitespace-nowrap"
            style={{ lineHeight: 1.05 }}
          >
            {artist.name}
          </h1>
          {artist.verified && (
            <span
              className="inline-flex items-center justify-center rounded-full bg-verified text-[#0b3d1e] shrink-0"
              style={{ width: 17, height: 17 }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
          )}
        </div>

        <div className="font-ui text-xs text-muted mb-[18px]" style={{ letterSpacing: "0.03em" }}>
          {artist.handle}
        </div>

        <div className="flex gap-1.5 flex-wrap mb-[26px]">
          {artist.genres.map((g) => (
            <span key={g} className="font-ui text-[11px] font-medium text-faint border border-line rounded-full" style={{ padding: "3px 9px" }}>
              {g}
            </span>
          ))}
        </div>

        <div className="font-ui text-[10px] font-semibold uppercase text-faint mb-3.5" style={{ letterSpacing: "0.1em" }}>
          Found on
        </div>
        <div className="flex gap-2.5">
          {artist.platforms.includes("spotify") && (
            <div className="flex items-center justify-center rounded-[9px] border border-line bg-panel text-spotify" style={{ width: 36, height: 36 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.8-.87 7.07-.5 9.71 1.11.3.18.39.57.22.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.66-6.79-2.14-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.49.71.25 1.07zm.1-2.85C14.82 8.98 9.5 8.8 6.42 9.73a.93.93 0 11-.54-1.78c3.53-1.07 9.4-.86 13.1 1.33a.93.93 0 11-.95 1.6z" />
              </svg>
            </div>
          )}
          {artist.platforms.includes("soundcloud") && (
            <div className="flex items-center justify-center rounded-[9px] border border-line bg-panel text-soundcloud" style={{ width: 36, height: 36 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 14.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zm2-1.5v5a.5.5 0 001 0v-5a.5.5 0 00-1 0zm2-1v6a.5.5 0 001 0v-6a.5.5 0 00-1 0zm2-1.2v7a.5.5 0 001 0v-7a.5.5 0 00-1 0zM10.5 9v9a.5.5 0 00.5.5h8.2a3.3 3.3 0 00.3-6.59 5.2 5.2 0 00-9.06-2.65.6.6 0 00.06.74V9z" />
              </svg>
            </div>
          )}
          {artist.platforms.includes("youtube") && (
            <div className="flex items-center justify-center rounded-[9px] border border-line bg-panel text-youtube" style={{ width: 36, height: 36 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 7.2a2.7 2.7 0 00-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 001.5 7.2 28 28 0 001 12a28 28 0 00.5 4.8 2.7 2.7 0 001.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 001.9-1.9A28 28 0 0023 12a28 28 0 00-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
              </svg>
            </div>
          )}
        </div>
      </aside>

      {/* ── Content ── */}
      <main className="min-w-0" style={{ maxWidth: 800 }}>
        {/* Spotify */}
        {artist.spotify && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-spotify">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.8-.87 7.07-.5 9.71 1.11.3.18.39.57.22.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.66-6.79-2.14-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.49.71.25 1.07zm.1-2.85C14.82 8.98 9.5 8.8 6.42 9.73a.93.93 0 11-.54-1.78c3.53-1.07 9.4-.86 13.1 1.33a.93.93 0 11-.95 1.6z" />
                  </svg>
                </span>
                <span className="font-display font-semibold tracking-tight text-fg" style={{ fontSize: 21 }}>Spotify</span>
              </div>
              <a href="#" className="font-ui text-[11px] text-faint hover:text-muted transition-colors duration-150" style={{ letterSpacing: "0.03em" }}>
                Open in Spotify ↗
              </a>
            </div>

            <div className="font-ui text-[11px] text-faint mb-[18px]" style={{ letterSpacing: "0.03em" }}>
              {artist.spotify.handle} · {artist.spotify.stat}
            </div>

            {artist.spotify.topTracks.map((track, i) => (
              <div
                key={i}
                className="grid items-center px-3 py-3 rounded-lg hover:bg-panel cursor-pointer"
                style={{ gridTemplateColumns: "24px 1fr auto", columnGap: 16 }}
              >
                <span className="font-ui text-xs text-faint text-center">{i + 1}</span>
                <div className="min-w-0">
                  <div className="font-ui text-[13px] text-fg/85 truncate">{track.name}</div>
                  <div className="font-ui text-[11px] text-faint truncate">{track.album}</div>
                </div>
                <span className="font-ui text-xs text-faint">{track.dur}</span>
              </div>
            ))}
          </section>
        )}

        {/* SoundCloud */}
        {artist.soundcloud && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-soundcloud">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 14.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zm2-1.5v5a.5.5 0 001 0v-5a.5.5 0 00-1 0zm2-1v6a.5.5 0 001 0v-6a.5.5 0 00-1 0zm2-1.2v7a.5.5 0 001 0v-7a.5.5 0 00-1 0zM10.5 9v9a.5.5 0 00.5.5h8.2a3.3 3.3 0 00.3-6.59 5.2 5.2 0 00-9.06-2.65.6.6 0 00.06.74V9z" />
                  </svg>
                </span>
                <span className="font-display font-semibold tracking-tight text-fg" style={{ fontSize: 21 }}>SoundCloud</span>
              </div>
              <a href="#" className="font-ui text-[11px] text-faint hover:text-muted transition-colors duration-150" style={{ letterSpacing: "0.03em" }}>
                Open in SoundCloud ↗
              </a>
            </div>

            {/* Profile link card */}
            <a
              href="#"
              className="flex items-center gap-3 p-3 mb-6 border border-line rounded-[10px] bg-panel hover:bg-panel2 hover:border-line2 transition-all duration-150"
            >
              <img
                src={`https://picsum.photos/seed/${artist.avatarSeed}-sc/400/400`}
                className="w-10 h-10 rounded-full object-cover"
                style={{ filter: IMAGE_FILTER }}
                alt=""
              />
              <div className="flex-1 min-w-0">
                <div className="font-ui text-[13px] text-fg mb-0.5">{artist.soundcloud.handle}</div>
                <div className="font-ui text-[11px] text-faint">{artist.soundcloud.stat}</div>
              </div>
              <span className="font-ui text-[11px] text-muted whitespace-nowrap" style={{ letterSpacing: "0.03em" }}>
                View profile ↗
              </span>
            </a>

            <div className="font-ui text-[11px] font-semibold uppercase text-muted mb-3.5" style={{ letterSpacing: "0.08em" }}>
              Search Results
            </div>

            {artist.soundcloud.searchResults.map((track, i) => (
              <div key={i} className="flex items-center gap-4 px-3 py-3.5 rounded-lg hover:bg-panel cursor-pointer">
                <button
                  className="rounded-full border border-line2 flex items-center justify-center shrink-0 hover:border-soundcloud transition-colors duration-150 cursor-pointer bg-transparent"
                  style={{ width: 34, height: 34 }}
                >
                  <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid #f1efea", marginLeft: 2 }} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="font-ui text-[13px] text-fg/85 truncate">{track.title}</span>
                    <span className="font-ui text-[11px] text-faint shrink-0">{track.dur}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Waveform />
                    <span className="font-ui text-[11px] text-faint shrink-0 whitespace-nowrap">
                      {track.uploader} · {track.plays} plays
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* YouTube */}
        {artist.youtube && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-youtube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.5 7.2a2.7 2.7 0 00-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 001.5 7.2 28 28 0 001 12a28 28 0 00.5 4.8 2.7 2.7 0 001.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 001.9-1.9A28 28 0 0023 12a28 28 0 00-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
                  </svg>
                </span>
                <span className="font-display font-semibold tracking-tight text-fg" style={{ fontSize: 21 }}>YouTube</span>
              </div>
              <a href="#" className="font-ui text-[11px] text-faint hover:text-muted transition-colors duration-150" style={{ letterSpacing: "0.03em" }}>
                Open in YouTube ↗
              </a>
            </div>

            {/* Channel link card */}
            <a
              href="#"
              className="flex items-center gap-3 p-3 mb-6 border border-line rounded-[10px] bg-panel hover:bg-panel2 hover:border-line2 transition-all duration-150"
            >
              <img
                src={`https://picsum.photos/seed/${artist.avatarSeed}-yt/400/400`}
                className="w-10 h-10 rounded-full object-cover"
                style={{ filter: IMAGE_FILTER }}
                alt=""
              />
              <div className="flex-1 min-w-0">
                <div className="font-ui text-[13px] text-fg mb-0.5">{artist.youtube.handle}</div>
                <div className="font-ui text-[11px] text-faint">{artist.youtube.stat}</div>
              </div>
              <span className="font-ui text-[11px] text-muted whitespace-nowrap" style={{ letterSpacing: "0.03em" }}>
                View channel ↗
              </span>
            </a>

            <div className="font-ui text-[11px] font-semibold uppercase text-muted mb-3.5" style={{ letterSpacing: "0.08em" }}>
              Search Results
            </div>

            <div className="flex flex-col gap-5">
              {artist.youtube.searchResults.map((video, i) => (
                <a key={i} href="#" className="grid gap-4 items-start" style={{ gridTemplateColumns: "160px 1fr" }}>
                  <div className="relative">
                    <div className="relative rounded-lg overflow-hidden bg-panel" style={{ paddingTop: "56.25%" }}>
                      <img
                        src={`https://picsum.photos/seed/${artist.avatarSeed}-yts-${i}/480/270`}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: "grayscale(30%) brightness(0.9)" }}
                        alt=""
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="rounded-full border border-white/55 bg-black/25 flex items-center justify-center"
                          style={{ width: 34, height: 34, backdropFilter: "blur(3px)" }}
                        >
                          <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "9px solid rgba(240,237,232,.85)", marginLeft: 2 }} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-1.5 right-1.5 font-ui text-[10px] text-white bg-black/80 px-1.5 py-0.5 rounded">
                      {video.dur}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="font-ui text-[13px] text-fg leading-snug mb-1.5">{video.title}</div>
                    <div className="font-ui text-[11px] text-faint mb-0.5">{video.channel}</div>
                    <div className="font-ui text-[11px] text-faint">{video.views} views · {video.date}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense>
      <ProfileContent id={id} />
    </Suspense>
  );
}
