import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const description =
  "Brief a lead agent in the harness you already use. It writes the tasks, a builder takes each one, and a fresh reviewer on another model checks every pull request, on your own server while you're away. You decide what merges.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Skelcrew · your own team of coding agents",
  description,
  icons: {
    icon: "/skel-icon.png",
    apple: "/skel-icon.png",
  },
  openGraph: {
    siteName: "Skelcrew",
    title: "Skelcrew · your own team of coding agents",
    description:
      "Your own team of coding agents, working while you're away. Open source, on your own server.",
    url: site.url,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Skelcrew: your own team of coding agents, working while you're away.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0e0e0d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
