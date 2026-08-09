import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // <- Importera Next.js Script-komponent
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jämför Fotbollsbiljetter 2026", // Passade på att uppdatera titeln från standardtexten!
  description: "Hitta och jämför de bästa priserna på fotbollsbiljetter i Europa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv" // Ändrat till svenska om din sajt är på svenska
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1cb7f2dd-609f-494d-887a-b774ab467eaa"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}