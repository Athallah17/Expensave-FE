"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { expenseService } from "@/services/expenseService";
import { Expense } from "@/types/expense"; // import the new types

export function useExpense() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Get all Expenses
  const getExpenses = async (): Promise<Expense[]> => {
    setLoading(true);
    setError("");
    try {
      const res = await expenseService.getExpenses();
      return res.data as Expense[]; // cast to new type
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch expenses");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get single expense details
  const getExpenseDetails = async (expenseId: string): Promise<Expense | null> => {
    setLoading(true);
    setError("");
    try {
      const res = await expenseService.getExpenseDetails(expenseId);
      return res.data as Expense;
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch expense details");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create, update, delete, split remain the same
  // ...
  
  return {
    loading,
    error,
    getExpenses,
    getExpenseDetails,
    // createExpense,
    // updateExpense,
    // deleteExpense,
    // splitExpense,
  };
}
