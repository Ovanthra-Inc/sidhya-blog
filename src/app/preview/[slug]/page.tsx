import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ArticleRenderer from "@/components/mdx/ArticleRenderer";
import { getPostBySlug } from "@/lib/posts";

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  // Include drafts for local previewing!
  const post = getPostBySlug(slug, true);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Live Preview Indicator Banner */}
      <div className="bg-amber-500 text-black px-4 py-2 text-center text-xs font-bold uppercase tracking-wider">
        ⚡ MDX Live Preview Mode — Viewing &quot;{post.title}&quot; {post.draft ? "(Draft)" : "(Published)"}
      </div>

      <Navbar />

      <main className="px-20 py-8 max-w-[1440px] mx-auto w-full flex-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2 block">
          {post.category}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 max-w-4xl">
          {post.title}
        </h1>

        <p className="text-lg text-gray-600 mb-6 max-w-3xl leading-relaxed">
          {post.description}
        </p>

        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-10 bg-gray-100 shadow-xs">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="max-w-4xl">
          <ArticleRenderer content={post.content} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
