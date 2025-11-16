'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { CategoryRow } from '@/components/molecules/dashboard/Category';
import { DashboardData } from '@/hooks/useDashboard';

type TopCategoriesCardProps = {
  dashboard: DashboardData;
};

// Simple mapping from category to color
const categoryColors: Record<string, string> = {
  Food: 'bg-teal-500',
  Foods: 'bg-teal-500',
  Shopping: 'bg-rose-500',
  Transport: 'bg-amber-500',
  Entertainment: 'bg-purple-500',
  Tools: 'bg-gray-400',
  Supplies: 'bg-gray-300',
  Others: 'bg-gray-200',
};

function TopCategoriesCardComponent({ dashboard }: TopCategoriesCardProps) {
  const topCategories = dashboard.topCategoriesMonthly || [];

  // Calculate total for percentage
  const total = topCategories.reduce(
    (acc, item) => acc + (item._sum?.amount || 0),
    0
  );

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
        {topCategories.map((category, index) => {
          const amount = category._sum?.amount || 0;
          const percentage = total ? Math.round((amount / total) * 100) : 0;
          const color = categoryColors[category.category] || categoryColors['Others'];

          return (
            <CategoryRow
              key={category.category}
              name={category.category}
              amount={amount}
              percentage={percentage}
              color={color}
              delay={0.8 + index * 0.1}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

// 🚀 MEMOIZED
export const TopCategoriesCard = React.memo(
  TopCategoriesCardComponent,
  (prev, next) => prev.dashboard === next.dashboard
);
