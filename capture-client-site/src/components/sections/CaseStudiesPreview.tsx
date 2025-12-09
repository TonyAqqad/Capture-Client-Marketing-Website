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
    icon: Snowflake,
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
    icon: Stethoscope,
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
    icon: Wrench,
    gradient: "from-accent to-primary"
  }
];

export function CaseStudiesPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  return (
    <section
      ref={containerRef}
      className="section bg-background-dark relative overflow-hidden w-full max-w-full py-16 sm:py-20 lg:py-24"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-40" />

      <div className="container-custom relative z-10 px-6 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">
              Real Results
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 sm:mb-8 text-depth px-4 leading-[1.1] tracking-tight" style={{ hyphens: 'none' }}>
              <span className="whitespace-nowrap">Success Stories:</span>{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent whitespace-nowrap">
                Before & After
              </span>
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-2xl mx-auto leading-[1.6] px-6">
              See exactly how Capture Client transforms businesses like yours with measurable, dramatic results.
            </p>
          </motion.div>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
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
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
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
      <div className="relative h-full glass p-8 sm:p-10 rounded-2xl sm:rounded-3xl border-2 border-accent/20 transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-glow">
        {/* Industry badge */}
        <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r ${study.gradient} mb-6 sm:mb-8`}>
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
            <study.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-sm sm:text-base font-bold text-white">{study.industry}</span>
        </div>

        {/* Company */}
        <h4 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4 sm:mb-5 leading-tight" style={{ hyphens: 'none' }}>
          {study.company}
        </h4>

        {/* Problem */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.15em] text-foreground-muted font-semibold mb-3">
            The Challenge
          </p>
          <p className="text-foreground-muted leading-[1.6] text-base">
            {study.problem}
          </p>
        </div>

        {/* Results - Before/After */}
        <div className="space-y-5 mb-8">
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
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="text-accent w-4 h-4" />
                </div>
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
          href={`/case-studies#${study.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group/link"
        >
          Read Full Story
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
