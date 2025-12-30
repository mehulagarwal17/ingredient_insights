'use client';

import { motion } from 'framer-motion';

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 perspective-1000">
      {/* Main rotating food icons */}
      <div className="relative w-32 h-32 preserve-3d">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 preserve-3d"
          animate={{ rotateY: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="url(#gradient1)" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b35" />
                  <stop offset="100%" stopColor="#f7931e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Middle rotating ring */}
        <motion.div
          className="absolute inset-0 preserve-3d"
          animate={{ rotateY: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50 10 Q 80 30, 85 60 Q 85 80, 70 90 Q 50 95, 50 95 Q 50 95, 30 90 Q 15 80, 15 60 Q 20 30, 50 10 Z"
                fill="url(#gradient2)"
              />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4caf50" />
                  <stop offset="100%" stopColor="#2e7d32" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Center pulsing element */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotateZ: [0, 180, 360],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-cyan-400 pulse-glow-3d" />
        </motion.div>
      </div>

      {/* Loading text with shimmer */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold neon-text mb-2">Analyzing Ingredients</h3>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating food particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 3 === 0
                ? 'rgba(255, 107, 53, 0.3)'
                : i % 3 === 1
                  ? 'rgba(76, 175, 80, 0.3)'
                  : 'rgba(0, 255, 255, 0.3)'
                } 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.5, 1],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
