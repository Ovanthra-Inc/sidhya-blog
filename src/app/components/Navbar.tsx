"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md rounded-b-[20px] md:rounded-b-[32px] -mb-16 shadow-sm px-4 md:px-16 py-3.5 flex flex-col transition-all mx-3 sm:mx-8 md:mx-16 lg:mx-20">
      <div className="flex items-center justify-between">
        {/* Logo: Calligraphy S icon + Brand Name SIDHYA */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/logo-s.png"
              alt="SIDHYA Logo"
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
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/posts" className="hover:text-black transition-colors">
            Posts
          </Link>
          <Link href="/playlists" className="hover:text-black transition-colors">
            Playlists
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors">
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
            className="relative w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-blue-500 transition-all flex-shrink-0"
            title="Asutosh Sidhya"
          >
            <Image
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
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

      {/* Mobile Drawer Menu with smooth animation */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 mt-3 border-t border-gray-100 flex flex-col gap-3 text-sm font-medium text-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            href="/posts"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            All Posts
          </Link>
          <Link
            href="/playlists"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Playlists & Series
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            About Asutosh
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-1.5 px-2 hover:bg-gray-50 rounded-lg transition-colors"
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
      )}
    </nav>
  );
}
