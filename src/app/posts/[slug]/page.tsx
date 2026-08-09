import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import AdSlot from "@/components/ads/AdSlot";
import PlaylistSidebar from "@/components/playlist/PlaylistSidebar";
import ArticleRenderer from "@/components/mdx/ArticleRenderer";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { getPostPlaylistContext } from "@/lib/playlists";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | SIDHYA`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const playlistContext = getPostPlaylistContext(slug);
  const allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 max-w-4xl tracking-tight">
          {post.title}
        </h1>

        {/* Category Badge - Migrated below Title */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            href={`/categories/${post.category.toLowerCase()}`}
            className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            {post.category}
          </Link>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 mb-6 max-w-3xl leading-relaxed">
          {post.description}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-600 mb-8 pb-6 border-b border-gray-100">
          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
            <Image
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span>By <strong className="font-semibold text-gray-900">{post.author}</strong></span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[350px] md:h-[520px] rounded-2xl overflow-hidden mb-12 bg-gray-100 shadow-xs">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Main Content Layout with Topic Playlist Sidebar on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Article Main Body (8 cols) */}
          <div className="lg:col-span-8">
            {/* <AdSlot position="article-top" /> */}

            <ArticleRenderer content={post.content} />

            {/* <AdSlot position="article-middle" /> */}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-100 flex-wrap">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* <AdSlot position="article-bottom" /> */}
          </div>

          {/* Right Sidebar: Connected Playlist & Topic Posts Sequence */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {playlistContext && (
              <PlaylistSidebar context={playlistContext} currentSlug={slug} />
            )}

            {/* <AdSlot position="sidebar" /> */}
          </aside>
        </div>

        {/* Related Posts */}
        <section className="pt-10 border-t border-gray-200">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
            READ MORE ARTICLES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/posts/${related.slug}`}
                className="group flex flex-col p-3 rounded-xl border border-transparent hover:border-gray-200 transition-all duration-200 cursor-pointer"
              >
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <Image
                    src={related.cover}
                    alt={related.title}
                    fill
                    sizes="(max-width: 780px) 100vw, 400px"
                    className="object-cover group-hover:scale-103 transition-transform duration-200"
                  />
                </div>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                  {related.category}
                </p>
                <h4 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 group-hover:underline transition-colors">
                  {related.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
