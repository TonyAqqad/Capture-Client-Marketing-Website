import { MetadataRoute } from "next";

/**
 * Enhanced robots.txt configuration following 2025 SEO best practices
 *
 * Purpose:
 * - Guide search engine crawlers efficiently
 * - Prevent indexing of admin/private pages
 * - Optimize crawl budget for important pages
 * - Support multiple search engines (Google, Bing, etc.)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://captureclientai.net";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // API routes
          "/admin/", // Admin pages (if any)
          "/_next/", // Next.js internals
          "/private/", // Private content
          "/*.json$", // Raw data files
          "/search", // Search result pages (prevent duplicate content)
        ],
        crawlDelay: 0, // Allow fast crawling
      },
      {
        // Specific rules for Google bot
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
      {
        // Specific rules for Bing bot
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/private/"],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      // Add image sitemap when available
      // `${baseUrl}/sitemap-images.xml`,
    ],
    host: baseUrl,
  };
}
