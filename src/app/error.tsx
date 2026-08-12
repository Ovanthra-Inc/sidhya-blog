"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-24 md:py-32">
        <div className="max-w-md w-full text-center flex flex-col items-center">
          {/* Warning Badge */}
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full mb-4">
            Something went wrong
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            An Unexpected Error Occurred
          </h1>

          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            We encountered a temporary error while loading this page. You can try refreshing or returning to the homepage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-bold text-white bg-black hover:bg-gray-800 px-6 py-3 rounded-full transition-all shadow-sm cursor-pointer"
            >
              🔄 Try Again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-full transition-all cursor-pointer"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
