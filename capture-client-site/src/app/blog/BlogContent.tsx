"use client";

import Link from "next/link";
import { useState } from "react";

// Category styling based on category name
const getCategoryStyle = (category: string) => {
  const styles: { [key: string]: { gradient: string; categoryColor: string } } = {
    "Voice AI": {
      gradient: "from-purple-500/20 to-blue-500/20",
      categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
    "Google Ads": {
      gradient: "from-emerald-500/20 to-teal-500/20",
      categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    "Lead Generation": {
      gradient: "from-cyan-500/20 to-blue-500/20",
      categoryColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    "Business Growth": {
      gradient: "from-orange-500/20 to-pink-500/20",
      categoryColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
    "Automation": {
      gradient: "from-indigo-500/20 to-purple-500/20",
      categoryColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    },
  };
  return styles[category] || styles["Lead Generation"];
};

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  featuredImage?: string;
}

interface BlogContentProps {
  posts: BlogPostData[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const blogPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.publishedAt,
    readTime: post.readTime,
    featuredImage: post.featuredImage,
    ...getCategoryStyle(post.category),
  }));

  const categories = ["All", ...new Set(blogPosts.map((post) => post.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4A69E2]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00C9FF]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section with Glass Card */}
      <section className="relative pt-32 pb-20 px-6 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          {/* Glass Hero Card */}
          <div className="relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 lg:p-16 shadow-2xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A69E2]/10 to-[#00C9FF]/10 rounded-3xl" />

            <div className="relative z-10 text-center">
              {/* Animated Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
                <span className="inline-block animate-fade-in-up">Insights &</span>{" "}
                <span className="inline-block animate-fade-in-up delay-100 bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] bg-clip-text text-transparent">
                  Strategies
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200">
                Marketing tips, AI insights, and growth strategies to help your small business
                thrive.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-300">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-6 py-3 rounded-full font-semibold text-sm
                      backdrop-blur-md border transition-all duration-300
                      ${
                        selectedCategory === category
                          ? "bg-white/20 border-white/30 text-white shadow-lg shadow-white/20"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="relative pb-20 px-6 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          {/* Featured Post (Large Glass Card) */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block mb-12 group animate-fade-in-up delay-400"
            >
              <div
                className="relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
                         border border-white/10 rounded-3xl overflow-hidden
                         hover:bg-white/15 hover:border-[#00C9FF]/30
                         transition-all duration-500 hover:shadow-2xl hover:shadow-[#00C9FF]/20
                         hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${featuredPost.gradient} opacity-0
                             group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                    {/* Content */}
                    <div className="flex-1">
                      {/* Featured Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4A69E2]/20 to-[#00C9FF]/20 border border-[#4A69E2]/30 mb-6">
                        <span className="material-icons text-[#00C9FF] text-sm">star</span>
                        <span className="text-white font-bold text-sm">Featured Article</span>
                      </div>

                      {/* Category */}
                      <div className="mb-4">
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${featuredPost.categoryColor}`}
                        >
                          {featuredPost.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 group-hover:text-[#00C9FF] transition-colors duration-300">
                        {featuredPost.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">calendar_today</span>
                          <span>
                            {new Date(featuredPost.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">schedule</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Arrow */}
                    <div className="lg:ml-8">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 group-hover:bg-[#00C9FF]/20 group-hover:border-[#00C9FF]/50 transition-all duration-300">
                        <span className="material-icons text-white text-3xl group-hover:translate-x-1 transition-transform duration-300">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group animate-fade-in-up"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div
                  className="relative h-full backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5
                           border border-white/10 rounded-2xl overflow-hidden
                           hover:bg-white/15 hover:border-[#4A69E2]/30
                           transition-all duration-500 hover:shadow-xl hover:shadow-[#4A69E2]/20
                           hover:-translate-y-2 min-h-[320px]"
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0
                               group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 p-6 flex flex-col h-full">
                    {/* Category */}
                    <div className="mb-4">
                      <span
                        className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold border ${post.categoryColor}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00C9FF] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="material-icons text-xs">calendar_today</span>
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-icons text-xs">schedule</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-[#00C9FF] font-semibold text-sm">
                      <span>Read Article</span>
                      <span className="material-icons text-sm group-hover:translate-x-1 transition-transform duration-300">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Glass Card */}
          <div className="mt-16 animate-fade-in-up delay-1000">
            <div className="relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#4A69E2]/20 to-[#00C9FF]/20 border border-white/20 mb-6">
                  <span className="material-icons text-[#00C9FF] text-4xl">edit_note</span>
                </div>

                <h3 className="text-3xl font-black text-white mb-4">More Articles Coming Soon</h3>

                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  We're constantly adding new content to help you grow your business. Subscribe to
                  our newsletter to stay updated.
                </p>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-[#00C9FF]/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="material-icons">mail</span>
                  Subscribe Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Glass */}
      <section className="relative py-20 px-6 lg:px-16">
        <div className="container mx-auto max-w-5xl">
          <div className="relative backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 lg:p-16 text-center shadow-2xl">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A69E2]/20 to-[#00C9FF]/20 rounded-3xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                Ready to Grow Your Business?
              </h2>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Book a free demo and discover how Capture Client can help you automate leads and
                capture more clients.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:shadow-xl hover:shadow-[#00C9FF]/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="material-icons">calendar_today</span>
                  Book a Demo
                </Link>

                <a
                  href="tel:865-346-3339"
                  className="inline-flex items-center justify-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
                >
                  <span className="material-icons">phone</span>
                  (865) 346-3339
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
