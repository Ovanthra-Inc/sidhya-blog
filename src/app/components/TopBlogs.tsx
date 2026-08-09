import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function TopBlogs() {
  const posts = getAllPosts();
  const featuredPost = posts[0] || {
    title: "How I Built an Autonomous AI Agent with Next.js 16",
    description: "A comprehensive production guide to building goal-driven AI agents with tool calling.",
    slug: "how-i-built-an-ai-agent",
    cover: "/posts/ai-agent-cover.png",
    readTime: "8 min read",
    author: "Asutosh Sidhya",
  };

  const secondaryPost1 = posts[1] || posts[0];
  const secondaryPost2 = posts[2] || posts[0];
  const secondaryPost3 = posts[3] || posts[0];

  return (
    <section className="px-3 sm:px-8 md:px-16 lg:px-20 py-8 bg-white">
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-5 tracking-tight px-1">Top Blogs</h2>

      {/* Outer: two equal columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── LEFT HALF: single large featured blog ── */}
        <Link
          href={`/posts/${featuredPost.slug}`}
          className="group flex flex-col p-3.5 sm:p-5 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-xs transition-all duration-200 cursor-pointer"
        >
          {/* Left Featured Image: 320px on mobile, 440px on desktop */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 h-[260px] sm:h-[360px] lg:h-[440px]">
            <Image
              src={featuredPost.cover}
              alt={featuredPost.title}
              fill
              sizes="(max-width: 780px) 100vw, 500px"
              className="object-cover group-hover:scale-102 transition-transform duration-300"
              priority
            />
          </div>
          {/* Text below the image */}
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-4">
            {featuredPost.category || "AI"} &nbsp;•&nbsp; {featuredPost.readTime}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-black leading-snug mt-1 group-hover:text-blue-600 group-hover:underline transition-colors">
            {featuredPost.title}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mt-1.5 line-clamp-2">
            {featuredPost.description}
          </p>

          <div className="flex items-center gap-2.5 mt-3 pt-1">
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
              <Image
                src="/avatar.jpg"
                alt="Asutosh Sidhya"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[9px] text-gray-400">Written by</p>
              <p className="text-xs font-semibold text-black">{featuredPost.author}</p>
            </div>
          </div>
        </Link>

        {/* ── RIGHT HALF: 3 side post cards ── */}
        <div className="flex flex-col gap-4">

          {/* CARD 1 */}
          <Link
            href={`/posts/${secondaryPost1.slug}`}
            className="group flex flex-col sm:flex-row gap-4 items-start p-3.5 sm:p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 w-full sm:w-[130px] h-[160px] sm:h-[100px]">
              <Image
                src={secondaryPost1.cover}
                alt={secondaryPost1.title}
                fill
                sizes="130px"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                {secondaryPost1.category || "AI"} &nbsp;•&nbsp; {secondaryPost1.readTime}
              </p>
              <h3 className="text-sm font-bold text-black leading-snug mt-0.5 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
                {secondaryPost1.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5 line-clamp-2 sm:line-clamp-1">
                {secondaryPost1.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                  <Image
                    src="/avatar.jpg"
                    alt="Asutosh Sidhya"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] font-semibold text-gray-800">{secondaryPost1.author}</p>
              </div>
            </div>
          </Link>

          {/* CARD 2 */}
          <Link
            href={`/posts/${secondaryPost2.slug}`}
            className="group flex flex-col sm:flex-row gap-4 items-start p-3.5 sm:p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 w-full sm:w-[130px] h-[160px] sm:h-[100px]">
              <Image
                src={secondaryPost2.cover}
                alt={secondaryPost2.title}
                fill
                sizes="130px"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                {secondaryPost2.category || "AI"} &nbsp;•&nbsp; {secondaryPost2.readTime}
              </p>
              <h3 className="text-sm font-bold text-black leading-snug mt-0.5 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
                {secondaryPost2.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5 line-clamp-2 sm:line-clamp-1">
                {secondaryPost2.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                  <Image
                    src="/avatar.jpg"
                    alt="Asutosh Sidhya"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] font-semibold text-gray-800">{secondaryPost2.author}</p>
              </div>
            </div>
          </Link>

          {/* CARD 3 */}
          <Link
            href={`/posts/${secondaryPost3.slug}`}
            className="group flex flex-col sm:flex-row gap-4 items-start p-3.5 sm:p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 w-full sm:w-[130px] h-[160px] sm:h-[100px]">
              <Image
                src={secondaryPost3.cover}
                alt={secondaryPost3.title}
                fill
                sizes="130px"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                {secondaryPost3.category || "AI"} &nbsp;•&nbsp; {secondaryPost3.readTime}
              </p>
              <h3 className="text-sm font-bold text-black leading-snug mt-0.5 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
                {secondaryPost3.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5 line-clamp-2 sm:line-clamp-1">
                {secondaryPost3.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                  <Image
                    src="/avatar.jpg"
                    alt="Asutosh Sidhya"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] font-semibold text-gray-800">{secondaryPost3.author}</p>
              </div>
            </div>
          </Link>

        </div>
        {/* ── end RIGHT HALF ── */}

      </div>
    </section>
  );
}
