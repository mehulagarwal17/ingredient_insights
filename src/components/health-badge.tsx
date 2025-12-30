'use client';

import { motion } from 'framer-motion';
import { Apple, Leaf, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface HealthBadgeProps {
    variant: 'good' | 'caution' | 'avoid' | 'unknown';
    label: string;
    icon?: boolean;
}

export function HealthBadge({ variant, label, icon = true }: HealthBadgeProps) {
    const icons = {
        good: CheckCircle,
        caution: AlertTriangle,
        avoid: AlertTriangle,
        unknown: HelpCircle,
    };

    const Icon = icons[variant];

    return (
        <motion.div
            className={`health-badge health-badge-${variant}`}
            initial={{ opacity: 0, scale: 0.8, z: -50 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            whileHover={{ scale: 1.1, z: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {icon && <Icon className="w-4 h-4" />}
            <span>{label}</span>
        </motion.div>
    );
}
