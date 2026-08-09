import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";

export const metadata = {
  title: "About Asutosh Sidhya | SIDHYA",
  description: "Learn more about Asutosh Sidhya, AI engineer and creator of SIDHYA blog.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
          {/* Avatar Picture */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-xl ring-4 ring-gray-100 flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover"
              priority
            />
          </div>

          {/* Bio Content */}
          <div className="flex-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
              AUTHOR & CREATOR
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Asutosh Sidhya
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Hi! I&apos;m Asutosh Sidhya — a software engineer passionate about building high-performance web applications, AI agents, RAG systems, and production-grade developer tools.
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Through **SIDHYA**, I share in-depth, practical guides on AI engineering, Next.js architecture, vector databases, and real-world system design — helping engineers transition from theory to production.
            </p>

            {/* Social & Contact CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white hover:bg-gray-800 font-semibold px-6 py-3 rounded-full text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Send Email (Gmail)
              </a>

              <a
                href="https://github.com/sidhyaashu"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-5 py-3 rounded-full text-xs transition-colors flex items-center gap-2"
              >
                GitHub Profile ↗
              </a>

              <a
                href="https://www.linkedin.com/in/asutoshsidhya8170/"
                target="_blank"
                rel="noreferrer"
                className="bg-[#0A66C2] text-white hover:opacity-90 font-semibold px-5 py-3 rounded-full text-xs transition-colors flex items-center gap-2"
              >
                LinkedIn Profile ↗
              </a>
            </div>
          </div>
        </div>

        {/* Skills & Stack */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Core Tech Stack & Expertise</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Next.js 16 (App Router)",
              "TypeScript & React 19",
              "AI Agent Orchestration",
              "RAG & Vector Search",
              "Python & Fast API",
              "Tailwind CSS & UI Systems",
              "Shiki & MDX Architecture",
              "Vercel & Cloud Deployment",
            ].map((skill) => (
              <div key={skill} className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
