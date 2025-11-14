'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  label: string;
  icon: LucideIcon;
  gradient: string;
  onClick?: () => void;
}

export function QuickActionButton({ label, icon: Icon, gradient, onClick }: QuickActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 bg-gradient-to-r ${gradient} text-white rounded-2xl font-semibold shadow-lg`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </motion.button>
  );
}