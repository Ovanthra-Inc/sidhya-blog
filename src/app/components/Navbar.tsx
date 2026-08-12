"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SafeImage from "@/components/ui/SafeImage";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md ${mobileMenuOpen ? "rounded-b-none" : "rounded-b-[20px] md:rounded-b-[32px]"} shadow-sm px-4 md:px-16 py-3.5 flex flex-col relative transition-all mx-3 sm:mx-8 md:mx-16 lg:mx-20 -mb-16`}>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" prefetch={true} className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
            <SafeImage
              src="/logo-s.png"
              alt="SIDHYA Logo"
              fallbackTitle="SIDHYA"
              category="LOGOTYPE"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <span className="font-extrabold text-lg md:text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            SIDHYA
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link
            href="/"
            prefetch={true}
            className={`transition-colors ${isActive("/") ? "text-black font-semibold" : "hover:text-black"}`}
          >
            Home
          </Link>
          <Link
            href="/posts"
            prefetch={true}
            className={`transition-colors ${isActive("/posts") ? "text-black font-semibold" : "hover:text-black"}`}
          >
            Posts
          </Link>
          <Link
            href="/playlists"
            prefetch={true}
            className={`transition-colors ${isActive("/playlists") ? "text-black font-semibold" : "hover:text-black"}`}
          >
            Playlists
          </Link>
          <Link
            href="/about"
            prefetch={true}
            className={`transition-colors ${isActive("/about") ? "text-black font-semibold" : "hover:text-black"}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            prefetch={true}
            className={`transition-colors ${isActive("/contact") ? "text-black font-semibold" : "hover:text-black"}`}
          >
            Contact
          </Link>
        </div>

        {/* Right User Avatar & Direct Contact Trigger & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get in Touch
          </a>

          <Link
            href="/about"
            prefetch={true}
            className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-blue-500 transition-all flex-shrink-0"
            title="Asutosh Sidhya"
          >
            <SafeImage
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
              fallbackTitle="Asutosh Sidhya"
              category="AUTHOR"
              fill
              sizes="36px"
              className="object-cover"
            />
          </Link>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-600 hover:text-black rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 z-50 grid transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "grid-rows-[1fr] opacity-100 pointer-events-auto"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden bg-white/95 backdrop-blur-md rounded-b-[20px] md:rounded-b-[32px] shadow-lg border-t border-gray-100/80">
          <div className="px-4 pb-5 pt-3 flex flex-col gap-3 text-sm font-medium text-gray-700 max-h-[calc(100vh-80px)] overflow-y-auto">
            <Link
              href="/"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 px-2 rounded-lg transition-colors ${isActive("/") ? "bg-gray-100 text-black font-semibold" : "hover:bg-gray-50"}`}
            >
              Home
            </Link>
            <Link
              href="/posts"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 px-2 rounded-lg transition-colors ${isActive("/posts") ? "bg-gray-100 text-black font-semibold" : "hover:bg-gray-50"}`}
            >
              All Posts
            </Link>
            <Link
              href="/playlists"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 px-2 rounded-lg transition-colors ${isActive("/playlists") ? "bg-gray-100 text-black font-semibold" : "hover:bg-gray-50"}`}
            >
              Playlists & Series
            </Link>
            <Link
              href="/about"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 px-2 rounded-lg transition-colors ${isActive("/about") ? "bg-gray-100 text-black font-semibold" : "hover:bg-gray-50"}`}
            >
              About Asutosh
            </Link>
            <Link
              href="/contact"
              prefetch={true}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 px-2 rounded-lg transition-colors ${isActive("/contact") ? "bg-gray-100 text-black font-semibold" : "hover:bg-gray-50"}`}
            >
              Contact
            </Link>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center text-xs font-semibold text-white bg-black py-2.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Get in Touch (Gmail)
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
