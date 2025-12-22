"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, Calendar, Clock, ArrowRight, FileText, Mail, Phone } from "lucide-react";
import { motion } from "@/lib/motion";

// Category styling based on category name
const getCategoryStyle = (category: string) => {
  const styles: { [key: string]: { gradient: string; categoryColor: string } } = {
    "Voice AI": {
      gradient: "from-blue-500/20 to-blue-500/20",
      categoryColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    "Google Ads": {
      gradient: "from-emerald-500/20 to-teal-500/20",
      categoryColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    "Lead Generation": {
      gradient: "from-cyan-500/20 to-blue-500/20",
      categoryColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    },
    "Business Growth": {
      gradient: "from-orange-500/20 to-cyan-500/20",
      categoryColor: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    },
    Automation: {
      gradient: "from-blue-500/20 to-cyan-400/20",
      categoryColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section with Glass Card */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          {/* Glass Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg rounded-3xl p-12 lg:p-16"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl" />

            <div className="relative z-10 text-center">
              {/* Animated Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tight"
              >
                <span className="inline-block">Insights &</span>{" "}
                <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Strategies
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto mb-10"
              >
                Marketing tips, AI insights, and growth strategies to help your small business
                thrive.
              </motion.p>

              {/* Category Filter Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-6 py-3 rounded-full font-semibold text-sm
                      backdrop-blur-md border transition-all duration-300
                      ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20 scale-105"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                      }
                    `}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="relative pb-20 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          {/* Featured Post (Large Glass Card) */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg rounded-3xl overflow-hidden
                           hover:border-cyan-500/30
                           transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20"
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
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6"
                        >
                          <Star className="w-4 h-4 text-cyan-500" />
                          <span className="text-slate-900 font-bold text-sm">Featured Article</span>
                        </motion.div>

                        {/* Category */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.15 }}
                          className="mb-4"
                        >
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${featuredPost.categoryColor}`}
                          >
                            {featuredPost.category}
                          </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 group-hover:text-cyan-500 transition-colors duration-300"
                        >
                          {featuredPost.title}
                        </motion.h2>

                        {/* Excerpt */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.25 }}
                          className="text-lg text-slate-700 mb-6 leading-relaxed"
                        >
                          {featuredPost.excerpt}
                        </motion.p>

                        {/* Meta Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="flex items-center gap-6 text-slate-600"
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(featuredPost.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* CTA Arrow */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.35 }}
                        className="lg:ml-8"
                      >
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 border border-slate-200 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                          <ArrowRight className="w-8 h-8 text-slate-900 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg rounded-2xl overflow-hidden
                             hover:border-blue-500/30
                             transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20
                             min-h-[320px]"
                  >
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0
                                 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10 p-6 flex flex-col h-full">
                      {/* Category */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                        className="mb-4"
                      >
                        <span
                          className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold border ${post.categoryColor}`}
                        >
                          {post.category}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
                        className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-500 transition-colors duration-300 line-clamp-2"
                      >
                        {post.title}
                      </motion.h3>

                      {/* Excerpt */}
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        className="text-slate-700 text-sm mb-4 line-clamp-3 flex-grow"
                      >
                        {post.excerpt}
                      </motion.p>

                      {/* Meta Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.25 }}
                        className="flex items-center justify-between text-xs text-slate-600 pt-4 border-t border-slate-200"
                      >
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </motion.div>

                      {/* Read More Arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                        className="mt-4 flex items-center gap-2 text-cyan-500 font-semibold text-sm"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg rounded-3xl p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl" />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-slate-200/60 mb-6"
                >
                  <FileText className="w-10 h-10 text-cyan-500" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-black text-slate-900 mb-4"
                >
                  More Articles Coming Soon
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-slate-700 text-lg mb-8 max-w-2xl mx-auto"
                >
                  We're constantly adding new content to help you grow your business. Subscribe to
                  our newsletter to stay updated.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <Mail className="w-5 h-5" />
                    Subscribe Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Glass */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-16">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg rounded-3xl p-12 lg:p-16 text-center"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl" />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6"
              >
                Ready to Grow Your Business?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto"
              >
                Book a free demo and discover how Capture Client can help you automate leads and
                capture more clients.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5" />
                    Try Our AI Now
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="tel:865-346-6111"
                    className="inline-flex items-center justify-center gap-2 backdrop-blur-md bg-white/10 border border-slate-200 text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-white/20 hover:border-slate-200/60 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    (865) 346-6111
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
