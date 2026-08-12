import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import PostsTabExplorer from "@/components/posts/PostsTabExplorer";
import { getPostsByCategory, getAllCategories, getAllPosts } from "@/lib/posts";
import { CollectionJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: cat.toLowerCase() }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  const formattedCategory =
    category.toUpperCase() === "AI"
      ? "AI"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${formattedCategory} Articles & Benchmarks`,
    description: `Explore all ${posts.length} engineering guides, benchmarks, and production breakdowns under the ${formattedCategory} category on SIDHYA Blog.`,
    alternates: {
      canonical: `/categories/${category.toLowerCase()}`,
    },
    openGraph: {
      title: `${formattedCategory} Technical Articles | SIDHYA`,
      description: `Explore technical guides and benchmarks and production breakdowns ${formattedCategory}.`,
      url: `https://sidhya.studio/categories/${category.toLowerCase()}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedCategory} Technical Articles | SIDHYA`,
      description: `Explore technical guides and benchmarks under ${formattedCategory}.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const categoryPosts = getPostsByCategory(category);

  const formattedCategory =
    category.toUpperCase() === "AI"
      ? "AI"
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CollectionJsonLd
        title={`${formattedCategory} Articles`}
        description={`Technical articles and benchmarks under ${formattedCategory}`}
        url={`/categories/${category.toLowerCase()}`}
        itemCount={categoryPosts.length}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Posts", url: "/posts" },
          { name: formattedCategory, url: `/categories/${category.toLowerCase()}` },
        ]}
      />

      <main className="px-6 md:px-20 pt-24 md:pt-28 pb-16 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Instant Client-Side Tab Switcher */}
        <PostsTabExplorer
          allPosts={allPosts}
          categories={categories}
          initialCategory={category}
        />
      </main>

      <Footer />
    </div>
  );
}
