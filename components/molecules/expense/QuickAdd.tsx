'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function QuickAddButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: 90 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-violet-300 transition-shadow z-40"
    >
      <Plus className="w-7 h-7" />
    </motion.button>
  );
}