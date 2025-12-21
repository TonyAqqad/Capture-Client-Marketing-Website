"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion";

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

// Premium service configurations with unique gradients and scenarios
const SERVICE_CONFIGS = {
  "voice-ai": {
    id: "voice-ai",
    name: "Voice AI Agents",
    icon: "🤖",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    textGradient: "from-cyan-400 to-blue-400",
    scenario: "3 AM Emergency Call",
    value: "$900+ Revenue Saved",
    pain: "Your phone rings at 3 AM. A customer needs help NOW. Without AI, they hit voicemail and call your competitor. With AI? Instant answer, qualified lead, booked appointment.",
    howItWorks: [
      {
        step: "1",
        title: "AI Answers in 2 Rings",
        description: "Professional greeting, natural conversation - customer can't tell it's AI",
      },
      {
        step: "2",
        title: "Qualifies the Lead",
        description: "Asks the right questions, captures contact info, determines urgency",
      },
      {
        step: "3",
        title: "Books Appointment",
        description: "Syncs with your calendar, confirms time, sends confirmation SMS",
      },
      {
        step: "4",
        title: "You Win The Job",
        description: "Lead in your CRM, appointment booked, revenue captured automatically",
      },
    ],
    stats: [
      { label: "Answer Rate", value: "100%", description: "Every call answered" },
      { label: "Response Time", value: "2 rings", description: "Instant pickup" },
      { label: "Conversion Rate", value: "3.2x", description: "vs. voicemail" },
    ],
  },
  "facebook-ads": {
    id: "facebook-ads",
    name: "Facebook Ads",
    icon: "📱",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
    textGradient: "from-blue-400 to-blue-500",
    scenario: "Laser-Targeted Campaigns",
    value: "4.2x Average ROAS",
    pain: "Generic Facebook ads burn money. Our campaigns target your exact customer - by demographics, interests, behaviors, and location. Every dollar works harder.",
    howItWorks: [
      {
        step: "1",
        title: "Audience Research",
        description: "Identify your ideal customer profile with precision targeting",
      },
      {
        step: "2",
        title: "Creative Testing",
        description: "A/B test headlines, images, videos to find winning combinations",
      },
      {
        step: "3",
        title: "Campaign Launch",
        description: "Multi-ad-set campaigns optimized for conversions, not vanity metrics",
      },
      {
        step: "4",
        title: "Continuous Optimization",
        description: "Daily monitoring, bid adjustments, creative refreshes for peak performance",
      },
    ],
    stats: [
      { label: "Avg ROAS", value: "4.2x", description: "Return on ad spend" },
      { label: "CPL", value: "42% lower", description: "vs. industry avg" },
      { label: "CTR", value: "2.8%", description: "3x industry avg" },
    ],
  },
  "google-ads": {
    id: "google-ads",
    name: "Google Ads",
    icon: "🎯",
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    textGradient: "from-red-400 to-orange-400",
    scenario: "High-Intent Search",
    value: "5.1x Average ROAS",
    pain: "Someone searches 'emergency plumber near me' RIGHT NOW. They need help. They're ready to buy. Our Google Ads put you at the top - capturing customers at peak buying intent.",
    howItWorks: [
      {
        step: "1",
        title: "Keyword Research",
        description: "Find high-intent keywords your competitors are missing",
      },
      {
        step: "2",
        title: "Ad Copy That Converts",
        description: "Compelling headlines and descriptions that drive clicks",
      },
      {
        step: "3",
        title: "Landing Page Optimization",
        description: "Every click goes to a conversion-optimized landing page",
      },
      {
        step: "4",
        title: "Bid Optimization",
        description: "Smart bidding strategies that maximize ROI, not just impressions",
      },
    ],
    stats: [
      { label: "Avg ROAS", value: "5.1x", description: "Return on ad spend" },
      { label: "Quality Score", value: "8.7/10", description: "Lower costs" },
      { label: "Conv Rate", value: "12.4%", description: "vs. 2-3% industry" },
    ],
  },
  "lead-generation": {
    id: "lead-generation",
    name: "Complete Lead Gen System",
    icon: "💼",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    textGradient: "from-purple-400 to-pink-400",
    scenario: "End-to-End Pipeline",
    value: "15,847 Leads Captured",
    pain: "Leads come from everywhere - phone, forms, ads, chat. Without a system, they fall through the cracks. Our unified CRM captures every lead, tracks every interaction, closes every deal.",
    howItWorks: [
      {
        step: "1",
        title: "Unified Inbox",
        description: "All leads flow into one place - calls, forms, chat, email",
      },
      {
        step: "2",
        title: "Lead Scoring",
        description: "AI ranks leads by quality - focus on the hottest opportunities first",
      },
      {
        step: "3",
        title: "Automated Follow-Up",
        description: "SMS, email, call sequences that nurture leads automatically",
      },
      {
        step: "4",
        title: "Pipeline Management",
        description: "Visual dashboard shows every deal from first contact to closed won",
      },
    ],
    stats: [
      { label: "Leads Tracked", value: "15,847", description: "Across all clients" },
      { label: "Follow-Up Rate", value: "100%", description: "No lead ignored" },
      { label: "Close Rate", value: "3.2x", description: "vs. manual process" },
    ],
  },
};

