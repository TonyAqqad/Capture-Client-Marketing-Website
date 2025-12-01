"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";

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
  icon: string;
  gradient: string;
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
    icon: "ac_unit",
    gradient: "from-accent to-primary"
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
    icon: "medical_services",
    gradient: "from-primary to-accent"
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
    icon: "plumbing",
    gradient: "from-accent to-primary"
  }
];

export function CaseStudiesPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  return (
    <section
      ref={containerRef}
      className="section bg-background-dark relative overflow-hidden w-full max-w-full"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-40" />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent mb-3 sm:mb-4">
              Real Results
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 sm:mb-6 text-depth px-4">
              Success Stories:{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Before & After
              </span>
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed px-4">
              See exactly how Capture Client transforms businesses like yours with measurable, dramatic results.
            </p>
          </motion.div>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-lg font-semibold text-accent hover:text-accent/80 transition-colors group"
          >
            View All Case Studies
            <motion.span
              className="material-icons"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              arrow_forward
            </motion.span>
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group"
    >
      <div className="relative h-full glass p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-accent/20 transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-glow">
        {/* Industry badge */}
        <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${study.gradient} mb-4 sm:mb-6`}>
          <span className="material-icons text-white text-base sm:text-lg">{study.icon}</span>
          <span className="text-xs sm:text-sm font-bold text-white">{study.industry}</span>
        </div>

        {/* Company */}
        <h4 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-3 sm:mb-4">
          {study.company}
        </h4>

        {/* Problem */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2">
            The Challenge
          </p>
          <p className="text-foreground-muted leading-relaxed text-sm">
            {study.problem}
          </p>
        </div>

        {/* Results - Before/After */}
        <div className="space-y-4 mb-6">
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
                <span className="text-xs uppercase tracking-wider text-foreground-subtle font-semibold">
                  {result.metric}
                </span>
                <span className="text-xs font-bold text-accent">
                  {result.improvement}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-surface-border/30 rounded-lg p-2 text-center">
                  <p className="text-foreground-muted text-sm line-through">
                    {result.before}
                  </p>
                </div>
                <span className="material-icons text-accent text-sm">arrow_forward</span>
                <div className="flex-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg p-2 text-center border border-accent/30">
                  <p className="text-accent font-bold text-sm">
                    {result.after}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Read more link */}
        <Link
          href={`/case-studies/${study.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group/link"
        >
          Read Full Story
          <span className="material-icons text-sm group-hover/link:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>

        {/* Hover gradient overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none"
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
