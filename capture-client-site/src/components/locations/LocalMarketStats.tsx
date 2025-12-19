'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingDown, Store, PhoneMissed, Building2, ArrowRight } from 'lucide-react';

interface LocalMarketStatsProps {
  city: string;
  estimatedLoss: number;
  missedCallPercentage: number;
}

export default function LocalMarketStats({
  city,
  estimatedLoss,
  missedCallPercentage,
}: LocalMarketStatsProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }, [hasAnimated, end, duration]);

    return count;
  };

  const animatedLoss = useCounter(estimatedLoss, 2500);
  const animatedPercentage = useCounter(missedCallPercentage, 2000);

  // Calculate city total market loss (assuming multiple businesses)
  const cityTotalLoss = Math.round(estimatedLoss * 120); // Estimate: 120 similar businesses
  const animatedCityLoss = useCounter(cityTotalLoss, 3000);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-400/10 border border-orange-400/30 mb-6">
            <TrendingDown className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-orange-300 uppercase tracking-wider">
              The Cost of Missed Calls
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            {city} Businesses Are{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Bleeding Revenue
            </span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            Every missed call is a lost opportunity. Here's what's at stake.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Stat 1: Individual Business Loss */}
          <div className="group relative">
            <div className="absolute -inset-px bg-gradient-to-br from-orange-400/30 via-orange-500/20 to-red-500/30 rounded-2xl opacity-50 blur-lg group-hover:opacity-70 transition-opacity" />
            <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-orange-400/20 shadow-2xl">
              {/* Icon */}
              <div className="mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400/20 to-red-500/20 border border-orange-400/30">
                  <Store className="w-7 h-7 text-orange-400" />
                </div>
              </div>

              {/* Counter */}
              <div className="mb-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                  ${animatedLoss.toLocaleString()}
                </div>
                <div className="text-sm sm:text-base font-bold text-orange-300 mt-1">
                  per business/year
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed">
                Average revenue lost by a single {city} business from missed calls annually
              </p>
            </div>
          </div>

          {/* Stat 2: Missed Call Percentage */}
          <div className="group relative">
            <div className="absolute -inset-px bg-gradient-to-br from-red-400/30 via-red-500/20 to-orange-500/30 rounded-2xl opacity-50 blur-lg group-hover:opacity-70 transition-opacity" />
            <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-red-400/20 shadow-2xl">
              {/* Icon */}
              <div className="mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-400/20 to-orange-500/20 border border-red-400/30">
                  <PhoneMissed className="w-7 h-7 text-red-400" />
                </div>
              </div>

              {/* Counter */}
              <div className="mb-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
                  {animatedPercentage}%
                </div>
                <div className="text-sm sm:text-base font-bold text-red-300 mt-1">
                  of calls missed
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed">
                Average percentage of inbound calls that go unanswered by contractors in {city}
              </p>
            </div>
          </div>

          {/* Stat 3: City-Wide Market Loss */}
          <div className="group relative">
            <div className="absolute -inset-px bg-gradient-to-br from-amber-400/30 via-orange-500/20 to-red-600/30 rounded-2xl opacity-50 blur-lg group-hover:opacity-70 transition-opacity" />
            <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-amber-400/20 shadow-2xl">
              {/* Icon */}
              <div className="mb-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400/20 to-red-500/20 border border-amber-400/30">
                  <Building2 className="w-7 h-7 text-amber-400" />
                </div>
              </div>

              {/* Counter */}
              <div className="mb-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  ${(animatedCityLoss / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm sm:text-base font-bold text-amber-300 mt-1">
                  city-wide loss
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed">
                Estimated total revenue lost across all {city} businesses annually from missed calls
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    Don't Let Your {city} Business Be Part of This Statistic
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base">
                    Voice AI answers every call, qualifies leads, and books appointments 24/7
                  </p>
                </div>
                <a
                  href="#contact"
                  className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 px-8 py-4 rounded-xl font-black text-base hover:shadow-2xl hover:shadow-cyan-400/50 hover:scale-105 transition-all whitespace-nowrap"
                >
                  <span>Fix This Now</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
