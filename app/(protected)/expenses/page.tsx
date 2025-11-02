"use client";
import { useEffect, useState } from "react";
import ExpenseLayout from "@/components/templates/ExpenseLayout";
import { ExpenseCard } from "@/components/molecules/ExpenseCard";
import { ModalButton } from "@/components/molecules/ModalButton";
import { ExpenseForm } from "@/components/organisms/ExpenseForm";
import ExpenseStatusTag from "@/components/molecules/ExpenseStatusTag";
import { useExpense } from "@/hooks/useExpense";


export default function ExpensesPage() {
    const { getExpense} = useExpense();
    const [expenses, setExpenses] = useState([]);

  async function fetchExpenses() {
    const response = await getExpense();
    setExpenses(response?.data ?? []);
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ExpenseLayout>
        <h1 className="text-2xl font-bold mb-4">My Expenses</h1>
        <div className="p-4 mb-6 space-y-4">
            <p>Total Expenses: ${expenses.reduce((acc: number, e: any) => acc + e.amount, 0).toFixed(2)}</p>
            {/* Button To add Expense */}
            <ModalButton
                label="Add New Expense"
                modalComponent={<ExpenseForm onSuccess={fetchExpenses} />}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenses.map((e: any) => (
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
    </ExpenseLayout>
  );
}
