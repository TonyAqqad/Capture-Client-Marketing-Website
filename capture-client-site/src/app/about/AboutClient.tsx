"use client";

import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { motion } from "@/lib/motion";
import { useState, useEffect } from "react";

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Ease out quad
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(end * easeProgress));

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, hasStarted]);

  return { count, startCounting: () => setHasStarted(true) };
}

interface StatCardProps {
  value: string | number;
  label: string;
  delay: number;
  isNumeric?: boolean;
  suffix?: string;
}

function StatCard({ value, label, delay, isNumeric = false, suffix = "" }: StatCardProps) {
  const numericValue = isNumeric ? parseInt(value.toString().replace(/\D/g, '')) : 0;
  const { count, startCounting } = useCounter(numericValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={isNumeric ? startCounting : undefined}
      className="text-center bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl p-6 sm:p-8 hover:scale-105 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
    >
      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <p className="text-sm sm:text-base text-slate-600">{label}</p>
    </motion.div>
  );
}

export default function AboutClient() {
  const services = [
    {
      title: "Voice AI Agents",
      description: "Our AI voice agents answer every call, qualify leads based on your criteria, book appointments directly into your calendar, and transfer hot leads to your team in real-time."
    },
    {
      title: "Google Ads Management",
      description: "We create and manage ROI-focused Google Ads campaigns that put your business at the top of search results when customers are actively looking for your services."
    },
    {
      title: "Facebook Ads Lead Generation",
      description: "Targeted Facebook and Instagram advertising campaigns designed to generate qualified leads for local service businesses."
    }
  ];

  const values = [
    {
      title: "No Long-Term Contracts",
      description: "Month-to-month billing. Cancel anytime."
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees. What you see is what you pay."
    },
    {
      title: "Results-Focused",
      description: "We only succeed when you capture more clients."
    },
    {
      title: "Expert Support",
      description: "Real humans available to help you succeed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />

        {/* Animated orb */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-blue-400/30 to-transparent blur-3xl" />
        </motion.div>

        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight"
          >
            About Capture Client
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto px-4"
          >
            Automating leads and capturing clients for small businesses nationwide.
          </motion.p>
        </div>
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4 sm:mb-6" style={{ lineHeight: '1.7' }}>
              At Capture Client, we believe small businesses shouldn't have to choose between
              answering phones and serving customers. We're on a mission to automate lead capture
              and qualification so business owners can focus on what they do best.
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed" style={{ lineHeight: '1.7' }}>
              Our AI-powered voice agents work 24/7 to answer every call, qualify leads instantly,
              and book appointments automatically. Combined with strategic paid advertising on
              Google and Facebook, we help service-based businesses capture more clients without
              hiring additional staff.
            </p>
          </motion.section>

          {/* Stats Section - Animated Counters */}
          <section className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <StatCard value="Growing" label="Client Base" delay={0.1} />
            <StatCard value="24/7" label="AI Availability" delay={0.2} />
            <StatCard value={3} label="More Clients Captured" delay={0.3} isNumeric suffix="x" />
          </section>

          {/* What We Do Section */}
          <section className="mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6"
            >
              What We Do
            </motion.h2>
            <div className="space-y-4 sm:space-y-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl p-5 sm:p-6 hover:border-blue-300 hover:scale-[1.02] transition-all duration-300"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed" style={{ lineHeight: '1.7' }}>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why Choose Us - Values Cards */}
          <section className="mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6"
            >
              Why Choose Us
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-blue-300 hover:scale-105 transition-all duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-200 shadow-lg shadow-slate-200/50"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
              Ready to Automate Your Leads?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
              Let's discuss how Capture Client can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.a
                href="tel:865-346-6111"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-blue-200/50 w-full sm:w-auto transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call 865-346-6111
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl inline-flex items-center justify-center w-full sm:w-auto transition-colors"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
