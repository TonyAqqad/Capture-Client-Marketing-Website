"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";

interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  borderColor: string;
  spanCols?: number; // For bento grid spanning
  spanRows?: number;
  featured?: boolean;
}

const services: Service[] = [
  {
    id: "voice-ai",
    title: "Voice AI Agents",
    description: "AI-powered voice agents handle calls 24/7, qualify leads, book appointments, and answer questions—so you never miss an opportunity.",
    benefits: [
      "24/7 availability",
      "Natural conversations",
      "Automatic lead qualification",
      "Instant appointment booking"
    ],
    gradient: "from-[#00C9FF]/20 via-[#00C9FF]/10 to-transparent",
    borderColor: "border-[#00C9FF]/30",
    spanCols: 2, // Spans 2 columns (HERO card)
    spanRows: 1,
    featured: true
  },
  {
    id: "google-ads",
    title: "Google Ads",
    description: "Precision-targeted search campaigns that capture high-intent buyers actively searching for your services right now.",
    benefits: [
      "Search intent targeting",
      "Conversion tracking",
      "Keyword optimization",
      "ROI maximization"
    ],
    gradient: "from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent",
    borderColor: "border-[#D4AF37]/30",
    spanCols: 1,
    spanRows: 1
  },
  {
    id: "facebook-ads",
    title: "Facebook Ads",
    description: "Laser-focused social campaigns that reach your ideal customers based on demographics, interests, and behaviors.",
    benefits: [
      "Audience targeting",
      "Creative testing",
      "Retargeting campaigns",
      "Brand awareness"
    ],
    gradient: "from-[#00C9FF]/20 via-[#00C9FF]/10 to-transparent",
    borderColor: "border-[#00C9FF]/30",
    spanCols: 1,
    spanRows: 1
  },
  {
    id: "lead-gen",
    title: "Complete Lead Generation System",
    description: "Unified CRM, analytics dashboard, and marketing automation—track every lead from first contact to closed deal in one seamless platform.",
    benefits: [
      "Unified inbox & CRM",
      "Real-time analytics",
      "Pipeline management",
      "Performance tracking"
    ],
    gradient: "from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent",
    borderColor: "border-[#D4AF37]/30",
    spanCols: 2, // Full-width horizontal card
    spanRows: 1
  }
];

// Custom SVG Icon Components (replacing Material icons)
function VoiceAIIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Microphone silhouette */}
      <path
        d="M60 30C55 30 51 34 51 39V60C51 65 55 69 60 69C65 69 69 65 69 60V39C69 34 65 30 60 30Z"
        fill="url(#voiceGradient)"
        opacity="0.9"
      />
      <path
        d="M45 57C45 57 45 60 45 63C45 73.5 52.5 82 62 83V90H54V96H66V96H66H78V90H70V83C79.5 82 87 73.5 87 63C87 60 87 57 87 57"
        stroke="url(#voiceGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Animated waveform */}
      <motion.path
        d="M30 60 Q35 50 40 60 T50 60"
        stroke="#00C9FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M70 60 Q75 50 80 60 T90 60"
        stroke="#D4AF37"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M25 60 Q27 55 30 60"
        stroke="#00C9FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <defs>
        <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GoogleAdsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bar chart with upward trend */}
      <motion.rect
        x="25" y="70" width="12" height="20"
        fill="url(#googleGradient1)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 20, y: 70 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.rect
        x="42" y="60" width="12" height="30"
        fill="url(#googleGradient2)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 30, y: 60 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.rect
        x="59" y="45" width="12" height="45"
        fill="url(#googleGradient3)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 45, y: 45 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.rect
        x="76" y="30" width="12" height="60"
        fill="url(#googleGradient4)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 60, y: 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />

      {/* Upward trend line */}
      <motion.path
        d="M31 85 L48 75 L65 60 L82 40"
        stroke="#D4AF37"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />

      {/* Arrow tip */}
      <motion.path
        d="M82 40 L78 46 L86 44 Z"
        fill="#D4AF37"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
      />

      <defs>
        <linearGradient id="googleGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="googleGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="googleGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="googleGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FacebookAdsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Target/crosshair center */}
      <circle cx="60" cy="60" r="8" fill="#00C9FF" />

      {/* Concentric rings */}
      <motion.circle
        cx="60" cy="60" r="20"
        stroke="#00C9FF"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.circle
        cx="60" cy="60" r="32"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.circle
        cx="60" cy="60" r="44"
        stroke="#00C9FF"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />

      {/* Crosshair lines */}
      <line x1="60" y1="10" x2="60" y2="50" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      <line x1="60" y1="70" x2="60" y2="110" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      <line x1="10" y1="60" x2="50" y2="60" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />
      <line x1="70" y1="60" x2="110" y2="60" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />

      {/* Audience dots (animated) */}
      <motion.circle
        cx="40" cy="40" r="3"
        fill="#00C9FF"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="80" cy="40" r="3"
        fill="#00C9FF"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx="40" cy="80" r="3"
        fill="#D4AF37"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
      <motion.circle
        cx="80" cy="80" r="3"
        fill="#D4AF37"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.4 }}
      />
    </svg>
  );
}

function LeadGenIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Funnel shape */}
      <path
        d="M30 25 L90 25 L75 55 L45 55 Z"
        fill="url(#funnelGradient1)"
        opacity="0.8"
      />
      <path
        d="M45 55 L75 55 L68 75 L52 75 Z"
        fill="url(#funnelGradient2)"
        opacity="0.9"
      />
      <path
        d="M52 75 L68 75 L64 95 L56 95 Z"
        fill="url(#funnelGradient3)"
      />

      {/* Flowing particles */}
      <motion.circle
        cx="60" cy="30" r="2.5"
        fill="#00C9FF"
        initial={{ cy: 30, opacity: 1 }}
        animate={{ cy: 95, opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeIn", delay: 0 }}
      />
      <motion.circle
        cx="50" cy="30" r="2.5"
        fill="#D4AF37"
        initial={{ cy: 30, opacity: 1 }}
        animate={{ cy: 95, opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeIn", delay: 0.3 }}
      />
      <motion.circle
        cx="70" cy="30" r="2.5"
        fill="#00C9FF"
        initial={{ cy: 30, opacity: 1 }}
        animate={{ cy: 95, opacity: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeIn", delay: 0.6 }}
      />
      <motion.circle
        cx="55" cy="30" r="2"
        fill="#D4AF37"
        initial={{ cy: 30, opacity: 1 }}
        animate={{ cy: 95, opacity: 0 }}
        transition={{ duration: 2.1, repeat: Infinity, ease: "easeIn", delay: 0.9 }}
      />
      <motion.circle
        cx="65" cy="30" r="2"
        fill="#00C9FF"
        initial={{ cy: 30, opacity: 1 }}
        animate={{ cy: 95, opacity: 0 }}
        transition={{ duration: 2.3, repeat: Infinity, ease: "easeIn", delay: 1.2 }}
      />

      <defs>
        <linearGradient id="funnelGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="funnelGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="funnelGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Map service IDs to custom icon components
const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  "voice-ai": VoiceAIIcon,
  "google-ads": GoogleAdsIcon,
  "facebook-ads": FacebookAdsIcon,
  "lead-gen": LeadGenIcon,
};

export function PremiumServices() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
    };
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

        {/* ASYMMETRIC BENTO GRID */}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
  const [isHovered, setIsHovered] = useState(false);

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

  // Bento grid classes based on spanning
  const gridClasses = `
    ${service.spanCols === 2 ? 'md:col-span-2' : 'md:col-span-1'}
    ${service.spanRows === 2 ? 'md:row-span-2' : ''}
  `.trim();

  // Get the icon component for this service
  const IconComponent = iconComponents[service.id] || VoiceAIIcon;

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setMousePosition({ x: 0.5, y: 0.5 });
        setIsHovered(false);
      }}
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
        {/* STAGGERED HOVER EFFECTS */}

        {/* 1. Aurora gradient border (delay: 0ms) */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0 }}
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} blur-2xl`}
        />

        {/* 2. Gradient shift (delay: 100ms) */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute inset-0 bg-gradient-to-tr from-[#00C9FF]/10 via-transparent to-[#D4AF37]/10"
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

        {/* PREMIUM NUMBER BADGE - Top-right corner, integrated */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="absolute top-6 right-6 w-12 h-12 rounded-full glass-3d flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(0, 201, 255, 0.15) 0%, rgba(212, 175, 55, 0.1) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span
            className="text-2xl font-hero font-black bg-gradient-to-br from-[#00C9FF] to-[#D4AF37] bg-clip-text text-transparent"
          >
            {index + 1}
          </span>
        </motion.div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* CUSTOM SVG ICON with 3D float effect */}
          <motion.div
            animate={!isMobile && isHovered ? {
              rotate: [0, -5, 5, -5, 0],
              scale: 1.1,
              z: 50,
            } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`w-20 h-20 sm:w-28 sm:h-28 mb-6 sm:mb-8 relative ${
              service.featured ? 'card-float' : ''
            }`}
          >
            <div
              className="w-full h-full rounded-2xl p-4 relative"
              style={{
                background: `linear-gradient(135deg, rgba(0, 201, 255, 0.15) 0%, rgba(212, 175, 55, 0.15) 100%)`,
                boxShadow: service.featured
                  ? '0 0 40px rgba(0, 201, 255, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)'
                  : '0 10px 30px rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <IconComponent className="w-full h-full" />

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
            </div>
          </motion.div>

          {/* 3. Title with gradient effect (delay: 150ms) */}
          <motion.h3
            animate={{
              backgroundPosition: isHovered ? '100% 0' : '0% 0',
            }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`${service.featured ? 'text-display-md' : 'text-display-sm'} font-hero text-foreground mb-4 sm:mb-5 leading-tight`}
            style={{
              backgroundImage: isHovered
                ? 'linear-gradient(90deg, #00C9FF 0%, #D4AF37 50%, #00C9FF 100%)'
                : 'none',
              backgroundClip: isHovered ? 'text' : 'border-box',
              WebkitBackgroundClip: isHovered ? 'text' : 'border-box',
              WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
              backgroundSize: '200% 100%',
            }}
          >
            {service.title}
          </motion.h3>

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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke={service.id === 'voice-ai' || service.id === 'facebook-ads' ? '#00C9FF' : '#D4AF37'}
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  <path
                    d="M6 10L9 13L14 7"
                    stroke={service.id === 'voice-ai' || service.id === 'facebook-ads' ? '#00C9FF' : '#D4AF37'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="leading-[1.5] font-medium">{benefit}</span>
              </motion.li>
            ))}
          </ul>

          {/* 4. Shimmer effect (delay: 200ms) */}
          <motion.div
            animate={{
              x: isHovered ? ["0%", "200%"] : "0%",
              opacity: isHovered ? [0, 1, 0] : 0,
            }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />
        </div>

        {/* Corner accent - premium touch */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"
          style={{
            background: `radial-gradient(circle at top right, ${service.featured ? 'rgba(0, 201, 255, 0.15)' : 'rgba(212, 175, 55, 0.15)'} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
