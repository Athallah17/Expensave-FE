"use client";

import { useState } from "react";
import { CustomInput } from "@/components/atoms/CustomInput";
import { CustomButton } from "@/components/atoms/CustomButton";

export function ExpenseForm({ groupId }: { groupId?: number }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // submit new data to backend 
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
        groupId: groupId ?? null,
      }),
    });

    setForm({ title: "", amount: "", category: "", date: "" });
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
