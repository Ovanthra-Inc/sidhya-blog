import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import { getAllPosts } from "@/lib/posts";

export default function TopBlogs() {
  const posts = getAllPosts();
  const topPosts = posts.slice(0, 5);

  const post1 = topPosts[0];
  const post2 = topPosts[1] || topPosts[0];
  const post3 = topPosts[2] || topPosts[0];
  const post4 = topPosts[3] || topPosts[0];
  const post5 = topPosts[4] || topPosts[0];

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 pt-4 pb-12 bg-white">
      {/* Centered 2-Layer Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1.5">
          FEATURED ARTICLES
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Top Engineering Articles
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
          Hand-picked production deep dives covering autonomous AI agent architectures, vector search benchmarks, and cloud-native infrastructure.
        </p>
      </div>

      {/* 5 Square Cards Mosaic Layout matching reference screenshot (No curve/rounded corners) */}
      <div className="flex flex-col gap-4">

        {/* ── TOP ROW: 3 Square Vertical Cards Side-by-Side ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* CARD 1: Sharp Square Monochromatic Image Card */}
          <Link
            href={`/posts/${post1.slug}`}
            prefetch={true}
            className="group relative flex flex-col justify-between h-[420px] rounded-none overflow-hidden p-6 bg-black text-white shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-900"
          >
            <SafeImage
              src={post1.cover}
              alt={post1.title}
              fallbackTitle={post1.title}
              category={post1.category}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-500 rounded-none"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-none mb-3">
                {post1.category} • {post1.readTime}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight group-hover:text-blue-300 transition-colors line-clamp-3 mb-3">
                {post1.title}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                {post1.description}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-white/20 text-xs">
                <div className="relative w-6 h-6 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/30">
                  <SafeImage
                    src="/avatar.jpg"
                    alt={post1.author}
                    fallbackTitle={post1.author}
                    category="AUTHOR"
                    fill
                    sizes="24px"
                    className="object-cover rounded-none"
                  />
                </div>
                <span className="font-semibold text-white">{post1.author}</span>
              </div>
            </div>
          </Link>

          {/* CARD 2: Sharp Square Vibrant Red/Orange Gradient Banner */}
          <Link
            href={`/posts/${post2.slug}`}
            prefetch={true}
            className="group relative flex flex-col justify-between h-[420px] rounded-none overflow-hidden p-6 bg-gradient-to-br from-red-600 via-rose-600 to-orange-600 text-white shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="px-3 py-1 bg-black/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-none">
                  {post2.category}
                </span>
                <span className="text-xs font-semibold text-rose-100">{post2.readTime}</span>
              </div>
            </div>

            <div className="relative z-10 my-auto">
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tight group-hover:translate-x-1 transition-transform mb-3">
                {post2.title}
              </h3>
              <p className="text-xs text-rose-100 line-clamp-3 leading-relaxed font-medium">
                {post2.description}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/30">
                  <SafeImage
                    src="/avatar.jpg"
                    alt={post2.author}
                    fallbackTitle={post2.author}
                    category="AUTHOR"
                    fill
                    sizes="24px"
                    className="object-cover rounded-none"
                  />
                </div>
                <span className="font-bold text-white">{post2.author}</span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-200">Read Article →</span>
            </div>
          </Link>

          {/* CARD 3: Sharp Square High-Contrast Image Card */}
          <Link
            href={`/posts/${post3.slug}`}
            prefetch={true}
            className="group relative flex flex-col justify-between h-[420px] rounded-none overflow-hidden p-6 bg-gray-950 text-white shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-900"
          >
            <SafeImage
              src={post3.cover}
              alt={post3.title}
              fallbackTitle={post3.title}
              category={post3.category}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500 rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent z-0" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-none">
                {post3.category} • {post3.readTime}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight group-hover:text-blue-300 transition-colors line-clamp-3 mb-3">
                {post3.title}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                {post3.description}
              </p>
              <div className="flex items-center gap-2 pt-3 border-t border-white/20 text-xs">
                <div className="relative w-6 h-6 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/30">
                  <SafeImage
                    src="/avatar.jpg"
                    alt={post3.author}
                    fallbackTitle={post3.author}
                    category="AUTHOR"
                    fill
                    sizes="24px"
                    className="object-cover rounded-none"
                  />
                </div>
                <span className="font-semibold text-white">{post3.author}</span>
              </div>
            </div>
          </Link>

        </div>

        {/* ── BOTTOM ROW: 2 Sharp Square Wide Landscape Cards Side-by-Side ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* CARD 4: Wide Left Landscape Card (7 columns) - Sharp Square */}
          <Link
            href={`/posts/${post4.slug}`}
            prefetch={true}
            className="lg:col-span-7 group relative flex flex-col md:flex-row items-center justify-between min-h-[260px] rounded-none overflow-hidden p-6 sm:p-8 bg-black text-white shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer gap-6 border border-gray-900"
          >
            <div className="flex-1 min-w-0 z-10 flex flex-col justify-between h-full">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded-none mb-3 border border-blue-500/30">
                  {post4.category} • {post4.readTime}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                  {post4.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {post4.description}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs mt-4">
                <div className="relative w-6 h-6 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/30">
                  <SafeImage
                    src="/avatar.jpg"
                    alt={post4.author}
                    fallbackTitle={post4.author}
                    category="AUTHOR"
                    fill
                    sizes="24px"
                    className="object-cover rounded-none"
                  />
                </div>
                <span className="font-semibold text-white">{post4.author}</span>
              </div>
            </div>

            <div className="relative w-full md:w-[220px] h-48 md:h-full rounded-none overflow-hidden flex-shrink-0 bg-gray-900">
              <SafeImage
                src={post4.cover}
                alt={post4.title}
                fallbackTitle={post4.title}
                category={post4.category}
                fill
                sizes="220px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
              />
            </div>
          </Link>

          {/* CARD 5: Wide Right Landscape Card (5 columns) - Sharp Square */}
          <Link
            href={`/posts/${post5.slug}`}
            prefetch={true}
            className="lg:col-span-5 group relative flex flex-col justify-between min-h-[260px] rounded-none overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-neutral-900 via-stone-900 to-rose-950 text-white shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-900"
          >
            <SafeImage
              src={post5.cover}
              alt={post5.title}
              fallbackTitle={post5.title}
              category={post5.category}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-500 rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider rounded-none mb-2 border border-rose-500/30">
                {post5.category} • {post5.readTime}
              </span>
            </div>

            <div className="relative z-10 my-2">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-rose-300 transition-colors line-clamp-2 mb-2">
                {post5.title}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {post5.description}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/30">
                  <SafeImage
                    src="/avatar.jpg"
                    alt={post5.author}
                    fallbackTitle={post5.author}
                    category="AUTHOR"
                    fill
                    sizes="20px"
                    className="object-cover rounded-none"
                  />
                </div>
                <span className="font-semibold text-white text-[11px]">{post5.author}</span>
              </div>
              <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">Explore →</span>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
