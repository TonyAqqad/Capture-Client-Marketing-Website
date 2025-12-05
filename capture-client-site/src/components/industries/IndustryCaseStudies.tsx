'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

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

interface IndustryCaseStudiesProps {
  caseStudyIds: string[];
  industryName: string;
  industryTheme?: 'gold' | 'accent' | 'success';
}

// Case studies data (imported from case studies page)
const CASE_STUDIES: CaseStudy[] = [
  {
    id: "hvac",
    industry: "HVAC Services",
    company: "Elite Climate Solutions",
    location: "Knoxville, TN",
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
    duration: "6 months",
    roi: "612%",
  },
  {
    id: "dental",
    industry: "Dental Practice",
    company: "Bright Smile Dental",
    location: "Nashville, TN",
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
    duration: "4 months",
    roi: "540%",
  },
  {
    id: "plumbing",
    industry: "Plumbing Company",
    company: "Thompson Plumbing Co.",
    location: "Chattanooga, TN",
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
    duration: "3 months",
    roi: "485%",
  },
  {
    id: "law-firm",
    industry: "Law Firm",
    company: "Smith & Associates Legal",
    location: "Memphis, TN",
    problem: "Missing consultations due to slow follow-up and limited availability",
    solution: "AI voice agents for 24/7 intake and smart scheduling with automated qualification",
    results: [
      {
        metric: "Consultation Bookings",
        before: "23/mo",
        after: "89/mo",
        improvement: "+287%"
      },
      {
        metric: "Lead Response Time",
        before: "4 hours",
        after: "< 1 min",
        improvement: "240x faster"
      },
      {
        metric: "Case Conversion Rate",
        before: "12%",
        after: "34%",
        improvement: "+183%"
      }
    ],
    duration: "5 months",
    roi: "725%",
  },
  {
    id: "roofing",
    industry: "Roofing Contractor",
    company: "Apex Roofing Services",
    location: "Knoxville, TN",
    problem: "Storm season overwhelm leading to lost opportunities and disorganized leads",
    solution: "AI-powered call handling with CRM integration and automated emergency triage",
    results: [
      {
        metric: "Storm Lead Capture",
        before: "34%",
        after: "96%",
        improvement: "+182%"
      },
      {
        metric: "Project Volume",
        before: "8/mo",
        after: "31/mo",
        improvement: "+288%"
      },
      {
        metric: "Average Project Value",
        before: "$8,500",
        after: "$12,400",
        improvement: "+46%"
      }
    ],
    duration: "4 months",
    roi: "890%",
  },
  {
    id: "medical-spa",
    industry: "Medical Spa",
    company: "Radiance Medical Spa",
    location: "Nashville, TN",
    problem: "High no-show rates and difficulty managing multiple service bookings",
    solution: "Smart scheduling with automated reminders and AI-powered booking confirmation",
    results: [
      {
        metric: "No-Show Rate",
        before: "28%",
        after: "4%",
        improvement: "-86%"
      },
      {
        metric: "Monthly Bookings",
        before: "156",
        after: "412",
        improvement: "+164%"
      },
      {
        metric: "Revenue Per Client",
        before: "$285",
        after: "$487",
        improvement: "+71%"
      }
    ],
    duration: "6 months",
    roi: "635%",
  },
];

