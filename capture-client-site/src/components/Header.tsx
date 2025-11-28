"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="py-6 px-8 lg:px-16 relative z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <span className="material-icons text-primary text-4xl">settings_suggest</span>
          <span className="text-xl font-bold text-white">Capture Client</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white/80">
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <a
          href="tel:865-346-3339"
          className="hidden md:block bg-white/10 border border-white/20 text-white px-6 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all duration-300 glowing-button-secondary"
        >
          Call Now: (865) 346-3339
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-icons">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background-dark border-t border-gray-800 py-4">
          <div className="container mx-auto px-8 flex flex-col gap-4">
            <Link
              href="/services"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="tel:865-346-3339"
              className="bg-primary text-black px-6 py-2 rounded-full font-bold text-center"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
