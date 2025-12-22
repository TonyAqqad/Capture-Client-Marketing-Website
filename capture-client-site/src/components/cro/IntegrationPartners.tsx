"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Network, ArrowRight } from "lucide-react";
import {
  integrationPartners,
  integrationPartnerCategories,
  getPartnerHref,
} from "@/data/integration-partners";

export default function IntegrationPartners() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredPartners =
    activeCategory === "All"
      ? integrationPartners
      : integrationPartners.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50">
        {/* Mesh gradient background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(at 27% 37%, rgba(0, 201, 255, 0.12) 0px, transparent 50%),
                             radial-gradient(at 97% 21%, rgba(74, 105, 226, 0.1) 0px, transparent 50%),
                             radial-gradient(at 52% 99%, rgba(0, 201, 255, 0.08) 0px, transparent 50%),
                             radial-gradient(at 10% 29%, rgba(74, 105, 226, 0.08) 0px, transparent 50%),
                             radial-gradient(at 97% 96%, rgba(0, 201, 255, 0.06) 0px, transparent 50%),
                             radial-gradient(at 33% 50%, rgba(74, 105, 226, 0.06) 0px, transparent 50%),
                             radial-gradient(at 79% 53%, rgba(0, 201, 255, 0.05) 0px, transparent 50%)`,
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur-xl mb-6">
            <Network className="w-5 h-5" style={{ color: "#00C9FF" }} />
            <span className="text-sm tracking-wide" style={{ color: "#00C9FF", fontWeight: 200 }}>
              50+ Seamless Integrations
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4"
            style={{
              fontFamily: "var(--font-bricolage-grotesque)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Connects With Your
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #00C9FF, #4A69E2)",
                fontWeight: 800,
              }}
            >
              Favorite Platforms
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-600" style={{ fontWeight: 200 }}>
            Our platform integrates seamlessly with industry-leading software to streamline your
            workflow and maximize efficiency.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {integrationPartnerCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "text-black"
                  : "hover:bg-slate-50 hover:text-slate-900"
              }`}
              style={
                activeCategory === category
                  ? {
                      backgroundImage: "linear-gradient(to right, #00C9FF, #4A69E2)",
                      fontWeight: 500,
                    }
                  : {
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      color: "rgb(71 85 105)",
                      border: "1px solid rgb(226 232 240)",
                      fontWeight: 200,
                    }
              }
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredPartners.map((partner, index) => {
            const href = getPartnerHref(partner.name);

            return (
              <Link key={partner.name} href={href} className="group relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                >
                  {/* Card */}
                  <div
                    className="relative h-full backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 overflow-hidden bg-white/70"
                    style={{
                      border: "1px solid rgb(226 232 240)",
                    }}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(0, 201, 255, 0.03) 0%, transparent 50%, rgba(74, 105, 226, 0.03) 100%)",
                        }}
                      />
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className="px-2 py-1 text-[9px] uppercase tracking-wider rounded-full"
                        style={{
                          color: "rgba(0, 201, 255, 0.7)",
                          backgroundColor: "rgba(0, 201, 255, 0.08)",
                          border: "1px solid rgba(0, 201, 255, 0.2)",
                          fontWeight: 500,
                        }}
                      >
                        {partner.category}
                      </span>
                    </div>

                    {/* Logo container */}
                    <div className="relative flex items-center justify-center h-16 mb-3">
                      <div className="relative w-full h-full flex items-center justify-center p-2 rounded-xl bg-white/90 group-hover:bg-white transition-colors duration-300">
                        {imageErrors.has(partner.name) ? (
                          // Fallback: Premium styled initials badge
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
                            style={{
                              backgroundImage:
                                "linear-gradient(135deg, rgba(0, 201, 255, 0.15), rgba(74, 105, 226, 0.1))",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            <span
                              className="text-sm tracking-wide"
                              style={{ color: "#1e293b", fontWeight: 700 }}
                            >
                              {partner.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        ) : (
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            width={120}
                            height={48}
                            sizes="(max-width: 640px) 100px, 120px"
                            className="object-contain max-h-10 w-auto filter group-hover:brightness-110 transition-all duration-300"
                            unoptimized
                            onError={() => {
                              setImageErrors((prev) => new Set(prev).add(partner.name));
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Partner info */}
                    <div className="text-center relative z-10">
                      <h3
                        className="text-slate-900 text-sm mb-1 transition-colors duration-300"
                        style={{ fontWeight: 500 }}
                      >
                        {partner.name}
                      </h3>
                      <p
                        className="text-xs leading-tight text-slate-600"
                        style={{ fontWeight: 200 }}
                      >
                        {partner.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-4 h-4" style={{ color: "#00C9FF" }} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div
            className="text-center p-6 backdrop-blur-xl rounded-2xl bg-white/70"
            style={{
              border: "1px solid rgb(226 232 240)",
            }}
          >
            <div
              className="text-3xl sm:text-4xl text-transparent bg-clip-text mb-2"
              style={{
                backgroundImage: "linear-gradient(to right, #00C9FF, #4A69E2)",
                fontFamily: "var(--font-bricolage-grotesque)",
                fontWeight: 800,
              }}
            >
              50+
            </div>
            <div className="text-sm text-slate-600" style={{ fontWeight: 200 }}>
              Native Integrations
            </div>
          </div>
          <div
            className="text-center p-6 backdrop-blur-xl rounded-2xl bg-white/70"
            style={{
              border: "1px solid rgb(226 232 240)",
            }}
          >
            <div
              className="text-3xl sm:text-4xl text-transparent bg-clip-text mb-2"
              style={{
                backgroundImage: "linear-gradient(to right, #00C9FF, #4A69E2)",
                fontFamily: "var(--font-bricolage-grotesque)",
                fontWeight: 800,
              }}
            >
              5,000+
            </div>
            <div className="text-sm text-slate-600" style={{ fontWeight: 200 }}>
              Via Zapier & Make
            </div>
          </div>
          <div
            className="text-center p-6 backdrop-blur-xl rounded-2xl bg-white/70"
            style={{
              border: "1px solid rgb(226 232 240)",
            }}
          >
            <div
              className="text-3xl sm:text-4xl text-transparent bg-clip-text mb-2"
              style={{
                backgroundImage: "linear-gradient(to right, #00C9FF, #4A69E2)",
                fontFamily: "var(--font-bricolage-grotesque)",
                fontWeight: 800,
              }}
            >
              API
            </div>
            <div className="text-sm text-slate-600" style={{ fontWeight: 200 }}>
              Custom Integrations
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="mb-4 text-slate-600" style={{ fontWeight: 200 }}>
            Don&apos;t see your platform? We can connect with virtually any tool via API or webhook.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              backgroundImage: "linear-gradient(to right, #00C9FF, #4A69E2)",
              color: "#000000",
              fontWeight: 500,
            }}
          >
            <span>Request an Integration</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
