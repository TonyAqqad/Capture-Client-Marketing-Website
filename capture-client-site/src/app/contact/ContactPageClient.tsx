"use client";

import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";
import ObfuscatedEmail from "@/components/ui/ObfuscatedEmail";
import { motion } from "@/lib/motion";
import {
  ShieldCheck,
  Zap,
  Ban,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  Bot,
  ArrowRight,
  Search,
  Users,
} from "lucide-react";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section with Form as Star */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-6 sm:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
              <span className="text-blue-600 text-sm font-semibold tracking-[0.2em] uppercase">
                Get Started
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-6 leading-[1.1] sm:leading-[0.95]"
            >
              <span className="block text-slate-500 font-light">Ready to</span>
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent animate-gradient-shift">
                Grow Together?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-600 text-center max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4"
            >
              Get your free consultation and custom strategy. Zero pressure, just results.
            </motion.p>

            {/* Two-Column Layout: Form + Info */}
            <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* LEFT: Premium Form Card (Takes 3 columns) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-3 order-2 lg:order-1"
              >
                <div className="relative group">
                  {/* Animated glow border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-all duration-500 animate-gradient-shift" />

                  {/* Form card */}
                  <div className="relative bg-white/70 backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                        Send Us a Message
                      </h2>
                      {/* Social Proof Badge */}
                      <div className="flex sm:hidden items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5">
                        <span className="text-lg">🔥</span>
                        <span className="text-xs text-slate-700">
                          <span className="font-bold text-blue-600">100+</span> served
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                        <span className="text-2xl">🔥</span>
                        <span className="text-xs text-slate-700">
                          <span className="font-bold text-blue-600">100+</span> businesses served
                        </span>
                      </div>
                    </div>

                    <LeadCaptureForm source="contact-page-premium" />

                    {/* Trust Signals Below Form */}
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8 text-sm text-slate-600">
                        <div className="flex items-center gap-2 min-h-[44px]">
                          <ShieldCheck className="w-5 h-5 text-blue-600" />
                          <span>100% Secure</span>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px]">
                          <Zap className="w-5 h-5 text-blue-600" />
                          <span>2-Hour Response</span>
                        </div>
                        <div className="flex items-center gap-2 min-h-[44px]">
                          <Ban className="w-5 h-5 text-blue-600" />
                          <span>No Spam, Ever</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: Contact Info Cards (Takes 2 columns) */}
              <div className="lg:col-span-2 order-1 lg:order-2 space-y-4 sm:space-y-6 flex flex-col items-stretch">
                {/* Phone Card - Most Prominent */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="group relative overflow-hidden w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <a
                    href="tel:865-346-6111"
                    className="relative bg-white/70 backdrop-blur-xl rounded-xl p-5 sm:p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300 block min-h-[80px] active:scale-[0.98] shadow-lg shadow-slate-200/50"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Animated Phone Icon */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-ping" />
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200">
                          <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider mb-1 sm:mb-2">
                          Prefer to Call?
                        </h3>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors duration-300 block mb-1 break-words">
                          (865) 346-6111
                        </span>
                        <p className="text-xs sm:text-sm text-slate-500">Mon-Fri: 9am - 6pm EST</p>
                      </div>
                    </div>
                  </a>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="group relative overflow-hidden w-full"
                >
                  <ObfuscatedEmail
                    email="team@captureclient.com"
                    className="relative bg-white/70 backdrop-blur-xl rounded-xl p-5 sm:p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300 block min-h-[80px] active:scale-[0.98] no-underline shadow-lg shadow-slate-200/50"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 flex-shrink-0">
                        <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider mb-1 sm:mb-2">
                          Email Us
                        </h3>
                        <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 block mb-1 break-words">
                          team@captureclient.com
                        </span>
                        <p className="text-xs sm:text-sm text-slate-500">24-hour response time</p>
                      </div>
                    </div>
                  </ObfuscatedEmail>
                </motion.div>

                {/* Location Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="group relative overflow-hidden w-full"
                >
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-xl p-5 sm:p-6 border border-slate-200 hover:border-blue-300 transition-all duration-300 min-h-[80px] shadow-lg shadow-slate-200/50">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-blue-600/10 rounded-full animate-pulse" />
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200">
                          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider mb-1 sm:mb-2">
                          Based In
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-1">
                          Knoxville, TN
                        </p>
                        <p className="text-xs sm:text-sm text-slate-500">
                          Serving businesses nationwide
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect - Visual Journey */}
        <section className="py-16 sm:py-20 px-6 sm:px-8 relative">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 sm:mb-4 px-4">
                What Happens Next?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
                A simple, transparent process designed around your success
              </p>
            </motion.div>

            {/* Timeline Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/0 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-50 border-2 border-blue-600 mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-blue-600">1</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    You Reach Out
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Fill out the form or give us a call. Takes less than 2 minutes.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-blue-600">
                    &lt; 2 minutes
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-50 border-2 border-cyan-600 mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-cyan-600">2</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    We Respond Fast
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our team reviews your info and reaches out within 2 hours.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-cyan-600">
                    2-hour response
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/0 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-50 border-2 border-blue-600 mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-blue-600">3</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Free Consultation
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    30-minute strategy session. No sales pitch, just solutions.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-blue-600">30 minutes</div>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                <div className="relative text-center px-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-50 border-2 border-cyan-600 mb-4 sm:mb-6 relative z-10">
                    <span className="text-xl sm:text-2xl font-black text-cyan-600">4</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    Custom Proposal
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Tailored strategy and transparent pricing for your goals.
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-cyan-600">Same day</div>
                </div>
              </motion.div>
            </div>

            {/* Trust Statement */}
            <div className="mt-12 sm:mt-16 text-center px-4">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl px-5 sm:px-6 py-3 sm:py-4 rounded-full border border-slate-200 shadow-lg shadow-slate-200/50">
                <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <p className="text-sm sm:text-base text-slate-700 font-medium">
                  <span className="text-blue-600 font-bold">Zero</span> pressure.{" "}
                  <span className="text-blue-600 font-bold">100%</span> transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Quick Links - Redesigned */}
        <section className="py-16 sm:py-20 px-6 sm:px-8 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4 px-4">
                Explore Our Services
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
                AI-powered solutions that capture leads and drive growth
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Voice AI Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link
                  href="/services/voice-ai"
                  className="group relative block min-h-[44px] active:scale-[0.98] transition-transform h-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-all duration-500" />
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 h-full hover:border-blue-300 transition-all duration-300 shadow-lg shadow-slate-200/50">
                    {/* Popular Badge */}
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-blue-600 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-3 sm:py-1 rounded-full rotate-12">
                      POPULAR
                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-blue-200 group-hover:scale-110 transition-transform duration-300">
                      <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      Voice AI Agents
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                      Never miss a call. AI answers 24/7, qualifies leads, and books appointments
                      automatically.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-slate-500">Starting at $997/mo</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Google Ads Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/services/google-ads"
                  className="group relative block min-h-[44px] active:scale-[0.98] transition-transform h-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-all duration-500" />
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 h-full hover:border-blue-300 transition-all duration-300 shadow-lg shadow-slate-200/50">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-cyan-200 group-hover:scale-110 transition-transform duration-300">
                      <Search className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                      Google Ads
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                      ROI-focused PPC campaigns that capture high-intent customers when they're
                      ready to buy.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-slate-500">Custom pricing</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Facebook Ads Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="sm:col-span-2 lg:col-span-1"
              >
                <Link
                  href="/services/facebook-ads"
                  className="group relative block min-h-[44px] active:scale-[0.98] transition-transform h-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-all duration-500" />
                  <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 h-full hover:border-blue-300 transition-all duration-300 shadow-lg shadow-slate-200/50">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-blue-200 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      Facebook Ads
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
                      Targeted social advertising that generates qualified leads and builds your
                      brand awareness.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-slate-500">Custom pricing</span>
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* View All Services Link */}
            <div className="text-center mt-10 sm:mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-slate-900 font-semibold group transition-colors duration-300 min-h-[44px] text-sm sm:text-base px-4 py-2 sm:px-0"
              >
                <span>View All Services</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 sm:py-20 px-6 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-blue-600/5" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center border border-slate-200 shadow-lg shadow-slate-200/50"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-5 sm:mb-6">
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-600"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  We&apos;re Available Now
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight px-4">
                Still Have Questions?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
                We&apos;re here to help. Call, email, or visit our FAQ page to learn more about how
                we can help your business grow.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="tel:865-346-6111"
                  className="btn-primary inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg group w-full sm:w-auto justify-center min-h-[48px] active:scale-[0.98] transition-transform"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Call Now</span>
                </a>

                <Link
                  href="/faq"
                  className="bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200 inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg group w-full sm:w-auto justify-center min-h-[48px] active:scale-[0.98] transition-transform"
                >
                  <span>View FAQ</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
