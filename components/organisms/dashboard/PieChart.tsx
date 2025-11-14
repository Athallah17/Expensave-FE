'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CategoryLegendItem } from '@/components/molecules/dashboard/CategoryLegend';

const pieData = [
  { name: 'Food', value: 450, color: '#14b8a6' },
  { name: 'Transport', value: 280, color: '#f59e0b' },
  { name: 'Shopping', value: 350, color: '#f43f5e' },
  { name: 'Entertainment', value: 180, color: '#8b5cf6' },
  { name: 'Others', value: 140, color: '#6366f1' },
];

export function CategoryPieChartCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
    >
      <h3 className="text-lg font-bold text-slate-800 mb-6">Spending by Category</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #e2e8f0', borderRadius: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-4">
        {pieData.map((category) => (
          <CategoryLegendItem key={category.name} {...category} />
        ))}
      </div>
    </motion.div>
  );
}