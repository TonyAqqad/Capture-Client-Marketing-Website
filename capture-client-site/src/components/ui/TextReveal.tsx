"use client";
import { motion } from "@/lib/motion";

interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function TextReveal({ children, delay = 0, className = "" }: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay,
        }}
        viewport={{ once: true, margin: "-50px" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
