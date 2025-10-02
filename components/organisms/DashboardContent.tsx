"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/atoms/Card";
import { SkeletonCard } from "@/components/atoms/SkeletonCard";
import { ChartCard } from "@/components/molecules/ChartCard";
import { QuickActions } from "@/components/molecules/QuickActions";
import { TopCategoriesSection } from "@/components/organisms/TopCategoriesSection";;
export const DashboardContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const topCategoriesData = [
  { category: "Transportation", amount: 120 },
  { category: "Food & Beverage", amount: 300 },
  { category: "Entertainment", amount: 90 },
  { category: "Shopping", amount: 250 },
]

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
    <div className="space-y-8">
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

      {/* Top Categories Month */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Spending Based on Categories This Month</h2>
        <TopCategoriesSection data={topCategoriesData} loading={loading} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Monthly Expenses" type="line" data={monthlyData} />
        <ChartCard title="Expense Breakdown" type="pie" data={pieData} />
      </div>

      {/* Quick Actions (Should be sticky on bottom page)*/} 
      <QuickActions />
    </div>
  );
};
