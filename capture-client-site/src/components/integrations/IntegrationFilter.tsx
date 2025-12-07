"use client";

import { motion } from "@/lib/motion";

interface IntegrationFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function IntegrationFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: IntegrationFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.05,
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          onClick={() => onCategoryChange(category)}
          className={`
            relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold
            transition-all duration-300 touch-manipulation
            ${
              activeCategory === category
                ? "text-background-dark shadow-glow-gold-lg"
                : "text-foreground-muted hover:text-foreground hover:bg-white/10 hover:shadow-glow"
            }
          `}
          style={{
            background:
              activeCategory === category
                ? "linear-gradient(135deg, #D4AF37 0%, #E7C96F 50%, #D4AF37 100%)"
                : "rgba(255, 255, 255, 0.05)",
            border:
              activeCategory === category
                ? "1px solid rgba(212, 175, 55, 0.4)"
                : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Active category indicator */}
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #E7C96F 50%, #D4AF37 100%)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
}
