'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  color: string;
  delay?: number;
}

export function ProgressBar({ percentage, color, delay = 0 }: ProgressBarProps) {
  return (
    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ delay, duration: 0.8 }}
        className={`absolute top-0 left-0 h-full ${color} rounded-full`}
      />
    </div>
  );
}