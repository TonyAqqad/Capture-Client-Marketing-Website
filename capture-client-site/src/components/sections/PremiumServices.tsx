"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  borderColor: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    id: "voice-ai",
    icon: "support_agent",
    title: "Voice AI Agents",
    description: "AI-powered voice agents handle calls 24/7, qualify leads, book appointments, and answer questions—so you never miss an opportunity.",
    benefits: [
      "24/7 availability",
      "Natural conversations",
      "Automatic lead qualification",
      "Instant appointment booking"
    ],
    gradient: "from-accent/20 via-accent/10 to-transparent",
    borderColor: "border-accent/30",
    featured: true // Hero card
  },
  {
    id: "lead-generation",
    icon: "trending_up",
    title: "Lead Generation",
    description: "Professionally managed Google and Facebook Ads campaigns designed to drive high-quality leads directly to your business.",
    benefits: [
      "Expert ad management",
      "High-quality targeting",
      "ROI-focused campaigns",
      "Real-time optimization"
    ],
    gradient: "from-primary/20 via-primary/10 to-transparent",
    borderColor: "border-primary/30"
  },
  {
    id: "crm",
    icon: "contacts",
    title: "Built-in CRM",
    description: "Manage all client interactions, track conversations, and organize your pipeline in one unified inbox—no more scattered tools.",
    benefits: [
      "Unified inbox",
      "Automatic lead tracking",
      "Pipeline management",
      "Conversation history"
    ],
    gradient: "from-accent/20 via-accent/10 to-transparent",
    borderColor: "border-accent/30"
  },
  {
    id: "dashboard",
    icon: "insights",
    title: "Marketing Dashboard",
    description: "Real-time analytics and reporting give you complete visibility into campaign performance, ROI, and growth metrics.",
    benefits: [
      "Real-time analytics",
      "ROI tracking",
      "Custom reports",
      "Growth insights"
    ],
    gradient: "from-primary/20 via-primary/10 to-transparent",
    borderColor: "border-primary/30"
  }
];

