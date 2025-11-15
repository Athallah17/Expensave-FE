"use client";

import { useEffect, useState } from "react";
import ExpenseLayout from "@/components/templates/ExpenseLayout";
import { ExpenseCard } from "@/components/molecules/ExpenseCard";
import { ModalButton } from "@/components/molecules/ModalButton";
import { ExpenseForm } from "@/components/organisms/ExpenseForm";
import { useExpense } from "@/hooks/useExpense";

// Type for Expense
type Expense = {
  id: number;
  title: string;
  amount: number;
  category?: string;
  createdAt: string;
};

export default function ExpensesPage() {
  const { getExpenses, loading } = useExpense();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Fetch expenses once on mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();
        console.log("Fetched expenses:", response);
        setExpenses(response ?? []);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, []); // empty dependency array ensures it only runs once

  const totalAmount = expenses.reduce((acc, e) => acc + e.amount, 0).toFixed(2);

  // Re-fetch expenses on add
  const handleRefresh = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ExpenseLayout>
      <h1 className="text-2xl font-bold mb-4">My Expenses</h1>

      <div className="p-4 mb-6 space-y-4">
        <p>Total Expenses: ${totalAmount}</p>

        {/* Button To add Expense */}
        <ModalButton
          label="Add New Expense"
          modalComponent={<ExpenseForm onSuccess={handleRefresh} />}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map((e) => (
            <ExpenseCard
              key={e.id}
              id={e.id}
              title={e.title}
              amount={e.amount}
              category={e.category}
              date={new Date(e.createdAt).toLocaleDateString()}
            />
          ))}
        </div>
      )}
    </ExpenseLayout>
  );
}
