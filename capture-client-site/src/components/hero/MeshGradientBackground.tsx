"use client";

import React from "react";

/**
 * MeshGradientBackground
 *
 * Premium animated mesh gradient background inspired by Linear/Stripe's $100B aesthetic.
 * Features:
 * - CSS-based animated mesh gradients with subtle breathing motion
 * - Deep space color palette (near-black, indigo, violet, subtle gold)
 * - Noise texture overlay for depth
 * - Subtle grid pattern overlay
 * - Highly performant (CSS transforms only, GPU-accelerated)
 */
export default function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Animated mesh gradient layers */}
      <div className="absolute inset-0">
        {/* Layer 1: Deep indigo top-right */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at 80% 20%, #1e1b4b 0%, transparent 50%)",
            animation: "mesh-float-1 20s ease-in-out infinite",
          }}
        />

        {/* Layer 2: Violet center-left */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 20% 50%, #4c1d95 0%, transparent 50%)",
            animation: "mesh-float-2 25s ease-in-out infinite",
          }}
        />

        {/* Layer 3: Deep indigo bottom */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: "radial-gradient(circle at 50% 90%, #1e1b4b 0%, transparent 60%)",
            animation: "mesh-float-3 30s ease-in-out infinite",
          }}
        />

        {/* Layer 4: Violet top-left accent */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 10% 10%, #581c87 0%, transparent 40%)",
            animation: "mesh-float-4 22s ease-in-out infinite",
          }}
        />

        {/* Layer 5: Subtle gold accent glow (very low opacity) */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: "radial-gradient(circle at 60% 60%, #d4af37 0%, transparent 50%)",
            animation: "mesh-float-5 28s ease-in-out infinite",
          }}
        />

        {/* Layer 6: Secondary indigo for depth */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: "radial-gradient(ellipse at 40% 30%, #312e81 0%, transparent 55%)",
            animation: "mesh-float-6 24s ease-in-out infinite",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Grid pattern overlay (Linear-style) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Vignette effect for depth */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(5, 5, 5, 0.8) 100%)",
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes mesh-float-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(3%, -3%) scale(1.05);
          }
          66% {
            transform: translate(-2%, 2%) scale(0.98);
          }
        }

        @keyframes mesh-float-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-4%, 3%) scale(1.03);
          }
          66% {
            transform: translate(3%, -2%) scale(0.97);
          }
        }

        @keyframes mesh-float-3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(2%, 4%) scale(1.04);
          }
          66% {
            transform: translate(-3%, -3%) scale(0.96);
          }
        }

        @keyframes mesh-float-4 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-3%, -4%) scale(1.02);
          }
          66% {
            transform: translate(4%, 2%) scale(0.99);
          }
        }

        @keyframes mesh-float-5 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(3%, 3%) scale(1.06);
          }
          66% {
            transform: translate(-4%, -2%) scale(0.95);
          }
        }

        @keyframes mesh-float-6 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-2%, 4%) scale(1.03);
          }
          66% {
            transform: translate(2%, -4%) scale(0.98);
          }
        }

        /* GPU acceleration hint */
        @media (prefers-reduced-motion: no-preference) {
          div[class*="opacity-"] {
            will-change: transform;
            transform: translateZ(0);
          }
        }

        /* Respect user preference for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          div {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
