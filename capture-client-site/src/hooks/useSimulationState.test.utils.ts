/**
 * Testing Utilities for Simulation State Hook
 *
 * Use these utilities to validate timing, test state transitions,
 * and debug the simulation sequence.
 */

import { SIMULATION_TIMING } from './useSimulationState';

// ============================================================================
// TIMING VALIDATION
// ============================================================================

/**
 * Validates that all timing values are in correct order
 */
export function validateTimingSequence(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check sequential order
  if (SIMULATION_TIMING.CONNECT_AT < SIMULATION_TIMING.RING_DURATION) {
    errors.push('CONNECT_AT should be >= RING_DURATION');
  }

  if (SIMULATION_TIMING.TRANSCRIPT_START_AT <= SIMULATION_TIMING.CONNECT_AT) {
    errors.push('TRANSCRIPT_START_AT should be > CONNECT_AT');
  }

  if (SIMULATION_TIMING.CRM_FIELD_1_AT <= SIMULATION_TIMING.TRANSCRIPT_START_AT) {
    errors.push('CRM_FIELD_1_AT should be > TRANSCRIPT_START_AT');
  }

  if (SIMULATION_TIMING.CRM_FIELD_2_AT <= SIMULATION_TIMING.CRM_FIELD_1_AT) {
    errors.push('CRM_FIELD_2_AT should be > CRM_FIELD_1_AT');
  }

  if (SIMULATION_TIMING.CRM_FIELD_3_AT <= SIMULATION_TIMING.CRM_FIELD_2_AT) {
    errors.push('CRM_FIELD_3_AT should be > CRM_FIELD_2_AT');
  }

  if (SIMULATION_TIMING.STAGE_3_TRANSITION_AT <= SIMULATION_TIMING.CRM_FIELD_3_AT) {
    errors.push('STAGE_3_TRANSITION_AT should be > CRM_FIELD_3_AT');
  }

  // Check minimum gaps
  const minGapMs = 500;
  const gaps = [
    {
      name: 'CONNECT → TRANSCRIPT',
      gap: SIMULATION_TIMING.TRANSCRIPT_START_AT - SIMULATION_TIMING.CONNECT_AT,
    },
    {
      name: 'TRANSCRIPT → CRM_1',
      gap: SIMULATION_TIMING.CRM_FIELD_1_AT - SIMULATION_TIMING.TRANSCRIPT_START_AT,
    },
    {
      name: 'CRM_1 → CRM_2',
      gap: SIMULATION_TIMING.CRM_FIELD_2_AT - SIMULATION_TIMING.CRM_FIELD_1_AT,
    },
    {
      name: 'CRM_2 → CRM_3',
      gap: SIMULATION_TIMING.CRM_FIELD_3_AT - SIMULATION_TIMING.CRM_FIELD_2_AT,
    },
    {
      name: 'CRM_3 → PAYOFF',
      gap: SIMULATION_TIMING.STAGE_3_TRANSITION_AT - SIMULATION_TIMING.CRM_FIELD_3_AT,
    },
  ];

  gaps.forEach(({ name, gap }) => {
    if (gap < minGapMs) {
      errors.push(`${name} gap is too short (${gap}ms < ${minGapMs}ms)`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// TIMING CALCULATOR
// ============================================================================

/**
 * Calculate total simulation duration
 */
export function calculateTotalDuration(): number {
  return SIMULATION_TIMING.STAGE_3_TRANSITION_AT;
}

/**
 * Get human-readable timing breakdown
 */
export function getTimingBreakdown() {
  const formatTime = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

  return {
    totalDuration: formatTime(calculateTotalDuration()),
    events: [
      { time: formatTime(0), event: 'Stage 2 begins - Phone ringing' },
      { time: formatTime(SIMULATION_TIMING.CONNECT_AT), event: 'Phone connects' },
      { time: formatTime(SIMULATION_TIMING.TRANSCRIPT_START_AT), event: 'Transcript starts' },
      { time: formatTime(SIMULATION_TIMING.CRM_FIELD_1_AT), event: 'CRM Field 1 (Name)' },
      { time: formatTime(SIMULATION_TIMING.CRM_FIELD_2_AT), event: 'CRM Field 2 (Goal)' },
      { time: formatTime(SIMULATION_TIMING.CRM_FIELD_3_AT), event: 'CRM Field 3 (Status)' },
      { time: formatTime(SIMULATION_TIMING.STAGE_3_TRANSITION_AT), event: 'Stage 3 transition' },
    ],
  };
}

// ============================================================================
// MOCK TIMER FOR TESTING
// ============================================================================

/**
 * Mock timer that allows fast-forwarding through simulation
 * Useful for automated tests
 */
export class SimulationMockTimer {
  private currentTime = 0;
  private callbacks: Array<{ time: number; callback: () => void }> = [];

  scheduleCallback(callback: () => void, delay: number) {
    this.callbacks.push({
      time: this.currentTime + delay,
      callback,
    });
    this.callbacks.sort((a, b) => a.time - b.time);
  }

  advanceTo(targetTime: number) {
    while (this.callbacks.length > 0 && this.callbacks[0].time <= targetTime) {
      const next = this.callbacks.shift()!;
      this.currentTime = next.time;
      next.callback();
    }
    this.currentTime = targetTime;
  }

  advanceBy(deltaMs: number) {
    this.advanceTo(this.currentTime + deltaMs);
  }

  reset() {
    this.currentTime = 0;
    this.callbacks = [];
  }

  getCurrentTime() {
    return this.currentTime;
  }
}

// ============================================================================
// STATE SNAPSHOT LOGGER
// ============================================================================

/**
 * Logs state changes at each timing milestone
 * Useful for debugging
 */
export function createStateLogger() {
  const log: Array<{ time: number; state: string; description: string }> = [];

  return {
    log(time: number, state: string, description: string) {
      log.push({ time, state, description });
      console.log(`[${(time / 1000).toFixed(1)}s] ${state}: ${description}`);
    },
    getLog() {
      return log;
    },
    clear() {
      log.length = 0;
    },
    printSummary() {
      console.table(log);
    },
  };
}

// ============================================================================
// PERFORMANCE CHECKER
// ============================================================================

/**
 * Measures actual vs expected timing in browser
 */
export class TimingPerformanceChecker {
  private startTime: number = 0;
  private measurements: Array<{ expected: number; actual: number; event: string }> = [];

  start() {
    this.startTime = performance.now();
    this.measurements = [];
  }

  measure(event: string, expectedMs: number) {
    const actual = performance.now() - this.startTime;
    this.measurements.push({
      expected: expectedMs,
      actual,
      event,
    });
  }

  getResults() {
    return this.measurements.map(m => ({
      event: m.event,
      expected: `${m.expected}ms`,
      actual: `${m.actual.toFixed(0)}ms`,
      drift: `${(m.actual - m.expected).toFixed(0)}ms`,
      accuracy: `${((m.actual / m.expected) * 100).toFixed(1)}%`,
    }));
  }

  printResults() {
    console.log('⏱️ Timing Performance Analysis');
    console.table(this.getResults());

    const avgDrift =
      this.measurements.reduce((sum, m) => sum + Math.abs(m.actual - m.expected), 0) /
      this.measurements.length;
    console.log(`Average drift: ${avgDrift.toFixed(0)}ms`);
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example: Validate timing configuration
 */
export function exampleValidateTiming() {
  const result = validateTimingSequence();
  if (result.valid) {
    console.log('✅ Timing sequence is valid');
  } else {
    console.error('❌ Timing validation errors:');
    result.errors.forEach(err => console.error(`  - ${err}`));
  }
}

/**
 * Example: Print timing breakdown
 */
export function examplePrintBreakdown() {
  const breakdown = getTimingBreakdown();
  console.log(`Total Duration: ${breakdown.totalDuration}`);
  console.log('\nEvent Timeline:');
  breakdown.events.forEach(event => {
    console.log(`  ${event.time.padStart(5)} → ${event.event}`);
  });
}

/**
 * Example: Use performance checker
 */
export function examplePerformanceCheck() {
  const checker = new TimingPerformanceChecker();

  // In your component:
  checker.start();

  setTimeout(() => {
    checker.measure('Phone connect', SIMULATION_TIMING.CONNECT_AT);
  }, SIMULATION_TIMING.CONNECT_AT);

  setTimeout(() => {
    checker.measure('Transcript start', SIMULATION_TIMING.TRANSCRIPT_START_AT);
  }, SIMULATION_TIMING.TRANSCRIPT_START_AT);

  setTimeout(() => {
    checker.measure('CRM Field 1', SIMULATION_TIMING.CRM_FIELD_1_AT);
  }, SIMULATION_TIMING.CRM_FIELD_1_AT);

  setTimeout(() => {
    checker.printResults();
  }, SIMULATION_TIMING.STAGE_3_TRANSITION_AT + 100);
}

// ============================================================================
// AUTO-VALIDATION ON IMPORT (DEV ONLY)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  const validation = validateTimingSequence();
  if (!validation.valid) {
    console.warn('⚠️ Simulation timing validation failed:');
    validation.errors.forEach(err => console.warn(`  - ${err}`));
  }
}
