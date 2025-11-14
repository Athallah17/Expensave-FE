import { motion } from 'framer-motion';
import React from 'react';
import { Wallet, CreditCard, TrendingDown, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  {
    label: 'Total Balance',
    value: '$12,450.80',
    change: '+12.5%',
    trending: 'up',
    icon: Wallet,
    color: 'from-teal-500 to-emerald-500',
  },
  {
    label: 'This Month',
    value: '$3,240.00',
    change: '+8.2%',
    trending: 'up',
    icon: CreditCard,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'Expenses',
    value: '$1,820.45',
    change: '-3.1%',
    trending: 'down',
    icon: TrendingDown,
    color: 'from-rose-500 to-pink-500',
  },
  {
    label: 'Active Groups',
    value: '8',
    change: '+2',
    trending: 'up',
    icon: Users,
    color: 'from-amber-500 to-orange-500',
  },
];

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const TrendIcon = stat.trending === 'up' ? TrendingUp : TrendingDown;
  const IconComponent = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
    >
      <Card className="bg-white/80 backdrop-blur border border-white/60 shadow-lg rounded-xl w-full min-h-[180px] flex flex-col justify-between transition-all duration-200">
        <CardContent className="flex flex-col justify-between h-full p-5">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-20 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                stat.trending === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              <TrendIcon className="w-4 h-4" />
              {stat.change}
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-end">
            <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 truncate">{stat.value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const TopStats = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </div>
  );
};
