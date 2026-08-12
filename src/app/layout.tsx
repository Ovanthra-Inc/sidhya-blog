import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import { WebSiteJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sidhya.studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SIDHYA – Minimalist AI & Engineering Blog",
    template: "%s | SIDHYA",
  },
  description:
    "Technical publishing platform for autonomous AI agents, RAG architecture, vector search benchmarks, and Next.js 16 by Asutosh Sidhya.",
  keywords: [
    "AI Engineering",
    "Autonomous AI Agents",
    "RAG Architecture",
    "Vector Databases",
    "Next.js 16",
    "React 19",
    "TypeScript",
    "LLM Evaluation",
    "Asutosh Sidhya",
  ],
  authors: [{ name: "Asutosh Sidhya", url: SITE_URL }],
  creator: "Asutosh Sidhya",
  publisher: "SIDHYA Blog",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-s.png", type: "image/png" },
      { url: "/logo-s.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo-s.png",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    title: "SIDHYA – Minimalist AI & Engineering Blog",
    description:
      "Technical publishing platform for autonomous AI agents, RAG architecture, vector search benchmarks, and Next.js 16 by Asutosh Sidhya.",
    url: SITE_URL,
    siteName: "SIDHYA Blog",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/logo-s.png`,
        width: 512,
        height: 512,
        alt: "SIDHYA Blog Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIDHYA – Minimalist AI & Engineering Blog",
    description:
      "Technical publishing platform for autonomous AI agents, RAG architecture, vector search benchmarks, and Next.js 16 by Asutosh Sidhya.",
    images: [`${SITE_URL}/logo-s.png`],
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
        {/* Persistent Navbar across all routes */}
        <Navbar />

        {children}

        {/* Vercel Web Analytics */}
        <Analytics />

        {/* Google Analytics 4 via Native Next.js Script */}
        {gaId && gaId !== "G-XXXXXXXXXX" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
