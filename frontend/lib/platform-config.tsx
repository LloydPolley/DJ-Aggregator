import { Platform } from "./mock-data";

export const IMAGE_FILTER = "grayscale(35%) contrast(1.02) brightness(0.95) saturate(0.9)";

export const PLATFORM_CONFIG: Record<
  Platform,
  { label: string; color: string; icon: React.ReactNode }
> = {
  spotify: {
    label: "Spotify",
    color: "text-spotify",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.22c3.8-.87 7.07-.5 9.71 1.11.3.18.39.57.22.86zm1.23-2.74a.78.78 0 01-1.07.26c-2.69-1.66-6.79-2.14-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.57 11.24 1.33.37.22.49.71.25 1.07zm.1-2.85C14.82 8.98 9.5 8.8 6.42 9.73a.93.93 0 11-.54-1.78c3.53-1.07 9.4-.86 13.1 1.33a.93.93 0 11-.95 1.6z" />
      </svg>
    ),
  },
  soundcloud: {
    label: "SoundCloud",
    color: "text-soundcloud",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 14.5v3a.5.5 0 001 0v-3a.5.5 0 00-1 0zm2-1.5v5a.5.5 0 001 0v-5a.5.5 0 00-1 0zm2-1v6a.5.5 0 001 0v-6a.5.5 0 00-1 0zm2-1.2v7a.5.5 0 001 0v-7a.5.5 0 00-1 0zM10.5 9v9a.5.5 0 00.5.5h8.2a3.3 3.3 0 00.3-6.59 5.2 5.2 0 00-9.06-2.65.6.6 0 00.06.74V9z" />
      </svg>
    ),
  },
  youtube: {
    label: "YouTube",
    color: "text-youtube",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.5 7.2a2.7 2.7 0 00-1.9-1.9C18.9 4.8 12 4.8 12 4.8s-6.9 0-8.6.5A2.7 2.7 0 001.5 7.2 28 28 0 001 12a28 28 0 00.5 4.8 2.7 2.7 0 001.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 001.9-1.9A28 28 0 0023 12a28 28 0 00-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
      </svg>
    ),
  },
};
