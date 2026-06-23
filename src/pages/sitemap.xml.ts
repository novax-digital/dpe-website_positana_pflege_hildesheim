import type { APIRoute } from "astro";
import { getPublishedBlogPosts } from "@/lib/supabase.server";
import { PUBLIC_SEO_ROUTES, SITE_LAST_UPDATED, absoluteUrl } from "@/lib/seo";

export const prerender = false;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const formatDate = (value?: string | null) => {
  if (!value) {
    return SITE_LAST_UPDATED;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return SITE_LAST_UPDATED;
  }

  return date.toISOString().slice(0, 10);
};

type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: {
    loc: string;
    title?: string | null;
  };
};

const renderUrlWithImage = ({ loc, lastmod, changefreq, priority, image }: SitemapEntry) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${escapeXml(changefreq)}</changefreq>
    <priority>${escapeXml(priority)}</priority>${image ? `
    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>${image.title ? `
      <image:title>${escapeXml(image.title)}</image:title>` : ""}
    </image:image>` : ""}
  </url>`;

export const GET: APIRoute = async () => {
  const posts = await getPublishedBlogPosts();
  const staticRoutes: SitemapEntry[] = PUBLIC_SEO_ROUTES.map((route) => ({
    loc: absoluteUrl(route.path),
    lastmod: SITE_LAST_UPDATED,
    changefreq: route.changefreq,
    priority: route.priority,
  }));
  const postRoutes: SitemapEntry[] = posts.map((post) => ({
    loc: absoluteUrl(`/ratgeber/${post.slug}`),
    lastmod: formatDate(post.updated_at || post.published_at),
    changefreq: "monthly",
    priority: "0.6",
    image: post.cover_image_url
      ? {
          loc: post.cover_image_url,
          title: post.cover_image_alt || post.title,
        }
      : undefined,
  }));
  const urls = [...staticRoutes, ...postRoutes];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(renderUrlWithImage).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
