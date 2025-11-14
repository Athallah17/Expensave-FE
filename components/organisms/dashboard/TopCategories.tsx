'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { CategoryRow } from '@/components/molecules/dashboard/Category';

const categories = [
  { name: 'Food & Dining', amount: 450, percentage: 32, color: 'bg-teal-500' },
  { name: 'Shopping', amount: 350, percentage: 25, color: 'bg-rose-500' },
  { name: 'Transport', amount: 280, percentage: 20, color: 'bg-amber-500' },
  { name: 'Entertainment', amount: 180, percentage: 13, color: 'bg-purple-500' },
];

export function TopCategoriesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Top Categories</h3>
        <TrendingUp className="w-5 h-5 text-teal-600" />
      </div>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <CategoryRow key={category.name} {...category} delay={0.8 + index * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}