"use client";
import { useState } from "react";
import ExpenseStatusTag from "@/components/molecules/ExpenseStatusTag";
import ExpensePaymentHistory from "@/components/molecules/ExpensePaymentHistory";
import EditExpenseForm from "@/components/molecules/EditExpenseModal";
import { useExpense } from "@/hooks/useExpense";

export default function ExpenseDetailsSection({ expense, refresh }: any) {
    const [showEdit, setShowEdit] = useState(false);
    const { updateExpense } = useExpense();

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">{expense.title}</h1>
                    <p className="text-gray-600">{expense.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Created at: {new Date(expense.createdAt).toLocaleString()}
                    </p>
                </div>

                <div className="flex gap-3 items-center">
                    <ExpenseStatusTag status={expense.status} />
                    <button
                        onClick={() => setShowEdit(true)}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                    >
                        Edit
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-sm p-4 rounded-xl">
                <h2 className="text-lg font-medium mb-3">Payment History</h2>
                <ExpensePaymentHistory payments={expense.payments} />
            </div>

            {showEdit && (
                <EditExpenseForm
                    expense={expense}
                    onClose={() => setShowEdit(false)}
                    onSuccess={async () => {
                        await refresh();
                        setShowEdit(false);
                    }}
                />
            )}
        </div>
    );
}
