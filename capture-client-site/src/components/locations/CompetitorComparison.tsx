import { GitCompare, Trophy, CheckCircle, X, ArrowRight, Zap, Clock, Phone, Filter, Timer, DollarSign } from 'lucide-react';

interface CompetitorComparisonProps {
  city: string;
}

export default function CompetitorComparison({ city }: CompetitorComparisonProps) {
  const comparisonFeatures = [
    {
      feature: "Answer Speed",
      us: "< 2 seconds",
      competitors: "30+ seconds (if answered)",
      icon: Zap,
      highlight: true,
    },
    {
      feature: "24/7 Availability",
      us: "Always available",
      competitors: "Business hours only",
      icon: Clock,
      highlight: true,
    },
    {
      feature: "Call Quality",
      us: "Every call answered",
      competitors: "27% of calls missed",
      icon: Phone,
      highlight: false,
    },
    {
      feature: "Lead Qualification",
      us: "Instant AI qualification",
      competitors: "Manual (wastes time)",
      icon: Filter,
      highlight: true,
    },
    {
      feature: "Setup Time",
      us: "1-2 weeks",
      competitors: "4-6 weeks",
      icon: Timer,
      highlight: false,
    },
    {
      feature: "Monthly Cost",
      us: "From $997/month",
      competitors: "$3,000+ for staff",
      icon: DollarSign,
      highlight: true,
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 relative overflow-hidden bg-gradient-to-b from-white to-slate-50"
      style={{
        fontFamily: 'var(--font-bricolage-grotesque)'
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#00C9FF]/10 via-[#4A69E2]/10 to-[#00C9FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C9FF]/10 border border-slate-200 mb-6">
            <GitCompare className="w-4 h-4" style={{ color: '#00C9FF' }} />
            <span className="text-xs uppercase tracking-wider" style={{ fontWeight: 600, color: '#00C9FF' }}>
              Why We're Different
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4" style={{ fontWeight: 800 }}>
            Why {city} Businesses{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]">
              Choose Capture Client
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto" style={{ fontWeight: 200 }}>
            See how we stack up against traditional receptionists and answering services
          </p>
        </div>

        {/* Comparison Table */}
        <div className="relative">
          <div className="absolute -inset-px bg-gradient-to-br from-[#00C9FF]/20 via-[#4A69E2]/10 to-[#00C9FF]/20 rounded-2xl blur-xl opacity-50" />
          <div className="relative border border-slate-200 bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 border-b border-slate-200">
              <div className="text-slate-600 text-xs sm:text-sm uppercase tracking-wider" style={{ fontWeight: 600 }}>
                Feature
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg" style={{ backgroundColor: '#00C9FF10', borderColor: '#00C9FF' }}>
                  <Trophy className="w-4 h-4" style={{ color: '#00C9FF' }} />
                  <span className="text-xs sm:text-sm" style={{ fontWeight: 700, color: '#00C9FF' }}>Capture Client</span>
                </div>
              </div>
              <div className="text-center text-xs sm:text-sm text-slate-600" style={{ fontWeight: 600 }}>
                Traditional Services
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-200">
              {comparisonFeatures.map((item, index) => (
                <div
                  key={index}
                  className={`
                    grid grid-cols-3 gap-4 p-4 sm:p-6 transition-colors
                    ${item.highlight ? 'bg-[#00C9FF]/5' : 'hover:bg-slate-50'}
                  `}
                >
                  {/* Feature Name */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-slate-200 shrink-0 bg-white">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-900" style={{ fontWeight: 600 }}>
                      {item.feature}
                    </span>
                  </div>

                  {/* Our Value */}
                  <div className="flex items-center justify-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg" style={{ backgroundColor: '#00C9FF10', borderColor: '#00C9FF50' }}>
                      <CheckCircle className="w-4 h-4" style={{ color: '#00C9FF' }} />
                      <span className="text-xs sm:text-sm" style={{ fontWeight: 600, color: '#00C9FF' }}>
                        {item.us}
                      </span>
                    </div>
                  </div>

                  {/* Competitor Value */}
                  <div className="flex items-center justify-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-2 border rounded-lg bg-slate-50" style={{ borderColor: '#e2e8f0' }}>
                      <X className="w-4 h-4 text-slate-400" />
                      <span className="text-xs sm:text-sm text-slate-600" style={{ fontWeight: 400 }}>
                        {item.competitors}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Cards View (Hidden on Desktop) */}
        <div className="sm:hidden mt-8 space-y-4">
          {comparisonFeatures.map((item, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-xl border shadow-sm
                ${
                  item.highlight
                    ? 'bg-[#00C9FF]/5 border-[#00C9FF]/30'
                    : 'border-slate-200 bg-white'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <item.icon className="w-5 h-5" style={{ color: '#00C9FF' }} />
                <span className="text-sm text-slate-900" style={{ fontWeight: 700 }}>{item.feature}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Us:</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 border rounded" style={{ backgroundColor: '#00C9FF10', borderColor: '#00C9FF50' }}>
                    <CheckCircle className="w-3 h-3" style={{ color: '#00C9FF' }} />
                    <span className="text-xs" style={{ fontWeight: 600, color: '#00C9FF' }}>{item.us}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Others:</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 border rounded bg-slate-50" style={{ borderColor: '#e2e8f0' }}>
                    <X className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-600" style={{ fontWeight: 400 }}>{item.competitors}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-block p-6 sm:p-8 bg-gradient-to-br from-[#00C9FF]/10 to-[#4A69E2]/10 border rounded-2xl shadow-sm" style={{ borderColor: '#00C9FF50' }}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl text-slate-900 mb-2" style={{ fontWeight: 700 }}>
                  Experience the Difference in {city}
                </h3>
                <p className="text-sm sm:text-base text-slate-600" style={{ fontWeight: 300 }}>
                  Join businesses already capturing every lead with Voice AI
                </p>
              </div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] px-8 py-4 rounded-xl text-base hover:shadow-2xl hover:scale-105 transition-all whitespace-nowrap text-white"
                style={{ fontWeight: 700 }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
