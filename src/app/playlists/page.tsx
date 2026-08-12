import Link from "next/link";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import SafeImage from "@/components/ui/SafeImage";
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
            <Link
              key={playlist.slug}
              href={`/playlists/${playlist.slug}`}
              prefetch={true}
              className="group flex flex-col rounded-none border-0 transition-all duration-200 cursor-pointer bg-white"
            >
              {/* Taller Image Container (h-[340px] sharp square) */}
              <div className="relative w-full h-[340px] rounded-none overflow-hidden mb-4 bg-gray-100">
                <SafeImage
                  src={playlist.cover}
                  alt={playlist.title}
                  fallbackTitle={playlist.title}
                  category={playlist.category}
                  fill
                  sizes="(max-width: 780px) 100vw, 420px"
                  className="object-cover group-hover:scale-103 transition-transform duration-300 rounded-none"
                />
              </div>

              {/* Category Badge & Post Count */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
                  {playlist.category} PLAYLIST
                </span>
                <span className="font-semibold text-gray-700 text-xs">{playlist.posts.length} Lessons</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
                {playlist.title}
              </h2>

              {/* Description */}
              <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                {playlist.description}
              </p>

              {/* Footer */}
              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Start Series →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
