"use client";

import { useState} from "react";
import { CustomInput } from "@/components/atoms/CustomInput";
import { CustomButton } from "@/components/atoms/CustomButton";
import { useExpense } from "@/hooks/useExpense";


interface ExpenseFormProps {
  groupId?: number;
  onSuccess?: () => void; // ✅ callback to close modal & refresh
}

export function ExpenseForm({ groupId, onSuccess }: ExpenseFormProps) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
  });
  const { createExpense } = useExpense();

async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await createExpense({
      ...form,
      amount: parseFloat(form.amount),
      groupId: groupId ? groupId.toString() : undefined,
    });

    // ✅ reset form and trigger success callback
    setForm({ title: "", amount: "", description: "", category: "", date: "" });
    if (onSuccess) onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <CustomInput
        label="Title"
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <CustomInput
        label="Amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <CustomInput
        label="Description"
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <CustomInput
        label="Category"
        name="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <CustomInput
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <CustomButton type="submit">Add Expense</CustomButton>
    </form>
  );
}
