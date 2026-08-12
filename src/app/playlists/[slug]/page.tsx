import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import SafeImage from "@/components/ui/SafeImage";
import { CourseJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sidhya.studio";
  const playlistUrl = `${baseUrl}/playlists/${playlist.slug}`;
  const coverUrl = playlist.cover.startsWith("http") ? playlist.cover : `${baseUrl}${playlist.cover}`;

  return {
    title: `${playlist.title} | Playlist Masterclass Series`,
    description: playlist.description,
    alternates: {
      canonical: `/playlists/${playlist.slug}`,
    },
    openGraph: {
      title: `${playlist.title} | Masterclass Series`,
      description: playlist.description,
      url: playlistUrl,
      type: "website",
      images: [{ url: coverUrl, alt: playlist.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${playlist.title} | Masterclass Series`,
      description: playlist.description,
      images: [coverUrl],
    },
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
      <CourseJsonLd
        title={playlist.title}
        description={playlist.description}
        slug={playlist.slug}
        posts={playlist.posts.map((p) => ({ title: p.title, slug: p.slug }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Playlists", url: "/playlists" },
          { name: playlist.title, url: `/playlists/${playlist.slug}` },
        ]}
      />

      <main className="px-6 md:px-20 pt-10 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Playlist Hero Banner */}
        <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-gray-800">
          <div className="flex-1 z-10">
            <span className="inline-block px-3 py-1 bg-blue-600/30 text-blue-300 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 border border-blue-400/30">
              {playlist.category} PLAYLIST
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {playlist.title}
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed mb-6">
              {playlist.description}
            </p>
            <div className="flex items-center gap-4">
              {firstPostSlug && (
                <Link
                  href={`/posts/${firstPostSlug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-full transition-colors inline-block"
                >
                  Start Series (Part 1) →
                </Link>
              )}
              <span className="text-xs text-gray-400 font-semibold">
                {playlist.posts.length} Articles Total
              </span>
            </div>
          </div>

          <div className="relative w-full md:w-80 h-56 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
            <SafeImage
              src={playlist.cover}
              alt={playlist.title}
              fallbackTitle={playlist.title}
              category={playlist.category}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Modules & Posts Accordion */}
        <div className="flex flex-col gap-8 mb-16 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Course Curriculum
          </h2>

          {playlist.modules.map((mod, modIdx) => (
            <div key={modIdx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 flex items-center justify-between">
                <span>{mod.title}</span>
                <span className="text-xs text-gray-400 font-normal">{mod.posts.length} Lessons</span>
              </h3>

              <div className="flex flex-col gap-3">
                {mod.posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-xs transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-4">
                      <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {post.formattedIndex}
                      </span>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                        {post.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 flex-shrink-0">
                      <span>{post.readTime}</span>
                      <span className="group-hover:translate-x-1 transition-transform text-blue-600">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
