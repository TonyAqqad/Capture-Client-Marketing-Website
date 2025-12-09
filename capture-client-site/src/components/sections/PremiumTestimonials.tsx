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
    <section className="section relative overflow-hidden w-full py-20 sm:py-28 lg:py-36" style={{ backgroundColor: '#030303' }}>
      {/* Mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-indigo-500/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div ref={containerRef} className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Editorial header - $100B aesthetic */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 sm:mb-20 lg:mb-24"
        >
          <p
            className="text-xs font-medium uppercase tracking-[0.2em] mb-4"
            style={{
              color: '#00C9FF',
              fontFamily: 'var(--font-bricolage-grotesque)',
              fontWeight: 500
            }}
          >
            Case Studies
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
              fontWeight: 200,
              color: '#ffffff'
            }}
          >
            Real results from{" "}
            <span
              style={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00C9FF 0%, #4A69E2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              real businesses
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'var(--font-bricolage-grotesque)',
              fontWeight: 300
            }}
          >
            See how service businesses use Capture Client to capture more leads and grow revenue.
          </p>
        </motion.header>

        {/* Editorial testimonial grid - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured large card */}
          <motion.article
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div
              className="h-full p-8 sm:p-10 lg:p-12 rounded-2xl group transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Industry tag */}
              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{
                    color: '#00C9FF',
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontWeight: 500
                  }}
                >
                  {testimonials[0].industry}
                </span>
                <ArrowUpRight
                  className="w-5 h-5 transition-all duration-300"
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                />
              </div>

              {/* Big metric */}
              <div className="mb-8">
                <p
                  className="text-5xl sm:text-6xl lg:text-7xl tracking-tight"
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #00C9FF 0%, #4A69E2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {testimonials[0].metric}
                </p>
                <p
                  className="text-sm sm:text-base mt-2"
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontWeight: 300
                  }}
                >
                  {testimonials[0].metricLabel}
                </p>
              </div>

              {/* Quote - Playfair Display italic */}
              <blockquote
                className="text-lg sm:text-xl leading-relaxed mb-8"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400
                }}
              >
                "{testimonials[0].quote}"
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.15) 0%, rgba(74, 105, 226, 0.15) 100%)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontWeight: 600
                  }}
                >
                  {testimonials[0].image}
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{
                      color: '#ffffff',
                      fontFamily: 'var(--font-bricolage-grotesque)',
                      fontWeight: 600
                    }}
                  >
                    {testimonials[0].name}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontFamily: 'var(--font-bricolage-grotesque)',
                      fontWeight: 300
                    }}
                  >
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
                  duration: 0.8,
                  delay: 0.25 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="h-full p-6 sm:p-8 rounded-2xl group transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {/* Industry tag and metric row */}
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{
                        color: '#00C9FF',
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 500
                      }}
                    >
                      {testimonial.industry}
                    </span>
                    <div className="text-right">
                      <p
                        className="text-2xl sm:text-3xl"
                        style={{
                          fontFamily: 'var(--font-bricolage-grotesque)',
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #00C9FF 0%, #4A69E2 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {testimonial.metric}
                        {testimonial.metric !== "15" && "%"}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontFamily: 'var(--font-bricolage-grotesque)',
                          fontWeight: 300
                        }}
                      >
                        {testimonial.metricLabel}
                      </p>
                    </div>
                  </div>

                  {/* Quote - Playfair Display italic */}
                  <blockquote
                    className="text-base sm:text-lg leading-relaxed mb-6"
                    style={{
                      fontFamily: 'var(--font-playfair)',
                      fontStyle: 'italic',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 400
                    }}
                  >
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author - compact */}
                  <footer className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 201, 255, 0.15) 0%, rgba(74, 105, 226, 0.15) 100%)',
                        color: '#ffffff',
                        fontFamily: 'var(--font-bricolage-grotesque)',
                        fontWeight: 600
                      }}
                    >
                      {testimonial.image}
                    </div>
                    <div>
                      <p
                        className="text-sm"
                        style={{
                          color: '#ffffff',
                          fontFamily: 'var(--font-bricolage-grotesque)',
                          fontWeight: 600
                        }}
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{
                          color: 'rgba(255, 255, 255, 0.5)',
                          fontFamily: 'var(--font-bricolage-grotesque)',
                          fontWeight: 300
                        }}
                      >
                        {testimonial.company}
                      </p>
                    </div>
                  </footer>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom proof strip - premium styling */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 pt-10"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque)',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            <span>500+ active businesses</span>
            <span className="hidden sm:inline" style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>
            <span>1M+ calls handled</span>
            <span className="hidden sm:inline" style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>
            <span>4.9 average rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
