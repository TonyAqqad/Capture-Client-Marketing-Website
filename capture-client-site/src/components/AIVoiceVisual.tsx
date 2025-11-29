'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useTypingEffect } from '@/hooks/useTypingEffect';

interface Message {
  id: number;
  type: 'ai' | 'caller';
  text: string;
}

const messages: Message[] = [
  { id: 1, type: 'ai', text: 'Thank you for calling. How can I help you today?' },
  { id: 2, type: 'caller', text: "I'm interested in learning more about your services." },
  { id: 3, type: 'ai', text: "I'd be happy to help! Let me schedule a consultation..." },
];

export default function AIVoiceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const currentMessage = messages[currentMessageIndex];
  const displayedText = useTypingEffect({
    text: currentMessage?.text || '',
    speed: 30,
    isActive: isInView && isTyping,
  });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [isInView]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText === currentMessage?.text) {
      const timer = setTimeout(() => {
        if (currentMessageIndex < messages.length - 1) {
          setCurrentMessageIndex((prev) => prev + 1);
        } else {
          // Loop back to start
          setTimeout(() => {
            setCurrentMessageIndex(0);
          }, 2000);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [displayedText, currentMessage, currentMessageIndex, isTyping]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="glass p-8 rounded-2xl shadow-glow"
      >
        {/* Header with waveform */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="material-icons text-accent">phone_in_talk</span>
          </div>
          <div>
            <p className="text-foreground font-semibold">Active Call - 1:23</p>
            <p className="text-foreground-muted text-sm">+1 (555) 123-4567</p>
          </div>
          <div className="ml-auto">
            <Waveform isActive={isInView} />
          </div>
        </div>

        {/* Conversation */}
        <div className="space-y-4 min-h-[240px]">
          <AnimatePresence mode="wait">
            {messages.slice(0, currentMessageIndex + 1).map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.type === 'ai' ? -20 : 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className={
                  msg.type === 'ai'
                    ? 'bg-primary/10 border border-primary/20 rounded-lg p-4'
                    : 'bg-surface/50 border border-surface-border rounded-lg p-4'
                }
              >
                <p className="text-foreground-muted text-sm mb-1">
                  {msg.type === 'ai' ? 'AI Agent:' : 'Caller:'}
                </p>
                <p className="text-foreground">
                  {index === currentMessageIndex ? (
                    <>
                      {displayedText}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        className="inline-block w-0.5 h-4 bg-accent ml-1"
                      />
                    </>
                  ) : (
                    msg.text
                  )}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* AI Analysis Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 pt-6 border-t border-surface-border"
        >
          <div className="flex items-center gap-2 text-sm text-foreground-muted">
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="material-icons text-accent text-lg"
            >
              auto_awesome
            </motion.span>
            <span>AI analyzing conversation tone and intent...</span>
            <ScanningEffect isActive={isInView} />
          </div>
        </motion.div>

        {/* Floating particles */}
        <FloatingParticles isActive={isInView} />
      </motion.div>
    </div>
  );
}

function Waveform({ isActive }: { isActive: boolean }) {
  const bars = [8, 6, 10, 7, 9, 6, 8, 7];

  return (
    <div className="flex gap-1 items-center h-10">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          animate={
            isActive
              ? {
                  height: [`${height * 4}px`, `${height * 6}px`, `${height * 4}px`],
                }
              : { height: `${height * 4}px` }
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.1,
          }}
          className="w-1 bg-accent rounded-full"
        />
      ))}
    </div>
  );
}

function ScanningEffect({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-16 h-1 bg-surface/50 rounded-full overflow-hidden ml-2">
      <motion.div
        animate={
          isActive
            ? {
                x: ['-100%', '200%'],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
      />
    </div>
  );
}

function FloatingParticles({ isActive }: { isActive: boolean }) {
  const particles = [
    { x: '10%', y: '20%', delay: 0 },
    { x: '80%', y: '30%', delay: 1 },
    { x: '15%', y: '70%', delay: 2 },
    { x: '85%', y: '80%', delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isActive
              ? {
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  y: [0, -30, 0],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
          }}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
          }}
          className="w-2 h-2 bg-accent/50 rounded-full blur-sm"
        />
      ))}
    </div>
  );
}