export function PremiumServices() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="section bg-background relative overflow-hidden w-full max-w-full py-16 sm:py-20 lg:py-32"
    >
      {/* Animated aurora background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-aurora-animated opacity-40"
      />

      {/* Floating geometric shapes - DISABLED ON MOBILE */}
      {!isMobile && (
        <>
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 right-10 w-32 h-32 border-2 border-aurora-1/20 rounded-2xl"
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            animate={{
              rotate: [0, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-40 left-20 w-24 h-24 border-2 border-aurora-3/20 rounded-full"
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-aurora-2/20 to-aurora-4/10 rounded-lg rotate-45"
          />
        </>
      )}

      <div className="container-custom relative z-10 px-6 sm:px-6 lg:px-8">
        {/* Section header with extreme typography */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] mb-4 sm:mb-5">
              <span className="text-gradient-gold-cyan">The Integrated Solution</span>
            </h2>
            <h3 className="text-display-xl font-hero mb-6 sm:mb-8 text-foreground text-depth leading-[0.95]">
              Everything You Need in{" "}
              <span className="text-gradient-gold-cyan whitespace-nowrap">
                One Platform
              </span>
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-light-contrast text-foreground-muted max-w-3xl mx-auto leading-[1.6]">
              Stop juggling multiple tools. Capture Client brings AI, ads, CRM, and analytics
              together in one seamless growth engine.
            </p>
          </motion.div>
        </div>

        {/* BENTO GRID: Asymmetric 2x2 layout with featured card spanning 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 sm:mt-20 px-4"
        >
          <p className="text-sm sm:text-base text-foreground-muted mb-6 sm:mb-8 font-light tracking-wide">
            Ready to see how it all works together?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-3 btn-gold text-lg px-10 sm:px-12 py-5 sm:py-6 rounded-2xl shadow-glow-lg hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all duration-300 w-full sm:w-auto font-bold"
          >
            Book Your Free Demo
            <span className="material-icons text-2xl">arrow_forward</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
  isInView: boolean;
  isMobile: boolean;
}

function ServiceCard({ service, index, isInView, isMobile }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  // Calculate 3D tilt based on mouse position
  const tiltX = isMobile ? 0 : (mousePosition.y - 0.5) * -10;
  const tiltY = isMobile ? 0 : (mousePosition.x - 0.5) * 10;

  // Featured card (Voice AI) spans 2 rows on desktop
  const gridClasses = service.featured
    ? "md:row-span-2"
    : "";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
      className={`group relative ${gridClasses}`}
      style={{
        perspective: 1000,
      }}
    >
      {/* 3D Glass Card with hover tilt */}
      <motion.div
        animate={!isMobile ? {
          rotateX: tiltX,
          rotateY: tiltY,
        } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{
          y: -8,
          transition: { duration: 0.3 }
        }}
        className="glass-3d h-full p-8 lg:p-10 flex flex-col relative overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Aurora gradient border animation */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.gradient} blur-2xl`}
        />

        {/* Animated aurora glow for featured card */}
        {service.featured && (
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -inset-4 bg-gradient-to-br from-aurora-1/20 via-aurora-2/10 to-aurora-4/20 rounded-3xl blur-3xl"
          />
        )}

        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon container with 3D float effect */}
          <motion.div
            whileHover={isMobile ? {} : {
              rotate: [0, -5, 5, -5, 0],
              scale: 1.1,
              z: 50,
            }}
            transition={{ duration: 0.6 }}
            className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl mb-6 sm:mb-8 relative ${
              service.featured ? 'card-float' : ''
            }`}
            style={{
              background: `linear-gradient(135deg, var(--aurora-${service.id === 'voice-ai' ? '1' : service.id === 'lead-generation' ? '2' : service.id === 'crm' ? '3' : '4'}) 0%, var(--aurora-${service.id === 'voice-ai' ? '2' : service.id === 'lead-generation' ? '3' : service.id === 'crm' ? '4' : '1'}) 100%)`,
              boxShadow: service.featured
                ? '0 0 40px rgba(0, 201, 255, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)'
                : '0 10px 30px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className="material-icons text-white text-4xl sm:text-5xl">
              {service.icon}
            </span>

            {/* Rotating ring for featured card */}
            {service.featured && !isMobile && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                style={{
                  borderTopColor: 'rgba(212, 175, 55, 0.5)',
                  borderRightColor: 'rgba(0, 201, 255, 0.3)',
                }}
              />
            )}
          </motion.div>

          {/* Title with extreme weight contrast */}
          <h3 className={`${service.featured ? 'text-display-md' : 'text-display-sm'} font-hero text-foreground mb-4 sm:mb-5 group-hover:text-gradient-gold-cyan transition-all duration-300 leading-tight`}>
            {service.title}
          </h3>

          {/* Description with light contrast */}
          <p className={`${service.featured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'} text-light-contrast text-foreground-muted leading-[1.6] mb-6 sm:mb-8 flex-grow`}>
            {service.description}
          </p>

          {/* Benefits list with stagger animation */}
          <ul className="space-y-3 sm:space-y-4">
            {service.benefits.map((benefit, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -20 }
                }
                transition={{
                  duration: isMobile ? 0 : 0.5,
                  delay: isMobile ? 0 : index * 0.15 + idx * 0.08 + 0.3,
                }}
                className="flex items-center gap-3 text-base sm:text-lg text-foreground-subtle group-hover:text-foreground transition-colors duration-300"
              >
                <span
                  className="material-icons text-xl flex-shrink-0"
                  style={{
                    color: service.id === 'voice-ai' || service.id === 'crm'
                      ? 'var(--aurora-1)'
                      : 'var(--aurora-2)',
                  }}
                >
                  check_circle
                </span>
                <span className="leading-[1.5] font-medium">{benefit}</span>
              </motion.li>
            ))}
          </ul>

          {/* Shimmer effect on hover */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ x: "200%", opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />
        </div>

        {/* Corner accent - premium touch */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"
          style={{
            background: `radial-gradient(circle at top right, var(--aurora-${service.featured ? '4' : '2'}) 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
