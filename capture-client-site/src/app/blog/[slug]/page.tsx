import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG, generateBlogPostingSchema, generateBreadcrumbSchema, generateWebPageSchema, generateFAQSchema } from "@/lib/seo-config";
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
  const optimizedTitle = post.seo.title.length > 60
    ? `${post.seo.title.substring(0, 57)}...`
    : post.seo.title;

  // Optimize description length (150-160 chars ideal)
  const optimizedDescription = post.seo.description.length > 160
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
          type: 'image/jpeg',
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
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Inject JSON-LD structured data */}
      <JsonLd schema={schemas} />

      {/* Breadcrumb Navigation */}
      <section className="container mx-auto px-8 lg:px-16 pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="material-icons text-xs">chevron_right</span>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <span className="material-icons text-xs">chevron_right</span>
          <span className="text-gray-900 dark:text-white">{post.title}</span>
        </nav>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-8 lg:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
            {post.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-3">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full border-2 border-primary/20"
                />
              )}
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {post.author.name}
                </div>
                <div className="text-sm">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="material-icons text-lg">calendar_today</span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-lg">schedule</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12 border border-gray-200 dark:border-gray-800">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <section className="container mx-auto px-8 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Author Bio Section */}
      <section className="container mx-auto px-8 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50">
            <div className="flex items-start gap-6">
              {post.author.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-20 h-20 rounded-full border-2 border-primary/20 flex-shrink-0"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.author.role}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {post.author.name} is a marketing expert specializing in helping small businesses grow through AI automation, lead generation, and digital advertising strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-8 lg:px-16 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                      {relatedPost.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Discover how Capture Client can help you automate leads and grow your revenue with AI-powered solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
            >
              Book a Free Demo
            </Link>
            <a
              href="tel:865-346-3339"
              className="bg-white/10 border border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Call Us: (865) 346-3339
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
