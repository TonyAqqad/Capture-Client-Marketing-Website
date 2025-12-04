"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavSection } from "./navData";
import { navIcons } from "./navIcons";

interface MegaMenuDropdownProps {
  section: NavSection;
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function MegaMenuDropdown({
  section,
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute left-1/2 -translate-x-1/2 z-50 pt-2 w-[600px] max-w-[90vw]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
            {/* Glass morphism container */}
            <div className="relative bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A69E2]/5 via-transparent to-[#00C9FF]/5 pointer-events-none" />

              {/* Gold accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

              {/* Content Grid - 2 columns for better fit */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-1 p-4">
                {section.items.map((item) => {
                  const IconComponent = item.icon
                    ? navIcons[item.icon]
                    : null;

                  return (
                    <motion.div key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className="group relative flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                        onClick={onClose}
                      >
                        {/* Icon with gold accent on hover */}
                        {IconComponent && (
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                              <IconComponent className="w-4 h-4 text-[#00C9FF] group-hover:text-[#D4AF37] transition-colors duration-300" />
                            </div>
                          </div>
                        )}

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-accent text-sm font-semibold text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors duration-300">
                              {item.label}
                            </h3>
                            {/* Arrow indicator */}
                            <svg
                              className="w-3.5 h-3.5 text-[#F8FAFC]/40 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                          {item.description && (
                            <p className="mt-0.5 text-xs text-[#F8FAFC]/60 font-body line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Hover gradient underline */}
                        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-[#D4AF37] to-[#00C9FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF]/30 to-transparent" />
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
