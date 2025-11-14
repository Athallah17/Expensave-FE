'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  icon?: LucideIcon;
  label: string;
  variant?: 'success' | 'danger' | 'info';
}

export function Badge({ icon: Icon, label, variant = 'info' }: BadgeProps) {
  const colors = {
    success: 'text-emerald-600',
    danger: 'text-rose-600',
    info: 'text-slate-600'
  };

  return (
    <div className={`flex items-center gap-1 text-sm font-semibold ${colors[variant]}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </div>
  );
}