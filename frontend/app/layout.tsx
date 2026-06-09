import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Find any DJ",
  description: "Discover DJs and their music across Spotify, YouTube & SoundCloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${schibsted.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-mono), Helvetica, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
