"use client";

import { motion } from "@/lib/motion";

// ============================================
// AI ROBOT MASCOT - Premium 3D-Style Design
// White/Blue gradient for clean, tech feel
// Professional yet friendly appearance
// Animated blinking eyes + floating motion
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
      {/* Multi-layered glow effect for depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Outer ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(0, 201, 255, 0.5) 0%, rgba(95, 227, 255, 0.2) 30%, transparent 60%)",
            filter: "blur(60px)"
          }}
        />
        {/* Inner focused glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[300px] opacity-50"
          style={{
            background: "radial-gradient(ellipse, rgba(0, 201, 255, 0.4) 0%, transparent 50%)",
            filter: "blur(40px)"
          }}
        />
      </div>

      {/* Robot SVG with premium styling */}
      <motion.svg
        viewBox="0 0 320 400"
        className="relative w-full h-auto max-w-[380px] mx-auto"
        style={{
          filter: "drop-shadow(0 0 40px rgba(0, 201, 255, 0.35)) drop-shadow(0 0 80px rgba(0, 201, 255, 0.15)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))"
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          {/* Premium body gradient - White/Ice Blue → Cyan → Deep Blue */}
          <linearGradient id="premiumBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#E8F4FC" />
            <stop offset="45%" stopColor="#B8E4F0" />
            <stop offset="70%" stopColor="#5FE3FF" />
            <stop offset="100%" stopColor="#00C9FF" />
          </linearGradient>

          {/* Metallic highlight gradient */}
          <linearGradient id="metallicHighlight" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </linearGradient>

          {/* Subtle inner shadow for depth */}
          <linearGradient id="innerShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="80%" stopColor="rgba(0,50,80,0.1)" />
            <stop offset="100%" stopColor="rgba(0,80,120,0.15)" />
          </linearGradient>

          {/* Face screen gradient - deeper, richer */}
          <linearGradient id="premiumFaceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0A1628" />
            <stop offset="50%" stopColor="#0D1E36" />
            <stop offset="100%" stopColor="#091420" />
          </linearGradient>

          {/* Eye glow gradient */}
          <radialGradient id="eyeGlowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5FE3FF" />
            <stop offset="50%" stopColor="#00C9FF" />
            <stop offset="100%" stopColor="#00A8E8" />
          </radialGradient>

          {/* Enhanced glow filter */}
          <filter id="premiumGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft inner glow for eyes */}
          <filter id="eyeInnerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 3D rim light effect */}
          <linearGradient id="rimLight" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(0,201,255,0.4)" />
            <stop offset="10%" stopColor="rgba(0,201,255,0)" />
            <stop offset="90%" stopColor="rgba(0,201,255,0)" />
            <stop offset="100%" stopColor="rgba(0,201,255,0.4)" />
          </linearGradient>

          {/* Antenna glow gradient */}
          <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5FE3FF" />
            <stop offset="60%" stopColor="#00C9FF" />
            <stop offset="100%" stopColor="#0099CC" />
          </radialGradient>

          {/* Arm gradient - matching body */}
          <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8F4FC" />
            <stop offset="50%" stopColor="#B8E4F0" />
            <stop offset="100%" stopColor="#5FE3FF" />
          </linearGradient>
        </defs>

        {/* ===== MAIN BODY ===== */}
        {/* Body shadow for grounding */}
        <ellipse
          cx="160"
          cy="360"
          rx="60"
          ry="15"
          fill="rgba(0,0,0,0.2)"
          filter="url(#premiumGlow)"
        />

        {/* Main capsule body - larger and more refined */}
        <ellipse
          cx="160"
          cy="230"
          rx="85"
          ry="120"
          fill="url(#premiumBodyGradient)"
        />

        {/* Body metallic highlight - creates 3D depth */}
        <ellipse
          cx="135"
          cy="190"
          rx="45"
          ry="65"
          fill="url(#metallicHighlight)"
          opacity="0.8"
        />

        {/* Rim light on edges */}
        <ellipse
          cx="160"
          cy="230"
          rx="85"
          ry="120"
          fill="none"
          stroke="url(#rimLight)"
          strokeWidth="2"
        />

        {/* Inner depth shadow */}
        <ellipse
          cx="160"
          cy="260"
          rx="75"
          ry="100"
          fill="url(#innerShadow)"
          opacity="0.3"
        />

        {/* ===== ARMS ===== */}
        {/* Left arm with animation */}
        <motion.g
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "90px 220px" }}
        >
          <ellipse
            cx="60"
            cy="240"
            rx="22"
            ry="35"
            fill="url(#armGradient)"
          />
          {/* Arm highlight */}
          <ellipse
            cx="55"
            cy="232"
            rx="10"
            ry="18"
            fill="url(#metallicHighlight)"
            opacity="0.6"
          />
        </motion.g>

        {/* Right arm with animation */}
        <motion.g
          animate={{ rotate: [4, -4, 4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "230px 220px" }}
        >
          <ellipse
            cx="260"
            cy="240"
            rx="22"
            ry="35"
            fill="url(#armGradient)"
          />
          {/* Arm highlight */}
          <ellipse
            cx="255"
            cy="232"
            rx="10"
            ry="18"
            fill="url(#metallicHighlight)"
            opacity="0.6"
          />
        </motion.g>

        {/* ===== ANTENNA ===== */}
        {/* Antenna stem */}
        <rect
          x="154"
          y="95"
          width="12"
          height="30"
          rx="6"
          fill="#4ECDC4"
        />
        {/* Antenna stem highlight */}
        <rect
          x="155"
          y="97"
          width="4"
          height="25"
          rx="2"
          fill="rgba(255,255,255,0.4)"
        />

        {/* Antenna ball with pulsing glow */}
        <motion.g
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outer glow ring */}
          <circle
            cx="160"
            cy="82"
            r="20"
            fill="rgba(0, 201, 255, 0.2)"
            filter="url(#premiumGlow)"
          />
          {/* Main antenna ball */}
          <circle
            cx="160"
            cy="82"
            r="15"
            fill="url(#antennaGlow)"
            filter="url(#eyeInnerGlow)"
          />
          {/* Highlight */}
          <circle
            cx="155"
            cy="77"
            r="5"
            fill="rgba(255,255,255,0.7)"
          />
        </motion.g>

        {/* ===== FACE SCREEN ===== */}
        {/* Face screen background - larger and more prominent */}
        <rect
          x="100"
          y="155"
          width="120"
          height="90"
          rx="25"
          fill="url(#premiumFaceGradient)"
        />

        {/* Screen bezel/frame effect */}
        <rect
          x="100"
          y="155"
          width="120"
          height="90"
          rx="25"
          fill="none"
          stroke="rgba(0, 201, 255, 0.4)"
          strokeWidth="2"
        />

        {/* Inner screen glow */}
        <rect
          x="105"
          y="160"
          width="110"
          height="80"
          rx="22"
          fill="none"
          stroke="rgba(0, 201, 255, 0.15)"
          strokeWidth="1"
        />

        {/* ===== EYES WITH BLINK ===== */}
        {/* Left eye */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.46, 0.5, 0.54, 1],
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "135px 185px" }}
        >
          {/* Eye glow backdrop */}
          <circle
            cx="135"
            cy="185"
            r="18"
            fill="rgba(0, 201, 255, 0.2)"
            filter="url(#premiumGlow)"
          />
          {/* Main eye */}
          <circle
            cx="135"
            cy="185"
            r="14"
            fill="url(#eyeGlowGradient)"
            filter="url(#eyeInnerGlow)"
          />
          {/* Eye highlight - larger for more life */}
          <circle
            cx="130"
            cy="180"
            r="5"
            fill="rgba(255,255,255,0.8)"
          />
          {/* Secondary highlight */}
          <circle
            cx="138"
            cy="188"
            r="2"
            fill="rgba(255,255,255,0.4)"
          />
        </motion.g>

        {/* Right eye */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.46, 0.5, 0.54, 1],
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "185px 185px" }}
        >
          {/* Eye glow backdrop */}
          <circle
            cx="185"
            cy="185"
            r="18"
            fill="rgba(0, 201, 255, 0.2)"
            filter="url(#premiumGlow)"
          />
          {/* Main eye */}
          <circle
            cx="185"
            cy="185"
            r="14"
            fill="url(#eyeGlowGradient)"
            filter="url(#eyeInnerGlow)"
          />
          {/* Eye highlight */}
          <circle
            cx="180"
            cy="180"
            r="5"
            fill="rgba(255,255,255,0.8)"
          />
          {/* Secondary highlight */}
          <circle
            cx="188"
            cy="188"
            r="2"
            fill="rgba(255,255,255,0.4)"
          />
        </motion.g>

        {/* ===== SMILE ===== */}
        {/* Smile with glow effect */}
        <path
          d="M 130 215 Q 160 238 190 215"
          stroke="url(#eyeGlowGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          filter="url(#eyeInnerGlow)"
        />

        {/* ===== CHEST INDICATOR ===== */}
        {/* Chest light ring */}
        <circle
          cx="160"
          cy="295"
          r="16"
          fill="none"
          stroke="rgba(0, 201, 255, 0.25)"
          strokeWidth="2"
        />

        {/* Chest light - pulsing */}
        <motion.g
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outer glow */}
          <circle
            cx="160"
            cy="295"
            r="14"
            fill="rgba(0, 201, 255, 0.3)"
            filter="url(#premiumGlow)"
          />
          {/* Main light */}
          <circle
            cx="160"
            cy="295"
            r="10"
            fill="url(#eyeGlowGradient)"
            filter="url(#eyeInnerGlow)"
          />
          {/* Light highlight */}
          <circle
            cx="157"
            cy="292"
            r="3"
            fill="rgba(255,255,255,0.7)"
          />
        </motion.g>

        {/* ===== DECORATIVE DETAILS ===== */}
        {/* Small accent lights on sides */}
        <motion.circle
          cx="90"
          cy="270"
          r="4"
          fill="#00C9FF"
          filter="url(#eyeInnerGlow)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="230"
          cy="270"
          r="4"
          fill="#00C9FF"
          filter="url(#eyeInnerGlow)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Subtle panel lines for detail */}
        <path
          d="M 110 310 Q 160 325 210 310"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  );
}
