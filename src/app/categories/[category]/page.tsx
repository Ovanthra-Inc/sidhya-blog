import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import CategoryPostsGrid from "@/components/category/CategoryPostsGrid";
import { getPostsByCategory, getAllCategories, getAllPosts } from "@/lib/posts";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: cat.toLowerCase() }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const categories = getAllCategories();
  const allPostsCount = getAllPosts().length;

  const formattedCategory =
    category.toUpperCase() === "AI"
      ? "AI"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-16 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Category Header Banner */}
        <div className="mb-8 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              CATEGORY EXPLORER
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
              {formattedCategory} Articles
            </h1>
            <p className="text-gray-600 text-sm max-w-xl leading-relaxed">
              Explore all technical guides, benchmarks, and production breakdowns under the <strong>{formattedCategory}</strong> category.
            </p>
          </div>

          <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl text-center shadow-xs flex-shrink-0">
            <span className="text-3xl font-extrabold text-blue-600 block">{posts.length}</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {posts.length === 1 ? "Article" : "Articles"} Available
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/posts"
            className="px-4 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            All Posts ({allPostsCount})
          </Link>
          {categories.map((cat) => {
            const isSelected = cat.toLowerCase() === category.toLowerCase();
            const displayCat = cat.toUpperCase() === "AI" ? "AI" : cat;
            return (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {displayCat}
              </Link>
            );
          })}
        </div>

        {/* Posts Grid with Max 6 Posts per Page & Functional Stepper */}
        <CategoryPostsGrid posts={posts} categoryName={formattedCategory} />
      </main>

      <Footer />
    </div>
  );
}
