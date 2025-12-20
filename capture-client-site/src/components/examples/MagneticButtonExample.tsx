"use client";

import React from "react";
import { MagneticButton } from "@/components/ui/premium-components";

/**
 * MagneticButton Usage Examples
 *
 * Demonstrates the premium cursor-following button component
 * with different variants, sizes, and use cases.
 */
export default function MagneticButtonExample() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          MagneticButton Component Examples
        </h1>

        {/* Variants Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <MagneticButton variant="primary">
              Primary Button
            </MagneticButton>

            <MagneticButton variant="secondary">
              Secondary Button
            </MagneticButton>

            <MagneticButton variant="ghost">
              Ghost Button
            </MagneticButton>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton size="sm">
              Small Button
            </MagneticButton>

            <MagneticButton size="md">
              Medium Button
            </MagneticButton>

            <MagneticButton size="lg">
              Large Button
            </MagneticButton>
          </div>
        </section>

        {/* With onClick Handler */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Interactive</h2>
          <div className="flex flex-wrap gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => alert("Button clicked!")}
            >
              Click Me
            </MagneticButton>

            <MagneticButton
              variant="primary"
              href="/demo"
              ariaLabel="Book a demo"
            >
              Book a Demo
            </MagneticButton>
          </div>
        </section>

        {/* Full Width */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Full Width</h2>
          <MagneticButton variant="primary" fullWidth>
            Full Width Button
          </MagneticButton>
        </section>

        {/* Disabled State */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Disabled</h2>
          <div className="flex flex-wrap gap-4">
            <MagneticButton variant="primary" disabled>
              Disabled Primary
            </MagneticButton>

            <MagneticButton variant="secondary" disabled>
              Disabled Secondary
            </MagneticButton>
          </div>
        </section>

        {/* Real-World CTAs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Real-World CTAs</h2>
          <div className="flex flex-wrap gap-4">
            <MagneticButton variant="primary" size="lg">
              Get Started Free
            </MagneticButton>

            <MagneticButton variant="primary" size="lg" href="/pricing">
              View Pricing
            </MagneticButton>

            <MagneticButton variant="secondary" size="lg" href="/demo">
              Watch Demo
            </MagneticButton>

            <MagneticButton variant="ghost" href="/contact">
              Contact Sales
            </MagneticButton>
          </div>
        </section>

        {/* Mobile Instructions */}
        <section className="p-6 bg-surface/30 backdrop-blur-sm rounded-xl border border-surface-border">
          <h3 className="text-lg font-semibold text-white mb-2">
            How It Works
          </h3>
          <ul className="space-y-2 text-foreground-muted">
            <li>
              <strong className="text-blue-500">Desktop:</strong> Hover over buttons to see magnetic cursor-following effect
            </li>
            <li>
              <strong className="text-blue-500">Mobile:</strong> Magnetic effect automatically disabled for performance
            </li>
            <li>
              <strong className="text-blue-500">Click:</strong> Ripple effect on all devices
            </li>
            <li>
              <strong className="text-blue-500">Accessibility:</strong> Keyboard navigation with focus rings
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
