import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import SafeImage from "@/components/ui/SafeImage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About Asutosh Sidhya | SIDHYA",
  description: "Learn more about Asutosh Sidhya, AI engineer, creator of SIDHYA blog, and fullstack developer.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Asutosh Sidhya | SIDHYA",
    description: "Learn more about Asutosh Sidhya, AI engineer, creator of SIDHYA blog, and fullstack developer.",
    url: "https://sidhya.studio/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Asutosh Sidhya | SIDHYA",
    description: "Learn more about Asutosh Sidhya, AI engineer, creator of SIDHYA blog, and fullstack developer.",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      <main className="px-6 md:px-20 pt-24 md:pt-28 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
          {/* Avatar Picture */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-xl ring-4 ring-gray-100 flex-shrink-0">
            <SafeImage
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
              fallbackTitle="Asutosh Sidhya"
              category="AUTHOR"
              fill
              sizes="256px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              FOUNDER & AUTHOR
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Asutosh Sidhya
            </h1>
            <p className="text-base text-gray-600 leading-relaxed mb-6">
              AI Engineer & Software Architect focused on high-performance vector databases, autonomous LLM agent runtimes, and Next.js 16 engineering.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                Contact Me (Gmail)
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-800 text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bio Sections */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8 text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-10">
          <h2 className="text-2xl font-bold text-gray-900">Why SIDHYA Blog?</h2>
          <p>
            SIDHYA Blog was built to bridge the gap between high-level AI marketing announcements and production-grade software engineering reality. Every article, benchmark, and architectural diagram is crafted with zero conversational fluff and 100% production-ready code.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">Core Expertise</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Autonomous AI Agents:</strong> LangGraph, Pydantic AI, tool schema validation, state machines, and multi-agent coordination.</li>
            <li><strong>Vector Databases & RAG:</strong> LanceDB, Pinecone, Qdrant, Pgvector, eBPF kernel telemetry, and hybrid semantic retrieval.</li>
            <li><strong>Modern Web Architecture:</strong> Next.js 16 App Router, Turbopack, React 19, Tailwind v4, and Vercel edge infrastructure.</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
