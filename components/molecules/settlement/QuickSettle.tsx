'use client';

import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

export function QuickSettleButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-amber-300 transition-shadow z-40"
    >
      <DollarSign className="w-7 h-7" />
    </motion.button>
  );
}