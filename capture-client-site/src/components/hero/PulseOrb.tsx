"use client";

import { motion } from "@/lib/motion";

interface PulseOrbProps {
  className?: string;
}

export default function PulseOrb({ className = "" }: PulseOrbProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* SVG Filters for Glow Effects */}
        <defs>
          {/* Primary Glow */}
          <filter id="glow-primary" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Glow */}
          <filter id="glow-intense" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Outer Glow */}
          <filter id="glow-soft" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="20" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <radialGradient id="gradient-indigo-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </radialGradient>

          <radialGradient id="gradient-violet-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </radialGradient>

          <radialGradient id="gradient-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#4f46e5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Outer Glow Ring - Slowest Pulse */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="url(#gradient-indigo-violet)"
          opacity="0.15"
          filter="url(#glow-soft)"
          className="animate-pulse-slow"
        />

        {/* Large Ring - Medium-Slow Pulse */}
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          stroke="url(#gradient-violet-cyan)"
          strokeWidth="2"
          opacity="0.4"
          filter="url(#glow-primary)"
          className="animate-pulse-ring-1"
        />

        {/* Medium Ring - Medium Pulse */}
        <circle
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="url(#gradient-indigo-violet)"
          strokeWidth="3"
          opacity="0.5"
          filter="url(#glow-primary)"
          className="animate-pulse-ring-2"
        />

        {/* Inner Ring - Faster Pulse */}
        <circle
          cx="200"
          cy="200"
          r="70"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2"
          opacity="0.6"
          filter="url(#glow-primary)"
          className="animate-pulse-ring-3"
        />

        {/* Core Orb - Subtle Pulse */}
        <circle
          cx="200"
          cy="200"
          r="50"
          fill="url(#gradient-core)"
          filter="url(#glow-intense)"
          className="animate-pulse-core group-hover:animate-pulse-core-hover"
        />

        {/* Orbiting Particles */}
        {/* Particle 1 - Fast orbit */}
        <circle
          cx="200"
          cy="200"
          r="3"
          fill="#06b6d4"
          opacity="0.8"
          filter="url(#glow-primary)"
          className="animate-orbit-1"
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Particle 2 - Medium orbit */}
        <circle
          cx="200"
          cy="200"
          r="2.5"
          fill="#7c3aed"
          opacity="0.7"
          filter="url(#glow-primary)"
          className="animate-orbit-2"
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Particle 3 - Slow orbit */}
        <circle
          cx="200"
          cy="200"
          r="3.5"
          fill="#4f46e5"
          opacity="0.6"
          filter="url(#glow-primary)"
          className="animate-orbit-3"
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Particle 4 - Counter orbit */}
        <circle
          cx="200"
          cy="200"
          r="2"
          fill="#06b6d4"
          opacity="0.9"
          filter="url(#glow-primary)"
          className="animate-orbit-4"
          style={{ transformOrigin: "200px 200px" }}
        />

        {/* Inner Glow */}
        <circle
          cx="200"
          cy="200"
          r="30"
          fill="#ffffff"
          opacity="0.2"
          filter="url(#glow-intense)"
          className="animate-pulse-core"
        />
      </motion.svg>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-ring-1 {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.02);
          }
        }

        @keyframes pulse-ring-2 {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.04);
          }
        }

        @keyframes pulse-ring-3 {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.94);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.06);
          }
        }

        @keyframes pulse-core {
          0%, 100% {
            opacity: 0.9;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @keyframes pulse-core-hover {
          0%, 100% {
            opacity: 0.95;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(90px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(90px) rotate(-360deg);
          }
        }

        @keyframes orbit-2 {
          0% {
            transform: rotate(90deg) translateX(120px) rotate(-90deg);
          }
          100% {
            transform: rotate(450deg) translateX(120px) rotate(-450deg);
          }
        }

        @keyframes orbit-3 {
          0% {
            transform: rotate(180deg) translateX(150px) rotate(-180deg);
          }
          100% {
            transform: rotate(540deg) translateX(150px) rotate(-540deg);
          }
        }

        @keyframes orbit-4 {
          0% {
            transform: rotate(270deg) translateX(110px) rotate(-270deg);
          }
          100% {
            transform: rotate(-90deg) translateX(110px) rotate(90deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-pulse-ring-1 {
          animation: pulse-ring-1 4s ease-in-out infinite;
          transform-origin: center;
        }

        .animate-pulse-ring-2 {
          animation: pulse-ring-2 3.5s ease-in-out infinite;
          transform-origin: center;
        }

        .animate-pulse-ring-3 {
          animation: pulse-ring-3 3s ease-in-out infinite;
          transform-origin: center;
        }

        .animate-pulse-core {
          animation: pulse-core 2.5s ease-in-out infinite;
          transform-origin: center;
        }

        .group-hover\\:animate-pulse-core-hover:hover {
          animation: pulse-core-hover 1.5s ease-in-out infinite;
        }

        .animate-orbit-1 {
          animation: orbit-1 8s linear infinite;
        }

        .animate-orbit-2 {
          animation: orbit-2 12s linear infinite;
        }

        .animate-orbit-3 {
          animation: orbit-3 16s linear infinite;
        }

        .animate-orbit-4 {
          animation: orbit-4 10s linear infinite reverse;
        }
      `}</style>
    </div>
  );
}