interface ServicesPageClientProps {
  services: ServiceData[];
}

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
  const [activeService, setActiveService] = useState("voice-ai");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Map services to configs
  const enhancedServices = services.map((service) => {
    const config = SERVICE_CONFIGS[service.service.service_slug as keyof typeof SERVICE_CONFIGS];
    return {
      ...service,
      config,
    };
  }).filter(s => s.config); // Only show services with configs

  const activeConfig = SERVICE_CONFIGS[activeService as keyof typeof SERVICE_CONFIGS];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Floating orbs - disabled on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="fixed top-20 right-20 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
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
            className="fixed bottom-20 left-20 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl pointer-events-none"
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
        </>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated eyebrow */}
            <motion.div
              className="inline-flex items-center gap-3 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
              <span className="text-blue-600 text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase">
                Our Services
              </span>
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
            </motion.div>

            {/* Hero headline with extreme weights and better hierarchy */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-hero leading-[0.95] mb-8 md:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block font-light text-slate-400 mb-2">Marketing That</span>
              <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-600 to-cyan-600 mt-2 md:mt-3">
                Actually Captures
              </span>
              <span className="block font-black text-slate-900 mt-2 md:mt-3">Clients.</span>
            </motion.h1>

            {/* Subheadline with better spacing */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI voice agents, high-converting ad campaigns, and automated lead generation that
              works <span className="text-blue-600 font-bold">24/7</span> while you sleep.
            </motion.p>

            {/* Enhanced CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a
                href="tel:865-346-6111"
                className="group relative px-10 py-5 min-h-[64px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg md:text-xl rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="relative z-10">Call: (865) 346-6111</span>
              </a>
              <Link
                href="/contact"
                className="px-10 py-5 min-h-[64px] bg-white text-slate-900 text-lg md:text-xl font-semibold rounded-2xl border-2 border-slate-200 hover:border-blue-600/50 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                <span>Get Free Consultation</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                  <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Service Tabs Section */}
      <section className="section relative bg-slate-50 overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-md md:text-display-lg font-hero font-black text-slate-900 mb-4">
                Choose Your <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Weapon</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Each service is a precision tool designed to capture clients and grow revenue
              </p>
            </motion.div>
          </div>

          {/* Service Tabs - Horizontal scroll on mobile */}
          <div className="flex overflow-x-auto gap-3 md:gap-4 mb-12 pb-4 md:pb-0 md:justify-center scrollbar-hide">
            {enhancedServices.map((service) => {
              const config = service.config!;
              return (
                <button
                  key={config.id}
                  onClick={() => setActiveService(config.id)}
                  className={`flex-shrink-0 px-6 py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
                    activeService === config.id
                      ? `bg-white/70 backdrop-blur-xl ${config.borderColor} border-2 text-slate-900 shadow-lg shadow-slate-200/50 scale-105`
                      : "bg-white/50 backdrop-blur-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:scale-105"
                  }`}
                >
                  <span className="mr-2 text-2xl">{config.icon}</span>
                  <span className="hidden sm:inline">{config.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Service Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            {activeConfig && (
              <motion.div
                key={activeConfig.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl mx-auto"
              >
                {/* Main content card */}
                <div className={`bg-white/70 backdrop-blur-xl border border-slate-200 p-8 md:p-12 rounded-3xl bg-gradient-to-br ${activeConfig.color} mb-8`}>
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Scenario & Value Prop */}
                    <div>
                      <div className="text-7xl md:text-8xl mb-6">{activeConfig.icon}</div>
                      <h3 className="text-3xl md:text-4xl font-hero font-black text-slate-900 mb-4">
                        {activeConfig.name}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-600/10 to-transparent border border-blue-600/30 mb-4">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                          {activeConfig.scenario}
                        </span>
                      </div>
                      <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
                        {activeConfig.pain}
                      </p>
                      <div className="bg-white/70 backdrop-blur-xl border border-slate-200 p-6 rounded-2xl">
                        <div className="text-sm text-slate-600 mb-2">Proven Results</div>
                        <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${activeConfig.textGradient} bg-clip-text text-transparent`}>
                          {activeConfig.value}
                        </div>
                      </div>
                    </div>

                    {/* Right: How It Works Steps */}
                    <div className="space-y-4">
                      {activeConfig.howItWorks.map((step, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          whileHover={{ x: 4, scale: 1.02 }}
                          className="bg-white/70 backdrop-blur-xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-200/50 hover:border-blue-600/30 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeConfig.color} border ${activeConfig.borderColor} flex items-center justify-center flex-shrink-0`}>
                              <span className={`font-black text-lg bg-gradient-to-r ${activeConfig.textGradient} bg-clip-text text-transparent`}>
                                {step.step}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-slate-900 mb-1">{step.title}</h4>
                              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
                >
                  {activeConfig.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4, scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/70 backdrop-blur-xl border border-slate-200 p-6 text-center hover:shadow-lg hover:shadow-slate-200/50 hover:border-blue-600/30 transition-all duration-300"
                    >
                      <div className="text-sm text-slate-600 mb-2 uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${activeConfig.textGradient} bg-clip-text text-transparent mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-600">
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg md:text-xl px-10 py-5 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] hover:scale-105 transition-all duration-500 font-bold"
            >
              Try Our AI Now
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 group-hover:translate-x-1 transition-transform">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid - All Services Overview */}
      <section className="section relative bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-display-md md:text-display-lg font-hero font-black text-slate-900 mb-4">
                The Complete{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Arsenal
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Explore each service in detail — click any card to dive deeper
              </p>
            </motion.div>
          </div>

          {/* Enhanced Bento Grid Layout with Depth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {enhancedServices.map((service, index) => {
              const config = service.config!;
              return (
                <motion.div
                  key={service.service.service_id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  className="h-full"
                >
                  <Link
                    href={`/services/${service.service.service_slug}`}
                    className="block h-full group"
                  >
                    <motion.div
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`bg-white h-full min-h-[450px] p-8 lg:p-10 rounded-3xl shadow-lg hover:shadow-2xl border-2 border-slate-100 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden flex flex-col`}
                    >
                      {/* Gradient background overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                      {/* Subtle gradient accent on left edge */}
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${config.textGradient} opacity-60 group-hover:w-2 transition-all duration-500`} />

                      {/* Number badge - enhanced */}
                      <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-2xl font-black text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content wrapper with relative positioning */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon with enhanced visual treatment */}
                        <div className={`inline-flex w-24 h-24 mb-6 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color} border-2 ${config.borderColor} shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          <div className="text-6xl">{config.icon}</div>
                        </div>

                        {/* Title with enhanced typography */}
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-hero font-black text-slate-900 mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:via-blue-600 group-hover:to-cyan-600 transition-all duration-500">
                          {service.service.service_name}
                        </h3>

                        {/* Description with better line clamping */}
                        <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors">
                          {service.intro?.paragraph?.substring(0, 180)}...
                        </p>

                        {/* Benefits with enhanced styling */}
                        {service.benefits && (
                          <div className="space-y-3 mb-8 flex-grow">
                            {service.benefits.slice(0, 3).map((benefit, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-start gap-3 group/benefit"
                              >
                                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${config.color} border-2 ${config.borderColor} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/benefit:scale-110 transition-transform`}>
                                  <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${config.textGradient}`} />
                                </div>
                                <span className="text-sm md:text-base text-slate-700 font-medium line-clamp-2 group-hover/benefit:text-slate-900 transition-colors">
                                  {benefit.title}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* CTA with arrow - pinned to bottom */}
                        <div className={`flex items-center gap-3 font-bold text-base md:text-lg bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent group-hover:gap-4 transition-all mt-auto pt-4 border-t border-slate-100`}>
                          <span>Explore Service</span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="flex-shrink-0 group-hover:translate-x-2 transition-transform duration-300"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`stroke-blue-600`}
                            />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-32">
        <div className="absolute inset-0 bg-mesh-premium opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Decorative element */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 mb-8 shadow-lg shadow-blue-600/30"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-hero font-black text-slate-900 mb-6 md:mb-8 px-4 leading-tight">
              Not Sure Which{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Service
              </span>{" "}
              You Need?
            </h2>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 md:mb-14 px-4 leading-relaxed font-medium">
              Talk to a real human. We'll analyze your business and recommend the{" "}
              <span className="text-slate-900 font-bold">perfect solution</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center px-4 mb-12 md:mb-16">
              <a
                href="tel:865-346-6111"
                className="group relative w-full sm:w-auto px-12 py-6 min-h-[72px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xl md:text-2xl rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(37,99,235,0.8)] shadow-xl shadow-blue-600/30 flex items-center justify-center gap-4"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>(865) 346-6111</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-12 py-6 min-h-[72px] bg-white text-slate-900 text-xl md:text-2xl font-semibold rounded-2xl border-2 border-slate-200 hover:border-blue-600/50 hover:bg-blue-50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-4"
              >
                <span>Free Consultation</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Enhanced trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto px-4"
            >
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/50 border border-slate-200 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path d="M20 7L9 18L4 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900">500+</div>
                <div className="text-sm text-slate-600 font-medium">Happy Clients</div>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/50 border border-slate-200 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path d="M20 7L9 18L4 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900">15,847</div>
                <div className="text-sm text-slate-600 font-medium">Leads Generated</div>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/50 border border-slate-200 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path d="M20 7L9 18L4 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900">4.2x</div>
                <div className="text-sm text-slate-600 font-medium">Average ROAS</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
