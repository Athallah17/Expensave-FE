'use client';

import { motion } from 'framer-motion';
import { Plus, Users, Calculator } from 'lucide-react';
import { QuickActionButton } from '@/components/molecules/dashboard/QuickAction';

const actions = [
  { label: 'Add Expense', icon: Plus, gradient: 'from-teal-500 to-emerald-500' },
  { label: 'New Group', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
  { label: 'Split Bill', icon: Calculator, gradient: 'from-purple-500 to-pink-500' },
];

export function QuickActionsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <QuickActionButton key={action.label} {...action} />
        ))}
      </div>
    </motion.div>
  );
}