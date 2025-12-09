import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_CONFIG,
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateFAQSchema,
} from "@/lib/seo-config";
import JsonLd from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const ogImageUrl = post.featuredImage || `${SITE_CONFIG.url}/og-image.jpg`;

  // Optimize title length (50-60 chars ideal)
  const optimizedTitle =
    post.seo.title.length > 60
      ? `${post.seo.title.substring(0, 57)}...`
      : post.seo.title;

  // Optimize description length (150-160 chars ideal)
  const optimizedDescription =
    post.seo.description.length > 160
      ? `${post.seo.description.substring(0, 157)}...`
      : post.seo.description;

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: post.seo.keywords,

    // Authors and ownership for E-E-A-T
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: SITE_CONFIG.name,

    // Category
    category: post.category,

    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },

    // Enhanced Open Graph for social sharing
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: pageUrl,
      type: "article",
      locale: "en_US",
      siteName: SITE_CONFIG.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      section: post.category,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} - ${SITE_CONFIG.name}`,
          type: "image/jpeg",
        },
      ],
    },

    // Twitter Card with enhanced metadata
    twitter: {
      card: "summary_large_image",
      site: "@captureclient",
      creator: "@captureclient",
      title: optimizedTitle,
      description: optimizedDescription,
      images: [ogImageUrl],
    },

    // Robots directives for SEO
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Get related posts from the same category
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Generate JSON-LD schemas
  const blogPostingSchema = generateBlogPostingSchema(post);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Blog", url: `${SITE_CONFIG.url}/blog` },
    {
      name: post.title,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  ]);

  const webPageSchema = generateWebPageSchema({
    title: post.seo.title,
    description: post.seo.description,
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
  });

  const schemas: Array<Record<string, unknown>> = [blogPostingSchema, breadcrumbSchema, webPageSchema];

  // Add FAQ schema if post has FAQ section
  if (post.faq && post.faq.length > 0) {
    const faqSchema = generateFAQSchema(post.faq);
    if (faqSchema) {
      schemas.push(faqSchema);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Inject JSON-LD structured data */}
      <JsonLd schema={schemas} />

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1000ms" }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "500ms" }} />
      </div>

      {/* Breadcrumb Navigation - Glassy */}
      <section className="container mx-auto px-4 sm:px-8 lg:px-16 pt-8 relative z-10">
        <nav className="flex items-center gap-2 text-sm backdrop-blur-sm bg-white/5 border border-white/10 rounded-full px-4 py-2 w-fit">
          <Link
            href="/"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link
            href="/blog"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            Blog
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/90 truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>
      </section>

      {/* Hero Section - Glassy Floating Card */}
      <section className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Featured Image with Gradient Overlay */}
          {post.featuredImage && (
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-8 group">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-[#0F172A]/50 to-transparent" />

              {/* Floating Glass Card - Positioned over image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                {/* Category Badge with Glow */}
                <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-gold/20 border border-cyan-400/30 text-cyan-300 text-sm font-bold rounded-full mb-4 shadow-lg shadow-cyan-500/20 animate-pulse">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  {post.category}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                  {post.title}
                </h1>

                {/* Meta Info - Glassy */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  {/* Author */}
                  <div className="flex items-center gap-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg">
                    {post.author.avatar && (
                      <div className="relative">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full ring-2 ring-cyan-400/50 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-gold/20" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {post.author.name}
                      </div>
                      <div className="text-xs text-gray-300">
                        {post.author.role}
                      </div>
                    </div>
                  </div>

                  {/* Date & Reading Time */}
                  <div className="flex items-center gap-4 text-sm text-gray-300 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <span className="text-white/30">•</span>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* If no featured image, show title card */}
          {!post.featuredImage && (
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-gold/20 border border-cyan-400/30 text-cyan-300 text-sm font-bold rounded-full mb-6 shadow-lg shadow-cyan-500/20">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                {post.category}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-3">
                  {post.author.avatar && (
                    <div className="relative">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full ring-2 ring-cyan-400/50"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-gold/20" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-white">
                      {post.author.name}
                    </div>
                    <div className="text-sm text-gray-300">
                      {post.author.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <span className="text-white/30">•</span>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Blog Content with Glassy Sidebar */}
      <section className="container mx-auto px-4 sm:px-8 lg:px-16 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_280px] gap-8">
            {/* Main Content */}
            <article className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
              <div className="prose prose-lg prose-invert max-w-none">
                {/* Custom Prose Styling for Glass Effect */}
                <div
                  className="text-gray-200 leading-relaxed space-y-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-cyan-300 [&>h3]:mb-3 [&>h3]:mt-6 [&>p]:text-gray-300 [&>p]:leading-relaxed [&>ul]:text-gray-300 [&>ol]:text-gray-300 [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-400 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-cyan-100 [&>blockquote]:backdrop-blur-sm [&>blockquote]:bg-cyan-500/10 [&>blockquote]:py-4 [&>blockquote]:rounded-r-lg [&>a]:text-cyan-400 [&>a]:underline [&>a]:hover:text-cyan-300 [&>code]:bg-white/10 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-cyan-300 [&>pre]:bg-black/50 [&>pre]:backdrop-blur-sm [&>pre]:border [&>pre]:border-white/10 [&>pre]:rounded-xl [&>pre]:p-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags Section - Glassy */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 backdrop-blur-sm bg-white/5 border border-white/10 text-gray-300 text-sm rounded-full hover:bg-white/10 hover:border-cyan-400/30 hover:text-cyan-300 transition-all cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sticky Sidebar - Table of Contents (Desktop Only) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    Quick Links
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a
                        href="#author"
                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        About the Author
                      </a>
                    </li>
                    {relatedPosts.length > 0 && (
                      <li>
                        <a
                          href="#related"
                          className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          Related Articles
                        </a>
                      </li>
                    )}
                    <li>
                      <a
                        href="#cta"
                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        Get Started
                      </a>
                    </li>
                  </ul>

                  {/* Share Buttons */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-3">
                      Share Article
                    </h4>
                    <div className="flex gap-2">
                      <button className="p-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-400/30 transition-all group">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </button>
                      <button className="p-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-400/30 transition-all group">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </button>
                      <button className="p-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-400/30 transition-all group">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-cyan-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Author Bio Section - Glassy with Gradient Border */}
      <section
        id="author"
        className="container mx-auto px-4 sm:px-8 lg:px-16 pb-16 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-1 shadow-2xl group hover:shadow-cyan-500/20 transition-all duration-500">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/50 via-[#D4AF37]/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 md:p-10 border border-white/20">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Avatar with Ring Effect */}
                {post.author.avatar && (
                  <div className="relative flex-shrink-0 group/avatar">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-gold rounded-full blur-lg opacity-50 group-hover/avatar:opacity-100 transition-opacity" />
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="relative w-24 h-24 rounded-full ring-4 ring-white/20 shadow-2xl"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    About {post.author.name}
                  </h3>
                  <p className="text-cyan-400 font-semibold mb-4">
                    {post.author.role}
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {post.author.name} is a marketing expert specializing in
                    helping small businesses grow through AI automation, lead
                    generation, and digital advertising strategies. With years
                    of experience in the industry, they bring practical insights
                    and proven strategies to every article.
                  </p>

                  {/* Social Links with Hover Animation */}
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="p-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-gold/20 hover:border-cyan-400/30 transition-all group/link"
                    >
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover/link:text-cyan-400 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="p-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-gold/20 hover:border-cyan-400/30 transition-all group/link"
                    >
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover/link:text-cyan-400 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="p-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-gold/20 hover:border-cyan-400/30 transition-all group/link"
                    >
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover/link:text-cyan-400 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section - Horizontal Scroll on Mobile */}
      {relatedPosts.length > 0 && (
        <section
          id="related"
          className="container mx-auto px-4 sm:px-8 lg:px-16 pb-16 relative z-10"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-gold rounded-full" />
              Related Articles
            </h2>

            {/* Desktop Grid / Mobile Scroll */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-6 overflow-x-auto md:overflow-visible scrollbar-hide pb-4">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group min-w-[280px] md:min-w-0"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 h-full">
                    {/* Featured Image with Gradient Overlay */}
                    {relatedPost.featuredImage && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                        {/* Category Badge on Image */}
                        <div className="absolute top-3 left-3 px-3 py-1 backdrop-blur-xl bg-gradient-to-r from-cyan-500/30 to-gold/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold rounded-full">
                          {relatedPost.category}
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {relatedPost.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all">
                        Read More
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Full Width Glass Card */}
      <section
        id="cta"
        className="py-20 px-4 sm:px-8 lg:px-16 relative z-10"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-cyan-500/10 via-[#D4AF37]/10 to-cyan-500/10 border border-white/20 rounded-3xl p-8 md:p-16 text-center overflow-hidden shadow-2xl">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-[#D4AF37]/20 to-cyan-500/20 animate-pulse" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Discover how Capture Client can help you automate leads and grow
                your revenue with AI-powered solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Primary CTA - Glowing Button */}
                <Link
                  href="/contact"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-gold/80 text-white font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden shadow-xl shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/80 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">Book a Free Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/80 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Secondary CTA - Glass Button */}
                <a
                  href="tel:865-346-6111"
                  className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <svg
                    className="w-5 h-5 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call (865) 346-6111
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
