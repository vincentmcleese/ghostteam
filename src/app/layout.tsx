import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// --- SEO and Sharing Metadata ---
const siteTitle = "Ghost Team AI - Your AI Automation Partner";
const siteDescription =
  "We build custom AI automations to streamline your business processes and boost productivity.";
const siteUrl = "https://www.growthteam.ai"; // <-- Replace with your actual domain
const siteImage = "/images/og-image.png"; // <-- Create an engaging Open Graph image (1200x630px) and place it here

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  // Favicons and Icons
  icons: {
    icon: "/images/favicon.ico", // Updated path
    apple: "/images/apple-touch-icon.png", // Updated path
  },
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: siteDescription,
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
      <head>
        <GoogleAnalytics />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
