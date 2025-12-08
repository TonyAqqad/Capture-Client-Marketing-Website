"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { Testimonial } from "@/types/content";
import { ArrowUpRight } from "lucide-react";

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

  return (
    <section className="section bg-background relative overflow-hidden w-full py-20 sm:py-28 lg:py-36">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div ref={containerRef} className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl mb-16 sm:mb-20 lg:mb-24"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted mb-4">
            Case Studies
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Real results from{" "}
            <span className="text-gradient-gold-cyan">real businesses</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground-muted leading-relaxed max-w-2xl">
            See how service businesses use Capture Client to capture more leads and grow revenue.
          </p>
        </motion.header>

        {/* Editorial testimonial grid - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured large card */}
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7"
          >
            <div className="glass-premium h-full p-8 sm:p-10 lg:p-12 rounded-2xl group hover:border-accent/30 transition-colors duration-300">
              {/* Industry tag */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
                  {testimonials[0].industry}
                </span>
                <ArrowUpRight className="w-5 h-5 text-foreground-muted group-hover:text-accent transition-colors" />
              </div>

              {/* Big metric */}
              <div className="mb-8">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold-cyan tracking-tight">
                  {testimonials[0].metric}
                </p>
                <p className="text-foreground-muted text-sm sm:text-base mt-2">
                  {testimonials[0].metricLabel}
                </p>
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed mb-8">
                "{testimonials[0].quote}"
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-foreground font-semibold text-sm">
                  {testimonials[0].image}
                </div>
                <div>
                  <p className="text-foreground font-semibold">{testimonials[0].name}</p>
                  <p className="text-foreground-muted text-sm">
                    {testimonials[0].role}, {testimonials[0].company}
                  </p>
                </div>
              </footer>
            </div>
          </motion.article>

          {/* Two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {testimonials.slice(1).map((testimonial, index) => (
              <motion.article
                key={testimonial.id}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className="glass-premium h-full p-6 sm:p-8 rounded-2xl group hover:border-accent/30 transition-colors duration-300">
                  {/* Industry tag and metric row */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
                      {testimonial.industry}
                    </span>
                    <div className="text-right">
                      <p className="text-2xl sm:text-3xl font-bold text-gradient-gold-cyan">
                        {testimonial.metric}
                        {testimonial.metric !== "15" && "%"}
                      </p>
                      <p className="text-foreground-muted text-xs mt-0.5">
                        {testimonial.metricLabel}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-foreground text-base sm:text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author - compact */}
                  <footer className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-foreground font-semibold text-xs">
                      {testimonial.image}
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">{testimonial.name}</p>
                      <p className="text-foreground-muted text-xs">
                        {testimonial.company}
                      </p>
                    </div>
                  </footer>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-foreground-muted text-sm">
            <span>500+ active businesses</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>1M+ calls handled</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>4.9 average rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
