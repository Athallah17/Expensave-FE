"use client";

import useSWR from "swr";

export type DashboardData = {
  totalBalance: number;
  thisMonthIncome: number;
  thisMonthExpense: number;
  activeGroupsCount: number;
  expenseOverview: Record<"1Month" | "3Month" | "6Month", number>;
  spendingByCategory: { category: string; _sum: { amount: number } }[];
  latestExpenses: any[];
  topCategoriesMonthly: { category: string; _sum: { amount: number } }[];
};

// Fetcher function
const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
});

export function useDashboard(userId: number, refreshInterval = 10000) {
  const { data, error, mutate } = useSWR<DashboardData>(
    userId ? `http://localhost:5000/api/dashboards/${userId}` : null,
    fetcher,
    {
      refreshInterval, // auto-refresh every X ms
      revalidateOnFocus: true, // optional: re-fetch on window focus
    }
  );

  return {
    data: data ?? null,
    loading: !data && !error,
    error: error ? (error as Error).message : "",
    refetch: mutate, // manual refresh
  };
}
