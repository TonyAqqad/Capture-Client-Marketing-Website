"use client";

import { motion } from "@/lib/motion";

export function GoogleAdsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="25"
        y="70"
        width="12"
        height="20"
        fill="url(#googleGradient1)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 20, y: 70 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.rect
        x="42"
        y="60"
        width="12"
        height="30"
        fill="url(#googleGradient2)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 30, y: 60 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.rect
        x="59"
        y="45"
        width="12"
        height="45"
        fill="url(#googleGradient3)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 45, y: 45 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.rect
        x="76"
        y="30"
        width="12"
        height="60"
        fill="url(#googleGradient4)"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 60, y: 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
      <motion.path
        d="M31 85 L48 75 L65 60 L82 40"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.path
        d="M82 40 L78 46 L86 44 Z"
        fill="#2563EB"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
      />
      <defs>
        <linearGradient id="googleGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="googleGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="googleGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="googleGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
