"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationData } from "./navData";
import MegaMenuDropdown from "./MegaMenuDropdown";
import MegaMenuMobile from "./MegaMenuMobile";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";

export default function MegaMenu() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownOpen = useCallback((key: string) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  }, []);

  const handleDropdownClose = useCallback(() => {
    // Add a generous delay to allow mouse to move to dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    // Cancel the close timeout when entering dropdown
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scrolledClass = isScrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg shadow-slate-200/50"
    : "bg-white/80 backdrop-blur-md border-b border-slate-100";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,box-shadow,border-color] duration-500 ${scrolledClass}`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between relative z-[110]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group relative transition-transform hover:scale-105 duration-300 min-h-[44px]"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-[#4A69E2]/0 via-[#00C9FF]/10 to-[#4A69E2]/0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

            {/* Desktop Logo */}
            <div className="hidden sm:block relative h-12 w-auto">
              <Image
                src="/Capture-client-deskto-logo-latest-aligned-with-light.png"
                alt="Capture Client"
                width={180}
                height={48}
                sizes="(max-width: 640px) 0px, 180px"
                className="h-12 w-auto object-contain transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,201,255,0.3)] duration-500"
                priority
              />
            </div>

            {/* Mobile Logo */}
            <div className="sm:hidden relative h-10 w-auto">
              <Image
                src="/logo-mobile-light.svg"
                alt="Capture Client"
                width={40}
                height={40}
                sizes="(min-width: 640px) 0px, 40px"
                className="h-10 w-auto object-contain transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,201,255,0.3)] duration-500"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.entries(navigationData).map(([key, section]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleDropdownOpen(key)}
                onMouseLeave={handleDropdownClose}
              >
                <button
                  className="relative px-4 py-3 min-h-[44px] text-sm font-medium transition-all duration-300 group flex items-center gap-1 text-slate-700 hover:text-blue-600"
                  style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === key}
                >
                  <span className="relative z-10">{section.title}</span>

                  {/* Chevron indicator */}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === key ? "rotate-180 text-blue-600" : ""
                    }`}
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
                  </svg>

                  {/* Underline on hover */}
                  <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 bg-blue-600" />
                </button>

                {/* Invisible hover bridge to prevent gap issues - larger area */}
                {openDropdown === key && <div className="absolute -left-4 -right-4 h-8 top-full" />}

                {/* Dropdown Panel */}
                <MegaMenuDropdown
                  section={section}
                  isOpen={openDropdown === key}
                  onClose={handleDropdownClose}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownClose}
                />
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone Number */}
            <a
              href="tel:865-346-6111"
              className="relative group transition-all duration-300 text-sm font-medium flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg border text-slate-700 hover:text-blue-600 hover:bg-slate-50 border-slate-200 hover:border-blue-300"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
              onClick={() => trackPhoneClick("865-346-6111", "header")}
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300"
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
              <span className="relative">
                (865) 346-6111
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300 bg-blue-600" />
              </span>
            </a>

            {/* Sign In CTA */}
            <a
              href="https://app.captureclient.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-6 py-3 min-h-[48px] rounded-lg font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 border flex items-center bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-600/30 border-blue-700"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
              onClick={() => trackCTAClick("Sign In", "header", "https://app.captureclient.com/")}
            >
              <span className="relative z-10 flex items-center gap-2">
                Sign In
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300"
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
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg border transition-all active:scale-95 group z-[120] touch-manipulation hover:bg-slate-100 border-slate-200 hover:border-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-90 text-blue-600" : "text-slate-700"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MegaMenuMobile isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
