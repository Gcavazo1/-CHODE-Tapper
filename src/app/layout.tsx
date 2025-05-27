import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/global.scss";
import FloatingMusicButton from "@/components/FloatingMusicButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: Replace placeholder URLs and image paths before deployment
const siteUrl = "https://chode-tapper.vercel.app/"; // Updated to live Vercel URL!
const siteName = "$CHODE Tapper: Girth to Earn";
const siteDescription = "Tap. Accumulate. Ascend. The hyper-casual, meme-driven idle tapper where you TAP THE ALMIGHTY $CHODE ICON to generate $GIRTH. Embrace the absurd, join the Chodeverse!";
const socialImage = `${siteUrl}/images/social-preview.jpg`; // Placeholder image path (e.g., 1200x630)
const twitterHandle = "@GigaCode_Dev"; // Placeholder Twitter handle

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  keywords: ["chode tapper", "girth to earn", "idle tapper", "clicker game", "crypto game", "web3 game", "meme coin", "degen", "girth", "blockchain game"],
  authors: [{ name: "GigaChode" }],
  // themeColor: "#FF00FF", // Electric Girth Pink - Consider uncommenting or choosing a specific theme color
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: socialImage,
        width: 1200, // Recommended width
        height: 630, // Recommended height
        alt: "$CHODE Tapper: Girth to Earn - Official Game Art",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    siteId: "", // Optional: Your Twitter user ID
    creator: twitterHandle,
    creatorId: "", // Optional: Your Twitter user ID for the creator tag
    images: [socialImage],
  },

  // Optional: Add more specific metadata if needed, like for robots or viewport
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <FloatingMusicButton />
      </body>
    </html>
  );
}
