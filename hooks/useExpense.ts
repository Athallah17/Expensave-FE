"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { expenseService } from "@/services/expenseService";
import { Expense } from "@/types/expense";
import {categoryMap}  from "@/lib/categoryMap";
import dayjs from "dayjs";



export function useExpense() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Get all expenses
  const getAllExpenses = async (): Promise<Expense[]> => {
    setLoading(true);
    setError("");
    try {
      const res = await expenseService.getExpenses();
      console.log("Fetched expenses:", res.data);
      return res.data as Expense[];
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch expenses");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get expense detail
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

  // Create expense
  const createExpense = async (data: any) => {
    setLoading(true);
    setError("");
    try {
      await expenseService.createExpense(data);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create expense");
    } finally {
      setLoading(false);
    }
  };

  // Update expense
  const updateExpense = async (id: string, data: any) => {
    setLoading(true);
    setError("");
    try {
      await expenseService.updateExpense(id, data);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  // Delete expense
  const deleteExpense = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      await expenseService.deleteExpense(id);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  // Split expense (group auto split)
  const splitExpense = async (groupId: string) => {
    setLoading(true);
    setError("");
    try {
      await expenseService.splitExpense(groupId);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to split expense");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAllExpenses,   // 🔥 correct name
    getExpenseDetails,
    createExpense,
    updateExpense,
    deleteExpense,
    splitExpense,
  };
}
