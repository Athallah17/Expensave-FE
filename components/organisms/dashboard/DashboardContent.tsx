"use client";

import { motion } from "framer-motion";
import { StatsGrid } from "./StatsGrid";
import { ExpenseChartCard } from "./ExpenseChartGrid";
import { CategoryPieChartCard } from "./PieChart";
import { LatestExpensesCard } from "./LatestExpense";
import { TopCategoriesCard } from "./TopCategories";
import { QuickActionsCard } from "./QuickAction";
import { useDashboardContext } from "@/context/DashboardContext";

export const DashboardContent = () => {
  const { data, loading, error } = useDashboardContext();

  if (loading) return <p className="text-center text-lg">Loading dashboard...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;
  if (!data) return <p className="text-center text-lg">No dashboard data available</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <StatsGrid dashboard={data} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ExpenseChartCard dashboard={data} />
          </div>
          <CategoryPieChartCard dashboard={data} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LatestExpensesCard dashboard={data} />
          </div>
          <div className="space-y-6">
            <TopCategoriesCard dashboard={data} />
            <QuickActionsCard />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
