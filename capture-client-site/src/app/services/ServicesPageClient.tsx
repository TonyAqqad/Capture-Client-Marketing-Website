"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";

// Service data type
interface ServiceData {
  service: {
    service_id: string;
    service_name: string;
    service_slug: string;
  };
  intro?: {
    paragraph?: string;
  };
  benefits?: Array<{
    title: string;
    description?: string;
  }>;
}

// Service-specific visual components
function VoiceAIVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        {[...Array(5)].map((_, i) => (
          <motion.rect
            key={i}
            x={20 + i * 35}
            y="50"
            width="8"
            height="10"
            rx="4"
            fill="currentColor"
            className="text-accent"
            animate={{
              height: [10, 60, 30, 80, 20],
              y: [50, 20, 35, 10, 40],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function GoogleAdsVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        <motion.path
          d="M 20 80 Q 60 20, 100 60 T 180 40"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {[30, 60, 90, 120, 150].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={60 - i * 5}
            r="4"
            fill="currentColor"
            className="text-accent"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

function FacebookAdsVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
      <div className="relative w-full h-full">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent" />
              <path d="M20 10 L20 30 M10 20 L30 20" stroke="currentColor" strokeWidth="2" className="text-primary" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LeadGenVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
      <svg className="w-full h-full" viewBox="0 0 200 100">
        {/* Funnel shape */}
        <motion.path
          d="M 40 20 L 160 20 L 120 50 L 80 50 Z"
          fill="currentColor"
          className="text-primary"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 80 50 L 120 50 L 110 70 L 90 70 Z"
          fill="currentColor"
          className="text-accent"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle
          cx="100"
          cy="80"
          r="5"
          fill="currentColor"
          className="text-accent"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
        />
      </svg>
    </div>
  );
}

const serviceVisuals: Record<string, React.ComponentType> = {
  "voice-ai": VoiceAIVisual,
  "google-ads": GoogleAdsVisual,
  "facebook-ads": FacebookAdsVisual,
  "lead-generation": LeadGenVisual,
};

interface ServicesPageClientProps {
  services: ServiceData[];
}

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background-dark via-[#1a1a3e] to-background-dark">
      {/* Mesh gradient background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-gradient" />
      </div>

      {/* Floating orbs - adjusted for mobile */}
      <motion.div
        className="fixed top-20 right-4 md:right-20 w-48 h-48 md:w-96 md:h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 left-4 md:left-20 w-48 h-48 md:w-96 md:h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Hero Section - Asymmetric Layout */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Content - Left 7 columns */}
            <div className="col-span-12 lg:col-span-7">
              {/* Animated eyebrow */}
              <motion.div
                className="inline-flex items-center gap-3 mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-8 md:w-12 h-px bg-gradient-to-r from-accent to-transparent" />
                <span className="text-accent text-base md:text-sm font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase">
                  Our Services
                </span>
              </motion.div>

              {/* Hero headline with gradient and extreme weights */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading leading-[0.95] mb-6 md:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="block font-extralight text-white/40">Marketing That</span>
                <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-primary mt-1 md:mt-2">
                  Actually Captures
                </span>
                <span className="block font-black text-white mt-1 md:mt-2">Clients.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mb-8 md:mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                AI voice agents, high-converting ad campaigns, and automated lead generation that
                works while you sleep.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <a
                  href="tel:865-346-3339"
                  className="group relative px-6 md:px-8 py-4 min-h-[48px] bg-accent text-background-dark font-bold text-base md:text-lg rounded-full overflow-hidden transition-transform hover:scale-105 flex items-center justify-center"
                >
                  <span className="relative z-10">Call Now: (865) 346-3339</span>
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
                <Link
                  href="/contact"
                  className="px-6 md:px-8 py-4 min-h-[48px] border-2 border-white/20 text-white text-base md:text-lg rounded-full backdrop-blur-sm hover:border-accent hover:bg-accent/10 transition-all duration-300 flex items-center justify-center"
                >
                  Get Free Consultation
                </Link>
              </motion.div>
            </div>

            {/* Visual Element - Right 5 columns */}
            <motion.div
              className="col-span-12 lg:col-span-5 relative mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {/* Floating 3D-style card */}
              <div className="relative">
                {/* Layered cards effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl rotate-6 transform translate-x-2 md:translate-x-4 translate-y-2 md:translate-y-4 blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl -rotate-3 transform -translate-x-1 md:-translate-x-2 translate-y-1 md:translate-y-2 blur-sm" />

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-base md:text-sm text-white/40 uppercase tracking-wider">Performance</div>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>

                    {/* Stats display */}
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <div className="text-white/60 text-base md:text-sm mb-1">Leads Captured</div>
                        <div className="text-3xl md:text-4xl font-bold text-white">15,847</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-green-400 text-base md:text-sm">↑ 247%</div>
                          <div className="text-white/40 text-sm md:text-xs">vs last year</div>
                        </div>
                      </div>

                      <div className="h-px bg-white/10" />

                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <div className="text-white/60 text-sm md:text-xs mb-1">Avg ROAS</div>
                          <div className="text-xl md:text-2xl font-bold text-accent">4.2x</div>
                        </div>
                        <div>
                          <div className="text-white/60 text-sm md:text-xs mb-1">Active Clients</div>
                          <div className="text-xl md:text-2xl font-bold text-primary">500+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid - Equal Heights & Consistent Spacing */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          {/* Unified grid layout: 2 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Visual = serviceVisuals[service.service.service_slug] || VoiceAIVisual;

              return (
                <motion.div
                  key={service.service.service_id}
                  className="h-full"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/services/${service.service.service_slug}`} className="block h-full">
                    <GlowCard className="h-full">
                      <div className="group relative flex flex-col h-full min-h-[500px] bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.01] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(0,201,255,0.25)] hover:-translate-y-1">
                        {/* Animated background visual */}
                        <Visual />

                        {/* Inner glow on hover */}
                        <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />

                        {/* Mesh gradient overlay */}
                        <div className="absolute inset-0 opacity-40 bg-mesh-premium pointer-events-none rounded-2xl md:rounded-3xl" />

                        {/* Service number badge - enhanced with glass effect */}
                        <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-primary/90 to-accent/90 backdrop-blur-xl rounded-full border-4 border-background-dark shadow-[0_8px_24px_rgba(74,105,226,0.4)] flex items-center justify-center group-hover:shadow-[0_12px_32px_rgba(0,201,255,0.6)] transition-shadow duration-500">
                          <span className="text-2xl font-black text-white drop-shadow-lg">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Icon with animated background - enhanced */}
                          <div className="relative w-20 h-20 mb-6">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 rounded-2xl blur-md"
                              animate={{ rotate: [0, 90, 180, 270, 360] }}
                              transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            <div className="relative w-full h-full bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:border-accent/40 transition-colors duration-500">
                              <span className="material-icons text-4xl text-accent drop-shadow-[0_4px_8px_rgba(0,201,255,0.5)]">
                                {service.service.service_slug === "voice-ai"
                                  ? "settings_voice"
                                  : service.service.service_slug === "google-ads"
                                  ? "trending_up"
                                  : service.service.service_slug === "facebook-ads"
                                  ? "campaign"
                                  : "rocket_launch"}
                              </span>
                            </div>
                          </div>

                          {/* Service name - consistent sizing with gradient on hover */}
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-accent group-hover:to-white transition-all duration-500">
                            {service.service.service_name}
                          </h2>

                          {/* Description - fixed height container with better readability */}
                          <p className="text-base lg:text-lg text-white/70 mb-6 leading-relaxed line-clamp-4 group-hover:text-white/80 transition-colors duration-300">
                            {service.intro?.paragraph?.substring(0, 200)}...
                          </p>

                          {/* Key benefits - enhanced with glassy checkmarks */}
                          {service.benefits && (
                            <div className="mb-6 space-y-3 flex-grow">
                              {service.benefits.slice(0, 3).map((benefit, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 backdrop-blur-sm border border-accent/50 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(0,201,255,0.3)] group-hover:shadow-[0_4px_12px_rgba(0,201,255,0.5)] transition-shadow duration-300">
                                    <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_rgba(0,201,255,0.8)]" />
                                  </div>
                                  <span className="text-sm text-white/80 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">{benefit.title}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Animated arrow link - pinned to bottom */}
                          <div className="flex items-center gap-2 text-accent font-medium text-base group-hover:gap-4 transition-all duration-300 mt-auto">
                            <span>Explore Service</span>
                            <motion.span
                              className="material-icons text-xl"
                              animate={{ x: [0, 5, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              arrow_forward
                            </motion.span>
                          </div>

                          {/* Gradient border animation on hover */}
                          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent rounded-3xl blur-xl opacity-50" />
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Angular divider */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Angular top divider */}
        <svg
          className="absolute top-0 left-0 w-full h-16 md:h-24 transform -translate-y-1/2"
          preserveAspectRatio="none"
          viewBox="0 0 100 10"
        >
          <polygon points="0,10 100,0 100,10" fill="rgb(74, 105, 226)" opacity="0.1" />
        </svg>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4 md:mb-6 px-4">
              Not Sure Which{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Service
              </span>{" "}
              You Need?
            </h2>

            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8 md:mb-12 px-4">
              Talk to a real human. We&apos;ll analyze your business and recommend the perfect solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <a
                href="tel:865-346-3339"
                className="group relative w-full sm:w-auto px-6 md:px-8 py-4 md:py-5 min-h-[52px] bg-gradient-to-r from-accent to-primary text-white font-bold text-base md:text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="material-icons text-xl">phone</span>
                  <span>Call Us: (865) 346-3339</span>
                </span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 md:px-8 py-4 md:py-5 min-h-[52px] border-2 border-white/20 text-white text-base md:text-lg rounded-full backdrop-blur-sm hover:border-accent hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="material-icons text-xl">email</span>
                <span>Get Free Consultation</span>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 text-base md:text-sm text-white/40 px-4">
              <div className="flex items-center gap-2">
                <span className="material-icons text-accent text-xl">check_circle</span>
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-accent text-xl">check_circle</span>
                <span>15,000+ Leads Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-accent text-xl">check_circle</span>
                <span>4.2x Average ROAS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
