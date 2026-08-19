import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import ArticleRenderer from "@/components/mdx/ArticleRenderer";
import SafeImage from "@/components/ui/SafeImage";
import PlaylistPostViewer from "@/components/playlist/PlaylistPostViewer";
import SharePostButton from "@/components/ui/SharePostButton";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getPostBySlug, getAllPosts, Post } from "@/lib/posts";
import { getPostPlaylistContext } from "@/lib/playlists";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sidhya.studio";
  const postUrl = `${baseUrl}/posts/${post.slug}`;
  const coverUrl = post.cover.startsWith("http") ? post.cover : `${baseUrl}${post.cover}`;

  return {
    title: `${post.title} | SIDHYA`,
    description: post.description,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: coverUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [coverUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const playlistContext = getPostPlaylistContext(slug);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Pre-fetch all posts in playlist for 0ms tab switching
  let playlistPostsMap: Record<string, Post> = {};

  if (playlistContext) {
    playlistContext.playlist.modules.forEach((mod) => {
      mod.posts.forEach((p) => {
        const fullPost = getPostBySlug(p.slug);
        if (fullPost) {
          playlistPostsMap[p.slug] = fullPost;
        }
      });
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        datePublished={post.date}
        authorName={post.author}
        coverImage={post.cover}
        category={post.category}
        tags={post.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Posts", url: "/posts" },
          { name: post.title, url: `/posts/${post.slug}` },
        ]}
      />

      <main className="px-6 md:px-20 pt-24 md:pt-28 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {playlistContext ? (
          /* Instant Client-Side Tab Viewer for Playlist Series */
          <PlaylistPostViewer
            initialPost={post}
            playlistContext={playlistContext}
            playlistPostsMap={playlistPostsMap}
            relatedPosts={relatedPosts}
          />
        ) : (
          /* Standalone Article Layout */
          <div className="flex flex-col">
            <BackButton label="Previous" />

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 max-w-4xl tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <Link
                href={`/categories/${post.category.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                {post.category}
              </Link>
            </div>

            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-3xl leading-relaxed">
              {post.description}
            </p>

            <div className="flex items-center gap-3 text-xs md:text-sm text-gray-600 mb-8 pb-6 border-b border-gray-100">
              <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                <SafeImage
                  src="/avatar.jpg"
                  alt={post.author}
                  fallbackTitle={post.author}
                  category="AUTHOR"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap flex-1">
                <span>
                  By <strong className="font-semibold text-gray-900">{post.author}</strong>
                </span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <SharePostButton post={post} />
            </div>

            <div className="relative w-full h-[350px] md:h-[520px] rounded-2xl overflow-hidden mb-12 bg-gray-100 shadow-xs">
              <SafeImage
                src={post.cover}
                alt={post.title}
                fallbackTitle={post.title}
                category={post.category}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-8 flex flex-col">
                <ArticleRenderer content={post.content} />

                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-100 flex-wrap">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Tags:
                    </span>
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag.toLowerCase()}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors font-medium"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <section className="pt-10 border-t border-gray-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
                READ MORE ARTICLES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/posts/${related.slug}`}
                    className="group flex flex-col p-3 rounded-xl border border-transparent hover:border-gray-200 transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative w-full h-64 rounded-xl overflow-hidden mb-3 bg-gray-100">
                      <SafeImage
                        src={related.cover}
                        alt={related.title}
                        fallbackTitle={related.title}
                        category={related.category}
                        fill
                        sizes="(max-width: 780px) 100vw, 400px"
                        className="object-cover group-hover:scale-103 transition-transform duration-200"
                      />
                    </div>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                      {related.category}
                    </p>
                    <h4 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 group-hover:underline transition-colors">
                      {related.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
