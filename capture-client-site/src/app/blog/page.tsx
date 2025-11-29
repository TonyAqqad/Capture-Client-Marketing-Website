import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Marketing Tips & AI Insights | Capture Client",
  description: "Learn about AI voice agents, lead generation strategies, Google Ads optimization, and digital marketing tips from Capture Client's blog.",
};

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How AI Voice Agents Can Transform Your Small Business",
      excerpt: "Discover how AI-powered voice agents can handle customer calls 24/7, qualify leads, and never miss an opportunity.",
      category: "Voice AI",
      date: "2025-01-15",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "5 Google Ads Mistakes That Are Wasting Your Budget",
      excerpt: "Learn the most common Google Ads mistakes small businesses make and how to fix them for better ROI.",
      category: "Google Ads",
      date: "2025-01-10",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Facebook Ads vs Google Ads: Which is Right for Your Business?",
      excerpt: "A comprehensive comparison of Facebook Ads and Google Ads to help you choose the best platform for your goals.",
      category: "Lead Generation",
      date: "2025-01-05",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "The Complete Guide to Lead Generation for Service Businesses",
      excerpt: "Everything you need to know about generating high-quality leads for HVAC, plumbing, dental, and other service businesses.",
      category: "Lead Generation",
      date: "2024-12-28",
      readTime: "10 min read",
    },
    {
      id: 5,
      title: "Why Every Small Business Needs a CRM (And How to Choose One)",
      excerpt: "Understanding the importance of CRM systems and what features to look for when selecting one for your business.",
      category: "Business Growth",
      date: "2024-12-20",
      readTime: "8 min read",
    },
    {
      id: 6,
      title: "Automating Your Sales Process: A Step-by-Step Guide",
      excerpt: "Learn how to automate repetitive sales tasks and focus on what matters most—closing deals.",
      category: "Automation",
      date: "2024-12-15",
      readTime: "9 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative py-24 px-8 lg:px-16 bg-gradient-to-br from-background-dark via-background-dark to-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Marketing tips, AI insights, and growth strategies to help your small business thrive.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-8 lg:px-16 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900/50 hover:border-primary/50 hover:shadow-xl transition-all group"
            >
              {/* Category Badge */}
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                  {post.category}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Link */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                    Read More
                    <span className="material-icons text-sm ml-1 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="mt-16 text-center">
          <div className="inline-block border border-gray-200 dark:border-gray-800 rounded-xl p-8 bg-white dark:bg-gray-900/50">
            <span className="material-icons text-accent text-5xl mb-4">edit_note</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              More Articles Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're constantly adding new content to help you grow your business. Subscribe to our newsletter to stay updated.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-primary text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-all"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 lg:px-16 bg-gray-50 dark:bg-black/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Book a free demo and discover how Capture Client can help you automate leads and capture more clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 glowing-button"
            >
              Book a Demo
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