export default function IndustryCaseStudies({
  caseStudyIds,
  industryName,
  industryTheme = 'gold'
}: IndustryCaseStudiesProps) {
  // Filter case studies by IDs
  const relevantCaseStudies = CASE_STUDIES.filter(cs => caseStudyIds.includes(cs.id));

  if (relevantCaseStudies.length === 0) {
    return null;
  }

  // Theme color mapping
  const themeColors = {
    gold: {
      gradient: 'from-gold-400 to-gold-600',
      border: 'border-gold-500/30',
      text: 'text-gold-400',
      bg: 'bg-gold-500/20',
      hover: 'hover:border-gold-500/50',
    },
    accent: {
      gradient: 'from-accent-400 to-accent-600',
      border: 'border-accent-500/30',
      text: 'text-accent-400',
      bg: 'bg-accent-500/20',
      hover: 'hover:border-accent-500/50',
    },
    success: {
      gradient: 'from-success-400 to-success-600',
      border: 'border-success-500/30',
      text: 'text-success-400',
      bg: 'bg-success-500/20',
      hover: 'hover:border-success-500/50',
    },
  };

  const theme = themeColors[industryTheme];

  // Get the top result from the first case study
  const getTopResult = (caseStudy: CaseStudy) => {
    // Find the result with the most impressive improvement
    const topResult = caseStudy.results.reduce((prev, current) => {
      const prevImprovement = parseFloat(prev.improvement.replace(/[^0-9.-]/g, ''));
      const currentImprovement = parseFloat(current.improvement.replace(/[^0-9.-]/g, ''));
      return Math.abs(currentImprovement) > Math.abs(prevImprovement) ? current : prev;
    });
    return topResult;
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-background-darker">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Proven Results in{' '}
              <span className={`bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                {industryName}
              </span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Real businesses in your industry achieving extraordinary results with Capture Client.
            </p>
          </div>

          {/* Case Study Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {relevantCaseStudies.map((caseStudy) => {
              const topResult = getTopResult(caseStudy);

              return (
                <GlassCard
                  key={caseStudy.id}
                  variant="premium"
                  hover={true}
                  className={`group cursor-pointer transition-all duration-300 ${theme.hover}`}
                >
                  <Link href={`/case-studies#${caseStudy.id}`}>
                    <div className="p-8">
                      {/* Company Info */}
                      <div className="mb-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border ${theme.border} mb-3`}>
                          <span className="material-icons text-sm">apartment</span>
                          <span className="text-xs font-semibold text-foreground">
                            {caseStudy.industry}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-gold-400 transition-colors">
                          {caseStudy.company}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-foreground-muted">
                          <span className="material-icons text-xs">location_on</span>
                          <span>{caseStudy.location}</span>
                        </div>
                      </div>

                      {/* Top Result Highlight */}
                      <div className={`p-6 rounded-2xl ${theme.bg} border ${theme.border} mb-6`}>
                        <div className="text-sm text-foreground-muted mb-2">
                          {topResult.metric}
                        </div>
                        <div className={`text-4xl font-bold ${theme.text} mb-2`}>
                          {topResult.improvement}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground-muted">
                            {topResult.before}
                          </span>
                          <span className="material-icons text-xs text-gold-400">arrow_forward</span>
                          <span className={`font-bold ${theme.text}`}>
                            {topResult.after}
                          </span>
                        </div>
                      </div>

                      {/* Additional Metrics */}
                      <div className="space-y-3 mb-6">
                        {caseStudy.results.slice(0, 2).map((result, idx) => (
                          result !== topResult && (
                            <div key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-foreground-muted">{result.metric}</span>
                              <span className={`font-bold ${theme.text}`}>
                                {result.improvement}
                              </span>
                            </div>
                          )
                        ))}
                      </div>

                      {/* ROI Badge */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm text-foreground-muted">schedule</span>
                          <span className="text-sm text-foreground-muted">{caseStudy.duration}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${theme.gradient} bg-opacity-20 border ${theme.border}`}>
                          <span className={`text-sm font-bold ${theme.text}`}>
                            {caseStudy.roi} ROI
                          </span>
                        </div>
                      </div>

                      {/* View Full Story Link */}
                      <div className="mt-6 flex items-center gap-2 text-sm text-gold-400 group-hover:gap-3 transition-all">
                        <span>View Full Story</span>
                        <span className="material-icons text-sm">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                </GlassCard>
              );
            })}
          </div>

          {/* View All Case Studies CTA */}
          <div className="text-center">
            <Button
              variant="glass"
              size="lg"
              href="/case-studies"
              icon="arrow_forward"
              ariaLabel="View all case studies"
            >
              View All Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
