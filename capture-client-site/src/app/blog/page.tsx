import type { Metadata } from "next";
import { SITE_CONFIG, generateWebPageSchema } from "@/lib/seo-config";
import { getAllBlogPosts } from "@/lib/data";
import BlogContent from "./BlogContent";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog | Marketing Tips & AI Insights | Capture Client",
  description:
    "Expert insights on AI voice agents, lead generation, Google Ads, Facebook Ads, and digital marketing strategies for small businesses. Free actionable tips.",

  // Keywords
  keywords: [
    "marketing blog",
    "ai voice agents tips",
    "lead generation strategies",
    "google ads tips",
    "facebook ads best practices",
    "small business marketing",
    "digital marketing insights",
    "marketing automation",
    "crm tips",
    "business growth strategies",
  ],

  // Canonical URL
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },

  // Open Graph
  openGraph: {
    title: "Blog | Marketing Tips & AI Insights | Capture Client",
    description:
      "Expert insights on AI voice agents, lead generation, Google Ads, Facebook Ads, and digital marketing strategies for small businesses.",
    url: `${SITE_CONFIG.url}/blog`,
    type: "website",
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Blog`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@captureclient",
    title: "Blog | Marketing Tips & AI Insights | Capture Client",
    description:
      "Expert insights on AI voice agents, lead generation, Google Ads, and digital marketing strategies.",
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  // Map to the format expected by BlogContent
  const blogPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    readTime: post.readTime,
    featuredImage: post.featuredImage,
  }));

  // Generate CollectionPage schema for blog index
  const pageSchema = generateWebPageSchema({
    title: "Blog - Capture Client",
    description:
      "Expert insights on AI voice agents, lead generation, Google Ads, Facebook Ads, and digital marketing strategies for small businesses.",
    url: `${SITE_CONFIG.url}/blog`,
  });

  return (
    <>
      <JsonLd schema={pageSchema} />
      <BlogContent posts={blogPosts} />
    </>
  );
}
