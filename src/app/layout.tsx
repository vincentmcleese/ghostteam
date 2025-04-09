import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO and Sharing Metadata ---
const siteTitle = "GhostTeam.ai | Agentic Marketing & Growth Automation";
const siteDescription =
  "We partner with lean businesses to orchestrate unlimited AI agentic workflows that rival the power of a full growth team. Get your AI workforce.";
const siteUrl = "https://www.growthteam.ai"; // <-- Replace with your actual domain
const siteImage = "/images/og-image.png"; // <-- Create an engaging Open Graph image (1200x630px) and place it here

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | GhostTeam.ai`,
  },
  description: siteDescription,
  // Favicons and Icons
  icons: {
    icon: "/favicon.ico", // Place favicon.ico in /public
    apple: "/apple-touch-icon.png", // Place apple-touch-icon.png in /public
  },
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "GhostTeam.ai",
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: "GhostTeam.ai - AI Growth Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
    // creator: '@yourTwitterHandle', // Optional: Add your Twitter handle
  },
  // More metadata...
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
// --- End Metadata ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Favicon links are now handled by Next.js metadata object */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
