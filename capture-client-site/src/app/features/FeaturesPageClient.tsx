"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import AudioWaveform from "@/components/AudioWaveform";
import CRMCard from "@/components/CRMCard";
import GrowthDashboard from "@/components/GrowthDashboard";


export default function FeaturesPageClient() {
  return (
    <div className="min-h-screen bg-[#0F172A] overflow-hidden">
      {/* HERO SECTION - Diagonal Split */}
      <section className="relative min-h-[90vh] flex items-center pt-20 sm:pt-24">
        {/* Diagonal background division */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0F172A]" />
          <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-br from-[#1a1a3e] to-[#0F172A] transform skew-x-[-8deg] origin-top-right" />

          {/* Mesh gradient overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(at 20% 30%, rgba(0, 201, 255, 0.15) 0%, transparent 50%),
                radial-gradient(at 80% 70%, rgba(74, 105, 226, 0.10) 0%, transparent 50%),
                radial-gradient(at 50% 50%, rgba(0, 240, 255, 0.05) 0%, transparent 70%)
              `
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-[#00C9FF] to-transparent" />
                <span className="text-[#00C9FF] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Platform Features
                </span>
              </div>

              {/* Headline with extreme weight contrast - Mobile optimized */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-6 sm:mb-8">
                <span className="font-extralight text-white/60 block">Everything You</span>
                <span className="font-black text-white block">Need to</span>
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] via-white to-[#4A69E2] block">
                  Grow.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mb-8 sm:mb-12 leading-relaxed">
                One platform. Unlimited growth. AI voice agents, CRM, analytics, ads management—all working together to capture more leads and close more deals.
              </p>

              {/* CTA Group - Mobile optimized touch targets */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-6">
                <Link
                  href="/contact"
                  className="group relative px-8 py-4 sm:py-5 bg-[#00C9FF] text-[#0F172A] font-bold text-base sm:text-lg rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] min-h-[56px] flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <span className="material-icons text-xl sm:text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>

                <a
                  href="tel:8653463339"
                  className="flex items-center gap-3 sm:gap-4 text-white/80 hover:text-white group min-h-[56px] p-2"
                >
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-[#00C9FF] group-hover:bg-[#00C9FF]/10 transition-all flex-shrink-0">
                    <span className="material-icons text-2xl sm:text-3xl">phone</span>
                  </span>
                  <span className="text-sm sm:text-base">
                    <span className="block font-bold text-base sm:text-lg">(865) 346-3339</span>
                    <span className="text-white/40 text-xs sm:text-sm">Talk to our team</span>
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right: Floating Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <GrowthDashboard />

              {/* Floating accent elements */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-32 h-32 bg-[#00C9FF]/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#4A69E2]/20 rounded-full blur-3xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* HERO FEATURES - Large Alternating Sections */}
      <section className="relative py-16 sm:py-24 md:py-32">
        {/* Feature 1: AI Voice Agents - Left */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-24 md:mb-32">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#00C9FF]/10 border border-[#00C9FF]/20 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-black text-[#00C9FF]">01</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
                AI Voice Agents
              </h2>
              <p className="text-[#00C9FF] text-lg sm:text-xl font-bold mb-4 sm:mb-6 tracking-tight">
                Never miss a call again
              </p>
              <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                24/7 AI-powered voice agents that handle unlimited calls, qualify leads, book appointments, and answer questions with natural conversation. Your business never sleeps.
              </p>

              {/* Feature list with checkmarks */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Natural conversation AI that sounds human",
                  "Automatic call transcription and CRM sync",
                  "Multi-language support for global reach",
                  "Sentiment analysis and lead scoring"
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 min-h-[44px]"
                  >
                    <span className="material-icons text-2xl sm:text-3xl text-[#00C9FF] flex-shrink-0 mt-1">check_circle</span>
                    <span className="text-white/80 text-sm sm:text-base leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual: Animated waveform */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1a1a3e] to-[#0F172A] border border-white/10 p-6 sm:p-8 md:p-12 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-[#00C9FF]/50 to-[#4A69E2]/50 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

                <div className="relative z-10">
                  <AudioWaveform isActive={true} color="cyan" />

                  <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-white/40 text-xs sm:text-sm mb-2">Live Call Status</p>
                    <p className="text-white text-lg sm:text-xl font-bold">Qualifying Lead...</p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#00C9FF]/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature 2: Built-in CRM - Right */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 mb-16 sm:mb-24 md:mb-32">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Visual: CRM Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <CRMCard
                fields={[
                  { label: "Lead Name", value: "Sarah Thompson", filled: true },
                  { label: "Business Type", value: "HVAC Services", filled: true },
                  { label: "Appointment", value: "Wed 2PM", filled: true, urgent: false }
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#4A69E2]/10 border border-[#4A69E2]/20 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-black text-[#4A69E2]">02</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
                Built-in CRM
              </h2>
              <p className="text-[#4A69E2] text-lg sm:text-xl font-bold mb-4 sm:mb-6 tracking-tight">
                All your contacts, one place
              </p>
              <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Manage all client interactions, track conversations, and organize your sales pipeline in one unified system. No more juggling multiple tools.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  "Contact management with full history",
                  "Visual pipeline tracking and stages",
                  "Activity timeline for every lead",
                  "Team collaboration and assignments"
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 min-h-[44px]"
                  >
                    <span className="material-icons text-2xl sm:text-3xl text-[#4A69E2] flex-shrink-0 mt-1">check_circle</span>
                    <span className="text-white/80 text-sm sm:text-base leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature 3: Real-Time Analytics - Left */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#00C9FF]/10 border border-[#00C9FF]/20 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-black text-[#00C9FF]">03</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
                Real-Time Analytics
              </h2>
              <p className="text-[#00C9FF] text-lg sm:text-xl font-bold mb-4 sm:mb-6 tracking-tight">
                Data-driven decisions
              </p>
              <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                Track every metric that matters with beautiful, real-time dashboards showing campaign performance, ROI, and growth trends. Make smarter decisions, faster.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  "Live performance tracking across all channels",
                  "Custom reports and data visualization",
                  "Accurate ROI calculation per campaign",
                  "Predictive analytics and forecasting"
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 min-h-[44px]"
                  >
                    <span className="material-icons text-2xl sm:text-3xl text-[#00C9FF] flex-shrink-0 mt-1">check_circle</span>
                    <span className="text-white/80 text-sm sm:text-base leading-relaxed">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Visual: Chart mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1a1a3e] to-[#0F172A] border border-white/10 p-6 sm:p-8">
                {/* Animated chart bars */}
                <div className="flex items-end justify-between gap-2 sm:gap-3 h-48 sm:h-56 md:h-64 mb-6">
                  {[60, 75, 65, 85, 90, 80, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex-1 bg-gradient-to-t from-[#00C9FF] to-[#4A69E2] rounded-t-lg origin-bottom"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-[#00C9FF] text-xl sm:text-2xl font-bold">+127%</p>
                    <p className="text-white/40 text-xs sm:text-sm">Lead Growth</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#4A69E2] text-xl sm:text-2xl font-bold">34.2%</p>
                    <p className="text-white/40 text-xs sm:text-sm">Conv. Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#00C9FF] text-xl sm:text-2xl font-bold">$48K</p>
                    <p className="text-white/40 text-xs sm:text-sm">Revenue</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Angular Divider */}
      <div className="relative h-24 overflow-hidden">
        <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon points="0,0 100,100 100,0" fill="#1a1a3e" />
        </svg>
      </div>

      {/* SECONDARY FEATURES - Staggered Card Grid */}
      <section className="relative py-16 sm:py-24 md:py-32 bg-[#1a1a3e]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <span className="material-icons text-base sm:text-lg text-[#00C9FF]">auto_awesome</span>
              <span className="text-[#00C9FF] text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Power Features
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 px-4">
              Everything Else You Need
            </h2>
            <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
              Professional marketing tools that work seamlessly together
            </p>
          </div>

          {/* Staggered grid - cards offset for visual interest */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Google Ads - Base position */}
            <div className="md:mt-0">
              <SecondaryFeatureCard
                icon={<span className="material-icons text-4xl">track_changes</span>}
                title="Google Ads"
                description="Professional campaign management with conversion tracking and optimization for maximum ROI."
                color="cyan"
                delay={0}
                number="04"
              />
            </div>

            {/* Facebook Ads - Offset down */}
            <div className="md:mt-12">
              <SecondaryFeatureCard
                icon={<span className="material-icons text-4xl">thumb_up</span>}
                title="Facebook Ads"
                description="Targeted social advertising that generates qualified leads from your ideal customers."
                color="blue"
                delay={0.1}
                number="05"
              />
            </div>

            {/* Unified Inbox - Offset medium */}
            <div className="md:mt-6">
              <SecondaryFeatureCard
                icon={<span className="material-icons text-4xl">inbox</span>}
                title="Unified Inbox"
                description="All communications in one place—calls, texts, emails, forms. Never miss a message."
                color="cyan"
                delay={0.2}
                number="06"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTING FEATURES - Compact Row */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <SupportingFeature
              icon={<span className="material-icons text-2xl">calendar_today</span>}
              title="Smart Scheduling"
              description="Automated booking with reminders"
            />
            <SupportingFeature
              icon={<span className="material-icons text-2xl">article</span>}
              title="Lead Forms"
              description="Custom forms with CRM integration"
            />
            <SupportingFeature
              icon={<span className="material-icons text-2xl">bolt</span>}
              title="Automation"
              description="Trigger-based workflows"
            />
          </div>
        </div>
      </section>

      {/* INTEGRATIONS - Premium Animated Carousel */}
      <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-[#0F172A] to-[#1a1a3e] overflow-hidden">
        {/* Background mesh gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(at 20% 50%, rgba(0, 201, 255, 0.1) 0%, transparent 50%),
              radial-gradient(at 80% 50%, rgba(74, 105, 226, 0.08) 0%, transparent 50%)
            `
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 sm:mb-4 px-4">
                Seamless <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]">Integrations</span>
              </h2>
              <p className="text-white/60 text-base sm:text-lg px-4">
                Connect with the tools you already use
              </p>
            </motion.div>
          </div>

          {/* Premium animated logo carousel with glass cards */}
          <div className="relative">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-r from-[#1a1a3e] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-40 bg-gradient-to-l from-[#1a1a3e] to-transparent z-10 pointer-events-none" />

            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-6 sm:gap-8 md:gap-12 items-center"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/10 flex items-center justify-center backdrop-blur-lg hover:border-[#00C9FF]/30 transition-all group relative overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(0, 201, 255, 0.2) 50%, transparent 100%)',
                      backgroundSize: '200% 200%'
                    }}
                  />

                  {/* Integration icon placeholder */}
                  <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="text-white/40 text-xs sm:text-sm font-bold">API</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Premium with layered effects */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
        {/* Multi-layer background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0F172A]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10 via-[#4A69E2]/10 to-transparent" />

          {/* Animated gradient orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-[#00C9FF]/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#4A69E2]/20 rounded-full blur-3xl"
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium headline with extreme weight contrast */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black text-white mb-4 sm:mb-6 px-4">
              <span className="font-extralight text-white/60 block mb-2">Ready to Experience</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] via-white to-[#4A69E2] block">
                All These Features?
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed">
              Book a free demo and see how Capture Client can transform your business with AI-powered growth tools.
            </p>

            {/* Premium CTA buttons with enhanced effects */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-[#00C9FF] text-[#0F172A] font-bold text-base sm:text-lg rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,201,255,0.6)] min-h-[56px] flex items-center justify-center"
                >
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book a Demo
                    <span className="material-icons text-xl sm:text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="tel:8653463339"
                  className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-white/[0.05] border-2 border-white/20 text-white font-bold text-base sm:text-lg rounded-full backdrop-blur-lg hover:bg-white/10 hover:border-[#00C9FF]/50 transition-all min-h-[56px] flex items-center justify-center overflow-hidden"
                >
                  {/* Glass shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="relative z-10">
                    Call Us: (865) 346-3339
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Trust signal */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-white/40 text-sm"
            >
              Join hundreds of businesses growing with AI
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Secondary Feature Card Component
interface SecondaryFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "cyan" | "blue";
  delay: number;
  number: string;
}

function SecondaryFeatureCard({ icon, title, description, color, delay, number }: SecondaryFeatureCardProps) {
  const colorClasses = {
    cyan: {
      border: "border-[#00C9FF]/30",
      bg: "from-[#00C9FF]/10 to-transparent",
      glow: "group-hover:shadow-[0_0_30px_rgba(0,201,255,0.2)]",
      icon: "text-[#00C9FF]",
      badge: "bg-[#00C9FF]/10 border-[#00C9FF]/20 text-[#00C9FF]"
    },
    blue: {
      border: "border-[#4A69E2]/30",
      bg: "from-[#4A69E2]/10 to-transparent",
      glow: "group-hover:shadow-[0_0_30px_rgba(74,105,226,0.2)]",
      icon: "text-[#4A69E2]",
      badge: "bg-[#4A69E2]/10 border-[#4A69E2]/20 text-[#4A69E2]"
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="group relative"
    >
      {/* Layered frame effect for premium look */}
      <div className="absolute inset-0 border border-white/5 translate-x-3 translate-y-3 rounded-xl sm:rounded-2xl" />
      <div className="absolute inset-0 border border-white/10 translate-x-1.5 translate-y-1.5 rounded-xl sm:rounded-2xl" />

      {/* Glow effect on hover */}
      <div className={`absolute -inset-px bg-gradient-to-r ${colors.border} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`} />

      <div className="relative bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full transition-all duration-300 group-hover:-translate-y-2">
        {/* Number badge - positioned top-left */}
        <div className={`absolute -top-3 -left-3 w-10 h-10 sm:w-12 sm:h-12 ${colors.badge} border rounded-full flex items-center justify-center font-black text-sm sm:text-base shadow-lg`}>
          {number}
        </div>

        {/* Icon with animated background and rotating glow */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
          {/* Rotating glow ring */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-xl sm:rounded-2xl blur-md opacity-50`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Main icon background - rotates on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-xl sm:rounded-2xl border border-white/10`}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Icon */}
          <div className={`relative w-full h-full flex items-center justify-center ${colors.icon}`}>
            {icon}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3">
          {title}
        </h3>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
          {description}
        </p>

        {/* Animated arrow link - touch-friendly */}
        <div className={`inline-flex items-center gap-2 mt-2 sm:mt-4 ${colors.icon} font-medium group-hover:gap-4 transition-all min-h-[44px]`}>
          Learn more
          <span className="material-icons text-base sm:text-lg">arrow_forward</span>
        </div>

        {/* Bottom edge highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

// Supporting Feature Component
interface SupportingFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SupportingFeature({ icon, title, description }: SupportingFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white/[0.02] backdrop-blur-lg border border-white/10 hover:border-[#00C9FF]/30 transition-all min-h-[72px] overflow-hidden"
    >
      {/* Glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={false}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 201, 255, 0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%'
        }}
      />

      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-[#00C9FF]/10 flex items-center justify-center text-[#00C9FF] flex-shrink-0 group-hover:scale-110 transition-transform border border-[#00C9FF]/20">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/20 to-transparent rounded-lg sm:rounded-xl" />
        <div className="relative z-10">
          {icon}
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <h4 className="text-white font-bold mb-1 text-sm sm:text-base group-hover:text-[#00C9FF] transition-colors">{title}</h4>
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>

      {/* Bottom edge highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
