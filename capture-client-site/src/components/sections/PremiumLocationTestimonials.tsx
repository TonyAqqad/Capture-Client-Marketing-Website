"use client";

import { Star, Quote, MapPin } from "lucide-react";

interface Testimonial {
  quote: string;
  // Support both data formats
  name?: string;      // from LocationData
  author?: string;    // legacy format
  company?: string;   // from LocationData
  business?: string;  // legacy format
  role?: string;
  location?: string;
  image?: string;
  rating?: number;
}

interface PremiumLocationTestimonialsProps {
  testimonials: Testimonial[];
  cityName: string;
}

export default function PremiumLocationTestimonials({
  testimonials,
  cityName,
}: PremiumLocationTestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 bg-slate-900/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/30 mb-6">
            <Star className="w-3.5 h-3.5 text-green-400 fill-green-400" />
            <span className="text-xs font-bold text-green-300 uppercase tracking-wider">
              Client Success Stories
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
            What{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400">
              {cityName}
            </span>{" "}
            Businesses Say
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Real results from real businesses in your area
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-px bg-gradient-to-br from-cyan-400/0 via-cyan-400/30 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] group-hover:border-cyan-400/30 group-hover:shadow-[0_8px_32px_rgba(6,182,212,0.15)] transition-all duration-500">
                {/* Quote Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                    <Quote className="w-6 h-6 text-cyan-300" />
                  </div>
                </div>

                {/* Quote Text */}
                <blockquote className="mb-6">
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder with Initials */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-sm opacity-50" />
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border-2 border-cyan-400/40">
                      <span className="text-cyan-200 font-black text-sm">
                        {(testimonial.author || testimonial.name || "")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>

                  {/* Author Details */}
                  <div className="flex-1">
                    <div className="text-white font-bold text-base mb-0.5">
                      {testimonial.author || testimonial.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.business || testimonial.company}
                      {testimonial.role && ` • ${testimonial.role}`}
                    </div>
                    {testimonial.location && (
                      <div className="flex items-center gap-1 text-xs text-cyan-400 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Star Rating */}
                  <div className="hidden sm:flex items-center gap-0.5 flex-shrink-0">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Mesh gradient overlay on hover */}
                <div className="absolute inset-0 bg-mesh-premium rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 mb-1">
              500+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Happy Clients
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 mb-1">
              4.9
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Avg Rating
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 mb-1">
              15k+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Calls Handled
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 mb-1">
              24/7
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
