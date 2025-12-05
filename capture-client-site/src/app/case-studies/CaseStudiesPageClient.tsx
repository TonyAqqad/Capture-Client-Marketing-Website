"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
const industryIcons: Record<string, string> = {
  "HVAC Services": "ac_unit",
  "Dental Practice": "medical_services",
  "Plumbing Company": "plumbing",
  "Law Firm": "gavel",
  "Roofing Contractor": "roofing",
  "Medical Spa": "spa",
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
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/20 backdrop-blur-xl mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
                Real Results
              </h2>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
              Success Stories:{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Transforming Small Businesses
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed mb-8">
              See exactly how Capture Client delivers measurable, dramatic
              results for businesses like yours. Real data. Real growth. Real
              impact.
            </p>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-premium p-6 rounded-2xl inline-flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                  247%
                </div>
                <div className="text-sm text-foreground-muted">Avg Revenue Growth</div>
              </div>
              <div className="h-12 w-px bg-surface-border hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                  100%
                </div>
                <div className="text-sm text-foreground-muted">Call Answer Rate</div>
              </div>
              <div className="h-12 w-px bg-surface-border hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                  60x
                </div>
                <div className="text-sm text-foreground-muted">Faster Response</div>
              </div>
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
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                        selectedIndustry === industry
                          ? "bg-gradient-to-r from-accent to-primary text-white shadow-glow"
                          : "bg-surface/50 text-foreground-muted hover:bg-surface border border-surface-border hover:border-accent/30"
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort options */}
              <div className="lg:w-64">
                <label className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3 block">
                  Sort by
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("roi")}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      sortBy === "roi"
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow-primary"
                        : "bg-surface/50 text-foreground-muted hover:bg-surface border border-surface-border"
                    }`}
                  >
                    Highest ROI
                  </button>
                  <button
                    onClick={() => setSortBy("duration")}
                    className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      sortBy === "duration"
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow-primary"
                        : "bg-surface/50 text-foreground-muted hover:bg-surface border border-surface-border"
                    }`}
                  >
                    Quickest Results
                  </button>
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
                <span className="material-icons text-6xl text-foreground-muted mb-4">
                  search_off
                </span>
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
          <div className="glass-premium p-12 lg:p-16 rounded-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                Ready to Become Our{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Next Success Story?
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-foreground-muted mb-8 leading-relaxed max-w-2xl mx-auto">
                Join hundreds of small businesses already growing with Capture
                Client. Book your free demo and see how we can transform your
                business.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" size="lg" href="/contact" icon="arrow_forward">
                  Book Your Free Demo
                </Button>
                <Button variant="glass" size="lg" href="/pricing">
                  View Pricing
                </Button>
              </div>

              {/* Trust signals */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-accent text-xl">
                      verified
                    </span>
                    <span className="text-sm text-foreground-muted">
                      No Long-Term Contracts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-accent text-xl">
                      verified
                    </span>
                    <span className="text-sm text-foreground-muted">
                      90-Day Money-Back Guarantee
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-accent text-xl">
                      verified
                    </span>
                    <span className="text-sm text-foreground-muted">
                      Setup in 48 Hours
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
  const icon = industryIcons[study.industry] || "business";
  const gradient = industryGradients[study.industry] || "from-accent to-primary";

  return (
    <motion.div
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
      className="group h-full"
    >
      <div className="relative h-full glass-premium p-6 lg:p-8 rounded-2xl border-2 border-accent/20 transition-all duration-500 hover:border-accent/50 hover:shadow-glow hover:scale-[1.02] flex flex-col">
        {/* Industry badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} mb-6 self-start`}
        >
          <span className="material-icons text-white text-lg">{icon}</span>
          <span className="text-sm font-bold text-white">{study.industry}</span>
        </div>

        {/* Company & location */}
        <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          {study.company}
        </h3>
        <p className="text-sm text-foreground-muted mb-6 flex items-center gap-1">
          <span className="material-icons text-accent text-sm">place</span>
          {study.location}
        </p>

        {/* ROI Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 mb-6 self-start">
          <span className="material-icons text-accent text-sm">trending_up</span>
          <span className="text-sm font-bold text-accent">{study.roi} ROI</span>
          <span className="text-xs text-foreground-muted">
            in {study.duration}
          </span>
        </div>

        {/* Problem */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-foreground-muted font-semibold mb-2 flex items-center gap-2">
            <span className="material-icons text-sm">error_outline</span>
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
                <span className="material-icons text-accent text-sm">
                  arrow_forward
                </span>
                <div className="flex-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg p-2 text-center border border-accent/30">
                  <p className="text-accent font-bold text-sm">{result.after}</p>
                </div>
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
                  <span className="material-icons text-sm">lightbulb</span>
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
          <button
            onClick={onToggleExpand}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface/50 border border-surface-border text-sm font-semibold text-foreground hover:bg-surface hover:border-accent/30 transition-all duration-300"
          >
            {isExpanded ? "Show Less" : "View Details"}
            <span className="material-icons text-sm">
              {isExpanded ? "expand_less" : "expand_more"}
            </span>
          </button>
          <Link
            href={`/case-studies/${study.id}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-sm font-semibold text-accent hover:shadow-glow transition-all duration-300"
          >
            Full Story
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
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
