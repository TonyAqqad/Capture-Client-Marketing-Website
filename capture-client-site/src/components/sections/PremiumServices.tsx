"use client";

import { useRef } from "react";
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
    borderColor: "border-accent/30"
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
      className="section bg-background relative overflow-hidden w-full max-w-full"
    >
      {/* Animated background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark opacity-50"
      />

      {/* Floating orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-0 w-full max-w-[400px] sm:max-w-[800px] h-[400px] sm:h-[800px] rounded-full bg-gradient-radial from-accent/10 to-transparent blur-3xl translate-x-1/4"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 left-0 w-full max-w-[450px] sm:max-w-[900px] h-[450px] sm:h-[900px] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-3xl -translate-x-1/4"
      />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent mb-3 sm:mb-4">
              The Integrated Solution
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 sm:mb-6 text-depth px-4">
              Everything You Need in{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                One Platform
              </span>
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed px-4">
              Stop juggling multiple tools. Capture Client brings AI, ads, CRM, and analytics
              together in one seamless growth engine.
            </p>
          </motion.div>
        </div>

        {/* Feature cards grid - Single column on mobile, responsive grid on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16 px-4"
        >
          <p className="text-sm sm:text-base text-foreground-muted mb-4 sm:mb-6">
            Ready to see how it all works together?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent via-primary to-accent text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-glow-lg hover:shadow-glow border-2 border-transparent hover:border-accent/30 transition-all duration-300 w-full sm:w-auto"
          >
            Book Your Free Demo
            <span className="material-icons">arrow_forward</span>
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
}

function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
      />

      {/* Card content */}
      <div
        className={`relative h-full bg-surface/50 backdrop-blur-lg border-2 ${service.borderColor} rounded-2xl p-6 sm:p-8 transition-all duration-500 group-hover:border-opacity-100 group-hover:shadow-glow`}
      >
        {/* Icon container */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${service.gradient} border ${service.borderColor} mb-5 sm:mb-6 shadow-lg group-hover:shadow-glow transition-all duration-300`}
        >
          <span className={`material-icons ${service.id === "voice-ai" || service.id === "crm" ? "text-accent" : "text-primary"} text-2xl sm:text-3xl`}>
            {service.icon}
          </span>
        </motion.div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mb-2 sm:mb-3 group-hover:text-gradient transition-all duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-foreground-muted leading-relaxed mb-5 sm:mb-6">
          {service.description}
        </p>

        {/* Benefits list */}
        <ul className="space-y-2.5 sm:space-y-2">
          {service.benefits.map((benefit, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -10 }
              }
              transition={{
                duration: 0.4,
                delay: index * 0.1 + idx * 0.05 + 0.3,
              }}
              className="flex items-center gap-2.5 sm:gap-2 text-sm text-foreground-subtle group-hover:text-foreground transition-colors duration-300"
            >
              <span className={`material-icons text-base sm:text-sm flex-shrink-0 ${service.id === "voice-ai" || service.id === "crm" ? "text-accent" : "text-primary"}`}>
                check_circle
              </span>
              <span className="leading-tight">{benefit}</span>
            </motion.li>
          ))}
        </ul>

        {/* Hover glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none"
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
