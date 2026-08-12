import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import PostsTabExplorer from "@/components/posts/PostsTabExplorer";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export const metadata = {
  title: "All Technical Posts | SIDHYA",
  description: "Browse all articles, guides, and practical engineering tutorials by Asutosh Sidhya.",
  alternates: {
    canonical: "/posts",
  },
  openGraph: {
    title: "All Technical Posts | SIDHYA",
    description: "Browse all articles, guides, and practical engineering tutorials by Asutosh Sidhya.",
    url: "https://sidhya.studio/posts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Technical Posts | SIDHYA",
    description: "Browse all articles, guides, and practical engineering tutorials by Asutosh Sidhya.",
  },
};

interface PostsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { q } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Posts", url: "/posts" },
        ]}
      />

      <main className="px-6 md:px-20 pt-24 md:pt-28 pb-16 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Instant Client-Side Tab Switcher with 12 items (4 rows x 3 cols) & Stepper */}
        <PostsTabExplorer
          allPosts={allPosts}
          categories={categories}
          initialCategory="all"
          initialQuery={q || ""}
        />
      </main>

      <Footer />
    </div>
  );
}
