import Navbar from "./components/Navbar";
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
      <div className=" mx-auto w-full flex flex-col flex-1">
        {/* Top Navbar with rounded bottom corners */}
        <Navbar />

        {/* Hero Section */}
        <div>
          <HeroSection />
          {/* Search Bar floats directly on bottom of Hero section with zero gap */}
          <SearchBar />
        </div>

        {/* Main Content Area */}
        <main className="flex flex-col bg-white rounded-b-3xl shadow-xs">
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
