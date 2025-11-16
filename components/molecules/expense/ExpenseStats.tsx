'use client';

import dayjs from 'dayjs';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

interface Expense {
  amount: number;
  createdAt: string;
}

interface ExpenseStatsProps {
  expenses: Expense[];
}

export function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const { formatCurrency } = useCurrency();

  // ---- All Calculations ----
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const thisMonth = expenses
    .filter(e => dayjs(e.createdAt).isSame(dayjs(), 'month'))
    .reduce((sum, e) => sum + e.amount, 0);

  const daysInMonth = dayjs().daysInMonth();
  const avgPerDay = thisMonth / daysInMonth;

  return (
    <div className="grid grid-cols-3 gap-4 space-y-6">
      {/* Total */}
      <div className="bg-gradient-to-br from-blue-50 to-red-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-violet-600 mb-2">
          <Wallet className="w-4 h-4" />
          <span className="text-xs font-semibold">Total</span>
        </div>
        <p className="text-xl font-bold text-slate-800">
          {formatCurrency(totalExpenses)}
        </p>
      </div>

      {/* This Month */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-rose-600 mb-2">
          <TrendingDown className="w-4 h-4" />
          <span className="text-xs font-semibold">This Month</span>
        </div>
        <p className="text-xl font-bold text-slate-800">
          {formatCurrency(thisMonth)}
        </p>
      </div>

      {/* Average Per Day */}
      <div className="bg-gradient-to-br from-indigo-100 to-gray-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-indigo-600 mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-semibold">Avg/Day</span>
        </div>
        <p className="text-xl font-bold text-slate-800">
          {formatCurrency(avgPerDay)}
        </p>
      </div>
    </div>
  );
}