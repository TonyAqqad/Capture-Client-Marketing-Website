"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { Testimonial } from "@/types/content";
import { ArrowUpRight, Quote } from "lucide-react";
import { use3DTilt, cardShadow, perspectiveContainer, transform3D, depthSpring } from "@/lib/depth-utils";
import { useIsMobile } from "@/lib/responsive";

// ============================================
// PREMIUM TESTIMONIALS - Light Theme
// Billion-dollar aesthetic with glass morphism
// ============================================

interface EditorialTestimonial extends Testimonial {
  id: number;
  metric: string;
  metricLabel: string;
  industry: string;
}

const testimonials: EditorialTestimonial[] = [
  {
    id: 1,
    name: "Sarah Martinez",
    role: "Owner",
    company: "Elite HVAC Services",
    quote:
      "We went from missing 60% of calls to capturing every opportunity. In 3 months, we added $180K in revenue from leads we would have lost.",
    rating: 5,
    result: "+247% leads",
    image: "SM",
    metric: "$180K",
    metricLabel: "Additional revenue in 90 days",
    industry: "HVAC",
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    role: "Managing Partner",
    company: "Rodriguez Law Firm",
    quote:
      "The AI handles calls 24/7. We signed 15 new clients from after-hours inquiries alone this quarter. Cases we never would have seen.",
    rating: 5,
    result: "15 new clients",
    image: "CR",
    metric: "15",
    metricLabel: "Clients from after-hours calls",
    industry: "Legal",
  },
  {
    id: 3,
    name: "Jennifer Lee",
    role: "Practice Manager",
    company: "Bright Smile Dental",
    quote:
      "Our marketing ROI jumped 340% in 90 days. The dashboard shows exactly what's working. No more guessing.",
    rating: 5,
    result: "+340% ROI",
    image: "JL",
    metric: "340%",
    metricLabel: "Increase in marketing ROI",
    industry: "Dental",
  },
];

export function PremiumTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });
  const isMobile = useIsMobile();

  // 3D tilt for featured card (larger tilt range)
  const featuredTilt = use3DTilt(5);

  // 3D tilt for smaller cards
  const card1Tilt = use3DTilt(4);
  const card2Tilt = use3DTilt(4);

  return (
    <section className="relative overflow-hidden w-full py-20 sm:py-28 lg:py-36 bg-white">
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] opacity-30"
          style={{
            background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.1) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] opacity-25"
          style={{
            background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div ref={containerRef} className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Editorial header - using div to avoid mobile CSS override targeting header elements */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
            <span
              className="text-xs font-semibold text-blue-700 uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
            >
              Case Studies
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-slate-900 mb-6"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
          >
            <span className="font-light">Real results from </span>
            <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              real businesses
            </span>
          </h2>

          <p
            className="text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}
          >
            See how service businesses use Capture Client to capture more leads and grow revenue.
          </p>
        </motion.div>

        {/* Editorial testimonial grid - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured large card */}
          <motion.article
            initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(10px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div style={isMobile ? {} : perspectiveContainer}>
              <motion.div
                style={isMobile ? {} : { ...transform3D, rotateX: featuredTilt.rotateX, rotateY: featuredTilt.rotateY }}
                animate={{ boxShadow: featuredTilt.isHovered ? cardShadow.hover : cardShadow.rest }}
                transition={{ duration: 0.3 }}
                {...featuredTilt.handlers}
                className="relative h-full p-8 sm:p-10 lg:p-12 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/60 group overflow-hidden"
              >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 60%)",
                }}
              />

              {/* Quote icon with subtle shift on hover */}
              <motion.div
                className="absolute top-8 right-8 opacity-10"
                animate={{ y: featuredTilt.isHovered ? -4 : 0, x: featuredTilt.isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-16 h-16 text-blue-600" />
              </motion.div>

              {/* Industry tag */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/60 text-xs font-semibold text-blue-700 uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                >
                  {testimonials[0].industry}
                </span>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>

              {/* Big metric with spring bounce entrance */}
              <motion.div
                className="mb-8 relative z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ...depthSpring }}
              >
                <p
                  className="text-5xl sm:text-6xl lg:text-7xl tracking-tight font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                  style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                >
                  {testimonials[0].metric}
                </p>
                <p
                  className="text-sm sm:text-base mt-2 text-slate-500"
                  style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}
                >
                  {testimonials[0].metricLabel}
                </p>
              </motion.div>

              {/* Quote */}
              <blockquote
                className="text-lg sm:text-xl leading-relaxed mb-8 text-slate-700 relative z-10"
                style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
              >
                "{testimonials[0].quote}"
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-4 pt-6 border-t border-slate-200/60 relative z-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25"
                  style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                >
                  {testimonials[0].image}
                </div>
                <div>
                  <p
                    className="font-semibold text-slate-900"
                    style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                  >
                    {testimonials[0].name}
                  </p>
                  <p
                    className="text-sm text-slate-500"
                    style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}
                  >
                    {testimonials[0].role}, {testimonials[0].company}
                  </p>
                </div>
              </footer>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
              </motion.div>
            </div>
          </motion.article>

          {/* Two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {testimonials.slice(1).map((testimonial, index) => {
              // Use the appropriate tilt hook for each card
              const cardTilt = index === 0 ? card1Tilt : card2Tilt;

              return (
                <motion.article
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(10px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div style={isMobile ? {} : perspectiveContainer}>
                    <motion.div
                      style={isMobile ? {} : { ...transform3D, rotateX: cardTilt.rotateX, rotateY: cardTilt.rotateY }}
                      animate={{ boxShadow: cardTilt.isHovered ? cardShadow.hover : cardShadow.rest }}
                      transition={{ duration: 0.3 }}
                      {...cardTilt.handlers}
                      className="relative h-full p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-slate-200/60 group overflow-hidden"
                    >
                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 60%)",
                    }}
                  />

                  {/* Industry tag and metric row */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/60 text-xs font-semibold text-blue-700 uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                    >
                      {testimonial.industry}
                    </span>
                    {/* Metric with spring bounce entrance */}
                    <motion.div
                      className="text-right"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ...depthSpring }}
                    >
                      <p
                        className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                      >
                        {testimonial.metric}
                        {testimonial.metric !== "15" && "%"}
                      </p>
                      <p
                        className="text-xs mt-0.5 text-slate-500"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}
                      >
                        {testimonial.metricLabel}
                      </p>
                    </motion.div>
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="text-base sm:text-lg leading-relaxed mb-6 text-slate-700 relative z-10"
                    style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
                  >
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author - compact */}
                  <footer className="flex items-center gap-3 relative z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                    >
                      {testimonial.image}
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold text-slate-900"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className="text-xs text-slate-500"
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 400 }}
                      >
                        {testimonial.company}
                      </p>
                    </div>
                  </footer>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Bottom proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/60"
        >
          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60">
              <span className="font-semibold text-slate-900 text-sm">500+</span>
              <span className="text-slate-500 text-sm">active businesses</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60">
              <span className="font-semibold text-slate-900 text-sm">1M+</span>
              <span className="text-slate-500 text-sm">calls handled</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/60">
              <span className="font-semibold text-slate-900 text-sm">4.9</span>
              <span className="text-slate-500 text-sm">average rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
