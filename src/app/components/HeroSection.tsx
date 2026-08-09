import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-black text-white min-h-[480px] sm:min-h-[520px] overflow-hidden px-4 sm:px-8 md:px-16">
      {/* Background container: left black, right sofa photo */}
      <div className="absolute inset-0 z-0 flex">
        {/* Left half dark background */}
        <div className="w-full lg:w-1/2 h-full bg-black" />
        {/* Right half image */}
        <div className="hidden lg:block relative w-1/2 h-full">
          <Image
            src="/hero.png"
            alt="Asutosh Sidhya AI Blog"
            fill
            sizes="50vw"
            className="object-cover object-center opacity-90"
            priority
          />
        </div>
      </div>

      {/* Hero Overlay Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-[480px] sm:min-h-[520px] px-1 sm:px-6 md:px-16 pt-20 sm:pt-24 pb-24 sm:pb-20">
        {/* Top Text Content */}
        <div className="max-w-xl">
          <p className="text-[11px] sm:text-xs font-medium text-white mb-2.5">
            Newest Blog &nbsp;•&nbsp; 8 Min
          </p>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3.5 tracking-tight">
            How I Built an Autonomous AI Agent with Next.js 16
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5 max-w-md">
            A comprehensive production guide to building goal-driven AI agents with tool calling, persistent memory, and resilient execution loops.
          </p>

          <Link
            href="/posts/how-i-built-an-ai-agent"
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-gray-100 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            Read Full Post →
          </Link>
        </div>

        {/* Bottom Author & Next button */}
        <div className="flex items-center justify-between max-w-xl pt-4 border-t border-white/10 mt-6 sm:mt-8">
          <Link href="/about" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-blue-400 transition-all flex-shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Asutosh Sidhya"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[9px] text-gray-400">Written by</p>
              <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                Asutosh Sidhya
              </p>
            </div>
          </Link>

          <Link
            href="/posts/vector-databases"
            className="text-xs font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            Next Post →
          </Link>
        </div>
      </div>
    </section>
  );
}
