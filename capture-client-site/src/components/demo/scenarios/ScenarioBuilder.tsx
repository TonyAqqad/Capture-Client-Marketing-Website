"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { X, ArrowLeft, Sparkles } from "lucide-react";
import { ScenarioLibrary } from "./ScenarioLibrary";
import { ScenarioPlayer } from "./ScenarioPlayer";
import { ScenarioOutcome } from "./ScenarioOutcome";
import type { Scenario } from "./data/scenarios";

// ============================================
// SCENARIO BUILDER - Main Orchestration Component
// ============================================

type ViewState = "browsing" | "playing" | "completed";

export function ScenarioBuilder() {
  const [viewState, setViewState] = useState<ViewState>("browsing");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleSelectScenario = useCallback((scenario: Scenario) => {
    setSelectedScenario(scenario);
    setViewState("playing");
  }, []);

  const handlePlaybackComplete = useCallback(() => {
    setViewState("completed");
  }, []);

  const handleClose = useCallback(() => {
    setViewState("browsing");
    setSelectedScenario(null);
  }, []);

  const handleBackToPlayer = useCallback(() => {
    setViewState("playing");
  }, []);

  const handleDragEnd = useCallback(
    (_event: any, info: { offset: { y: number }; velocity: { y: number } }) => {
      // Dismiss if dragged down more than 100px or velocity is high
      if (info.offset.y > 100 || info.velocity.y > 500) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Library View */}
      <ScenarioLibrary
        onSelectScenario={handleSelectScenario}
        selectedScenarioId={selectedScenario?.id}
      />

      {/* Modal / Bottom Sheet */}
      <AnimatePresence>
        {(viewState === "playing" || viewState === "completed") && selectedScenario && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Modal Container - Different behavior on mobile vs desktop */}
            <div className="fixed inset-0 z-50 pointer-events-none flex items-end md:items-center md:justify-center md:p-8">
              <motion.div
                className="pointer-events-auto w-full md:w-auto md:max-w-2xl"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.2 }}
                onDragEnd={handleDragEnd}
                // Mobile: slide up from bottom, Desktop: fade + scale from center
                initial={{
                  y: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : 0,
                  opacity: typeof window !== "undefined" && window.innerWidth >= 768 ? 0 : 1,
                  scale: typeof window !== "undefined" && window.innerWidth >= 768 ? 0.95 : 1,
                }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{
                  y: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : 0,
                  opacity: typeof window !== "undefined" && window.innerWidth >= 768 ? 0 : 1,
                  scale: typeof window !== "undefined" && window.innerWidth >= 768 ? 0.95 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                // Disable drag on desktop
                style={{
                  touchAction:
                    typeof window !== "undefined" && window.innerWidth >= 768 ? "auto" : "none",
                }}
              >
                <div className="h-[90vh] md:h-auto md:max-h-[85vh] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl shadow-slate-900/20 flex flex-col overflow-hidden">
                  {/* Drag Handle - Mobile only */}
                  <div className="md:hidden flex-shrink-0 pt-3 pb-1 flex justify-center touch-none">
                    <div className="w-12 h-1.5 rounded-full bg-slate-300" />
                  </div>

                  {/* Modal Header */}
                  <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {viewState === "completed" && (
                        <motion.button
                          onClick={handleBackToPlayer}
                          className="flex-shrink-0 w-11 h-11 -ml-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </motion.button>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3
                          className="font-bold text-slate-900 truncate"
                          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
                        >
                          {viewState === "completed"
                            ? "Conversation Complete"
                            : selectedScenario.title}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          {viewState === "completed"
                            ? "See what the AI captured"
                            : selectedScenario.callerPersona}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleClose}
                      className="flex-shrink-0 w-11 h-11 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </motion.button>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                      {viewState === "playing" && (
                        <motion.div
                          key="player"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="h-full"
                        >
                          <ScenarioPlayer
                            scenario={selectedScenario}
                            onComplete={handlePlaybackComplete}
                            autoPlay={true}
                          />
                        </motion.div>
                      )}

                      {viewState === "completed" && (
                        <motion.div
                          key="outcome"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="p-6"
                        >
                          <ScenarioOutcome outcome={selectedScenario.outcome} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Modal Footer - CTA */}
                  {viewState === "completed" && (
                    <motion.div
                      className="flex-shrink-0 px-6 py-4 border-t border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-600 text-center sm:text-left">
                          Ready to capture leads like this?
                        </p>
                        <motion.a
                          href="/contact"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Sparkles className="w-5 h-5" />
                          <span>Start Free Trial</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
