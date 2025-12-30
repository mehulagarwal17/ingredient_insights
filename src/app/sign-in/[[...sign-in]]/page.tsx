'use client';

import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';

export default function SignInPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center main-content-bg overflow-hidden">
            {/* Enhanced food-themed background decorations - matching home page */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Decorative food illustrations */}
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 opacity-20"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Spoon */}
                        <ellipse cx="50" cy="30" rx="15" ry="20" fill="#ff8533" opacity="0.6" />
                        <rect x="45" y="45" width="10" height="45" rx="5" fill="#ff8533" opacity="0.6" />
                    </svg>
                </motion.div>

                <motion.div
                    className="absolute top-40 right-20 w-24 h-24 opacity-20"
                    animate={{
                        y: [0, 18, 0],
                        rotate: [0, -8, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Bowl */}
                        <path
                            d="M20 40 Q 20 70, 50 80 Q 80 70, 80 40 L 20 40 Z"
                            fill="#6fad3d"
                            opacity="0.5"
                        />
                        <ellipse cx="50" cy="40" rx="30" ry="8" fill="#6fad3d" opacity="0.6" />
                    </svg>
                </motion.div>

                <motion.div
                    className="absolute bottom-32 left-1/4 w-16 h-16 opacity-20"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Leaf */}
                        <path
                            d="M50 10 Q 75 30, 80 55 Q 80 75, 65 85 Q 50 90, 50 90 Q 50 90, 35 85 Q 20 75, 20 55 Q 25 30, 50 10 Z"
                            fill="#6fad3d"
                            opacity="0.5"
                        />
                    </svg>
                </motion.div>

                {/* Additional decorative elements */}
                <motion.div
                    className="absolute top-1/3 right-10 w-20 h-20 opacity-15"
                    animate={{
                        y: [0, 12, 0],
                        x: [0, 5, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Carrot */}
                        <path
                            d="M50 20 L 45 80 Q 50 85, 55 80 L 50 20 Z"
                            fill="#ff8533"
                            opacity="0.6"
                        />
                        <path d="M50 15 L 45 25 M50 15 L 55 25 M50 15 L 50 25" stroke="#6fad3d" strokeWidth="2" opacity="0.6" />
                    </svg>
                </motion.div>

                <motion.div
                    className="absolute bottom-1/4 right-1/3 w-18 h-18 opacity-15"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Tomato */}
                        <circle cx="50" cy="55" r="25" fill="#f26d4f" opacity="0.6" />
                        <path d="M45 30 Q 50 25, 55 30" stroke="#6fad3d" strokeWidth="3" fill="none" opacity="0.6" />
                    </svg>
                </motion.div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%">
                        <defs>
                            <pattern id="food-pattern-signin" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="20" cy="20" r="2" fill="#ff8533" />
                                <circle cx="60" cy="60" r="2" fill="#6fad3d" />
                                <circle cx="80" cy="30" r="2" fill="#f26d4f" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#food-pattern-signin)" />
                    </svg>
                </div>
            </div>

            {/* Content - Perfectly centered */}
            <div className="relative z-10 w-full max-w-lg px-6">
                {/* Header Section with improved spacing */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            color: 'hsl(25, 30%, 15%)',
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                    >
                        Welcome Back
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-md mx-auto leading-relaxed"
                        style={{ color: 'hsl(25, 20%, 35%)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Sign in to continue your healthy food journey
                    </motion.p>
                </motion.div>

                {/* Sign-in Card with enhanced styling */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
                    className="mb-8"
                >
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "mx-auto w-full",
                                card: "shadow-2xl border-2 border-primary/10 rounded-3xl bg-card/98 backdrop-blur-md px-8 py-10",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton: "bg-primary/10 hover:bg-primary/20 text-foreground border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-xl font-medium py-3",
                                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md rounded-xl font-semibold py-3",
                                footerActionLink: "text-primary hover:text-primary/80 font-medium transition-colors",
                                formFieldInput: "border-2 border-border focus:border-primary rounded-xl transition-all duration-200 py-3 px-4",
                                formFieldLabel: "text-foreground font-medium mb-2",
                                dividerLine: "bg-border",
                                dividerText: "text-muted-foreground font-medium",
                                identityPreviewText: "text-foreground",
                                identityPreviewEditButton: "text-primary hover:text-primary/80 transition-colors",
                                footer: "mt-6",
                            },
                            layout: {
                                socialButtonsPlacement: "top",
                                socialButtonsVariant: "blockButton",
                            }
                        }}
                    />
                </motion.div>

                {/* Feature highlights with better spacing */}
                <motion.div
                    className="text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
                        <p className="text-sm md:text-base font-medium" style={{ color: 'hsl(25, 20%, 35%)' }}>
                            🌿 Decode ingredients • ⚡ Instant insights • ❤️ Healthier choices
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
