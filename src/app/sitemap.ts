import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllPlaylists } from "@/lib/playlists";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stuffsus-blog.vercel.app";
  const posts = getAllPosts();
  const playlists = getAllPlaylists();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const playlistUrls = playlists.map((playlist) => ({
    url: `${baseUrl}/playlists/${playlist.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/playlists`,
      lastModified: new Date(),
    },
    ...postUrls,
    ...playlistUrls,
  ];
}
