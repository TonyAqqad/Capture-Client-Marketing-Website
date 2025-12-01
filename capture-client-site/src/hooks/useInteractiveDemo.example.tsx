/**
 * Example Usage: useInteractiveDemo Hook
 *
 * This file demonstrates how to use the useInteractiveDemo hook
 * to create an interactive AI voice demo component.
 */

'use client';

import React from 'react';
import { useInteractiveDemo, BusinessType } from './useInteractiveDemo';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveDemoExample() {
  const { state, controls } = useInteractiveDemo('plumbing');
  const [userInput, setUserInput] = React.useState('');

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    await controls.sendMessage(userInput);
    setUserInput(''); // Clear input after sending
  };

  // Handle business type change
  const handleBusinessTypeChange = (type: BusinessType) => {
    controls.setBusinessType(type);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Interactive AI Voice Demo
          </h1>
          <p className="text-slate-400">
            Experience how our AI receptionist handles real conversations
          </p>
        </div>

        {/* Business Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Business Type:
          </label>
          <div className="flex flex-wrap gap-2">
            {(['plumbing', 'dental', 'auto', 'hvac', 'law', 'general'] as BusinessType[]).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => handleBusinessTypeChange(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    state.businessType === type
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Conversation Panel */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
              Conversation
              <button
                onClick={controls.resetDemo}
                className="text-sm px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                Reset
              </button>
            </h2>

            {/* Message History */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {state.conversationHistory.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      message.role === 'ai'
                        ? 'bg-cyan-500/10 border border-cyan-500/20'
                        : 'bg-slate-700'
                    }`}
                  >
                    <div className="text-xs text-slate-400 mb-1">
                      {message.role === 'ai' ? 'AI Assistant' : 'Customer'}
                    </div>
                    <div className="text-sm">{message.text}</div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {state.isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                >
                  <div className="text-xs text-slate-400 mb-1">AI Assistant</div>
                  <div className="text-sm">{state.currentAiResponse}</div>
                </motion.div>
              )}
            </div>

            {/* Error Display */}
            {state.error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                {state.error}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="space-y-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message as a customer..."
                disabled={state.isLoading || state.isTyping}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={state.isLoading || state.isTyping || !userInput.trim()}
                className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors"
              >
                {state.isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Example Messages */}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-xs text-slate-400 mb-2">Try these examples:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Hi, I have a leak in my basement",
                  "My name is John Smith, phone is 555-0123",
                  "I need someone today, it's urgent",
                ].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setUserInput(example)}
                    className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CRM Panel */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              CRM Data (Auto-Captured)
            </h2>

            {/* Lead Score */}
            <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
              <div className="text-sm text-slate-400 mb-2">Lead Score</div>
              <div className="flex items-end gap-2">
                <div className="text-4xl font-bold text-cyan-400">
                  {state.leadScore}
                </div>
                <div className="text-slate-400 mb-1">/100</div>
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${state.leadScore}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* CRM Fields */}
            <div className="space-y-3">
              {state.crmFields.map((field) => (
                <motion.div
                  key={field.id}
                  animate={{
                    scale: field.isFlashing ? [1, 1.02, 1] : 1,
                    borderColor: field.isFlashing
                      ? ['rgba(6, 182, 212, 0.3)', 'rgba(6, 182, 212, 0.8)', 'rgba(6, 182, 212, 0.3)']
                      : field.isFilled
                      ? 'rgba(6, 182, 212, 0.3)'
                      : 'rgba(71, 85, 105, 0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    field.isUrgent && field.isFilled
                      ? 'bg-orange-500/10'
                      : field.isFilled
                      ? 'bg-cyan-500/5'
                      : 'bg-slate-700/50'
                  }`}
                >
                  <div className="text-xs text-slate-400 mb-1">{field.label}</div>
                  {field.isFilled ? (
                    <div
                      className={`font-medium ${
                        field.isUrgent ? 'text-orange-400' : 'text-white'
                      }`}
                    >
                      {field.value}
                    </div>
                  ) : (
                    <div className="text-slate-500 italic">Not yet captured</div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Status Indicators */}
            <div className="mt-6 pt-6 border-t border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    state.isLoading
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : state.isTyping
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {state.isLoading
                    ? 'Processing...'
                    : state.isTyping
                    ? 'AI Responding...'
                    : 'Ready'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Messages:</span>
                <span className="text-white">
                  {state.conversationHistory.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-8 p-6 bg-slate-800 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-cyan-400 font-medium mb-2">1. Real-time Processing</div>
              <p className="text-slate-400">
                Messages are sent to our Claude-powered API that understands context and extracts lead data.
              </p>
            </div>
            <div>
              <div className="text-cyan-400 font-medium mb-2">2. Auto CRM Population</div>
              <p className="text-slate-400">
                As the AI converses, it automatically populates CRM fields with extracted information.
              </p>
            </div>
            <div>
              <div className="text-cyan-400 font-medium mb-2">3. Lead Scoring</div>
              <p className="text-slate-400">
                Each interaction updates the lead score based on urgency, engagement, and information provided.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
