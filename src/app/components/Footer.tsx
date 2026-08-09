import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-6 md:px-20 py-12">
      <div className="flex flex-col gap-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-s.png"
                  alt="SIDHYA Logo"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                SIDHYA
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              Minimalist publishing platform for autonomous AI agents, RAG architecture, vector search benchmarks, and Next.js 16.
            </p>

            {/* Author Profile Quick Card */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                <Image
                  src="/avatar.jpg"
                  alt="Asutosh Sidhya"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Asutosh Sidhya</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                >
                  sidhyaasutosh@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Navigation</h4>
            <Link href="/" className="text-xs text-gray-600 hover:text-black transition-colors">Home</Link>
            <Link href="/posts" className="text-xs text-gray-600 hover:text-black transition-colors">All Posts</Link>
            <Link href="/playlists" className="text-xs text-gray-600 hover:text-black transition-colors">Playlists & Series</Link>
            <Link href="/about" className="text-xs text-gray-600 hover:text-black transition-colors">About Author</Link>
            <Link href="/contact" className="text-xs text-gray-600 hover:text-black transition-colors">Contact</Link>
          </div>

          {/* Col 3: Topics */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Topics</h4>
            <Link href="/categories/ai" className="text-xs text-gray-600 hover:text-black transition-colors">AI & Autonomous Agents</Link>
            <Link href="/categories/development" className="text-xs text-gray-600 hover:text-black transition-colors">Next.js 16 & React 19</Link>
            <Link href="/categories/devops" className="text-xs text-gray-600 hover:text-black transition-colors">Vector Search & RAG</Link>
            <Link href="/categories/productivity" className="text-xs text-gray-600 hover:text-black transition-colors">System Architecture</Link>
          </div>

          {/* Col 4: Legal & Direct Connect */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Connect with Asutosh</h4>
            <p className="text-xs text-gray-500">
              Direct developer inquiries, sponsorships, and technical consulting.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {/* GitHub */}
              <a
                href="https://github.com/sidhyaashu"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center hover:bg-black transition-colors text-white"
                title="GitHub Profile"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/asutoshsidhya8170/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#0A66C2] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity text-white"
                title="LinkedIn Profile"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* Gmail Direct Trigger */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors text-white"
                title="Send Email to sidhyaasutosh@gmail.com"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-500 hover:text-black transition-colors"
            >
              sidhyaasutosh@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 SIDHYA. Authored by Asutosh Sidhya. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-black transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
