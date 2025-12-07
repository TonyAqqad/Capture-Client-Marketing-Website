'use client';

import { useState } from 'react';
import { Briefcase, Check, Wrench, Gavel, Heart, Home, Building2, Phone, Users, Truck, Calendar, MapPin } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Industry {
  name: string;
  icon: string;
  description: string;
}

interface LocalIndustriesServedProps {
  city: string;
  popularIndustries: Industry[];
}

// Icon mapping: Material Icons → Lucide React
const iconMap: Record<string, LucideIcon> = {
  'build': Wrench,
  'gavel': Gavel,
  'local_hospital': Heart,
  'home': Home,
  'business': Building2,
  'phone': Phone,
  'people': Users,
  'local_shipping': Truck,
  'event': Calendar,
  'location_on': MapPin,
};

export default function LocalIndustriesServed({
  city,
  popularIndustries,
}: LocalIndustriesServedProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Helper to get icon component
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent || Building2; // fallback to Building2
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-6">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Industries We Serve
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Popular Industries in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
              {city}
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Voice AI solutions tailored to your industry's unique needs
          </p>
        </div>

        {/* Desktop: Tabs Layout */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          {/* Tab Headers */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {popularIndustries.map((industry, index) => {
              const IconComponent = getIcon(industry.icon);
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    group relative inline-flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300
                    ${
                      activeTab === index
                        ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border-2 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-400/20'
                        : 'bg-slate-900/50 border border-slate-700 text-slate-400 hover:border-cyan-400/30 hover:text-cyan-400'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{industry.name}</span>
                  {activeTab === index && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-cyan-400/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 sm:p-10 lg:p-12">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-xl opacity-40" />
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                      {(() => {
                        const IconComponent = getIcon(popularIndustries[activeTab].icon);
                        return <IconComponent className="text-cyan-300 w-9 h-9" />;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                    {popularIndustries[activeTab].name}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
                    {popularIndustries[activeTab].description}
                  </p>

                  {/* Feature List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-sm text-slate-300">24/7 availability for your {city} customers</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-sm text-slate-300">Instant lead qualification</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-sm text-slate-300">Automatic appointment booking</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-sm text-slate-300">CRM integration included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Cards Layout with Horizontal Scroll */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide">
            {popularIndustries.map((industry, index) => {
              const IconComponent = getIcon(industry.icon);
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center"
                >
                  <div className="group relative h-full">
                    <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-cyan-400/20 rounded-2xl blur-xl opacity-50" />
                    <div className="relative h-full bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6">
                      {/* Icon */}
                      <div className="mb-5">
                        <div className="relative inline-flex">
                          <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-lg opacity-40" />
                          <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                            <IconComponent className="text-cyan-300 w-7 h-7" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-black text-white mb-3">
                        {industry.name}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {industry.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-xs text-slate-300">24/7 availability</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-xs text-slate-300">Lead qualification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-xs text-slate-300">Auto booking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {popularIndustries.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-slate-700"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
