import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SimulationStage = "setup" | "simulation" | "payoff";
export type CallState = "idle" | "ringing" | "connected";

export interface CRMField {
  id: string;
  label: string;
  value: string;
  isFilled: boolean;
  isFlashing: boolean;
  isUrgent?: boolean;
}

export interface SimulationState {
  stage: SimulationStage;
  callState: CallState;
  isTyping: boolean;
  crmFields: CRMField[];
  transcriptComplete: boolean;
}

export interface SimulationControls {
  startSimulation: () => void;
  resetSimulation: () => void;
  skipToPayoff: () => void;
}

// ============================================================================
// TIMING CONFIGURATION
// ============================================================================

export const SIMULATION_TIMING = {
  // Stage 2: Simulation timing
  RING_DURATION: 2000, // 0s-2s: Phone rings (orange)
  CONNECT_AT: 2000, // 2s: Phone connects (cyan)
  TRANSCRIPT_START_AT: 2500, // 2.5s: AI transcript starts typing
  CRM_FIELD_1_AT: 4000, // 4s: "Name" field populates
  CRM_FIELD_2_AT: 6000, // 6s: "Goal" field populates
  CRM_FIELD_3_AT: 7500, // 7.5s: "Status" field populates (urgent)
  STAGE_3_TRANSITION_AT: 8000, // 8s: Transition to Stage 3

  // Visual effect durations
  FLASH_DURATION: 600, // How long field flash lasts
  FIELD_FADE_IN: 400, // Fade-in animation for filled fields
} as const;

// ============================================================================
// INITIAL STATE
// ============================================================================

const INITIAL_CRM_FIELDS: CRMField[] = [
  {
    id: "name",
    label: "Lead Name",
    value: "Sarah Mitchell",
    isFilled: false,
    isFlashing: false,
  },
  {
    id: "goal",
    label: "Business Goal",
    value: "Scale to 10 locations by 2026",
    isFilled: false,
    isFlashing: false,
  },
  {
    id: "status",
    label: "Lead Status",
    value: "HOT LEAD - Follow up today",
    isFilled: false,
    isFlashing: false,
    isUrgent: true,
  },
];

const INITIAL_STATE: SimulationState = {
  stage: "setup",
  callState: "idle",
  isTyping: false,
  crmFields: INITIAL_CRM_FIELDS,
  transcriptComplete: false,
};

// ============================================================================
// CUSTOM HOOK: useSimulationState
// ============================================================================

export function useSimulationState() {
  const [state, setState] = useState<SimulationState>(INITIAL_STATE);

  // Store all active timeouts for cleanup
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Helper to schedule a timeout and track it for cleanup
  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  }, []);

  // Clear all active timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // ============================================================================
  // RESET SIMULATION
  // ============================================================================

  const resetSimulation = useCallback(() => {
    clearAllTimeouts();
    setState(INITIAL_STATE);
  }, [clearAllTimeouts]);

  // ============================================================================
  // START SIMULATION - Orchestrates entire timing sequence
  // ============================================================================

  const startSimulation = useCallback(() => {
    // Clear any existing timeouts
    clearAllTimeouts();

    // Reset to clean state, then begin stage 2 (simulation)
    setState({
      ...INITIAL_STATE,
      stage: "simulation",
      callState: "ringing",
    });

    // ===== 2s: Phone connects, switch to cyan =====
    scheduleTimeout(() => {
      setState((prev) => ({
        ...prev,
        callState: "connected",
      }));
    }, SIMULATION_TIMING.CONNECT_AT);

    // ===== 2.5s: Start transcript typing =====
    scheduleTimeout(() => {
      setState((prev) => ({
        ...prev,
        isTyping: true,
      }));
    }, SIMULATION_TIMING.TRANSCRIPT_START_AT);

    // ===== 4s: CRM Field 1 (Name) populates =====
    scheduleTimeout(() => {
      setState((prev) => ({
        ...prev,
        crmFields: prev.crmFields.map((field, idx) =>
          idx === 0 ? { ...field, isFilled: true, isFlashing: true } : field
        ),
      }));

      // Remove flash after duration
      scheduleTimeout(() => {
        setState((prev) => ({
          ...prev,
          crmFields: prev.crmFields.map((field, idx) =>
            idx === 0 ? { ...field, isFlashing: false } : field
          ),
        }));
      }, SIMULATION_TIMING.FLASH_DURATION);
    }, SIMULATION_TIMING.CRM_FIELD_1_AT);

    // ===== 6s: CRM Field 2 (Goal) populates =====
    scheduleTimeout(() => {
      setState((prev) => ({
        ...prev,
        crmFields: prev.crmFields.map((field, idx) =>
          idx === 1 ? { ...field, isFilled: true, isFlashing: true } : field
        ),
      }));

      // Remove flash after duration
      scheduleTimeout(() => {
        setState((prev) => ({
          ...prev,
          crmFields: prev.crmFields.map((field, idx) =>
            idx === 1 ? { ...field, isFlashing: false } : field
          ),
        }));
      }, SIMULATION_TIMING.FLASH_DURATION);
    }, SIMULATION_TIMING.CRM_FIELD_2_AT);

    // ===== 7.5s: CRM Field 3 (Status - URGENT) populates =====
    scheduleTimeout(() => {
      setState((prev) => ({
        ...prev,
        crmFields: prev.crmFields.map((field, idx) =>
          idx === 2 ? { ...field, isFilled: true, isFlashing: true } : field
        ),
        transcriptComplete: true,
        isTyping: false,
      }));

      // Remove flash after duration
      scheduleTimeout(() => {
        setState((prev) => ({
          ...prev,
          crmFields: prev.crmFields.map((field, idx) =>
            idx === 2 ? { ...field, isFlashing: false } : field
          ),
        }));
      }, SIMULATION_TIMING.FLASH_DURATION);
    }, SIMULATION_TIMING.CRM_FIELD_3_AT);

    // ===== 8s: Transition to Stage 3 (Payoff) =====
    scheduleTimeout(() => {
      setState((prev) => ({
        ...prev,
        stage: "payoff",
      }));
    }, SIMULATION_TIMING.STAGE_3_TRANSITION_AT);
  }, [clearAllTimeouts, scheduleTimeout]);

  // ============================================================================
  // SKIP TO PAYOFF (for testing or user skip)
  // ============================================================================

  const skipToPayoff = useCallback(() => {
    clearAllTimeouts();
    setState({
      ...INITIAL_STATE,
      stage: "payoff",
      callState: "connected",
      crmFields: INITIAL_CRM_FIELDS.map((field) => ({
        ...field,
        isFilled: true,
        isFlashing: false,
      })),
      transcriptComplete: true,
    });
  }, [clearAllTimeouts]);

  // ============================================================================
  // CLEANUP ON UNMOUNT
  // ============================================================================

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  // ============================================================================
  // RETURN STATE & CONTROLS
  // ============================================================================

  const controls: SimulationControls = {
    startSimulation,
    resetSimulation,
    skipToPayoff,
  };

  return { state, controls };
}
