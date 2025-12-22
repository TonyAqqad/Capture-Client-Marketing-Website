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
            y: -2,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          onClick={() => onCategoryChange(category)}
          className={`
            relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold
            transition-all duration-300 touch-manipulation
            ${
              activeCategory === category
                ? "text-white shadow-lg shadow-blue-600/20"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            }
          `}
          style={{
            background:
              activeCategory === category
                ? "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(6, 182, 212) 100%)"
                : "rgba(241, 245, 249, 0.7)",
            border:
              activeCategory === category
                ? "1px solid rgba(37, 99, 235, 0.4)"
                : "1px solid rgba(148, 163, 184, 0.3)",
          }}
        >
          {/* Active category indicator */}
          {activeCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(6, 182, 212) 100%)",
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
