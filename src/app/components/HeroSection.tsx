import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import { Post } from "@/lib/posts";

interface HeroSectionProps {
  post?: Post;
  nextPost?: Post;
}

export default function HeroSection({ post, nextPost }: HeroSectionProps) {
  const featured = post || {
    title: "How I Built an Autonomous AI Agent with Next.js 16",
    description:
      "A comprehensive production guide to building goal-driven AI agents with tool calling, persistent memory, and resilient execution loops.",
    slug: "how-i-built-an-ai-agent",
    cover: "/hero.png",
    readTime: "8 min read",
    author: "Asutosh Sidhya",
    category: "FEATURED",
  };

  const next = nextPost || {
    title: "Vector Databases",
    slug: "vector-databases",
  };

  return (
    <section className="relative bg-black text-white min-h-[560px] sm:min-h-[640px] overflow-hidden px-4 sm:px-8 md:px-16">
      {/* Background container: left black, right hero photo */}
      <div className="absolute inset-0 z-0 flex">
        {/* Left half dark background */}
        <div className="w-full lg:w-1/2 h-full bg-black" />
        {/* Right half image - Taller height */}
        <div className="hidden lg:block relative w-1/2 h-full">
          <SafeImage
            src={featured.cover || "/hero.png"}
            alt={featured.title}
            fallbackTitle={featured.title}
            category={featured.category || "FEATURED"}
            fill
            sizes="60vw"
            className="object-cover object-center opacity-90 rounded-none"
            priority
          />
        </div>
      </div>

      {/* Hero Overlay Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-[560px] sm:min-h-[640px] px-1 sm:px-6 md:px-16 pt-24 sm:pt-28 pb-28 sm:pb-24">
        {/* Top Text Content */}
        <div className="max-w-xl">
          <p className="text-[11px] sm:text-xs font-medium text-white mb-2.5">
            {featured.category || "Newest Blog"} &nbsp;•&nbsp; {featured.readTime}
          </p>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3.5 tracking-tight">
            {featured.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5 max-w-md">
            {featured.description}
          </p>

          <Link
            href={`/posts/${featured.slug}`}
            prefetch={true}
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-none hover:bg-gray-100 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            Read Full Post →
          </Link>
        </div>

        {/* Bottom Author & Next button */}
        <div className="flex items-center justify-between max-w-xl pt-4 border-t border-white/10 mt-6 sm:mt-8">
          <Link href="/about" prefetch={true} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-none overflow-hidden ring-1 ring-white/30 group-hover:ring-blue-400 transition-all flex-shrink-0">
              <SafeImage
                src="/avatar.jpg"
                alt={featured.author}
                fallbackTitle={featured.author}
                category="AUTHOR"
                fill
                sizes="36px"
                className="object-cover rounded-none"
              />
            </div>
            <div>
              <p className="text-[9px] text-gray-400">Written by</p>
              <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                {featured.author}
              </p>
            </div>
          </Link>

          {next && (
            <Link
              href={`/posts/${next.slug}`}
              prefetch={true}
              className="text-xs font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              Next Post →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
