'use client';

import { motion } from 'framer-motion';
import { LucideIcon, MoreVertical } from 'lucide-react';
import { CategoryBadge } from '@/components/atoms/CategoryBadges';
import { useCurrency } from '@/hooks/useCurrency';
import { AmountDisplay } from '@/components/atoms/AmountDisplay';
import { DateBadge } from '@/components/atoms/DateBadge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export interface ExpenseCardData {
  id: string;
  title: string;
  amount: number;
  category: string;
  categoryIcon: LucideIcon;
  categoryColor: string;
  createdAt?: string;
  date: string;
  paidBy: string;
  group?: string;
  receipt?: boolean;
}

interface ExpenseCardProps {
  expense: ExpenseCardData;
  delay?: number;
  onClick: () => void;
}

export function ExpenseCard({ expense, delay = 0, onClick }: ExpenseCardProps) {
  const { currency } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      onClick={onClick}
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-md cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 text-sm mb-1 truncate group-hover:text-violet-600 transition-colors">
            {expense.title}
          </h3>

          <CategoryBadge
            icon={expense.categoryIcon}
            label={expense.category}
            color={expense.categoryColor}
          />
        </div>

        <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 ml-2">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <DateBadge date={expense.date} />
        <AmountDisplay
          amount={expense.amount}
          currency={currency}
          size="lg"
        />
      </div>

      {expense.group && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Group: <span className="font-semibold text-slate-700">{expense.group}</span>
          </p>
        </div>
      )}
    </motion.div>
  );
}
