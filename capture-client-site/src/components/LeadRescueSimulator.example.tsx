/**
 * LEAD RESCUE SIMULATOR - USAGE EXAMPLE
 *
 * This component demonstrates how to wire together the state management hooks
 * to create the 3-stage interactive simulator with precise timing.
 *
 * Copy this pattern into your actual LeadRescueSimulator component.
 */

import React from 'react';
import {
  useSimulationState,
  useTypewriter,
  SIMULATION_TIMING,
  type CRMField,
} from '@/hooks';

// ============================================================================
// TRANSCRIPT TEXT
// ============================================================================

const AI_TRANSCRIPT = `Hi, this is Emma from Capture AI. I see you're interested in growing your business. What's your name?

Sarah Mitchell.

Great to meet you, Sarah! What's your main business goal right now?

I want to scale from 3 to 10 locations by 2026.

That's ambitious! I'd love to help. Can I have someone follow up with you today?

Yes, please!`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LeadRescueSimulatorExample() {
  // Get simulation state and controls
  const { state, controls } = useSimulationState();

  // Typewriter effect for AI transcript
  const transcript = useTypewriter({
    text: AI_TRANSCRIPT,
    isActive: state.isTyping,
    speed: 45, // Natural speaking pace
    onComplete: () => {
      console.log('Transcript complete!');
    },
  });

  // ============================================================================
  // RENDER: STAGE 1 - SETUP
  // ============================================================================

  if (state.stage === 'setup') {
    return (
      <div className="simulator-container">
        <div className="stage-1-setup">
          <h2>Stage 1: Setup</h2>
          <p>Your competitor misses a call...</p>

          <div className="scenario-preview">
            {/* Missed call animation */}
            <div className="phone-icon red">📞 MISSED</div>
            <p>9:47 AM - Sarah Mitchell (Inbound Lead)</p>
          </div>

          <button
            onClick={controls.startSimulation}
            className="cta-button"
          >
            Watch AI Capture This Lead
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: STAGE 2 - SIMULATION
  // ============================================================================

  if (state.stage === 'simulation') {
    return (
      <div className="simulator-container">
        <div className="stage-2-simulation">
          <h2>Stage 2: AI Voice Agent in Action</h2>

          <div className="simulation-grid">
            {/* LEFT: Phone + Transcript */}
            <div className="phone-section">
              {/* Phone Visual */}
              <div
                className={`phone-device ${
                  state.callState === 'ringing'
                    ? 'ringing orange-glow'
                    : 'connected cyan-glow'
                }`}
              >
                <div className="phone-icon">
                  📞
                  {state.callState === 'ringing' && (
                    <span className="status-text">Ringing...</span>
                  )}
                  {state.callState === 'connected' && (
                    <span className="status-text">Connected</span>
                  )}
                </div>

                {/* Audio Waveform */}
                {state.callState === 'connected' && (
                  <div className="audio-waveform">
                    <div className="wave-bar" />
                    <div className="wave-bar" />
                    <div className="wave-bar" />
                    <div className="wave-bar" />
                    <div className="wave-bar" />
                  </div>
                )}
              </div>

              {/* Transcript Box */}
              <div className="transcript-box">
                <h3>Live Transcript</h3>
                <div className="transcript-content">
                  {transcript.displayText}
                  {state.isTyping && <span className="cursor">|</span>}
                </div>
                <div className="transcript-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${transcript.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: CRM Integration */}
            <div className="crm-section">
              <h3>CRM Auto-Population</h3>
              <div className="crm-fields">
                {state.crmFields.map((field) => (
                  <CRMFieldDisplay key={field.id} field={field} />
                ))}
              </div>

              <div className="crm-footer">
                <div className="sync-indicator">
                  {state.crmFields.some(f => f.isFilled) && (
                    <span className="sync-active">⚡ Syncing live...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Debug Controls (remove in production) */}
          <div className="debug-controls">
            <button onClick={controls.skipToPayoff} className="skip-button">
              Skip to Payoff →
            </button>
            <button onClick={controls.resetSimulation} className="reset-button">
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: STAGE 3 - PAYOFF
  // ============================================================================

  if (state.stage === 'payoff') {
    return (
      <div className="simulator-container">
        <div className="stage-3-payoff">
          <h2>Stage 3: Lead Captured ✓</h2>

          <div className="payoff-content">
            <div className="success-icon">✨</div>
            <h3>Perfect Lead Qualification in 8 Seconds</h3>

            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value">$12,000</div>
                <div className="metric-label">Potential LTV</div>
              </div>
              <div className="metric">
                <div className="metric-value">8 sec</div>
                <div className="metric-label">Call Duration</div>
              </div>
              <div className="metric">
                <div className="metric-value">100%</div>
                <div className="metric-label">Capture Rate</div>
              </div>
            </div>

            <div className="cta-section">
              <p className="payoff-message">
                While your competitors miss calls, your AI agent captures every lead.
                24/7. No breaks. No missed opportunities.
              </p>

              <button className="primary-cta">
                Get Your AI Voice Agent
              </button>

              <button
                onClick={controls.resetSimulation}
                className="secondary-cta"
              >
                Watch Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================================
// CRM FIELD DISPLAY COMPONENT
// ============================================================================

interface CRMFieldDisplayProps {
  field: CRMField;
}

function CRMFieldDisplay({ field }: CRMFieldDisplayProps) {
  return (
    <div
      className={`crm-field ${field.isFilled ? 'filled' : 'empty'} ${
        field.isFlashing ? 'flashing' : ''
      } ${field.isUrgent ? 'urgent' : ''}`}
    >
      <div className="field-label">{field.label}</div>
      <div className="field-value">
        {field.isFilled ? (
          <>
            {field.value}
            {field.isFlashing && <span className="flash-indicator">✓</span>}
          </>
        ) : (
          <span className="placeholder">—</span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE STYLES (Move to CSS file in production)
// ============================================================================

const exampleStyles = `
.simulator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Phone Device */
.phone-device {
  width: 200px;
  height: 400px;
  border-radius: 2rem;
  border: 4px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.phone-device.ringing.orange-glow {
  border-color: #ff6b35;
  box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  animation: pulse-orange 1s infinite;
}

.phone-device.connected.cyan-glow {
  border-color: #00d9ff;
  box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
}

@keyframes pulse-orange {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 107, 53, 0.7); }
}

/* Audio Waveform */
.audio-waveform {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 40px;
  margin-top: 1rem;
}

.wave-bar {
  width: 4px;
  background: #00d9ff;
  border-radius: 2px;
  animation: wave 1.2s ease-in-out infinite;
}

.wave-bar:nth-child(1) { animation-delay: 0s; }
.wave-bar:nth-child(2) { animation-delay: 0.1s; }
.wave-bar:nth-child(3) { animation-delay: 0.2s; }
.wave-bar:nth-child(4) { animation-delay: 0.3s; }
.wave-bar:nth-child(5) { animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% { height: 10px; }
  50% { height: 40px; }
}

/* CRM Fields */
.crm-field {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #333;
  transition: all 0.4s ease;
}

.crm-field.filled {
  background: rgba(0, 217, 255, 0.1);
  border-color: #00d9ff;
  animation: field-fade-in 0.4s ease;
}

.crm-field.flashing {
  animation: flash 0.6s ease;
}

.crm-field.urgent {
  border-color: #ff6b35;
  background: rgba(255, 107, 53, 0.1);
}

@keyframes field-fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flash {
  0%, 100% { background: rgba(0, 217, 255, 0.1); }
  50% { background: rgba(0, 217, 255, 0.4); }
}

/* Transcript */
.transcript-box {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  min-height: 200px;
}

.transcript-content {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #00d9ff;
  white-space: pre-wrap;
}

.cursor {
  animation: blink 1s infinite;
  color: #00d9ff;
  font-weight: bold;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.transcript-progress {
  margin-top: 1rem;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00d9ff, #ff6b35);
  transition: width 0.1s linear;
}
`;
