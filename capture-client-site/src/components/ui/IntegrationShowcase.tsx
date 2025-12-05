"use client";

import { motion } from "@/lib/motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface Integration {
  name: string;
  logo?: string;      // Backward compatibility
  logoUrl?: string;   // Canonical field
  description?: string;
  category?: string;
}

interface IntegrationShowcaseProps {
  integrations: Integration[];
  variant?: "scroll" | "grid" | "carousel";
  autoScroll?: boolean;
  scrollSpeed?: number;
  columns?: 3 | 4 | 5 | 6;
  className?: string;
}

/**
 * Premium integration logos showcase
 * Horizontal scrolling with hover-to-pause and glow effects
 */
export function IntegrationShowcase({
  integrations,
  variant = "scroll",
  autoScroll = true,
  scrollSpeed = 30,
  columns = 6,
  className = ""
}: IntegrationShowcaseProps) {
  const [isPaused, setIsPaused] = useState(false);

  const gridColumns = {
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-3 md:grid-cols-5",
    6: "grid-cols-3 md:grid-cols-6"
  };

  if (variant === "grid") {
    return (
      <div className={cn("grid gap-4", gridColumns[columns], className)}>
        {integrations.map((integration, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="group relative flex items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-primary/10 transition-all duration-300 pointer-events-none" />

            <div className="relative z-10">
              <Image
                src={integration.logoUrl || integration.logo || ""}
                alt={integration.name}
                width={120}
                height={40}
                className="w-auto h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Horizontal scrolling variant
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background-dark to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="relative flex gap-8 py-8">
        {/* First set of logos */}
        <motion.div
          className="flex gap-8 flex-shrink-0"
          animate={{
            x: autoScroll && !isPaused ? [0, -100 * integrations.length] : 0
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: scrollSpeed,
              ease: "linear"
            }
          }}
        >
          {integrations.map((integration, index) => (
            <IntegrationLogo key={`first-${index}`} integration={integration} />
          ))}
        </motion.div>

        {/* Duplicate set for seamless loop */}
        <motion.div
          className="flex gap-8 flex-shrink-0"
          animate={{
            x: autoScroll && !isPaused ? [0, -100 * integrations.length] : 0
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: scrollSpeed,
              ease: "linear"
            }
          }}
        >
          {integrations.map((integration, index) => (
            <IntegrationLogo key={`second-${index}`} integration={integration} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function IntegrationLogo({ integration }: { integration: Integration }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4 }}
      className="group relative flex items-center justify-center w-32 h-16 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 shadow-glow transition-opacity duration-300 pointer-events-none" />

      <Image
        src={integration.logoUrl || integration.logo || ""}
        alt={integration.name}
        width={96}
        height={32}
        className="w-auto h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
      />
    </motion.div>
  );
}
