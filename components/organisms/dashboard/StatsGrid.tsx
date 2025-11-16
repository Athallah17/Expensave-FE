import { Wallet, CreditCard, TrendingDown, Users } from "lucide-react";
import { StatCard } from "@/components/molecules/dashboard/StatCard";
import { DashboardData } from "@/hooks/useDashboard";
import React from "react";

type StatsGridProps = {
  dashboard: DashboardData;
};

function StatsGridComponent({ dashboard }: StatsGridProps) {
  if (!dashboard) return <p>Loading stats...</p>;

  const statsData = [
    {
      label: "Total Balance",
      value: `IDR${dashboard.totalBalance.toLocaleString()}`,
      change: "+12.5%",
      trending: "up" as const,
      icon: Wallet,
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      label: "This Month Income",
      value: `IDR${dashboard.thisMonthIncome.toLocaleString()}`,
      change: "+8.2%",
      trending: "up" as const,
      icon: CreditCard,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "Expenses This Month",
      value: `IDR${dashboard.thisMonthExpense.toLocaleString()}`,
      change: "-3.1%",
      trending: "down" as const,
      icon: TrendingDown,
      gradient: "from-rose-500 to-pink-500",
    },
    {
      label: "Active Groups",
      value: `${dashboard.activeGroupsCount}`,
      change: "+2",
      trending: "up" as const,
      icon: Users,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={stat.label} {...stat} delay={index * 0.1} />
      ))}
    </div>
  );
}

// Wrap with React.memo for performance optimization
export const StatsGrid = React.memo(StatsGridComponent, (prevProps, nextProps) => {
  // Only re-render if dashboard object reference changes
  return prevProps.dashboard === nextProps.dashboard;
});
