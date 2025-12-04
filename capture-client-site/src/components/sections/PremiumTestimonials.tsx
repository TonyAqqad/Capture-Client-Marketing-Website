"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  result: string;
  image: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Martinez",
    role: "Owner",
    company: "Elite HVAC Services",
    content:
      "Capture Client transformed our lead generation. We went from missing 60% of calls to capturing every single opportunity. The AI handles everything while we focus on the work. In 3 months, we've added $180K in revenue.",
    rating: 5,
    result: "+247% in leads captured",
    image: "👩‍💼",
    featured: true, // Featured testimonial
  },
  {
    id: 2,
    name: "Mike Thompson",
    role: "Founder",
    company: "Thompson Plumbing Co.",
    content:
      "The AI voice agent is incredible—it sounds more professional than our old receptionist! It qualifies leads, books appointments, and even handles customer service. We're now responding to leads in under 2 minutes instead of 2 hours.",
    rating: 5,
    result: "10x faster response time",
    image: "👨‍🔧",
  },
  {
    id: 3,
    name: "Jennifer Lee",
    role: "Practice Manager",
    company: "Bright Smile Dental",
    content:
      "Finally, everything in one place. No more juggling between our CRM, ad platforms, and appointment software. The dashboard shows exactly what's working. Our marketing ROI has never been better—up 340% in 90 days.",
    rating: 5,
    result: "+340% marketing ROI",
    image: "👩‍⚕️",
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    role: "CEO",
    company: "Rodriguez Law Firm",
    content:
      "We were skeptical about AI handling client calls, but the results speak for themselves. The voice agent captures leads 24/7, even when our office is closed. We've signed 15 new clients from after-hours calls alone this quarter.",
    rating: 5,
    result: "15 new clients from after-hours",
    image: "👨‍⚖️",
  },
];

export function PremiumTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });

  return (
    <section className="section bg-background relative overflow-hidden w-full max-w-full py-16 sm:py-20 lg:py-32">
      {/* Background aurora effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-30" />

      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-accent/20 to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/20 to-transparent blur-3xl"
      />

      <div ref={containerRef} className="container-custom relative z-10 px-6 sm:px-6 lg:px-8">
        {/* Section header with premium typography */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-gradient-gold-cyan mb-4 sm:mb-5">
              Client Success Stories
            </h2>
            <h3 className="text-hero-xl text-foreground mb-6 sm:mb-8 text-depth px-4">
              Trusted by{" "}
              <span className="text-gradient-gold">
                Growing Businesses
              </span>
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-[1.7] px-6 text-light-contrast">
              Real businesses. Real results. See how Capture Client helps companies like yours capture more leads and grow faster.
            </p>
          </motion.div>
        </div>

        {/* Testimonials grid with featured card */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className={testimonial.featured ? "lg:col-span-2" : ""}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isInView={isInView}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Platform capabilities with glass treatment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-12 border-t border-white/10 px-4 sm:px-6 lg:px-0"
        >
          <p className="text-center text-foreground-muted text-xs sm:text-sm uppercase tracking-[0.25em] mb-8 sm:mb-10">
            Platform Capabilities
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-16">
            {[
              { icon: "security", text: "Enterprise-Grade Security" },
              { icon: "support_agent", text: "24/7 AI Support" },
              { icon: "cloud_done", text: "Cloud-Based Platform" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-badge text-foreground font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-3 px-6 py-3 cursor-pointer"
              >
                <span className="material-icons text-gold text-xl sm:text-2xl">{item.icon}</span>
                {item.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isInView: boolean;
  index: number;
}

function TestimonialCard({ testimonial, isInView, index }: TestimonialCardProps) {
  const isFeatured = testimonial.featured;

  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
      }}
      className="h-full relative group"
    >
      {/* Glass 3D card */}
      <div className={`glass-3d h-full flex flex-col relative overflow-hidden ${
        isFeatured
          ? "p-10 sm:p-12 md:p-14 lg:p-16"
          : "p-8 sm:p-10 md:p-12"
      }`}>

        {/* Aurora gradient border-top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-accent to-primary opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Massive decorative quote mark with gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={isInView ? { opacity: 0.06, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -15 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: "easeOut" }}
          className={`absolute ${isFeatured ? "top-8 left-8 text-[10rem]" : "top-4 left-4 text-[8rem]"} leading-none font-serif pointer-events-none`}
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #00C9FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          "
        </motion.div>

        {/* Floating result badge with gold glow */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.8 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.6, type: "spring" }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="absolute -top-4 right-6 sm:-top-5 sm:right-8 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full shadow-glow-lg border-2 border-background-dark cursor-pointer hover-glow-gold"
        >
          <p className="text-xs sm:text-sm font-bold text-background-dark flex items-center gap-2">
            <span className="material-icons text-base sm:text-lg">trending_up</span>
            <span>{testimonial.result}</span>
          </p>
        </motion.div>

        {/* Star rating with gold glow */}
        <div className="flex items-center gap-1 mb-6 sm:mb-8 relative z-10">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0, rotate: -180 }
              }
              transition={{
                delay: 0.5 + index * 0.1 + i * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="material-icons text-2xl sm:text-3xl cursor-pointer"
              style={{
                color: "#D4AF37",
                filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))",
              }}
            >
              star
            </motion.span>
          ))}
        </div>

        {/* Testimonial content with elegant typography */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.7 }}
          className={`text-foreground ${
            isFeatured
              ? "text-xl sm:text-2xl md:text-3xl leading-[1.75]"
              : "text-lg sm:text-xl md:text-2xl leading-[1.7]"
          } mb-8 sm:mb-10 flex-1 relative z-10 font-light`}
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
        >
          {testimonial.content}
        </motion.p>

        {/* Author info with avatar ring animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7 + index * 0.1, duration: 0.7 }}
          className="flex items-center gap-4 sm:gap-5 relative z-10 pt-6 sm:pt-8 border-t border-white/10"
        >
          {/* Avatar with aurora ring */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            <div className={`${
              isFeatured ? "w-16 h-16 sm:w-20 sm:h-20" : "w-14 h-14 sm:w-16 sm:h-16"
            } rounded-2xl bg-gradient-to-br from-gold/30 via-accent/20 to-primary/30 flex items-center justify-center ${
              isFeatured ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
            } border-2 border-gold/40 flex-shrink-0 relative z-10 cursor-pointer`}>
              {testimonial.image}
            </div>

            {/* Animated aurora ring around avatar */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "conic-gradient(from 0deg, #D4AF37, #00C9FF, #8B5CF6, #D4AF37)",
                opacity: 0.3,
                filter: "blur(8px)",
                zIndex: 0,
              }}
            />
          </motion.div>

          {/* Name and company with premium typography */}
          <div className="min-w-0 flex-1">
            <p className={`text-foreground font-bold ${
              isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            } truncate mb-1`}>
              {testimonial.name}
            </p>
            <p className={`text-foreground-muted ${
              isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-base"
            } truncate`}>
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </motion.div>

        {/* Animated background gradient - only visible on featured */}
        {isFeatured && (
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-br from-gold/5 via-accent/5 to-primary/5 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Subtle corner accent with aurora gradient */}
        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tl from-gold/10 via-accent/5 to-transparent rounded-tr-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Floating effect indicator */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-t from-accent/10 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </motion.div>
  );
}
