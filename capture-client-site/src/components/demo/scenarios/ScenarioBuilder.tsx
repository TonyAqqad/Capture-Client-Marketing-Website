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

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Library View */}
      <ScenarioLibrary
        onSelectScenario={handleSelectScenario}
        selectedScenarioId={selectedScenario?.id}
      />

      {/* Modal */}
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

            {/* Modal */}
            <motion.div
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] z-50"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="h-full bg-white rounded-2xl shadow-2xl shadow-slate-900/20 flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    {viewState === "completed" && (
                      <motion.button
                        onClick={handleBackToPlayer}
                        className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                      </motion.button>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900" style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}>
                        {viewState === "completed" ? "Conversation Complete" : selectedScenario.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {viewState === "completed" ? "See what the AI captured" : selectedScenario.callerPersona}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
