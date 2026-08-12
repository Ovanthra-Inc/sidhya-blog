import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  cover: string;
  featured?: boolean;
  draft?: boolean;
  content: string;
  readTime: string;
  folderPath?: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

function calculateReadTime(text: string, frontmatterReadTime?: string): string {
  if (frontmatterReadTime) return frontmatterReadTime;
  const wordsPerMinute = 180;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(4, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

// Recursive file scanner to support modular subfolders inside content/posts/
function getMDXFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getMDXFilesRecursively(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))) {
      results.push(fullPath);
    }
  }
  return results;
}

export function getAllPosts(includeDrafts = false): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const filePaths = getMDXFilesRecursively(postsDirectory);

  const posts = filePaths
    .map((filePath) => {
      try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);
        const filename = path.basename(filePath);
        const relativePath = path.relative(postsDirectory, filePath);
        const folderPath = path.dirname(relativePath);

        let formattedDate = "2026-08-09";
        if (data.date) {
          try {
            formattedDate = new Date(data.date).toISOString().split("T")[0];
          } catch {
            formattedDate = "2026-08-09";
          }
        }

        return {
          title: data.title || "Untitled Post",
          description: data.description || "",
          slug: data.slug || filename.replace(/\.mdx?$/, ""),
          date: formattedDate,
          author: data.author || "Asutosh Sidhya",
          category: data.category || "General",
          tags: Array.isArray(data.tags) ? data.tags : [],
          cover: data.cover || "/hero.png",
          featured: Boolean(data.featured),
          draft: Boolean(data.draft),
          content: content || "",
          readTime: calculateReadTime(content || "", data.readTime),
          folderPath: folderPath !== "." ? folderPath : undefined,
        } as Post;
      } catch (err) {
        console.error(`[posts] Error parsing post file ${filePath}:`, err);
        return null;
      }
    })
    .filter((post): post is Post => post !== null && (includeDrafts || !post.draft))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string, includeDrafts = false): Post | null {
  const posts = getAllPosts(includeDrafts);
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags);
}
