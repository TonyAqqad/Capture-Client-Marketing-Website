'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AudioWaveformProps {
  isActive: boolean;
  color: 'orange' | 'cyan';
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isActive, color }) => {
  const [bars] = useState(() => Array.from({ length: 24 }, (_, i) => i));

  const colorClasses = {
    orange: {
      bar: 'bg-orange-500',
      glow: 'shadow-orange-500/50',
      filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))',
    },
    cyan: {
      bar: 'bg-cyan-400',
      glow: 'shadow-cyan-400/50',
      filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.7))',
    },
  };

  const currentColor = colorClasses[color];

  // Generate natural speech-like random heights
  const getRandomHeight = (index: number, time: number) => {
    if (!isActive) {
      // Gentle idle pulsing
      return 20 + Math.sin(time * 0.002 + index * 0.3) * 10;
    }

    // Complex speech simulation with multiple sine waves
    const primary = Math.sin(time * 0.003 + index * 0.5) * 30;
    const secondary = Math.sin(time * 0.005 + index * 0.8) * 20;
    const tertiary = Math.sin(time * 0.007 + index * 1.2) * 15;
    const random = Math.random() * 10;

    return 25 + Math.abs(primary + secondary + tertiary + random);
  };

  return (
    <div className="flex items-center justify-center gap-[3px] h-20 px-4">
      {bars.map((index) => {
        // Create varied animation delays for natural effect
        const delay = index * 0.02;
        const duration = isActive
          ? 0.15 + (index % 3) * 0.05 // Faster, varied for speech
          : 1.2 + (index % 4) * 0.2;   // Slower, gentle for ringing

        return (
          <motion.div
            key={index}
            className={`w-1 rounded-full ${currentColor.bar} ${currentColor.glow}`}
            style={{
              filter: currentColor.filter,
            }}
            initial={{ height: '20%' }}
            animate={{
              height: isActive
                ? [
                    '20%',
                    `${30 + Math.random() * 50}%`,
                    `${25 + Math.random() * 60}%`,
                    `${20 + Math.random() * 55}%`,
                    '20%',
                  ]
                : [
                    '15%',
                    `${20 + (index % 5) * 5}%`,
                    '15%',
                  ],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: isActive ? 'easeInOut' : 'easeInOut',
              times: isActive ? [0, 0.2, 0.5, 0.8, 1] : [0, 0.5, 1],
            }}
          />
        );
      })}
    </div>
  );
};

export default AudioWaveform;
