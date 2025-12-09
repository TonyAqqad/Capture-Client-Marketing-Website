"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Calculator, Settings, TrendingDown, TrendingUp, ArrowDown } from "lucide-react";

export function RealEstateROICalculator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });

  const [monthlyLeads, setMonthlyLeads] = useState<number>(50);
  const [closeRate, setCloseRate] = useState<number>(3);
  const [avgCommission, setAvgCommission] = useState<number>(12000);

  // Calculations
  const currentResponseRate = 25; // Industry average: 25% respond within reasonable time
  const aiResponseRate = 95; // AI responds to 95% immediately
  const speedToLeadBoost = 78; // 78% more likely to convert with fast response

  const currentDeals = (monthlyLeads * (currentResponseRate / 100) * (closeRate / 100)) * 12;
  const currentRevenue = currentDeals * avgCommission;

  const aiLeadsContacted = monthlyLeads * (aiResponseRate / 100);
  const aiDealsWithBoost = (aiLeadsContacted * (closeRate / 100) * (1 + speedToLeadBoost / 100)) * 12;
  const aiRevenue = aiDealsWithBoost * avgCommission;

  const additionalRevenue = aiRevenue - currentRevenue;
  const additionalDeals = aiDealsWithBoost - currentDeals;

  // Smooth number animations
  const currentRevenueSpring = useSpring(currentRevenue, { stiffness: 100, damping: 30 });
  const aiRevenueSpring = useSpring(aiRevenue, { stiffness: 100, damping: 30 });
  const additionalRevenueSpring = useSpring(additionalRevenue, { stiffness: 100, damping: 30 });

  const [displayCurrentRevenue, setDisplayCurrentRevenue] = useState(currentRevenue);
  const [displayAiRevenue, setDisplayAiRevenue] = useState(aiRevenue);
  const [displayAdditionalRevenue, setDisplayAdditionalRevenue] = useState(additionalRevenue);

  useEffect(() => {
    const unsubscribe1 = currentRevenueSpring.on("change", (latest) => setDisplayCurrentRevenue(Math.round(latest)));
    const unsubscribe2 = aiRevenueSpring.on("change", (latest) => setDisplayAiRevenue(Math.round(latest)));
    const unsubscribe3 = additionalRevenueSpring.on("change", (latest) => setDisplayAdditionalRevenue(Math.round(latest)));

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, [currentRevenueSpring, aiRevenueSpring, additionalRevenueSpring]);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10 via-transparent to-[#4A69E2]/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl mb-6 hover:bg-white/[0.04] hover:border-[#00C9FF]/30 transition-all duration-300">
            <Calculator className="w-5 h-5 text-[#00C9FF]" />
            <span className="text-sm text-[#00C9FF] uppercase tracking-wide" style={{ fontWeight: 600 }}>
              ROI Calculator
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            <span style={{ fontWeight: 200 }}>Calculate Your </span>
            <span className="text-[#00C9FF]" style={{ fontWeight: 800 }}>Commission Increase</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto" style={{ fontWeight: 300 }}>
            See exactly how much more revenue you'll capture with instant AI responses
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: Input controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard variant="premium" className="p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl hover:border-[#00C9FF]/20 transition-all duration-300">
              <h3 className="text-2xl text-white mb-6 flex items-center gap-3" style={{ fontWeight: 700 }}>
                <Settings className="w-8 h-8 text-[#00C9FF]" />
                Your Numbers
              </h3>

              <div className="space-y-8">
                {/* Monthly Leads */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-white" style={{ fontWeight: 500 }}>Monthly Leads</label>
                    <span className="text-2xl text-[#00C9FF]" style={{ fontWeight: 700 }}>{monthlyLeads}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(0, 201, 255) 0%, rgb(0, 201, 255) ${((monthlyLeads - 10) / 190) * 100}%, rgba(255,255,255,0.1) ${((monthlyLeads - 10) / 190) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>10</span>
                    <span>200</span>
                  </div>
                </div>

                {/* Close Rate */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-white" style={{ fontWeight: 500 }}>Close Rate (%)</label>
                    <span className="text-2xl text-[#4A69E2]" style={{ fontWeight: 700 }}>{closeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(74, 105, 226) 0%, rgb(74, 105, 226) ${((closeRate - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((closeRate - 1) / 9) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Average Commission */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-white" style={{ fontWeight: 500 }}>Avg Commission</label>
                    <span className="text-2xl text-green-400" style={{ fontWeight: 700 }}>
                      ${avgCommission.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    step="1000"
                    value={avgCommission}
                    onChange={(e) => setAvgCommission(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-400"
                    style={{
                      background: `linear-gradient(to right, rgb(74, 222, 128) 0%, rgb(74, 222, 128) ${((avgCommission - 5000) / 45000) * 100}%, rgba(255,255,255,0.1) ${((avgCommission - 5000) / 45000) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>$5K</span>
                    <span>$50K</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* RIGHT: Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Current vs AI Revenue */}
            <GlassCard variant="premium" className="p-8 border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 to-red-500/10 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">Current Annual Revenue</h3>
              </div>
              <p className="text-5xl font-black text-red-400 mb-2">
                ${displayCurrentRevenue.toLocaleString()}
              </p>
              <p className="text-white/60">
                {currentDeals.toFixed(1)} deals/year · {currentResponseRate}% response rate
              </p>
            </GlassCard>

            <div className="flex justify-center">
              <ArrowDown className="w-10 h-10 text-gold animate-bounce" />
            </div>

            <GlassCard variant="premium" className="p-8 border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:border-green-500/40 hover:shadow-[0_0_40px_rgba(74,222,128,0.2)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">With AI Voice Agents</h3>
              </div>
              <p className="text-5xl font-black text-green-400 mb-2">
                ${displayAiRevenue.toLocaleString()}
              </p>
              <p className="text-white/60">
                {aiDealsWithBoost.toFixed(1)} deals/year · {aiResponseRate}% response rate
              </p>
            </GlassCard>

            {/* Additional revenue highlight */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GlassCard variant="premium" className="p-8 border-2 border-[#00C9FF]/40 bg-gradient-to-br from-[#00C9FF]/20 via-[#00C9FF]/10 to-[#4A69E2]/5 shadow-[0_0_60px_rgba(0,201,255,0.3)] hover:shadow-[0_0_80px_rgba(0,201,255,0.5)] transition-all duration-500">
                <div className="text-center">
                  <p className="text-sm text-[#00C9FF] uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>
                    Additional Annual Revenue
                  </p>
                  <p className="text-6xl bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-[#00C9FF] bg-clip-text text-transparent mb-2" style={{ fontWeight: 800 }}>
                    +${displayAdditionalRevenue.toLocaleString()}
                  </p>
                  <p className="text-white/80 text-lg" style={{ fontWeight: 400 }}>
                    {additionalDeals.toFixed(1)} more deals per year
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 text-sm mb-4" style={{ fontWeight: 400 }}>
                      Based on {speedToLeadBoost}% higher conversion with instant response
                    </p>
                    <Button variant="primary" href="/contact" className="w-full hover:scale-105 transition-transform duration-300">
                      Capture This Revenue
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
