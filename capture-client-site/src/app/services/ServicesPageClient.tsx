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
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    textGradient: "from-blue-400 to-indigo-400",
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
    <div className="min-h-screen bg-gradient-to-b from-background-dark via-[#1a1a3e] to-background-dark">
      {/* Fixed aurora background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-aurora-animated" />
      </div>

      {/* Floating orbs - disabled on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="fixed top-20 right-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
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
            className="fixed bottom-20 left-20 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none"
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
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated eyebrow */}
            <motion.div
              className="inline-flex items-center gap-3 mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-gold to-transparent" />
              <span className="text-gold text-sm md:text-xs font-extrabold tracking-[0.2em] uppercase">
                Our Services
              </span>
              <div className="w-8 md:w-12 h-px bg-gradient-to-l from-gold to-transparent" />
            </motion.div>

            {/* Hero headline with extreme weights */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-hero leading-[0.95] mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block font-light text-white/40">Marketing That</span>
              <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gold to-cyan-500 mt-1 md:mt-2">
                Actually Captures
              </span>
              <span className="block font-black text-white mt-1 md:mt-2">Clients.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI voice agents, high-converting ad campaigns, and automated lead generation that
              works while you sleep.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a
                href="tel:865-346-3339"
                className="group relative px-8 py-4 min-h-[56px] bg-gradient-to-r from-gold to-[#D4AF37] text-background-dark font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-glow-gold-intense flex items-center justify-center"
              >
                <span className="relative z-10">Call Now: (865) 346-3339</span>
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 min-h-[56px] glass-premium text-white text-lg font-semibold rounded-full border-2 border-white/20 hover:border-gold/50 hover:bg-gold/10 transition-all duration-300 flex items-center justify-center"
              >
                Get Free Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Service Tabs Section */}
      <section className="section relative bg-background-dark overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-display-md md:text-display-lg font-hero font-black text-foreground mb-4">
                Choose Your <span className="text-gradient-gold-cyan">Weapon</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
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
                      ? `glass-premium ${config.borderColor} border-2 text-foreground shadow-glow-gold-lg scale-105`
                      : "glass text-foreground-muted hover:text-foreground hover:scale-105"
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
                <div className={`glass-premium p-8 md:p-12 rounded-3xl bg-gradient-to-br ${activeConfig.color} mb-8`}>
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Scenario & Value Prop */}
                    <div>
                      <div className="text-7xl md:text-8xl mb-6">{activeConfig.icon}</div>
                      <h3 className="text-3xl md:text-4xl font-hero font-black text-foreground mb-4">
                        {activeConfig.name}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/30 mb-4">
                        <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-wider text-gold">
                          {activeConfig.scenario}
                        </span>
                      </div>
                      <p className="text-lg md:text-xl text-foreground-muted mb-6 leading-relaxed">
                        {activeConfig.pain}
                      </p>
                      <div className="glass-card p-6 rounded-2xl">
                        <div className="text-sm text-foreground-muted mb-2">Proven Results</div>
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
                          className="glass-card p-6 hover:shadow-glow-lg transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeConfig.color} border ${activeConfig.borderColor} flex items-center justify-center flex-shrink-0`}>
                              <span className={`font-black text-lg bg-gradient-to-r ${activeConfig.textGradient} bg-clip-text text-transparent`}>
                                {step.step}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-foreground mb-1">{step.title}</h4>
                              <p className="text-sm text-foreground-muted leading-relaxed">{step.description}</p>
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
                    <div
                      key={idx}
                      className="glass-card p-6 text-center hover:shadow-glow transition-all"
                    >
                      <div className="text-sm text-foreground-muted mb-2 uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${activeConfig.textGradient} bg-clip-text text-transparent mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-foreground-muted">
                        {stat.description}
                      </div>
                    </div>
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
              className="inline-flex items-center gap-3 btn-gold text-lg md:text-xl px-10 py-5 rounded-2xl shadow-glow-gold-intense hover:scale-105 transition-all font-bold"
            >
              See It In Action - Book Demo
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid - All Services Overview */}
      <section className="section relative bg-background py-16 md:py-24">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-display-md font-hero font-black text-foreground mb-4">
              The Complete <span className="text-gradient-gold-cyan">Arsenal</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Explore each service in detail
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {enhancedServices.map((service, index) => {
              const config = service.config!;
              return (
                <motion.div
                  key={service.service.service_id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link
                    href={`/services/${service.service.service_slug}`}
                    className="block h-full group"
                  >
                    <div className={`glass-3d h-full min-h-[400px] p-8 lg:p-10 bg-gradient-to-br ${config.color} border ${config.borderColor} hover:shadow-glow-lg hover:-translate-y-2 transition-all duration-500 relative overflow-hidden rounded-3xl`}>
                      {/* Number badge */}
                      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-gold/90 to-cyan-500/90 backdrop-blur-xl rounded-full border-4 border-background-dark shadow-glow-gold flex items-center justify-center">
                        <span className="text-2xl font-black text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="text-6xl mb-6 mt-4">{config.icon}</div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-hero font-black text-foreground mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-gold group-hover:to-cyan-500 transition-all">
                        {service.service.service_name}
                      </h3>

                      {/* Description */}
                      <p className="text-base md:text-lg text-foreground-muted mb-6 leading-relaxed line-clamp-3">
                        {service.intro?.paragraph?.substring(0, 150)}...
                      </p>

                      {/* Benefits */}
                      {service.benefits && (
                        <div className="space-y-3 mb-6">
                          {service.benefits.slice(0, 3).map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${config.color} border ${config.borderColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.textGradient}`} />
                              </div>
                              <span className="text-sm text-foreground-muted line-clamp-2">{benefit.title}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Arrow link */}
                      <div className={`flex items-center gap-2 font-semibold text-base bg-gradient-to-r ${config.textGradient} bg-clip-text text-transparent group-hover:gap-4 transition-all mt-auto`}>
                        <span>Explore Service</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`stroke-current bg-gradient-to-r ${config.textGradient}`}/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section relative bg-background-dark py-16 md:py-24">
        <div className="absolute inset-0 bg-mesh-premium opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gold/30 via-cyan-500/20 to-transparent blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-hero font-black text-foreground mb-6 px-4">
              Not Sure Which{" "}
              <span className="text-gradient-gold-cyan">
                Service
              </span>{" "}
              You Need?
            </h2>

            <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto mb-8 md:mb-12 px-4 leading-relaxed">
              Talk to a real human. We'll analyze your business and recommend the perfect solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <a
                href="tel:865-346-3339"
                className="group relative w-full sm:w-auto px-10 py-5 min-h-[60px] bg-gradient-to-r from-gold to-[#D4AF37] text-background-dark font-bold text-lg md:text-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-gold-intense flex items-center justify-center gap-3"
              >
                <span className="text-2xl">📞</span>
                <span>Call Us: (865) 346-3339</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-10 py-5 min-h-[60px] glass-premium text-white text-lg md:text-xl font-semibold rounded-2xl border-2 border-white/20 hover:border-gold/50 hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">✉️</span>
                <span>Get Free Consultation</span>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-8 text-sm text-white/50 px-4">
              <div className="flex items-center gap-2">
                <span className="text-gold text-xl">✓</span>
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xl">✓</span>
                <span>15,847 Leads Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xl">✓</span>
                <span>4.2x Average ROAS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
