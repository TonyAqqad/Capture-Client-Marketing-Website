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
}

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
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
}: MegaMenuDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for closing on outside click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dropdown Panel */}
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute left-0 right-0 z-50 mt-2"
            onMouseLeave={onClose}
          >
            {/* Glass morphism container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A69E2]/5 via-transparent to-[#00C9FF]/5 pointer-events-none" />

                {/* Gold accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                {/* Content Grid - 3 columns */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-6">
                  {section.items.map((item, index) => {
                    const IconComponent = item.icon
                      ? navIcons[item.icon]
                      : null;

                    return (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          className="group relative flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                          onClick={onClose}
                        >
                          {/* Icon with gold accent on hover */}
                          {IconComponent && (
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                                <IconComponent className="w-5 h-5 text-[#00C9FF] group-hover:text-[#D4AF37] transition-colors duration-300" />
                              </div>
                            </div>
                          )}

                          {/* Text Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-accent text-base font-semibold text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors duration-300">
                                {item.label}
                              </h3>
                              {/* Arrow indicator */}
                              <svg
                                className="w-4 h-4 text-[#F8FAFC]/40 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all duration-300"
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
                              <p className="mt-1 text-sm text-[#F8FAFC]/60 font-body">
                                {item.description}
                              </p>
                            )}
                          </div>

                          {/* Hover gradient underline */}
                          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-[#D4AF37] to-[#00C9FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF]/30 to-transparent" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
