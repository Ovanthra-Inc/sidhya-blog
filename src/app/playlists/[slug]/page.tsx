import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import { getPlaylistBySlug, getAllPlaylists } from "@/lib/playlists";

interface PlaylistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const playlists = getAllPlaylists();
  return playlists.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PlaylistPageProps) {
  const { slug } = await params;
  const playlist = getPlaylistBySlug(slug);
  if (!playlist) return {};

  return {
    title: `${playlist.title} | Playlist Series`,
    description: playlist.description,
  };
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const { slug } = await params;
  const playlist = getPlaylistBySlug(slug);

  if (!playlist) {
    notFound();
  }

  const firstPostSlug = playlist.posts[0]?.slug;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Playlist Hero Banner */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 z-10">
            <span className="inline-block px-3 py-1 bg-blue-600/30 text-blue-300 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-blue-400/30">
              {playlist.category} PLAYLIST
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {playlist.title}
            </h1>
            <p className="text-gray-300 text-base max-w-2xl leading-relaxed mb-6">
              {playlist.description}
            </p>

            <div className="flex items-center gap-4">
              {firstPostSlug && (
                <Link
                  href={`/posts/${firstPostSlug}`}
                  className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 rounded-full text-xs transition-colors shadow-md cursor-pointer"
                >
                  Start Series (01) →
                </Link>
              )}
              <span className="text-xs text-gray-400">
                {playlist.posts.length} Posts Total • {playlist.modules.length} Topics
              </span>
            </div>
          </div>

          <div className="relative w-full md:w-80 h-56 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 z-10 border border-white/10">
            <Image
              src={playlist.cover}
              alt={playlist.title}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Playlist Topics & Modules */}
        <div className="max-w-4xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-8">
            CURRICULUM TOPICS & POSTS ({playlist.posts.length} ARTICLES)
          </h2>

          <div className="flex flex-col gap-10">
            {playlist.modules.map((mod, modIdx) => (
              <div key={modIdx} className="flex flex-col gap-4">
                {/* Topic Header Banner */}
                <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0" />
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                    {mod.title}
                  </h3>
                  <span className="text-xs font-semibold text-gray-400 ml-auto">
                    {mod.posts.length} {mod.posts.length === 1 ? "Post" : "Posts"}
                  </span>
                </div>

                {/* Posts under Topic */}
                <div className="flex flex-col gap-3">
                  {mod.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="group flex items-center justify-between p-5 rounded-2xl border border-gray-200 hover:border-blue-400 transition-all duration-200 cursor-pointer bg-white"
                    >
                      <div className="flex items-center gap-5">
                        <span className="font-mono text-2xl font-bold text-gray-300 group-hover:text-blue-600 transition-colors w-10">
                          {post.formattedIndex}
                        </span>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 group-hover:underline transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {post.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                          {post.readTime}
                        </span>
                        <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
