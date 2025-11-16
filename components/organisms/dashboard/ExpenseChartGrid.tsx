import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select } from '@/components/atoms/Select';
import { DashboardData } from '@/hooks/useDashboard';
import React from 'react';

type ExpenseChartCardProps = {
  dashboard: DashboardData;
};

function ExpenseChartCardComponent({ dashboard }: ExpenseChartCardProps) {
  const data = [
    { month: '1M', expense: dashboard.expenseOverview['1Month'], income: dashboard.thisMonthIncome },
    { month: '3M', expense: dashboard.expenseOverview['3Month'], income: dashboard.thisMonthIncome * 3 },
    { month: '6M', expense: dashboard.expenseOverview['6Month'], income: dashboard.thisMonthIncome * 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Expense Overview</h3>
          <p className="text-sm text-slate-600">Last 6 months tracking</p>
        </div>
        <Select options={['Last 6 months', 'Last year', 'All time']} />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
              }}
            />
            <Area type="monotone" dataKey="income" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export const ExpenseChartCard = React.memo(ExpenseChartCardComponent, (prev, next) => prev.dashboard === next.dashboard);
