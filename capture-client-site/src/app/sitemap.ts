import { MetadataRoute } from "next";
import { getAllServices, getAllLocations, getAllNationalPages, getAllPackages, getAllBlogPosts } from "@/lib/data";
import { integrations } from "@/data/integrations";
import { INDUSTRIES } from "@/data/industries";

/**
 * Enhanced XML Sitemap following 2025 SEO best practices
 *
 * Purpose:
 * - Help search engines discover all pages efficiently
 * - Prioritize important pages (location pages for local SEO)
 * - Indicate update frequency for optimal crawling
 * - Support up to 50,000 URLs per sitemap
 *
 * References:
 * - Google Sitemap Guidelines: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
 * - Next.js Sitemap API: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://captureclient.com";
  const currentDate = new Date();

  // Fetch all dynamic content
  const [services, locations, nationalPages, packages, blogPosts] = await Promise.all([
    getAllServices(),
    getAllLocations(),
    getAllNationalPages(),
    getAllPackages(),
    getAllBlogPosts(),
  ]);

  // Core pages (highest priority)
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9, // Contact page - high conversion
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95, // Pricing page - high conversion
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8, // Case studies - social proof
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8, // How it works - education
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7, // Demo - product trial
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7, // Use cases - feature discovery
    },
  ];

  // Service pages (high priority)
  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.service.service_slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85, // Service pages - important for SEO
    })),
  ];

  // Location pages (highest priority for local SEO)
  const locationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...locations.map((location) => ({
      url: `${baseUrl}/locations/${location.page_id}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.95, // Location pages - CRITICAL for local SEO
    })),
  ];

  // Integration pages (high priority for feature discovery)
  const integrationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/integrations`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...integrations.map((integration) => ({
      url: `${baseUrl}/integrations/${integration.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7, // Integration pages - important for feature discovery
    })),
  ];

  // Industry pages (high priority for vertical targeting)
  const industryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/who-we-serve`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...INDUSTRIES.map((industry) => ({
      url: `${baseUrl}/who-we-serve/${industry.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8, // Industry pages - critical for vertical SEO
    })),
    // Individual /industries/* pages (dedicated landing pages)
    {
      url: `${baseUrl}/industries/healthcare`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/automotive`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/home-services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/legal`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/real-estate`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/restaurants`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/dental`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/fitness`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/med-spa`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries/martial-arts`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // National SEO pages (high priority)
  const nationalSeoPages: MetadataRoute.Sitemap = nationalPages.map((page) => ({
    url: `${baseUrl}/${page.keyword.keyword_slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85, // National keyword pages - important for organic traffic
  }));

  // Package pages (high conversion)
  const packagePages: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/pricing/${pkg.package.package_slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8, // Package pages - good for conversion
  }));

  // Supporting pages (medium priority)
  const supportPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Individual blog posts
    ...blogPosts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Tools pages (free value calculators)
  const toolsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools/missed-call-calculator`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75, // Free tool - good for engagement
    },
  ];

  // Legal pages (low priority but necessary)
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Combine all pages in priority order
  return [
    ...corePages,
    ...locationPages, // Location pages first (local SEO focus)
    ...industryPages, // Industry pages (vertical targeting)
    ...servicePages, // Service pages
    ...integrationPages, // Integration pages (feature discovery)
    ...nationalSeoPages, // National SEO pages
    ...packagePages, // Packages
    ...supportPages, // Supporting content
    ...toolsPages, // Tools pages (free calculators)
    ...legalPages, // Legal pages last
  ];
}

/**
 * Total expected URLs: ~280+ pages
 * - 1 homepage
 * - 4 core conversion pages (case-studies, how-it-works, demo, use-cases)
 * - 4-5 service pages
 * - 90+ location pages (service × location combinations)
 * - 58 integration pages
 * - 12 /who-we-serve industry pages
 * - 10 /industries/* dedicated landing pages
 * - 10-15 national SEO pages
 * - 3-5 package pages
 * - 6 supporting pages (including blog index + individual blog posts)
 * - 1 tool page (missed call calculator)
 * - 2 legal pages
 *
 * Sitemap generation time: <1 second
 * All pages prioritized by business value and SEO impact
 */
