import { motion } from 'framer-motion';
import { ShoppingBag, Coffee, Car, Film } from 'lucide-react';
import { ExpenseItem } from '@/components/molecules/dashboard/ExpenseItem';
import { DashboardData } from '@/hooks/useDashboard';
import React from 'react';

type LatestExpensesCardProps = {
  dashboard: DashboardData;
};

const categoryMap: Record<string, { icon: any; color: string }> = {
  Food: { icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  Foods: { icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  Transport: { icon: Car, color: 'bg-blue-100 text-blue-600' },
  Shopping: { icon: ShoppingBag, color: 'bg-teal-100 text-teal-600' },
  Entertainment: { icon: Film, color: 'bg-purple-100 text-purple-600' },
  Tools: { icon: ShoppingBag, color: 'bg-gray-100 text-gray-600' },
  Supplies: { icon: ShoppingBag, color: 'bg-gray-100 text-gray-600' },
};

function LatestExpensesCardComponent({ dashboard }: LatestExpensesCardProps) {
  const latestExpenses = dashboard.latestExpenses || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Latest Expenses</h3>
        <button className="text-sm font-medium text-teal-600 hover:text-teal-700">View All</button>
      </div>
      <div className="space-y-3">
        {latestExpenses.map((expense, index) => {
          const cat = categoryMap[expense.category] || { icon: ShoppingBag, color: 'bg-gray-100 text-gray-600' };
          return (
            <ExpenseItem
              key={expense.id}
              id={expense.id}
              title={expense.title || expense.description || 'No Title'}
              category={expense.category || 'Others'}
              amount={expense.amount}
              date={new Date(expense.createdAt).toLocaleString()}
              icon={cat.icon}
              color={cat.color}
              delay={0.7 + index * 0.1}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

export const LatestExpensesCard = React.memo(LatestExpensesCardComponent, (prev, next) => prev.dashboard === next.dashboard);
