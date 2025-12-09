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
    <section
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 relative overflow-hidden"
      style={{ backgroundColor: '#030303' }}
    >
      {/* Background Effects - Mesh Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#00C9FF]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#4A69E2]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,201,255,0.03)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C9FF]/10 border border-[#00C9FF]/20 mb-6">
            <Star className="w-3.5 h-3.5 text-[#00C9FF] fill-[#00C9FF]" />
            <span
              className="text-xs uppercase tracking-wider text-[#00C9FF]"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
            >
              Client Success Stories
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
          >
            What{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2]">
              {cityName}
            </span>{" "}
            Businesses Say
          </h2>
          <p
            className="text-slate-400 text-base sm:text-lg"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
          >
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
              <div className="absolute -inset-px bg-gradient-to-br from-[#00C9FF]/0 via-[#00C9FF]/20 to-[#4A69E2]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

              {/* Card - Glass Morphism */}
              <div className="relative h-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:border-[#00C9FF]/30 group-hover:shadow-[0_8px_32px_rgba(0,201,255,0.15)] transition-all duration-500">
                {/* Quote Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF] to-[#4A69E2] rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C9FF]/10 to-[#4A69E2]/10 border border-[#00C9FF]/20">
                    <Quote className="w-6 h-6 text-[#00C9FF]" />
                  </div>
                </div>

                {/* Quote Text - Playfair Display Italic */}
                <blockquote className="mb-6">
                  <p
                    className="text-base sm:text-lg text-slate-200 leading-relaxed"
                    style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                  >
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder with Initials */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF] to-[#4A69E2] rounded-full blur-sm opacity-40" />
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#00C9FF]/20 to-[#4A69E2]/20 border-2 border-[#00C9FF]/30">
                      <span
                        className="text-[#00C9FF] text-sm"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
                      >
                        {(testimonial.author || testimonial.name || "")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>

                  {/* Author Details */}
                  <div className="flex-1">
                    <div
                      className="text-white text-base mb-0.5"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
                    >
                      {testimonial.author || testimonial.name}
                    </div>
                    <div
                      className="text-sm text-slate-400"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
                    >
                      {testimonial.business || testimonial.company}
                      {testimonial.role && ` • ${testimonial.role}`}
                    </div>
                    {testimonial.location && (
                      <div
                        className="flex items-center gap-1 text-xs text-[#00C9FF] mt-1"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Star Rating - Cyan */}
                  <div className="hidden sm:flex items-center gap-0.5 flex-shrink-0">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-[#00C9FF] fill-[#00C9FF]"
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

        {/* Social Proof Stats - Glass Morphism with Bold Gradient Metrics */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="text-center p-4 sm:p-6 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl rounded-xl">
            <div
              className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] mb-1"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
            >
              500+
            </div>
            <div
              className="text-xs sm:text-sm text-slate-400"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
            >
              Happy Clients
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl rounded-xl">
            <div
              className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] mb-1"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
            >
              4.9
            </div>
            <div
              className="text-xs sm:text-sm text-slate-400"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
            >
              Avg Rating
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl rounded-xl">
            <div
              className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] mb-1"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
            >
              15k+
            </div>
            <div
              className="text-xs sm:text-sm text-slate-400"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
            >
              Calls Handled
            </div>
          </div>
          <div className="text-center p-4 sm:p-6 border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl rounded-xl">
            <div
              className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] mb-1"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
            >
              24/7
            </div>
            <div
              className="text-xs sm:text-sm text-slate-400"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
            >
              Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
