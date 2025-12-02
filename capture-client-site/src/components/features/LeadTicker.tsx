"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Lead {
  id: string;
  city: string;
  service: string;
  timeAgo: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CITIES = [
  "Knoxville",
  "Nashville",
  "Chattanooga",
  "Memphis",
  "Franklin",
  "Murfreesboro",
  "Johnson City",
  "Clarksville",
];

const SERVICES = [
  "Voice AI Demo",
  "Google Ads Campaign",
  "Facebook Ads Setup",
  "Lead Generation",
  "Local SEO Package",
  "Full Growth Package",
  "CRM Integration",
  "Marketing Consultation",
];

const TIME_RANGES = [
  "Just now",
  "2 minutes ago",
  "5 minutes ago",
  "8 minutes ago",
  "12 minutes ago",
  "15 minutes ago",
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateRandomLead(): Lead {
  return {
    id: Math.random().toString(36).substring(7),
    city: CITIES[Math.floor(Math.random() * CITIES.length)],
    service: SERVICES[Math.floor(Math.random() * SERVICES.length)],
    timeAgo: TIME_RANGES[Math.floor(Math.random() * TIME_RANGES.length)],
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LeadTicker() {
  const [isClient, setIsClient] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Initialize leads on client-side only to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setLeads([generateRandomLead(), generateRandomLead(), generateRandomLead()]);
  }, []);

  // Add new lead every 8-15 seconds
  useEffect(() => {
    if (!isClient) return;

    const addLead = () => {
      const newLead = generateRandomLead();
      setLeads((prev) => [newLead, ...prev.slice(0, 4)]); // Keep max 5 leads
    };

    const interval = setInterval(addLead, 8000 + Math.random() * 7000);
    return () => clearInterval(interval);
  }, [isClient]);

  return (
    <section className="section bg-background-dark relative overflow-hidden">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-accent"
            />
            <span className="text-accent text-sm font-semibold">Live Activity</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Real Businesses. Real Results.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Join hundreds of businesses capturing more leads with Capture Client
          </motion.p>
        </div>

        {/* Lead ticker */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {leads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: -30, scale: 0.92, rotateX: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                exit={{
                  opacity: 0,
                  x: 100,
                  scale: 0.9,
                  transition: { duration: 0.3 }
                }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="card p-5 flex items-center gap-4 group hover:bg-accent/5 transition-colors duration-300 cursor-pointer"
              >
                {/* Pulse indicator */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 rounded-full bg-accent blur-sm"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2
                    }}
                    className="relative w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center"
                  >
                    <span className="material-icons text-accent text-lg">person_add</span>
                  </motion.div>
                </div>

                {/* Lead info */}
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-semibold truncate">
                    New lead from <span className="text-accent">{lead.city}</span>
                  </p>
                  <p className="text-foreground-muted text-sm truncate">{lead.service}</p>
                </div>

                {/* Time */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-foreground-muted text-xs font-mono">{lead.timeAgo}</p>
                </div>

                {/* Checkmark icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                  <span className="material-icons text-accent text-sm">check</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-accent mb-2">2,847</p>
            <p className="text-foreground-muted text-sm">Leads Captured This Month</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-foreground-muted text-sm">Active Businesses</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-accent mb-2">94%</p>
            <p className="text-foreground-muted text-sm">Client Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
