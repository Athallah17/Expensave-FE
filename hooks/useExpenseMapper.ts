"use client";

import { useMemo } from "react";
import { ShoppingBag, Utensils, Car, Home, LucideIcon } from "lucide-react";
import { ExpenseCardData } from "@/components/molecules/expense/ExpenseCard";

interface RawExpense {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
  createdAt: string;
  paidBy: number;
  payer?: { name: string };
}

const CATEGORY_MAP: Record<
  string,
  { icon: LucideIcon; color: string }
> = {
  Shopping: { icon: ShoppingBag, color: "violet" },
  Food: { icon: Utensils, color: "rose" },
  Transport: { icon: Car, color: "blue" },
  Home: { icon: Home, color: "emerald" },
};

export function useExpensesMapper(rawExpenses: RawExpense[]) {
  return useMemo<ExpenseCardData[]>(() => {
    if (!rawExpenses) return [];

    return rawExpenses.map((exp) => {
      const cat = CATEGORY_MAP[exp.category] || {
        icon: ShoppingBag,
        color: "slate",
      };

      return {
        id: String(exp.id),
        title: exp.title,
        amount: exp.amount,
        category: exp.category,
        categoryIcon: cat.icon,
        categoryColor: cat.color,
        createdAt: exp.createdAt,
        date: new Date(exp.createdAt).toISOString(),
        paidBy: exp.payer?.name || "Unknown",
        group: undefined,
      };
    });
  }, [rawExpenses]);
}
