import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const description =
  "Skel runs Claude Code on your server, many sessions at once, each in its own sandbox. Every issue ends as a pull request a fresh agent has reviewed. You merge.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Skel · Claude Code, always on",
  description,
  icons: {
    icon: "/skel-icon.png",
    apple: "/skel-icon.png",
  },
  openGraph: {
    siteName: "Skel",
    title: "Skel · Claude Code, always on",
    description:
      "Issues in, reviewed pull requests out, while your laptop is closed. Open source at first release.",
    url: site.url,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Skel: Claude Code, always on.",
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
