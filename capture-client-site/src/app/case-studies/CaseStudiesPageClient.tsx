"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import {
  SearchX,
  BadgeCheck,
  MapPin,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Lightbulb,
  Snowflake,
  Stethoscope,
  Wrench,
  Scale,
  Home,
  Sparkles,
  Building2,
  Target,
  Zap,
} from "lucide-react";

interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface CaseStudy {
  id: string;
  industry: string;
  company: string;
  location: string;
  problem: string;
  solution: string;
  results: CaseStudyResult[];
  duration: string;
  roi: string;
}

interface CaseStudiesPageClientProps {
  caseStudies: CaseStudy[];
}

// Industry icons mapping
const industryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "HVAC Services": Snowflake,
  "Dental Practice": Stethoscope,
  "Plumbing Company": Wrench,
  "Law Firm": Scale,
  "Roofing Contractor": Home,
  "Medical Spa": Sparkles,
};

export default function CaseStudiesPageClient({
  caseStudies,
}: CaseStudiesPageClientProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"roi" | "duration">("roi");

  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { threshold: 0.2 });
  const isGridInView = useInView(gridRef, { threshold: 0.1 });

  // Extract unique industries
  const industries = useMemo(() => {
    const unique = Array.from(
      new Set(caseStudies.map((study) => study.industry))
    );
    return ["All", ...unique];
  }, [caseStudies]);

  // Filter and sort case studies
  const filteredAndSortedStudies = useMemo(() => {
    let filtered = caseStudies;

    if (selectedIndustry !== "All") {
      filtered = caseStudies.filter(
        (study) => study.industry === selectedIndustry
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === "roi") {
        return parseInt(b.roi) - parseInt(a.roi);
      } else {
        return (
          parseInt(a.duration.split(" ")[0]) -
          parseInt(b.duration.split(" ")[0])
        );
      }
    });
  }, [caseStudies, selectedIndustry, sortBy]);

  // Featured case study (highest ROI)
  const featuredStudy = useMemo(() => {
    return [...caseStudies].sort((a, b) => parseInt(b.roi) - parseInt(a.roi))[0];
  }, [caseStudies]);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white">
      {/* ==================== HERO SECTION ==================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20"
      >
        {/* Light premium background */}
        <div className="absolute inset-0 bg-white" />

        {/* Subtle gradient mesh */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.08), transparent),
              radial-gradient(ellipse 60% 40% at 80% 50%, rgba(6, 182, 212, 0.05), transparent)
            `,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Minimal headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 lg:mb-16"
          >
            {/* Label */}
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 mb-6">
              Real Results from Real Businesses
            </p>

            {/* Headline - extreme weight contrast */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span className="text-slate-900 font-extralight block mb-2" style={{ fontWeight: 200 }}>
                Results that speak
              </span>
              <span
                className="font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                style={{ fontWeight: 800 }}
              >
                for themselves
              </span>
            </h1>
          </motion.div>

          {/* ==================== FEATURED CASE STUDY ==================== */}
          <FeaturedCaseStudy study={featuredStudy} isInView={isHeroInView} />
        </div>
      </section>

      {/* ==================== MORE SUCCESS STORIES ==================== */}
      <section className="relative py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 mb-4">
              More Success Stories
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span className="text-slate-900 font-extralight" style={{ fontWeight: 200 }}>
                Explore{" "}
              </span>
              <span className="font-extrabold text-slate-900" style={{ fontWeight: 800 }}>
                industry results
              </span>
            </h2>
          </div>

          {/* Filter bar */}
          <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Industry filter */}
              <div className="flex-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 block">
                  Industry
                </label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedIndustry === industry
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort options */}
              <div className="lg:w-64">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 block">
                  Sort by
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("roi")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      sortBy === "roi"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    Highest ROI
                  </button>
                  <button
                    onClick={() => setSortBy("duration")}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      sortBy === "duration"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    Fastest
                  </button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-slate-600">
              Showing {filteredAndSortedStudies.length} of {caseStudies.length} case studies
            </div>
          </div>

          {/* ==================== CASE STUDIES GRID ==================== */}
          <div ref={gridRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndustry + sortBy}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredAndSortedStudies.map((study, index) => (
                  <CaseStudyCard
                    key={study.id}
                    study={study}
                    index={index}
                    isInView={isGridInView}
                    isExpanded={expandedCard === study.id}
                    onToggleExpand={() =>
                      setExpandedCard(expandedCard === study.id ? null : study.id)
                    }
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {filteredAndSortedStudies.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="bg-white p-12 rounded-2xl inline-block border border-slate-200">
                  <SearchX className="w-16 h-16 text-slate-400 mb-4 mx-auto" />
                  <p className="text-lg text-slate-600">
                    No case studies found for this filter
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-50">
        {/* Subtle background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59, 130, 246, 0.06), transparent)
            `,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Headline */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              <span className="text-slate-900 font-extralight" style={{ fontWeight: 200 }}>
                Want results{" "}
              </span>
              <span
                className="font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                style={{ fontWeight: 800 }}
              >
                like these?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of businesses already transforming their growth with Capture Client.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all hover:scale-105 w-full sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all w-full sm:w-auto"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-slate-600">
              {[
                "No contracts",
                "No setup fees",
                "48-hour setup",
              ].map((text, idx) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <BadgeCheck className="w-4 h-4 text-blue-600" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ==================== FEATURED CASE STUDY COMPONENT ====================
interface FeaturedCaseStudyProps {
  study: CaseStudy;
  isInView: boolean;
}

function FeaturedCaseStudy({ study, isInView }: FeaturedCaseStudyProps) {
  const IconComponent = industryIcons[study.industry] || Building2;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden"
    >
      {/* Featured badge */}
      <div className="absolute top-6 left-6 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/25">
          <Target className="w-4 h-4 text-white" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">Featured Success</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left: Company info & challenge */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {/* Industry badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4 self-start">
            <IconComponent className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">{study.industry}</span>
          </div>

          {/* Company */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
          >
            {study.company}
          </h2>

          <p className="text-sm text-slate-500 mb-6 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {study.location}
          </p>

          {/* Challenge */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              The Challenge
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              {study.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              The Solution
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Right: Metrics showcase */}
        <div className="bg-gradient-to-br from-slate-50 to-white p-8 lg:p-12 flex flex-col justify-center border-l border-slate-100">
          {/* ROI highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Overall ROI
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
              >
                {study.roi}
              </span>
              <span className="text-2xl font-medium text-slate-600">in {study.duration}</span>
            </div>
          </motion.div>

          {/* Key metrics */}
          <div className="space-y-6">
            {study.results.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{result.metric}</span>
                  <span className="text-sm font-bold text-blue-600">{result.improvement}</span>
                </div>

                {/* Progress bar */}
                <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.6 + idx * 0.1, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  />
                </div>

                {/* Before/After values */}
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="text-slate-500">Before: <span className="font-medium">{result.before}</span></span>
                  <span className="text-blue-600">After: <span className="font-bold">{result.after}</span></span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 pt-8 border-t border-slate-200"
          >
            <Link
              href={`#${study.id}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Read full case study
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== CASE STUDY CARD COMPONENT ====================
interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  isInView: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function CaseStudyCard({
  study,
  index,
  isInView,
  isExpanded,
  onToggleExpand,
}: CaseStudyCardProps) {
  const IconComponent = industryIcons[study.industry] || Building2;

  return (
    <motion.div
      id={study.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full scroll-mt-32"
    >
      <div className="relative h-full bg-white rounded-xl border border-slate-200 p-6 lg:p-8 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 flex flex-col">
        {/* Industry badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-4 self-start">
          <IconComponent className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-slate-700">{study.industry}</span>
        </div>

        {/* Company */}
        <h3
          className="text-2xl font-bold text-slate-900 mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
        >
          {study.company}
        </h3>

        <p className="text-sm text-slate-500 mb-4 flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {study.location}
        </p>

        {/* ROI Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-600/20 mb-6 self-start">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-bold text-blue-600">{study.roi} ROI</span>
          <span className="text-xs text-slate-600">• {study.duration}</span>
        </div>

        {/* Challenge */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Challenge
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {study.problem}
          </p>
        </div>

        {/* Key metric highlight */}
        <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            {study.results[0].metric}
          </p>
          <div className="flex items-center justify-between mb-2">
            <div className="text-center flex-1">
              <p className="text-xs text-slate-500 mb-1">Before</p>
              <p className="text-lg font-bold text-slate-700">{study.results[0].before}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 mx-2" />
            <div className="text-center flex-1">
              <p className="text-xs text-slate-500 mb-1">After</p>
              <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {study.results[0].after}
              </p>
            </div>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
              <Zap className="w-3 h-3" />
              {study.results[0].improvement}
            </span>
          </div>
        </div>

        {/* Additional metrics preview */}
        {study.results.length > 1 && (
          <div className="mb-6 space-y-2">
            {study.results.slice(1, isExpanded ? undefined : 3).map((result, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm py-2 border-t border-slate-100">
                <span className="text-slate-600">{result.metric}</span>
                <span className="font-semibold text-blue-600">{result.improvement}</span>
              </div>
            ))}
          </div>
        )}

        {/* Expandable solution */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Solution
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-slate-200">
          <button
            onClick={onToggleExpand}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            {isExpanded ? "Show Less" : "View Full Details"}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-600/[0.02] via-transparent to-cyan-500/[0.02]" />
      </div>
    </motion.div>
  );
}
