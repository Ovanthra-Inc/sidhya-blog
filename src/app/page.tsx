import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import TopBlogs from "./components/TopBlogs";
import LatestBlogs from "./components/LatestBlogs";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100/60">
      <div className="mx-auto w-full flex flex-col flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content Area: SearchBar & TopBlogs seamlessly integrated with zero black gap */}
        <main className="flex flex-col bg-white rounded-b-3xl shadow-xs relative z-20">
          <SearchBar />
          <TopBlogs />
          <div className="border-t border-gray-100 my-4" />
          <LatestBlogs posts={posts} />
        </main>

        {/* Newsletter Section */}
        <div className="py-16 bg-white">
          <NewsletterSection />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
