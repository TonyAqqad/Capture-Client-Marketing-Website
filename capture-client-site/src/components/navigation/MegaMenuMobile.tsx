"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/lib/motion";
import { mobileNavSections } from "./navData";
import { navIcons } from "./navIcons";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";

interface MegaMenuMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenuMobile({ isOpen, onClose }: MegaMenuMobileProps) {
  // Auto-expand first section by default so content is visible
  const [expandedSection, setExpandedSection] = useState<string | null>("Solutions");

  // Reset to first section when menu opens
  useEffect(() => {
    if (isOpen) {
      setExpandedSection("Solutions");
    }
  }, [isOpen]);

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Light semi-transparent overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-xl z-[90]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Full-screen slide-in menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] bg-white border-l border-slate-200 z-[105] flex flex-col"
            style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
          >
            {/* Header with close button */}
            <div className="relative bg-white border-b border-slate-200 px-6 py-5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 border border-slate-200 active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 text-slate-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Blue accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            </div>

            {/* Scrollable Navigation Sections */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {mobileNavSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1, duration: 0.3 }}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 backdrop-blur-xl"
                >
                  {/* Section Header (Accordion Trigger) */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors min-h-[56px] active:scale-[0.99]"
                    aria-expanded={expandedSection === section.title}
                    aria-controls={`section-${sectionIndex}`}
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                      {section.title}
                    </span>
                    <motion.svg
                      animate={{ rotate: expandedSection === section.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </button>

                  {/* Section Items (Accordion Content) */}
                  <AnimatePresence initial={false}>
                    {expandedSection === section.title && (
                      <motion.div
                        id={`section-${sectionIndex}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-200 bg-slate-50 p-3 space-y-1">
                          {section.items.map((item, itemIndex) => {
                            const IconComponent = item.icon ? navIcons[item.icon] : null;

                            return (
                              <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.05, duration: 0.2 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="group flex items-center gap-4 px-4 py-3.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all active:scale-[0.98]"
                                >
                                  {/* Icon */}
                                  {IconComponent && (
                                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-50 transition-all">
                                      <IconComponent className="w-5 h-5 text-blue-600 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                  )}

                                  {/* Text */}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-body font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                      {item.label}
                                    </div>
                                    {item.description && (
                                      <div className="text-sm text-slate-600 mt-0.5">
                                        {item.description}
                                      </div>
                                    )}
                                  </div>

                                  {/* Arrow */}
                                  <svg
                                    className="w-5 h-5 text-slate-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0"
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
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons at bottom - Fixed */}
            <div className="relative bg-white border-t border-slate-200 px-4 py-4 space-y-3 flex-shrink-0">
              {/* Blue accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

              {/* Phone CTA */}
              <a
                href="tel:865-346-6111"
                className="flex items-center justify-center gap-3 text-slate-700 bg-white border border-slate-200 backdrop-blur-xl px-6 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600 transition-all font-semibold text-base min-h-[56px] active:scale-[0.98] group"
                onClick={() => {
                  trackPhoneClick("865-346-6111", "mobile_megamenu");
                  onClose();
                }}
              >
                <svg
                  className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (865) 346-6111
              </a>

              {/* Sign In CTA */}
              <a
                href="https://app.captureclient.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all text-base min-h-[56px] active:scale-[0.98] border border-transparent"
                onClick={() => {
                  trackCTAClick("Sign In", "mobile_megamenu", "https://app.captureclient.com/");
                  onClose();
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Sign In
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
