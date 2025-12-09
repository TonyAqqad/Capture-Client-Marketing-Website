"use client";

import { motion } from "@/lib/motion";

// ============================================
// AI ROBOT MASCOT - Friendly, approachable character
// Coral/salmon → teal → cyan gradient body
// Cute face with blinking eyes
// Floating animation
// ============================================

interface AIRobotMascotProps {
  className?: string;
}

export function AIRobotMascot({ className = "" }: AIRobotMascotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative ${className}`}
    >
      {/* Glow effect behind robot */}
      <div
        className="absolute inset-0 blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 201, 255, 0.4) 0%, rgba(109, 213, 200, 0.2) 40%, transparent 70%)"
        }}
      />

      {/* Robot SVG */}
      <motion.svg
        viewBox="0 0 300 350"
        className="relative w-full h-auto max-w-[320px] mx-auto"
        style={{
          filter: "drop-shadow(0 0 30px rgba(0, 201, 255, 0.3)) drop-shadow(0 0 60px rgba(0, 201, 255, 0.15))"
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          {/* Main body gradient - coral to teal to cyan */}
          <linearGradient id="robotBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8B7B" />
            <stop offset="35%" stopColor="#E8847A" />
            <stop offset="60%" stopColor="#6DD5C8" />
            <stop offset="100%" stopColor="#00C9FF" />
          </linearGradient>

          {/* Face screen gradient */}
          <linearGradient id="faceScreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A1628" />
            <stop offset="100%" stopColor="#0D1E36" />
          </linearGradient>

          {/* Glow filter for eyes */}
          <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Highlight gradient for body shine */}
          <linearGradient id="bodyHighlight" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ===== BODY ===== */}
        {/* Main capsule body */}
        <ellipse
          cx="150"
          cy="195"
          rx="75"
          ry="105"
          fill="url(#robotBodyGradient)"
        />

        {/* Body highlight/shine */}
        <ellipse
          cx="130"
          cy="165"
          rx="35"
          ry="50"
          fill="url(#bodyHighlight)"
          opacity="0.6"
        />

        {/* ===== ARMS ===== */}
        {/* Left arm */}
        <motion.ellipse
          cx="60"
          cy="200"
          rx="18"
          ry="28"
          fill="url(#robotBodyGradient)"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "75px 180px" }}
        />

        {/* Right arm */}
        <motion.ellipse
          cx="240"
          cy="200"
          rx="18"
          ry="28"
          fill="url(#robotBodyGradient)"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "225px 180px" }}
        />

        {/* ===== ANTENNA ===== */}
        {/* Antenna stem */}
        <rect
          x="145"
          y="78"
          width="10"
          height="25"
          rx="5"
          fill="#6DD5C8"
        />

        {/* Antenna ball with glow */}
        <motion.circle
          cx="150"
          cy="68"
          r="12"
          fill="#00C9FF"
          filter="url(#eyeGlow)"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ===== FACE SCREEN ===== */}
        {/* Face screen background */}
        <rect
          x="95"
          y="130"
          width="110"
          height="75"
          rx="20"
          fill="url(#faceScreenGradient)"
        />

        {/* Screen border glow */}
        <rect
          x="95"
          y="130"
          width="110"
          height="75"
          rx="20"
          fill="none"
          stroke="rgba(0, 201, 255, 0.3)"
          strokeWidth="2"
        />

        {/* ===== EYES ===== */}
        {/* Left eye */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 0.55, 1],
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "128px 158px" }}
        >
          <circle
            cx="128"
            cy="158"
            r="12"
            fill="#00C9FF"
            filter="url(#eyeGlow)"
          />
          {/* Eye highlight */}
          <circle
            cx="124"
            cy="154"
            r="4"
            fill="rgba(255,255,255,0.6)"
          />
        </motion.g>

        {/* Right eye */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.45, 0.5, 0.55, 1],
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "172px 158px" }}
        >
          <circle
            cx="172"
            cy="158"
            r="12"
            fill="#00C9FF"
            filter="url(#eyeGlow)"
          />
          {/* Eye highlight */}
          <circle
            cx="168"
            cy="154"
            r="4"
            fill="rgba(255,255,255,0.6)"
          />
        </motion.g>

        {/* ===== SMILE ===== */}
        <path
          d="M 128 182 Q 150 198 172 182"
          stroke="#00C9FF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#eyeGlow)"
        />

        {/* ===== CHEST INDICATOR ===== */}
        {/* Glowing chest light */}
        <motion.circle
          cx="150"
          cy="250"
          r="8"
          fill="#00C9FF"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#eyeGlow)"
        />

        {/* Chest light ring */}
        <circle
          cx="150"
          cy="250"
          r="12"
          fill="none"
          stroke="rgba(0, 201, 255, 0.3)"
          strokeWidth="2"
        />
      </motion.svg>
    </motion.div>
  );
}
