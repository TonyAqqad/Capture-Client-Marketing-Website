"use client";

import { useState, useRef, useMemo, useEffect } from "react";
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

// Industry gradient mapping
const industryGradients: Record<string, string> = {
  "HVAC Services": "from-accent to-primary",
  "Dental Practice": "from-primary to-accent",
  "Plumbing Company": "from-accent to-primary",
  "Law Firm": "from-primary via-accent to-primary",
  "Roofing Contractor": "from-accent via-primary to-accent",
  "Medical Spa": "from-primary to-accent",
};

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

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

  // Animated counters for stats
  const revenueCount = useAnimatedCounter(247, 2000, isHeroInView);
  const answerRateCount = useAnimatedCounter(100, 2000, isHeroInView);
  const responseCount = useAnimatedCounter(60, 2000, isHeroInView);

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

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background-dark">
      {/* ==================== HERO SECTION ==================== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32"
      >
        {/* Premium background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background-dark to-background" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />

          {/* Large radial glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-accent/20 via-accent/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-primary/15 to-transparent blur-3xl" />

          {/* Geometric accents */}
          <div className="absolute top-20 right-20 w-48 h-48 border border-accent/10 rounded-3xl rotate-45 backdrop-blur-sm animate-float-slow hidden xl:block" />
          <div className="absolute bottom-32 left-20 w-40 h-40 border border-primary/10 rounded-3xl -rotate-12 backdrop-blur-sm animate-float-medium hidden xl:block" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-6 shadow-glow-gold-lg"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
                Real Results
              </h2>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight"
            >
              Success Stories:{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
                Transforming Small Businesses
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed mb-8"
            >
              See exactly how Capture Client delivers measurable, dramatic
              results for businesses like yours. Real data. Real growth. Real
              impact.
            </motion.p>

            {/* Stats bar with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }
              }
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
              className="glass-premium p-6 rounded-2xl inline-flex flex-wrap items-center justify-center gap-8 sm:gap-12 border-2 border-gold/20 shadow-glow-gold-lg"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                  {revenueCount}%
                </div>
                <div className="text-sm text-foreground-muted">Avg Revenue Growth</div>
              </motion.div>
              <div className="h-12 w-px bg-surface-border hidden sm:block" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                  {answerRateCount}%
                </div>
                <div className="text-sm text-foreground-muted">Call Answer Rate</div>
              </motion.div>
              <div className="h-12 w-px bg-surface-border hidden sm:block" />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                  {responseCount}x
                </div>
                <div className="text-sm text-foreground-muted">Faster Response</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </section>

      {/* ==================== FILTER & SORT SECTION ==================== */}
      <section className="relative py-8 lg:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="glass-premium p-6 rounded-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Industry filter */}
              <div className="flex-1">
                <label className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3 block">
                  Filter by Industry
                </label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <motion.button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                        selectedIndustry === industry
                          ? "bg-gradient-to-r from-accent to-primary text-white shadow-glow-gold-lg border-2 border-gold/40"
                          : "bg-surface/50 text-foreground-muted hover:bg-surface border border-surface-border hover:border-accent/30 hover:shadow-glow-gold"
                      }`}
                    >
                      {industry}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort options */}
              <div className="lg:w-64">
                <label className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3 block">
                  Sort by
                </label>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setSortBy("roi")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      sortBy === "roi"
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow-gold-lg border-2 border-gold/40"
                        : "bg-surface/50 text-foreground-muted hover:bg-surface border border-surface-border hover:shadow-glow-gold"
                    }`}
                  >
                    Highest ROI
                  </motion.button>
                  <motion.button
                    onClick={() => setSortBy("duration")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      sortBy === "duration"
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow-gold-lg border-2 border-gold/40"
                        : "bg-surface/50 text-foreground-muted hover:bg-surface border border-surface-border hover:shadow-glow-gold"
                    }`}
                  >
                    Quickest Results
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Results count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-foreground-muted"
            >
              Showing {filteredAndSortedStudies.length} of {caseStudies.length}{" "}
              case studies
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CASE STUDIES GRID ==================== */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background-dark to-background" />
          <div className="absolute inset-0 bg-mesh opacity-20" />

          {/* Floating glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl animate-float-medium" />
        </div>

        <div
          ref={gridRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
        >
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
              <div className="glass-premium p-12 rounded-3xl inline-block">
                <SearchX className="w-16 h-16 text-foreground-muted mb-4 mx-auto" />
                <p className="text-xl text-foreground-muted">
                  No case studies found for this filter
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Epic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />

          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-accent/20 via-primary/15 to-transparent blur-3xl animate-pulse-glow" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="glass-premium p-12 lg:p-16 rounded-3xl text-center border-2 border-gold/20 shadow-glow-gold-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6"
              >
                Ready to Become Our{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent animate-gradient">
                  Next Success Story?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-foreground-muted mb-8 leading-relaxed max-w-2xl mx-auto"
              >
                Join hundreds of small businesses already growing with Capture
                Client. Book your free demo and see how we can transform your
                business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/contact"
                  className="btn-gold px-8 py-4 text-lg font-semibold rounded-xl shadow-glow-gold-lg hover:scale-105 transition-all inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Try Our AI Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/pricing"
                  className="btn-ghost px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-glow-gold hover:scale-105 transition-all inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  View Pricing
                </Link>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {[
                    "No Long-Term Contracts",
                    "No Setup Fees",
                    "Setup in 48 Hours"
                  ].map((text, idx) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <BadgeCheck className="w-5 h-5 text-accent" />
                      <span className="text-sm text-foreground-muted">
                        {text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
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
  const gradient = industryGradients[study.industry] || "from-accent to-primary";

  return (
    <motion.div
      id={study.id}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      className="group h-full scroll-mt-32"
    >
      <div className="relative h-full glass-premium p-6 lg:p-8 rounded-2xl border-2 border-accent/20 transition-all duration-500 hover:border-gold/60 hover:shadow-glow-gold-lg flex flex-col">
        {/* Industry badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} mb-6 self-start`}
        >
          <IconComponent className="w-5 h-5 text-white" />
          <span className="text-sm font-bold text-white">{study.industry}</span>
        </div>

        {/* Company & location */}
        <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          {study.company}
        </h3>
        <p className="text-sm text-foreground-muted mb-6 flex items-center gap-1">
          <MapPin className="w-4 h-4 text-accent" />
          {study.location}
        </p>

        {/* ROI Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 mb-6 self-start shadow-glow-gold"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <TrendingUp className="w-4 h-4 text-accent" />
          </motion.div>
          <span className="text-sm font-bold text-accent">{study.roi} ROI</span>
          <span className="text-xs text-foreground-muted">
            in {study.duration}
          </span>
        </motion.div>

        {/* Problem */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            The Challenge
          </p>
          <p className="text-foreground-muted leading-relaxed text-sm">
            {study.problem}
          </p>
        </div>

        {/* Results preview (first 2) */}
        <div className="space-y-4 mb-6 flex-grow">
          {study.results.slice(0, isExpanded ? undefined : 2).map((result, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{
                duration: 0.5,
                delay: index * 0.1 + idx * 0.1 + 0.3,
              }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-foreground-subtle font-semibold">
                  {result.metric}
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.1 + 0.5 }}
                  className="text-xs font-bold text-accent px-2 py-1 rounded-full bg-accent/10 border border-accent/30"
                >
                  {result.improvement}
                </motion.span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 bg-surface-border/30 rounded-lg p-2 text-center"
                >
                  <p className="text-foreground-muted text-sm line-through">
                    {result.before}
                  </p>
                </motion.div>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                >
                  <ArrowRight className="w-4 h-4 text-accent" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0.8, scale: 0.95 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg p-2 text-center border border-accent/30 shadow-glow-gold"
                >
                  <p className="text-accent font-bold text-sm">{result.after}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  The Solution
                </p>
                <p className="text-foreground-muted leading-relaxed text-sm">
                  {study.solution}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
          <motion.button
            onClick={onToggleExpand}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface/50 border border-surface-border text-sm font-semibold text-foreground hover:bg-surface hover:border-accent/30 hover:shadow-glow-gold transition-all duration-300"
          >
            {isExpanded ? "Show Less" : "View Details"}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </motion.div>
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`#${study.id}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-sm font-semibold text-accent hover:shadow-glow-gold-lg hover:border-gold/50 transition-all duration-300"
            >
              Full Story
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Hover gradient overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none"
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
