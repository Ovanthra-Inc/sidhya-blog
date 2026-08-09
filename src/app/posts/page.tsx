import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export const metadata = {
  title: "All Technical Posts | SIDHYA",
  description: "Browse all articles, guides, and practical engineering tutorials by Asutosh Sidhya.",
};

interface PostsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const searchQuery = (q || "").toLowerCase().trim();

  const filteredPosts = searchQuery
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.description.toLowerCase().includes(searchQuery) ||
          post.category.toLowerCase().includes(searchQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      )
    : allPosts;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">All Posts</h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Technical guides, AI agent architecture, vector search benchmarks, and fullstack engineering articles.
          </p>
        </div>

        {/* Search Query Feedback */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
            <span>
              Search results for: <strong>&quot;{q}&quot;</strong> ({filteredPosts.length} posts found)
            </span>
            <Link href="/posts" className="underline font-semibold hover:text-blue-700">
              Clear Search
            </Link>
          </div>
        )}

        {/* Categories Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/posts"
            className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              !searchQuery
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Posts ({allPosts.length})
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat.toLowerCase()}`}
              className="px-4 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-base font-semibold mb-2">No matching posts found</p>
            <p className="text-xs mb-4">Try searching for keywords like AI, RAG, Next.js, or Vector DB.</p>
            <Link href="/posts" className="text-xs font-bold text-blue-600 underline">
              View all posts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex flex-col p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xs transition-all duration-200 cursor-pointer"
              >
                {/* Taller Image Height: h-64 (256px) */}
                <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 780px) 100vw, 380px"
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                  {post.description}
                </p>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="/avatar.jpg"
                        alt="Asutosh Sidhya"
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
