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
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-cyan-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200 mb-6 hover:border-blue-300 transition-all duration-300">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600 uppercase tracking-wide" style={{ fontWeight: 600 }}>
              ROI Calculator
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6">
            <span style={{ fontWeight: 200 }}>Calculate Your </span>
            <span className="text-blue-600" style={{ fontWeight: 800 }}>Commission Increase</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto" style={{ fontWeight: 300 }}>
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
            <GlassCard variant="premium" className="p-8 bg-white/70 backdrop-blur-xl border border-slate-200 hover:border-blue-300 transition-all duration-300">
              <h3 className="text-2xl text-slate-900 mb-6 flex items-center gap-3" style={{ fontWeight: 700 }}>
                <Settings className="w-8 h-8 text-blue-600" />
                Your Numbers
              </h3>

              <div className="space-y-8">
                {/* Monthly Leads */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-slate-900" style={{ fontWeight: 500 }}>Monthly Leads</label>
                    <span className="text-2xl text-blue-600" style={{ fontWeight: 700 }}>{monthlyLeads}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={monthlyLeads}
                    onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${((monthlyLeads - 10) / 190) * 100}%, rgb(226, 232, 240) ${((monthlyLeads - 10) / 190) * 100}%, rgb(226, 232, 240) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>10</span>
                    <span>200</span>
                  </div>
                </div>

                {/* Close Rate */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-slate-900" style={{ fontWeight: 500 }}>Close Rate (%)</label>
                    <span className="text-2xl text-blue-600" style={{ fontWeight: 700 }}>{closeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${((closeRate - 1) / 9) * 100}%, rgb(226, 232, 240) ${((closeRate - 1) / 9) * 100}%, rgb(226, 232, 240) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Average Commission */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-slate-900" style={{ fontWeight: 500 }}>Avg Commission</label>
                    <span className="text-2xl text-green-600" style={{ fontWeight: 700 }}>
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
                    className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-green-600"
                    style={{
                      background: `linear-gradient(to right, rgb(22, 163, 74) 0%, rgb(22, 163, 74) ${((avgCommission - 5000) / 45000) * 100}%, rgb(226, 232, 240) ${((avgCommission - 5000) / 45000) * 100}%, rgb(226, 232, 240) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
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
            <GlassCard variant="premium" className="p-8 border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
                <h3 className="text-xl font-bold text-slate-900">Current Annual Revenue</h3>
              </div>
              <p className="text-5xl font-black text-red-600 mb-2">
                ${displayCurrentRevenue.toLocaleString()}
              </p>
              <p className="text-slate-600">
                {currentDeals.toFixed(1)} deals/year · {currentResponseRate}% response rate
              </p>
            </GlassCard>

            <div className="flex justify-center">
              <ArrowDown className="w-10 h-10 text-amber-500 animate-bounce" />
            </div>

            <GlassCard variant="premium" className="p-8 border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-400 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-slate-900">With AI Voice Agents</h3>
              </div>
              <p className="text-5xl font-black text-green-600 mb-2">
                ${displayAiRevenue.toLocaleString()}
              </p>
              <p className="text-slate-600">
                {aiDealsWithBoost.toFixed(1)} deals/year · {aiResponseRate}% response rate
              </p>
            </GlassCard>

            {/* Additional revenue highlight */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GlassCard variant="premium" className="p-8 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all duration-500">
                <div className="text-center">
                  <p className="text-sm text-blue-600 uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>
                    Additional Annual Revenue
                  </p>
                  <p className="text-6xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2" style={{ fontWeight: 800 }}>
                    +${displayAdditionalRevenue.toLocaleString()}
                  </p>
                  <p className="text-slate-700 text-lg" style={{ fontWeight: 400 }}>
                    {additionalDeals.toFixed(1)} more deals per year
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-slate-600 text-sm mb-4" style={{ fontWeight: 400 }}>
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
