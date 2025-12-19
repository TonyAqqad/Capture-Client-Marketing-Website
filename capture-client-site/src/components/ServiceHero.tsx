"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import { Zap, Phone, CheckCircle, Target, TrendingUp, Users, ArrowRight } from "lucide-react";

interface ServiceHeroProps {
  service: {
    service_name: string;
    service_slug: string;
  };
  hero: {
    headline?: string;
    subheadline?: string;
    cta_primary?: {
      text: string;
      action: string;
      type?: string;
    };
    cta_secondary?: {
      text: string;
      action: string;
      type?: string;
    };
    hero_image?: {
      url: string;
      alt: string;
    };
  };
  stats?: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
}

// Service-specific color schemes and icons - Linear/Stripe aesthetic
const serviceThemes = {
  "voice-ai": {
    gradient: "from-[#00C9FF] via-[#4A69E2] to-[#00C9FF]",
    accentColor: "bg-[#00C9FF]",
    iconColor: "text-[#00C9FF]",
    icon: Zap,
    floatingIcons: [
      { icon: Phone, delay: 0, position: "top-20 right-20" },
      { icon: Zap, delay: 0.2, position: "top-40 left-20" },
      { icon: CheckCircle, delay: 0.4, position: "bottom-32 right-32" },
    ],
  },
  "google-ads": {
    gradient: "from-[#4A69E2] via-[#00C9FF] to-[#4A69E2]",
    accentColor: "bg-[#4A69E2]",
    iconColor: "text-[#00C9FF]",
    icon: Target,
    floatingIcons: [
      { icon: Target, delay: 0, position: "top-24 right-24" },
      { icon: TrendingUp, delay: 0.2, position: "top-48 left-16" },
      { icon: CheckCircle, delay: 0.4, position: "bottom-40 right-40" },
    ],
  },
  "facebook-ads": {
    gradient: "from-[#00C9FF] via-[#4A69E2] to-[#00C9FF]",
    accentColor: "bg-[#00C9FF]",
    iconColor: "text-[#00C9FF]",
    icon: Users,
    floatingIcons: [
      { icon: Users, delay: 0, position: "top-16 right-28" },
      { icon: Target, delay: 0.2, position: "top-52 left-24" },
      { icon: TrendingUp, delay: 0.4, position: "bottom-28 right-36" },
    ],
  },
  "lead-generation": {
    gradient: "from-[#4A69E2] via-[#00C9FF] to-[#4A69E2]",
    accentColor: "bg-[#00C9FF]",
    iconColor: "text-[#00C9FF]",
    icon: TrendingUp,
    floatingIcons: [
      { icon: TrendingUp, delay: 0, position: "top-20 right-20" },
      { icon: Users, delay: 0.2, position: "top-44 left-20" },
      { icon: CheckCircle, delay: 0.4, position: "bottom-36 right-28" },
    ],
  },
};

const defaultTheme = {
  gradient: "from-white via-slate-50 to-white",
  accentColor: "bg-[#00C9FF]",
  iconColor: "text-[#00C9FF]",
  icon: CheckCircle,
  floatingIcons: [] as { icon: typeof CheckCircle; delay: number; position: string }[],
};

export default function ServiceHero({ service, hero, stats }: ServiceHeroProps) {
  const theme = serviceThemes[service.service_slug as keyof typeof serviceThemes] || defaultTheme;
  const MainIcon = theme.icon;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-20 bg-gradient-to-b from-white to-slate-50">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-mesh-premium opacity-40" />

      {/* Animated Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20`}>
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(0,201,255,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(74,105,226,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(0,201,255,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(0,201,255,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Hero Image with Overlay - FIXED: Added sizes prop */}
      {hero.hero_image && (
        <div className="absolute inset-0">
          <Image
            src={hero.hero_image.url}
            alt={hero.hero_image.alt}
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            priority
          />
        </div>
      )}

      {/* Floating Icons - Hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {theme.floatingIcons.map(({ icon: FloatingIcon, delay, position }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          >
            <motion.div variants={floatingVariants} animate="float">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl flex items-center justify-center text-2xl md:text-3xl">
                <FloatingIcon className={`w-6 h-6 md:w-8 md:h-8 ${theme.iconColor}`} />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10 py-20 md:py-0">
        <motion.div
          className="max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Icon - Responsive sizing */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <motion.div
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xl text-3xl sm:text-4xl md:text-5xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MainIcon className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ${theme.iconColor}`} />
            </motion.div>
          </motion.div>

          {/* Headline - Mobile-optimized sizing */}
          {hero.headline && (
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-slate-900 mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 800 }}
            >
              {hero.headline.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-2 sm:mr-3 md:mr-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          )}

          {/* Subheadline - Mobile-optimized sizing */}
          {hero.subheadline && (
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-6 sm:mb-8 md:mb-10 max-w-3xl leading-relaxed"
              style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 200 }}
            >
              {hero.subheadline}
            </motion.p>
          )}

          {/* CTAs - Full-width on mobile */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
            {hero.cta_primary && (
              <motion.a
                href={hero.cta_primary.action}
                className={`group relative w-full sm:w-auto px-6 sm:px-8 py-4 min-h-[48px] ${theme.accentColor} text-black rounded-full overflow-hidden shadow-2xl flex items-center justify-center`}
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 600 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.2 }}
                />
                <span className="relative flex items-center gap-2">
                  {hero.cta_primary.type === "phone" && <Phone className="w-5 h-5" />}
                  {hero.cta_primary.text}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            )}

            {hero.cta_secondary && (
              <motion.a
                href={hero.cta_secondary.action}
                className="w-full sm:w-auto px-6 sm:px-8 py-4 min-h-[48px] border border-slate-200 bg-white/70 backdrop-blur-xl text-slate-700 rounded-full hover:bg-white/[0.95] transition-all flex items-center justify-center"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 500 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {hero.cta_secondary.text}
              </motion.a>
            )}
          </motion.div>

          {/* Stats - Stack on mobile */}
          {stats && stats.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/10 to-[#4A69E2]/10 rounded-xl sm:rounded-2xl opacity-50"
                    variants={pulseVariants}
                    animate="pulse"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                  <div className="relative p-4 sm:p-6 border border-slate-200 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl group-hover:border-slate-300 transition-all">
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-1"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 700 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 1, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div
                      className="text-sm sm:text-base text-slate-600"
                      style={{ fontFamily: 'var(--font-bricolage-grotesque)', fontWeight: 300 }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-slate-600 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
