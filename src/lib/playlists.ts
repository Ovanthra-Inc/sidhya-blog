import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPosts, Post } from "./posts";

export interface PlaylistModule {
  title: string;
  posts: (Post & { index: number; formattedIndex: string })[];
}

export interface Playlist {
  title: string;
  description: string;
  slug: string;
  cover: string;
  category: string;
  postSlugs: string[];
  modules: PlaylistModule[];
  posts: (Post & { index: number; formattedIndex: string })[];
  content: string;
}

export interface PlaylistContext {
  playlist: Playlist;
  currentIndex: number;
  totalPosts: number;
  prevPost: Post | null;
  nextPost: Post | null;
}

const playlistsDirectory = path.join(process.cwd(), "content/playlists");

export function getAllPlaylists(): Playlist[] {
  if (!fs.existsSync(playlistsDirectory)) return [];

  const filenames = fs.readdirSync(playlistsDirectory);
  const allPosts = getAllPosts();

  return filenames
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(playlistsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      let totalCounter = 0;
      const resolvedModules: PlaylistModule[] = [];
      const flatPosts: (Post & { index: number; formattedIndex: string })[] = [];
      const allSlugs: string[] = [];

      // Check if frontmatter has structured modules
      if (Array.isArray(data.modules)) {
        for (const mod of data.modules) {
          const modTitle = mod.title || "Topic Module";
          const modSlugs: string[] = Array.isArray(mod.posts) ? mod.posts : [];
          const modPosts: (Post & { index: number; formattedIndex: string })[] = [];

          for (const slug of modSlugs) {
            const found = allPosts.find((p) => p.slug === slug);
            if (found) {
              totalCounter++;
              const formatted = {
                ...found,
                index: totalCounter,
                formattedIndex: totalCounter.toString().padStart(2, "0"),
              };
              modPosts.push(formatted);
              flatPosts.push(formatted);
              allSlugs.push(slug);
            }
          }

          if (modPosts.length > 0) {
            resolvedModules.push({ title: modTitle, posts: modPosts });
          }
        }
      } else {
        // Fallback flat posts list
        const postSlugs: string[] = Array.isArray(data.posts) ? data.posts : [];
        const fallbackPosts = postSlugs
          .map((slug, idx) => {
            const found = allPosts.find((p) => p.slug === slug);
            if (!found) return null;
            return {
              ...found,
              index: idx + 1,
              formattedIndex: (idx + 1).toString().padStart(2, "0"),
            };
          })
          .filter(Boolean) as (Post & { index: number; formattedIndex: string })[];

        flatPosts.push(...fallbackPosts);
        allSlugs.push(...postSlugs);
        if (fallbackPosts.length > 0) {
          resolvedModules.push({ title: "Series Lessons", posts: fallbackPosts });
        }
      }

      return {
        title: data.title || "Untitled Playlist",
        description: data.description || "",
        slug: data.slug || filename.replace(/\.mdx?$/, ""),
        cover: data.cover || "/hero.png",
        category: data.category || "General",
        postSlugs: allSlugs,
        modules: resolvedModules,
        posts: flatPosts,
        content,
      };
    });
}

export function getPlaylistBySlug(slug: string): Playlist | null {
  const playlists = getAllPlaylists();
  return playlists.find((p) => p.slug === slug) || null;
}

export function getPostPlaylistContext(postSlug: string): PlaylistContext | null {
  const playlists = getAllPlaylists();

  // 1. Explicit playlist search
  for (const playlist of playlists) {
    const postIdx = playlist.posts.findIndex((p) => p.slug === postSlug);
    if (postIdx !== -1) {
      return {
        playlist,
        currentIndex: postIdx + 1,
        totalPosts: playlist.posts.length,
        prevPost: postIdx > 0 ? playlist.posts[postIdx - 1] : null,
        nextPost: postIdx < playlist.posts.length - 1 ? playlist.posts[postIdx + 1] : null,
      };
    }
  }

  // 2. Topic/Category Fallback Series
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === postSlug);
  if (!currentPost) return null;

  const categoryPosts = allPosts.filter((p) => p.category === currentPost.category);
  const resolvedCategoryPosts = categoryPosts.map((p, idx) => ({
    ...p,
    index: idx + 1,
    formattedIndex: (idx + 1).toString().padStart(2, "0"),
  }));

  const postIdx = resolvedCategoryPosts.findIndex((p) => p.slug === postSlug);

  return {
    playlist: {
      title: `${currentPost.category} Mastery Series`,
      description: `All technical guides and articles under ${currentPost.category}.`,
      slug: currentPost.category.toLowerCase(),
      cover: currentPost.cover,
      category: currentPost.category,
      postSlugs: categoryPosts.map((p) => p.slug),
      modules: [{ title: `${currentPost.category} Articles`, posts: resolvedCategoryPosts }],
      posts: resolvedCategoryPosts,
      content: "",
    },
    currentIndex: postIdx + 1,
    totalPosts: resolvedCategoryPosts.length,
    prevPost: postIdx > 0 ? resolvedCategoryPosts[postIdx - 1] : null,
    nextPost: postIdx < resolvedCategoryPosts.length - 1 ? resolvedCategoryPosts[postIdx + 1] : null,
  };
}
