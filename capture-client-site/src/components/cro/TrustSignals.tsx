"use client";

export default function TrustSignals() {
  const signals = [
    {
      icon: "workspace_premium",
      label: "Google Partner",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      icon: "verified_user",
      label: "Meta Partner",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      icon: "security",
      label: "BBB Accredited",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      icon: "emoji_events",
      label: "6+ Years Excellence",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
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
    <div className="space-y-6 sm:space-y-8">
      {/* Authority badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-4">
        {signals.map((signal, index) => (
          <div
            key={index}
            className={`${signal.bgColor} border ${signal.borderColor} rounded-xl p-4 sm:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[110px] sm:min-h-[100px]`}
          >
            <span className={`material-icons ${signal.color} text-3xl sm:text-3xl mb-2`}>{signal.icon}</span>
            <p className="text-sm sm:text-sm font-semibold text-foreground leading-tight">{signal.label}</p>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 pt-6 border-t border-surface-border">
        {stats.map((stat, index) => (
          <div key={index} className="text-center py-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="material-icons text-accent text-2xl">{stat.icon}</span>
              <p className="text-3xl sm:text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
            </div>
            <p className="text-sm sm:text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Trust statement */}
      <div className="text-center bg-white/5 rounded-xl p-4 sm:p-4 border border-white/10">
        <p className="text-sm sm:text-sm text-gray-300 flex items-center justify-center flex-wrap gap-1">
          <span className="material-icons text-accent text-base align-middle">verified</span>
          <span>Trusted by leading small businesses across Tennessee and beyond</span>
        </p>
      </div>
    </div>
  );
}
