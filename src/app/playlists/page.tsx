import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import { getAllPlaylists } from "@/lib/playlists";

export const metadata = {
  title: "Playlists | SIDHYA",
  description: "Curated series of technical posts organized step-by-step.",
};

export default function PlaylistsPage() {
  const playlists = getAllPlaylists();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-12 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Playlists & Series</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Structured step-by-step reading series. Follow a complete learning path from fundamentals to advanced production projects.
          </p>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {playlists.map((playlist) => (
            <Link
              key={playlist.slug}
              href={`/playlists/${playlist.slug}`}
              className="group flex flex-col md:flex-row gap-6 p-5 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
            >
              {/* Taller Image Height: 215px */}
              <div className="relative w-full md:w-60 h-52 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={playlist.cover}
                  alt={playlist.title}
                  fill
                  sizes="260px"
                  className="object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                    <span>{playlist.category}</span>
                    <span>•</span>
                    <span>{playlist.posts.length} Posts</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {playlist.title}
                  </h2>

                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {playlist.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Start Series →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
