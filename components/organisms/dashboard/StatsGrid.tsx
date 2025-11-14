import { Wallet, CreditCard, TrendingDown, Users } from 'lucide-react';
import { StatCard } from '@/components/molecules/dashboard/StatCard';

const statsData = [
  { label: 'Total Balance', value: '$12,450.80', change: '+12.5%', trending: 'up' as const, icon: Wallet, gradient: 'from-teal-500 to-emerald-500' },
  { label: 'This Month', value: '$3,240.00', change: '+8.2%', trending: 'up' as const, icon: CreditCard, gradient: 'from-blue-500 to-cyan-500' },
  { label: 'Expenses', value: '$1,820.45', change: '-3.1%', trending: 'down' as const, icon: TrendingDown, gradient: 'from-rose-500 to-pink-500' },
  { label: 'Active Groups', value: '8', change: '+2', trending: 'up' as const, icon: Users, gradient: 'from-amber-500 to-orange-500' },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={stat.label} {...stat} delay={index * 0.1} />
      ))}
    </div>
  );
}