"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to prevent hydration mismatch
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use consistent initial state for SSR/hydration
  const scrolledClass = mounted && isScrolled
    ? "bg-[#0F172A]/98 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    : "bg-[#0F172A]/70 backdrop-blur-md border-b border-white/5";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolledClass}`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo - SVG logos for best quality with premium hover effect */}
        <Link
          href="/"
          className="flex items-center group relative transition-transform hover:scale-105 duration-300"
        >
          {/* Subtle glow on hover */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#4A69E2]/0 via-[#00C9FF]/10 to-[#4A69E2]/0 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

          {/* Desktop: Full logo with text - FIXED: Added sizes prop */}
          <div className="hidden sm:block relative h-12 w-auto">
            <Image
              src="/logo-desktop.svg"
              alt="Capture Client"
              width={220}
              height={48}
              sizes="(max-width: 640px) 0px, 220px"
              className="h-12 w-auto object-contain transition-all group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(0,201,255,0.3)] duration-500"
              priority
            />
          </div>

          {/* Mobile: Icon/compact logo - FIXED: Added sizes prop */}
          <div className="sm:hidden relative h-10 w-auto">
            <Image
              src="/logo-mobile.svg"
              alt="Capture Client"
              width={40}
              height={40}
              sizes="(min-width: 640px) 0px, 40px"
              className="h-10 w-auto object-contain transition-all group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(0,201,255,0.3)] duration-500"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:8653463339"
            className="relative group text-[#F8FAFC]/80 hover:text-[#00C9FF] transition-all duration-300 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
            onClick={() => trackPhoneClick("865-346-3339", "header")}
          >
            <span className="material-icons text-lg transition-transform group-hover:rotate-12 duration-300">phone</span>
            <span className="relative">
              (865) 346-3339
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] group-hover:w-full transition-all duration-300" />
            </span>
          </a>
          <Link
            href="/contact"
            className="relative group overflow-hidden bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,201,255,0.4)] hover:-translate-y-0.5 border border-white/10"
            onClick={() => trackCTAClick("Book a Demo", "header", "/contact")}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a Demo
              <span className="material-icons text-sm transition-transform group-hover:translate-x-1 duration-300">
                arrow_forward
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Mobile Menu Button - Premium hamburger with animation */}
        <button
          className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all active:scale-95 group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-icons text-[#F8FAFC] text-2xl transition-transform duration-300 group-hover:text-[#00C9FF]">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile Menu - Premium slide-down with fade */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          mobileMenuOpen ? "max-h-[600px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-6 bg-gradient-to-b from-[#0F172A] to-[#0F172A]/95 backdrop-blur-2xl border-b border-white/5">
          {/* Subtle top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C9FF]/50 to-transparent" />

          <div className="flex flex-col gap-2 mb-6">
            <MobileNavLink href="/services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/features" onClick={() => setMobileMenuOpen(false)}>
              Features
            </MobileNavLink>
            <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </MobileNavLink>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <a
              href="tel:8653463339"
              className="flex items-center justify-center gap-2 text-[#F8FAFC] bg-white/5 border border-white/10 px-6 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all font-medium text-base min-h-[56px] active:scale-95 group"
              onClick={() => trackPhoneClick("865-346-3339", "mobile_menu")}
            >
              <span className="material-icons text-xl transition-transform group-hover:rotate-12">phone</span>
              (865) 346-3339
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] text-white px-6 py-4 rounded-xl font-bold hover:shadow-[0_0_24px_rgba(0,201,255,0.4)] transition-all text-base min-h-[56px] active:scale-95 border border-white/10 group"
              onClick={() => {
                trackCTAClick("Book a Demo", "mobile_menu", "/contact");
                setMobileMenuOpen(false);
              }}
            >
              Book a Demo
              <span className="material-icons text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-[#F8FAFC]/80 hover:text-[#00C9FF] font-body text-sm font-medium transition-all duration-300 group"
    >
      <span className="relative z-10">{children}</span>
      {/* Double underline effect for premium feel */}
      <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-[#4A69E2] to-[#00C9FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] opacity-50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 delay-75" />
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="relative flex items-center justify-between px-4 py-4 text-[#F8FAFC]/80 hover:text-[#00C9FF] hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all font-medium text-base min-h-[56px] group active:scale-95 overflow-hidden"
      onClick={onClick}
    >
      {/* Subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4A69E2]/5 to-[#00C9FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="relative z-10">{children}</span>
      <span className="relative z-10 material-icons text-base opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        arrow_forward
      </span>
    </Link>
  );
}
