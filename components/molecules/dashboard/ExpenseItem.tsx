'use client';

import { motion } from 'framer-motion';
import { LucideIcon, MoreVertical } from 'lucide-react';

interface ExpenseItemProps {
  title: string;
  category: string;
  amount: number;
  date: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export function ExpenseItem({ title, category, amount, date, icon: Icon, color, delay = 0 }: ExpenseItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl hover:bg-white/80 transition-all cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 truncate">{title}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-rose-600">{amount.toFixed(2)}</p>
        <p className="text-xs text-slate-500">{category}</p>
      </div>
      <button className="text-slate-400 hover:text-slate-600">
        <MoreVertical className="w-5 h-5" />
      </button>
    </motion.div>
  );
}