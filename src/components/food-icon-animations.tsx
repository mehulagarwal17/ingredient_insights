'use client';

import { motion } from 'framer-motion';

interface FoodIconProps {
    type: 'apple' | 'leaf' | 'utensils' | 'chef-hat';
    className?: string;
    animate?: boolean;
}

export function FoodIcon({ type, className = '', animate = true }: FoodIconProps) {
    const animationClass = animate ? 'float-3d' : '';

    return (
        <motion.div
            className={`preserve-3d ${animationClass} ${className}`}
            initial={{ opacity: 0, rotateY: -180, z: -100 }}
            animate={{ opacity: 1, rotateY: 0, z: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
        >
            {type === 'apple' && (
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M50 10 C 30 10, 20 25, 20 40 C 20 65, 35 85, 50 90 C 65 85, 80 65, 80 40 C 80 25, 70 10, 50 10 Z"
                        fill="url(#appleGradient)"
                        className="drop-shadow-lg"
                    />
                    <path
                        d="M50 10 L 55 5 C 55 5, 60 8, 58 12"
                        stroke="url(#leafGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="appleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ff6b35" />
                            <stop offset="100%" stopColor="#f7931e" />
                        </linearGradient>
                        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4caf50" />
                            <stop offset="100%" stopColor="#8bc34a" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

            {type === 'leaf' && (
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M50 10 Q 80 30, 85 60 Q 85 80, 70 90 Q 50 95, 50 95 Q 50 95, 30 90 Q 15 80, 15 60 Q 20 30, 50 10 Z"
                        fill="url(#leafGradient2)"
                        className="drop-shadow-lg"
                    />
                    <path
                        d="M50 10 Q 50 50, 50 95"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <defs>
                        <linearGradient id="leafGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4caf50" />
                            <stop offset="100%" stopColor="#2e7d32" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

            {type === 'utensils' && (
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Fork */}
                    <path
                        d="M25 10 L 25 40 M 30 10 L 30 40 M 35 10 L 35 40 M 30 40 L 30 90"
                        stroke="url(#utensilGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    {/* Knife */}
                    <path
                        d="M65 10 L 65 30 L 70 35 L 65 40 L 65 90"
                        stroke="url(#utensilGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient id="utensilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="100%" stopColor="#00cccc" />
                        </linearGradient>
                    </defs>
                </svg>
            )}

            {type === 'chef-hat' && (
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <ellipse cx="50" cy="35" rx="30" ry="20" fill="url(#hatGradient)" />
                    <rect x="25" y="45" width="50" height="35" rx="5" fill="url(#hatGradient)" />
                    <defs>
                        <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" opacity="0.9" />
                            <stop offset="100%" stopColor="#e0e0e0" opacity="0.9" />
                        </linearGradient>
                    </defs>
                </svg>
            )}
        </motion.div>
    );
}

export function RotatingFoodIcon({ type, size = 64 }: { type: FoodIconProps['type']; size?: number }) {
    return (
        <div className="perspective-1000 inline-block">
            <FoodIcon type={type} className="rotate-3d-slow" animate={false} />
        </div>
    );
}
