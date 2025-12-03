"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Auto-rotate testimonials (disabled on mobile for performance)
  useEffect(() => {
    if (!isInView || isMobile) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isInView, isMobile]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
    }),
  };

  return (
    <section className="section bg-background relative overflow-hidden w-full max-w-full py-16 sm:py-20 lg:py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-premium opacity-30" />

      {/* Disable blur animations on mobile for performance */}
      {!isMobile && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] sm:max-w-[1000px] h-[500px] sm:h-[1000px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl"
        />
      )}

      <div ref={containerRef} className="container-custom relative z-10 px-6 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4 sm:mb-5">
              Client Success Stories
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 sm:mb-8 text-depth px-4 leading-[1.1] tracking-tight" style={{ hyphens: 'none' }}>
              Trusted by{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent whitespace-nowrap">
                Growing Businesses
              </span>
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-foreground-muted max-w-2xl mx-auto leading-[1.6] px-6">
              Real businesses. Real results. See how Capture Client helps companies like yours capture more leads and grow faster.
            </p>
          </motion.div>
        </div>

        {/* Main testimonial carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial card */}
          <div className="relative h-auto min-h-[580px] sm:min-h-[480px] md:min-h-[420px] mb-12 sm:mb-16">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.4 },
                }}
                className="absolute inset-0"
              >
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  isInView={isInView}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Previous button - touch-friendly on mobile */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 201, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass border-2 border-surface-border flex items-center justify-center text-foreground hover:border-accent transition-colors group touch-manipulation min-w-[56px] min-h-[56px]"
              aria-label="Previous testimonial"
            >
              <span className="material-icons text-xl sm:text-2xl group-hover:text-accent transition-colors">
                chevron_left
              </span>
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2 sm:gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className="relative p-2 touch-manipulation"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-accent scale-125 shadow-glow"
                        : "bg-surface-border hover:bg-accent/50"
                    }`}
                  />
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full border-2 border-accent animate-ping"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Next button - touch-friendly on mobile */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 201, 255, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass border-2 border-surface-border flex items-center justify-center text-foreground hover:border-accent transition-colors group touch-manipulation min-w-[56px] min-h-[56px]"
              aria-label="Next testimonial"
            >
              <span className="material-icons text-xl sm:text-2xl group-hover:text-accent transition-colors">
                chevron_right
              </span>
            </motion.button>
          </div>
        </div>

        {/* Platform capabilities - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-surface-border px-4 sm:px-6 lg:px-0"
        >
          <p className="text-center text-foreground-muted text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8">
            Platform Capabilities
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="text-foreground-muted font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-2">
              <span className="material-icons text-accent text-lg sm:text-xl">security</span>
              Enterprise-Grade Security
            </div>
            <div className="text-foreground-muted font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-2">
              <span className="material-icons text-accent text-lg sm:text-xl">support_agent</span>
              24/7 AI Support
            </div>
            <div className="text-foreground-muted font-semibold text-sm sm:text-base lg:text-lg flex items-center gap-2">
              <span className="material-icons text-accent text-lg sm:text-xl">cloud_done</span>
              Cloud-Based Platform
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isInView: boolean;
}

function TestimonialCard({ testimonial, isInView }: TestimonialCardProps) {
  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="relative glass p-8 sm:p-10 md:p-12 rounded-3xl shadow-glow-lg border-2 border-accent/20 h-full flex flex-col hover:border-accent/40 transition-colors duration-500">
        {/* Large quote mark - smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.08, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 text-6xl sm:text-9xl text-accent leading-none font-serif"
        >
          "
        </motion.div>

        {/* Result badge - responsive positioning and sizing */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-3 right-4 sm:-top-4 sm:right-8 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-accent to-primary rounded-full shadow-glow-lg border-2 border-background-dark"
        >
          <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2">
            <span className="material-icons text-base sm:text-lg">trending_up</span>
            <span className="hidden sm:inline">{testimonial.result}</span>
            <span className="sm:hidden">{testimonial.result.replace('+', '').split(' ')[0]}</span>
          </p>
        </motion.div>

        {/* Stars - responsive sizing */}
        <div className="flex items-center gap-0.5 sm:gap-1 mb-4 sm:mb-6 relative z-10 mt-2">
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
                delay: 0.4 + i * 0.08,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              className="material-icons text-accent text-lg sm:text-2xl"
            >
              star
            </motion.span>
          ))}
        </div>

        {/* Content - responsive font size and spacing */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-foreground text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 leading-[1.7] flex-1 relative z-10"
        >
          {testimonial.content}
        </motion.p>

        {/* Author - responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 relative z-10 pt-4 sm:pt-6 border-t border-surface-border"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-2xl sm:text-3xl border-2 border-accent/30 flex-shrink-0"
          >
            {testimonial.image}
          </motion.div>
          <div className="min-w-0">
            <p className="text-foreground font-bold text-base sm:text-lg truncate">{testimonial.name}</p>
            <p className="text-foreground-muted text-xs sm:text-sm truncate">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </motion.div>

        {/* Animated gradient background */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 rounded-2xl sm:rounded-3xl pointer-events-none"
        />

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-tr-2xl sm:rounded-tr-3xl opacity-50" />
      </div>
    </div>
  );
}
