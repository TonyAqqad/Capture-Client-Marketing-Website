"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  overline?: string;
  heading: string | ReactNode;
  subtitle?: string | ReactNode;
  alignment?: "left" | "center" | "right";
  showDecorator?: boolean;
  decoratorColor?: "gold" | "cyan" | "primary";
  className?: string;
  animate?: boolean;
}

/**
 * Consistent premium section header component
 * Anti-AI-slop design with distinctive typography and intentional spacing
 */
export function SectionHeader({
  overline,
  heading,
  subtitle,
  alignment = "center",
  showDecorator = true,
  decoratorColor = "gold",
  className = "",
  animate = true
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  const decoratorColors = {
    gold: "bg-gradient-to-r from-transparent via-gold/60 to-transparent",
    cyan: "bg-gradient-to-r from-transparent via-accent/60 to-transparent",
    primary: "bg-gradient-to-r from-transparent via-primary/60 to-transparent"
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  const Container = animate ? motion.div : "div";
  const Item = animate ? motion.div : "div";

  return (
    <Container
      className={cn("flex flex-col gap-4 max-w-4xl mx-auto mb-12 md:mb-16", alignmentClasses[alignment], className)}
      {...(animate && {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
        variants: containerVariants
      })}
    >
      {/* Overline text */}
      {overline && (
        <Item
          {...(animate && { variants: itemVariants })}
          className="inline-flex items-center gap-2"
        >
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20">
            {overline}
          </span>
        </Item>
      )}

      {/* Main heading */}
      <Item
        {...(animate && { variants: itemVariants })}
        className="space-y-2"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          {heading}
        </h2>

        {/* Decorative line */}
        {showDecorator && (
          <div className={cn("h-1 w-20 rounded-full", decoratorColors[decoratorColor])} />
        )}
      </Item>

      {/* Subtitle */}
      {subtitle && (
        <Item
          {...(animate && { variants: itemVariants })}
          className="text-base md:text-lg text-foreground-muted leading-relaxed max-w-2xl"
        >
          {typeof subtitle === "string" ? <p>{subtitle}</p> : subtitle}
        </Item>
      )}
    </Container>
  );
}
