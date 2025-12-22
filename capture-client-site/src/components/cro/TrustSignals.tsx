"use client";

import {
  Award,
  ShieldCheck,
  Shield,
  Trophy,
  Users,
  TrendingUp,
  LineChart,
  BadgeCheck,
} from "lucide-react";

export default function TrustSignals() {
  const signals = [
    {
      Icon: Award,
      label: "Google Partner",
      color: "text-blue-400",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/10",
    },
    {
      Icon: ShieldCheck,
      label: "Meta Partner",
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/10",
    },
    {
      Icon: Shield,
      label: "BBB Accredited",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/10",
    },
    {
      Icon: Trophy,
      label: "6+ Years Excellence",
      color: "text-amber-400",
      bgColor: "bg-amber-500/5",
      borderColor: "border-amber-500/10",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Clients Served",
      Icon: Users,
    },
    {
      value: "5M+",
      label: "Leads Generated",
      Icon: TrendingUp,
    },
    {
      value: "300%",
      label: "Avg ROI Increase",
      Icon: LineChart,
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Authority badges - subtle, integrated feel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {signals.map((signal, index) => (
          <div
            key={index}
            className={`group ${signal.bgColor} border ${signal.borderColor} rounded-xl p-5 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-opacity-30 backdrop-blur-sm min-h-[120px] sm:min-h-[110px]`}
          >
            <signal.Icon
              className={`${signal.color} w-6 h-6 mb-2.5 transition-transform duration-500 group-hover:scale-110`}
            />
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-tight tracking-wide">
              {signal.label}
            </p>
          </div>
        ))}
      </div>

      {/* Stats row - quieter presentation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-8 border-t border-surface-border/50">
        {stats.map((stat, index) => (
          <div key={index} className="text-center py-2 group">
            <div className="flex flex-col items-center justify-center gap-2 mb-2">
              <stat.Icon className="text-accent/60 w-5 h-5 transition-colors duration-300 group-hover:text-accent" />
              <p className="text-3xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Trust statement - more understated */}
      <div className="text-center bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 backdrop-blur-sm">
        <p className="text-xs sm:text-sm text-slate-700 flex items-center justify-center flex-wrap gap-2">
          <BadgeCheck className="text-accent/70 w-4 h-4" />
          <span className="font-medium">
            Trusted by leading small businesses across Tennessee and beyond
          </span>
        </p>
      </div>
    </div>
  );
}
