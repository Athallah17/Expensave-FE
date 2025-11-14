'use client';

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { GradientIcon } from '@/components/atoms/GradientIcon';
import { Badge } from '@/components/atoms/Badge';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trending: 'up' | 'down';
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatCard({ label, value, change, trending, icon, gradient, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <GradientIcon icon={icon} gradient={gradient} />
        <Badge 
          icon={trending === 'up' ? TrendingUp : TrendingDown}
          label={change}
          variant={trending === 'up' ? 'success' : 'danger'}
        />
      </div>
      <p className="text-sm text-slate-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </motion.div>
  );
}