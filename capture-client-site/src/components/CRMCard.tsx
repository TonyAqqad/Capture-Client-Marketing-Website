"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, UserPlus, Target, Calendar } from "lucide-react";

interface CRMField {
  label: string;
  value: string;
  filled: boolean;
  urgent?: boolean;
}

interface CRMCardProps {
  fields: CRMField[];
}

const CRMCard: React.FC<CRMCardProps> = ({ fields }) => {
  const getFieldIcon = (index: number) => {
    switch (index) {
      case 0:
        return <UserPlus className="w-4 h-4" />;
      case 1:
        return <Target className="w-4 h-4" />;
      case 2:
        return <Calendar className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
    >
      {/* Card Container with Glassmorphism */}
      <div className="relative rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden">
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Card Header */}
        <div className="relative px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </motion.div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">New Lead Captured</h3>
              <p className="text-[10px] sm:text-xs text-white/40 font-mono truncate">AI Voice Agent → CRM</p>
            </div>
          </div>
        </div>

        {/* Card Body - Fields */}
        <div className="relative px-4 sm:px-6 py-4 sm:py-5 space-y-3 sm:space-y-4">
          {fields.map((field, index) => (
            <CRMField key={field.label} field={field} index={index} icon={getFieldIcon(index)} />
          ))}
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
        />
      </div>

      {/* Outer Glow Effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/30 rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/30 rounded-full" />
      </div>
    </motion.div>
  );
};

interface CRMFieldProps {
  field: CRMField;
  index: number;
  icon: React.ReactNode;
}

const CRMField: React.FC<CRMFieldProps> = ({ field, index, icon }) => {
  const { label, value, filled, urgent } = field;

  // Color scheme based on urgency
  const colors = urgent
    ? {
        border: "border-red-500/30",
        bg: "bg-red-500/5",
        text: "text-red-400",
        glow: "shadow-red-500/20",
        flash: "from-red-500/30",
      }
    : {
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/5",
        text: "text-cyan-400",
        glow: "shadow-cyan-500/20",
        flash: "from-cyan-500/30",
      };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative"
    >
      {/* Field Container */}
      <div
        className={`
          relative rounded-xl backdrop-blur-md transition-all duration-500
          ${
            filled
              ? `${colors.bg} border ${colors.border} shadow-lg ${colors.glow}`
              : "bg-white/[0.02] border border-white/5"
          }
        `}
      >
        <div className="px-3 sm:px-4 py-3 sm:py-3.5">
          {/* Label */}
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
            <div
              className={`
                transition-colors duration-300 w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center
                ${filled ? colors.text : "text-white/30"}
              `}
            >
              {icon}
            </div>
            <span
              className={`
                text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors duration-300
                ${filled ? colors.text : "text-white/30"}
              `}
            >
              {label}
            </span>
          </div>

          {/* Value Container */}
          <div className="relative min-h-[28px] sm:min-h-[32px] flex items-center">
            <AnimatePresence mode="wait">
              {!filled ? (
                // Empty State
                <motion.div
                  key="empty"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: [0.2, 0.5, 0.2],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-white/20"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-white/20 font-mono">Waiting...</span>
                </motion.div>
              ) : (
                // Filled State with Flash Animation
                <motion.div
                  key="filled"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between w-full gap-2"
                >
                  {/* Flash Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.6, times: [0, 0.3, 1] }}
                    className={`
                      absolute inset-0 rounded-xl
                      bg-gradient-to-r ${colors.flash} to-transparent
                    `}
                  />

                  {/* Value Text */}
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`
                      text-sm sm:text-base font-mono font-medium tracking-tight relative z-10 truncate
                      ${urgent ? "text-red-100" : "text-white"}
                    `}
                  >
                    {value}
                  </motion.span>

                  {/* Checkmark Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="relative z-10 flex-shrink-0"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${urgent ? "text-red-400" : "text-cyan-400"}`}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Field Inner Glow */}
        {filled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`
              absolute inset-0 rounded-xl opacity-20 pointer-events-none
              bg-gradient-to-br ${urgent ? "from-red-500/10" : "from-cyan-500/10"} to-transparent
            `}
          />
        )}
      </div>

      {/* Pulse Effect on Fill */}
      {filled && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`
            absolute inset-0 rounded-xl border-2 pointer-events-none
            ${urgent ? "border-red-500/50" : "border-cyan-500/50"}
          `}
        />
      )}
    </motion.div>
  );
};

export default CRMCard;
