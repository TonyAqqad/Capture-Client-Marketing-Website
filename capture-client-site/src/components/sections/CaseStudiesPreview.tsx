"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { Snowflake, Stethoscope, Wrench, ArrowRight } from "lucide-react";

interface CaseStudy {
  id: string;
  industry: string;
  company: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  icon: React.ComponentType<{ className?: string }>;
}

const caseStudies: CaseStudy[] = [
  {
    id: "hvac",
    industry: "HVAC Services",
    company: "Elite Climate Solutions",
    problem: "Missing 60% of inbound calls during peak season, losing $15K/month in potential revenue",
    solution: "Implemented AI voice agents to handle all calls 24/7 with automatic lead qualification and booking",
    results: [
      {
        metric: "Call Answer Rate",
        before: "40%",
        after: "100%",
        improvement: "+150%"
      },
      {
        metric: "Monthly Revenue",
        before: "$45K",
        after: "$156K",
        improvement: "+247%"
      },
      {
        metric: "Response Time",
        before: "2 hours",
        after: "< 2 min",
        improvement: "60x faster"
      }
    ],
    icon: Snowflake,
  },
  {
    id: "dental",
    industry: "Dental Practice",
    company: "Bright Smile Dental",
    problem: "Low marketing ROI with scattered tools and no clear visibility into what was working",
    solution: "Unified platform with integrated ads, CRM, and analytics dashboard for complete visibility",
    results: [
      {
        metric: "Marketing ROI",
        before: "180%",
        after: "612%",
        improvement: "+340%"
      },
      {
        metric: "Cost Per Lead",
        before: "$127",
        after: "$38",
        improvement: "-70%"
      },
      {
        metric: "New Patients",
        before: "12/mo",
        after: "47/mo",
        improvement: "+292%"
      }
    ],
    icon: Stethoscope,
  },
  {
    id: "plumbing",
    industry: "Plumbing Company",
    company: "Thompson Plumbing Co.",
    problem: "Slow response times causing leads to go to competitors, especially after hours",
    solution: "24/7 AI voice agents with instant response and automatic emergency routing",
    results: [
      {
        metric: "Response Time",
        before: "2 hours",
        after: "< 2 min",
        improvement: "60x faster"
      },
      {
        metric: "After-Hours Conversions",
        before: "5%",
        after: "42%",
        improvement: "+740%"
      },
      {
        metric: "Customer Satisfaction",
        before: "3.8/5",
        after: "4.9/5",
        improvement: "+29%"
      }
    ],
    icon: Wrench,
  }
];

export function CaseStudiesPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  return (
    <section
      ref={containerRef}
      className="section relative overflow-hidden w-full max-w-full py-24 md:py-32 lg:py-40"
    >
      {/* Deep space black base */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* Mesh gradient background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100% 100% at 20% 30%, #00C9FF12 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 80% 70%, #4A69E212 0%, transparent 50%),
            radial-gradient(ellipse 80% 80% at 50% 50%, #D4AF3706 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating mesh animation */}
      <motion.div
        className="absolute inset-0 opacity-25"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, #00C9FF08 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, #4A69E208 0%, transparent 40%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Editorial headline section */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle label */}
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-6">
              Real Results
            </p>

            {/* Editorial headline - extreme weight contrast */}
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 md:mb-8"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span className="text-white font-extralight" style={{ fontWeight: 200 }}>Success stories: </span>
              <span
                className="font-extrabold bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent"
                style={{ fontWeight: 800 }}
              >
                before
              </span>
              <span className="text-white font-extralight" style={{ fontWeight: 200 }}> & </span>
              <span
                className="font-extrabold bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] bg-clip-text text-transparent"
                style={{ fontWeight: 800 }}
              >
                after
              </span>
            </h2>

            {/* Supporting copy */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              See exactly how Capture Client transforms businesses like yours with measurable, dramatic results.
            </p>
          </motion.div>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 md:mb-20">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-3 px-8 py-4 text-base font-semibold rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl text-white transition-all hover:bg-white/[0.04] hover:border-white/[0.12]"
          >
            View All Case Studies
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isInView: boolean;
}

function CaseStudyCard({ study, index, isInView }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="relative h-full p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]">
        {/* Industry badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00C9FF]/10 to-[#4A69E2]/10 border border-white/[0.06] mb-6">
          <study.icon className="w-4 h-4 text-[#00C9FF]" />
          <span className="text-sm font-medium text-white/80">{study.industry}</span>
        </div>

        {/* Company */}
        <h3
          className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
        >
          {study.company}
        </h3>

        {/* Challenge */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-medium mb-3">
            The Challenge
          </p>
          <p className="text-white/60 leading-relaxed text-sm sm:text-base">
            {study.problem}
          </p>
        </div>

        {/* Results - Before/After */}
        <div className="space-y-4 mb-8">
          {study.results.map((result, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.15 + idx * 0.1 + 0.3,
              }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  {result.metric}
                </span>
                <span className="text-xs font-bold text-[#00C9FF]">
                  {result.improvement}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/[0.03] rounded-lg p-2 text-center border border-white/[0.04]">
                  <p className="text-white/40 text-sm line-through">
                    {result.before}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00C9FF] flex-shrink-0" />
                <div className="flex-1 bg-gradient-to-r from-[#00C9FF]/10 to-[#4A69E2]/10 rounded-lg p-2 text-center border border-[#00C9FF]/20">
                  <p className="text-[#00C9FF] font-bold text-sm">
                    {result.after}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Read more link */}
        <Link
          href={`/case-studies#${study.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-[#00C9FF] transition-colors group/link"
        >
          Read Full Story
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#00C9FF]/[0.02] via-transparent to-[#4A69E2]/[0.02]" />
      </div>
    </motion.div>
  );
}
