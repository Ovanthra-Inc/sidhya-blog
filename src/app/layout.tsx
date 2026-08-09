import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
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
  title: "SIDHYA – Minimalist AI & Engineering Blog",
  description: "Technical publishing platform for autonomous AI agents, RAG architecture, vector search benchmarks, and Next.js 16 by Asutosh Sidhya.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-s.png", type: "image/png" },
      { url: "/logo-s.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: "/logo-s.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
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
