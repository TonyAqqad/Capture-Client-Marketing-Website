"use client";

export default function TrustSignals() {
  const signals = [
    {
      icon: "workspace_premium",
      label: "Google Partner",
      color: "text-blue-400",
      bgColor: "bg-blue-500/5",
      borderColor: "border-blue-500/10",
    },
    {
      icon: "verified_user",
      label: "Meta Partner",
      color: "text-primary",
      bgColor: "bg-primary/5",
      borderColor: "border-primary/10",
    },
    {
      icon: "security",
      label: "BBB Accredited",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/5",
      borderColor: "border-emerald-500/10",
    },
    {
      icon: "emoji_events",
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
      icon: "groups",
    },
    {
      value: "5M+",
      label: "Leads Generated",
      icon: "trending_up",
    },
    {
      value: "300%",
      label: "Avg ROI Increase",
      icon: "show_chart",
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
            <span className={`material-icons ${signal.color} text-2xl sm:text-2xl mb-2.5 transition-transform duration-500 group-hover:scale-110`}>{signal.icon}</span>
            <p className="text-xs sm:text-sm font-medium text-foreground/80 leading-tight tracking-wide">{signal.label}</p>
          </div>
        ))}
      </div>

      {/* Stats row - quieter presentation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-8 border-t border-surface-border/50">
        {stats.map((stat, index) => (
          <div key={index} className="text-center py-2 group">
            <div className="flex flex-col items-center justify-center gap-2 mb-2">
              <span className="material-icons text-accent/60 text-xl transition-colors duration-300 group-hover:text-accent">{stat.icon}</span>
              <p className="text-3xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">{stat.value}</p>
            </div>
            <p className="text-xs sm:text-sm text-foreground-muted uppercase tracking-wider font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Trust statement - more understated */}
      <div className="text-center bg-surface/20 rounded-xl p-4 sm:p-5 border border-surface-border/30 backdrop-blur-sm">
        <p className="text-xs sm:text-sm text-foreground/70 flex items-center justify-center flex-wrap gap-2">
          <span className="material-icons text-accent/70 text-sm align-middle">verified</span>
          <span className="font-medium">Trusted by leading small businesses across Tennessee and beyond</span>
        </p>
      </div>
    </div>
  );
}
