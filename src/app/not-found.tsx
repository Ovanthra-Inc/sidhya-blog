import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-24 md:py-32">
        <div className="max-w-md w-full text-center flex flex-col items-center">
          {/* Badge */}
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full mb-4">
            404 Error
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Page Not Found
          </h1>

          <p className="text-sm md:text-base text-gray-500 mb-8 leading-relaxed">
            The article, playlist, or page you were looking for doesn&apos;t exist or may have been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-bold text-white bg-black hover:bg-gray-800 px-6 py-3 rounded-full transition-all shadow-sm cursor-pointer"
            >
              ← Back to Home
            </Link>
            <Link
              href="/posts"
              className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-full transition-all cursor-pointer"
            >
              Browse All Posts
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
