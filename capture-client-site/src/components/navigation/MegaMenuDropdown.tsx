"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion";
import { NavSection } from "./navData";
import { navIcons } from "./navIcons";

interface MegaMenuDropdownProps {
  section: NavSection;
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

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
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 z-50 top-full w-[620px] max-w-[90vw]"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Invisible connector to prevent hover gaps */}
          <div className="h-2" />

          {/* Premium Glass Container */}
          <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Gradient glow effect */}
            <div className="absolute -inset-px bg-gradient-to-br from-blue-100/50 via-transparent to-cyan-100/50 rounded-2xl pointer-events-none" />

            {/* Inner container */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl">
              {/* Cyan accent line at top */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

              {/* Content Grid - 2 columns */}
              <div className="grid grid-cols-2 gap-1 p-4">
                {section.items.map((item, index) => {
                  const IconComponent = item.icon
                    ? navIcons[item.icon]
                    : null;

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="group relative flex items-start gap-3 p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200"
                        onClick={onClose}
                        style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                      >
                        {/* Icon Container */}
                        {IconComponent && (
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-100 transition-all duration-200">
                              <IconComponent className="w-5 h-5 text-blue-600 group-hover:text-blue-600 transition-colors duration-200" />
                            </div>
                          </div>
                        )}

                        {/* Text Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                              {item.label}
                            </h3>
                            {/* Arrow */}
                            <svg
                              className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
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
                            <p className="mt-0.5 text-[13px] text-slate-500 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Hover underline */}
                        <div className="absolute bottom-1 left-3.5 right-3.5 h-px bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
