import Link from "next/link";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import PlaylistCard from "@/components/playlist/PlaylistCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllPlaylists } from "@/lib/playlists";

export const metadata = {
  title: "Playlists & Series | SIDHYA",
  description: "Structured step-by-step masterclass series covering AI engineering, vector databases, and Next.js 16.",
  alternates: {
    canonical: "/playlists",
  },
  openGraph: {
    title: "Playlists & Series | SIDHYA",
    description: "Structured step-by-step masterclass series covering AI engineering, vector databases, and Next.js 16.",
    url: "https://sidhya.studio/playlists",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playlists & Series | SIDHYA",
    description: "Structured step-by-step masterclass series covering AI engineering, vector databases, and Next.js 16.",
  },
};

export default function PlaylistsPage() {
  const playlists = getAllPlaylists();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Playlists", url: "/playlists" },
        ]}
      />

      <main className="px-6 md:px-20 pt-24 md:pt-28 pb-16 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Playlists & Series</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Structured step-by-step reading series. Follow a complete learning path from fundamentals to advanced production projects.
          </p>
        </div>

        {/* Playlists Grid matching exact Post Card style (Border-0, Sharp Square, Taller Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.slug} playlist={playlist} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
