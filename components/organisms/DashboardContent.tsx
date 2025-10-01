"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/atoms/Card";
import { SkeletonCard } from "@/components/atoms/SkeletonCard";
import { ChartCard } from "@/components/molecules/ChartCard";
import { QuickActions } from "@/components/molecules/QuickActions";

export const DashboardContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const monthlyData = [
    { month: "Jan", expense: 300 },
    { month: "Feb", expense: 450 },
    { month: "Mar", expense: 200 },
    { month: "Apr", expense: 500 },
    { month: "May", expense: 350 },
    { month: "Jun", expense: 600 },
  ];

  const pieData = [
    { name: "Food", value: 400 },
    { name: "Travel", value: 300 },
  ];

  return (
    <div className="space-y-6">
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="My Groups">
          {loading ? <SkeletonCard /> : <p>View and manage your groups</p>}
        </Card>
        <Card title="Recent Expenses">
          {loading ? <SkeletonCard /> : <p>Track your expenses and split bills</p>}
        </Card>
        <Card title="Pending Settlements">
          {loading ? <SkeletonCard /> : <p>Check unsettled bills</p>}
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Monthly Expenses" type="line" data={monthlyData} />
        <ChartCard title="Expense Breakdown" type="pie" data={pieData} />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};
