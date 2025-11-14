'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StatsGrid } from '@/components/organisms/dashboard/StatsGrid';
import { ExpenseChartCard } from '@/components/organisms/dashboard/ExpenseChartGrid';
import { CategoryPieChartCard } from '@/components/organisms/dashboard/PieChart';
import { LatestExpensesCard } from '@/components/organisms/dashboard/LatestExpense';
import { TopCategoriesCard } from '@/components/organisms/dashboard/TopCategories';
import { QuickActionsCard } from '@/components/organisms/dashboard/QuickAction';
export const DashboardContent = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <StatsGrid />
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ExpenseChartCard />
          </div>
          <CategoryPieChartCard />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LatestExpensesCard />
          </div>
          <div className="space-y-6">
            <TopCategoriesCard />
            <QuickActionsCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
