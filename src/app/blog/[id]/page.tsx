import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackButton from "@/components/ui/BackButton";
import { getAllPosts } from "@/lib/posts";

export default function SingleBlogPage() {
  const posts = getAllPosts();
  const currentPost = posts[0] || {
    title: "How I Built an Autonomous AI Agent with Next.js 16",
    category: "AI",
    date: "August 9, 2026",
    author: "Asutosh Sidhya",
    readTime: "8 min read",
    cover: "/hero.png",
  };

  const popularPosts = posts.slice(1, 5);
  const relatedArticles = posts.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Main Post Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#172B4D] leading-tight mb-4 max-w-4xl tracking-tight">
          {currentPost.title}
        </h1>

        {/* Category Badge - Migrated below Title */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href={`/categories/${currentPost.category.toLowerCase()}`}
            className="text-xs font-bold uppercase tracking-wider text-[#115FD6] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            {currentPost.category}
          </Link>
        </div>

        {/* Author Meta Section */}
        <div className="flex items-center gap-3 text-sm text-[#172B4D] mb-8">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#979797] flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs md:text-sm">
            <span>By <strong className="font-semibold">{currentPost.author}</strong></span>
            <span className="text-gray-400">|</span>
            <span>Published on <strong className="font-medium">{currentPost.date}</strong></span>
            <span className="text-gray-400">|</span>
            <span>{currentPost.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[350px] md:h-[540px] rounded-2xl overflow-hidden mb-12 shadow-xs bg-gray-100">
          <Image
            src={currentPost.cover}
            alt={currentPost.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Main Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* LEFT COLUMN: Article Content */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-[#172B4D] text-base md:text-lg leading-relaxed">
            <p>
              Autonomous AI agents represent a fundamental shift in software engineering. Rather than executing simple request-response API calls, agents operate on deterministic cognitive loops: perceiving environment feedback, decomposing tasks into executable sub-steps, calling external tools, and reflecting on output quality.
            </p>
            <p>
              In production, ensuring agent reliability requires strict iteration bounds, schema-enforced tool parameter validation, and fast vector retrieval to maintain context sanity across long multi-turn conversations.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#172B4D] mt-4 border-b border-gray-100 pb-2">
              Key Engineering Takeaways for Scaling Agents
            </h2>

            <p>
              When deploying LLM applications to thousands of users, vector database latency and prompt token overhead are your primary cost bottlenecks. Implementing hybrid search combining dense vectors with BM25 sparse matching yields the highest retrieval accuracy.
            </p>

            {/* Article Footer Callout */}
            <div className="pt-8 mt-6 border-t border-[#D6DADC]">
              <p className="text-lg md:text-xl text-[#172B4D] font-normal">
                Good or bad, we’d love to hear your thoughts. Reach out directly at{" "}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#115FD6] font-semibold hover:underline"
                >
                  sidhyaasutosh@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-10">
            {/* Popular Posts Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#42526E] mb-6">
                POPULAR POSTS
              </h3>
              <div className="flex flex-col">
                {popularPosts.map((post, idx) => (
                  <div key={post.slug}>
                    <Link href={`/posts/${post.slug}`} className="flex gap-4 py-4 items-start group cursor-pointer">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-[#42526E] uppercase tracking-wider mb-1">
                          {post.category}
                        </p>
                        <h4 className="text-sm font-bold text-[#172B4D] leading-snug group-hover:text-[#115FD6] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                    {idx < popularPosts.length - 1 && (
                      <div className="border-b border-gray-100 my-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Orange CTA Box */}
            <div className="bg-[#FCA130] text-white rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-sm">
              <h3 className="text-2xl font-bold leading-snug">
                Get More Done Together With US
              </h3>
              <p className="text-xs opacity-95 leading-relaxed">
                Connect with Asutosh Sidhya for custom AI agent development, vector search architecture, and Next.js engineering.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="mt-2 bg-[#DEEBFF] text-[#091E42] text-xs font-bold px-6 py-3 rounded-full hover:bg-blue-100 transition-colors cursor-pointer border border-[#DEEBFF]"
              >
                Get Started →
              </a>
            </div>
          </aside>
        </div>

        {/* RELATED ARTICLES SECTION */}
        <section className="pt-10 border-t border-[#D6DADC]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#42526E] mb-8">
            HERE ARE SOME RELATED ARTICLES YOU MAY FIND INTERESTING:
          </h3>

          <div className="flex flex-col gap-6">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/posts/${article.slug}`}
                className="group flex flex-col md:flex-row gap-6 items-start p-4 rounded-2xl border border-transparent hover:border-gray-200 transition-all duration-200 cursor-pointer"
              >
                <div className="relative w-full md:w-[300px] h-[220px] rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    sizes="270px"
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col py-1">
                  <p className="text-xs font-bold text-[#42526E] uppercase tracking-wider mb-2">
                    {article.category} &nbsp;-&nbsp; {article.readTime}
                  </p>
                  <h4 className="text-xl font-bold text-[#172B4D] leading-snug mb-2 group-hover:text-[#115FD6] group-hover:underline transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
