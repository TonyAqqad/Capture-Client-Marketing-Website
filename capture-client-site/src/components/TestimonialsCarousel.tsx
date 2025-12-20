'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { useInView } from '@/hooks/useInView';
import { Testimonial } from '@/types/content';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';

interface CarouselTestimonialExtended extends Testimonial {
  id: number;
}

const testimonials: CarouselTestimonialExtended[] = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'HVAC Business Owner',
    quote:
      "Capture Client transformed our lead generation. We're capturing 3x more clients than before, and the AI handles everything while we focus on the work.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike T.',
    role: 'Plumbing Company',
    quote:
      "The AI voice agent handles calls better than our old receptionist. It never sleeps, never misses a call, and our customers love how responsive we've become.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Jennifer L.',
    role: 'Dental Practice',
    quote:
      "Finally, everything in one place. Our marketing ROI has never been better. The dashboard shows exactly where every dollar is going and what's working.",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView]);

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
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div ref={containerRef} className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-heading font-bold text-slate-900 text-center mb-12"
      >
        Trusted by Growing Businesses
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Main testimonial card */}
        <div className="relative h-[400px] md:h-[320px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
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

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg flex items-center justify-center text-slate-900 hover:border-accent transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-accent' : 'bg-surface-border'
                  }`}
                />
                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full border-2 border-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg flex items-center justify-center text-slate-900 hover:border-accent transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Side testimonials (preview) */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -50 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-64 scale-75 pointer-events-none"
          >
            <TestimonialCard
              testimonial={
                testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length]
              }
              isInView={false}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 50 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-64 scale-75 pointer-events-none"
          >
            <TestimonialCard
              testimonial={testimonials[(currentIndex + 1) % testimonials.length]}
              isInView={false}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: CarouselTestimonialExtended;
  isInView: boolean;
}

function TestimonialCard({ testimonial, isInView }: TestimonialCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-lg p-8 rounded-2xl h-full flex flex-col">
      {/* Quote mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-4 left-4 text-8xl text-accent leading-none"
      >
        "
      </motion.div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4 relative z-10">
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
              delay: 0.3 + i * 0.1,
              duration: 0.5,
              type: 'spring',
            }}
          >
            <Star className="w-5 h-5 text-accent fill-accent" />
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-slate-700 text-lg mb-6 leading-relaxed flex-1 relative z-10"
      >
        {testimonial.quote}
      </motion.p>

      {/* Author */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center gap-3 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <User className="w-6 h-6 text-primary" />
        </motion.div>
        <div>
          <p className="text-slate-900 font-semibold">{testimonial.name}</p>
          <p className="text-foreground-muted text-sm">{testimonial.role}</p>
        </div>
      </motion.div>

      {/* Parallax effect on scroll */}
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 rounded-2xl pointer-events-none"
      />
    </div>
  );
}
