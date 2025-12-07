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
      us: "From $797/month",
      competitors: "$3,000+ for staff",
      icon: DollarSign,
      highlight: true,
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6">
            <GitCompare className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Why We're Different
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Why {city} Businesses{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
              Choose Capture Client
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            See how we stack up against traditional receptionists and answering services
          </p>
        </div>

        {/* Comparison Table */}
        <div className="relative">
          <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-cyan-400/20 rounded-2xl blur-xl opacity-50" />
          <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 border-b border-slate-700/50 bg-slate-900/50">
              <div className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">
                Feature
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/50 rounded-lg">
                  <Trophy className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-black text-cyan-300">Capture Client</span>
                </div>
              </div>
              <div className="text-center text-xs sm:text-sm font-bold text-slate-500">
                Traditional Services
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-700/30">
              {comparisonFeatures.map((item, index) => (
                <div
                  key={index}
                  className={`
                    grid grid-cols-3 gap-4 p-4 sm:p-6 transition-colors
                    ${item.highlight ? 'bg-cyan-400/5' : 'hover:bg-slate-800/30'}
                  `}
                >
                  {/* Feature Name */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-slate-800/50 border border-slate-700 shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-white">
                      {item.feature}
                    </span>
                  </div>

                  {/* Our Value */}
                  <div className="flex items-center justify-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-400/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs sm:text-sm font-bold text-green-300">
                        {item.us}
                      </span>
                    </div>
                  </div>

                  {/* Competitor Value */}
                  <div className="flex items-center justify-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-400/30 rounded-lg">
                      <X className="w-4 h-4 text-red-400" />
                      <span className="text-xs sm:text-sm font-medium text-red-300">
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
                p-4 rounded-xl border
                ${
                  item.highlight
                    ? 'bg-cyan-400/5 border-cyan-400/30'
                    : 'bg-slate-900/50 border-slate-700'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-3">
                <item.icon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-black text-white">{item.feature}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Us:</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-400/30 rounded">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs font-bold text-green-300">{item.us}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Others:</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-400/30 rounded">
                    <X className="w-3 h-3 text-red-400" />
                    <span className="text-xs font-medium text-red-300">{item.competitors}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-block p-6 sm:p-8 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Experience the Difference in {city}
                </h3>
                <p className="text-sm sm:text-base text-slate-300">
                  Join businesses already capturing every lead with Voice AI
                </p>
              </div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-8 py-4 rounded-xl font-black text-base hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all whitespace-nowrap"
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
