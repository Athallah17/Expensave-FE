"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ExpensesLayout from "@/components/templates/ExpenseLayout";
import ExpenseDetailsSection from "@/components/organisms/ExpenseDetailsSection";
import { useExpense } from "@/hooks/useExpense";

export default function ExpenseDetailsPage() {
    const { id } = useParams();
    const { getExpenseDetails } = useExpense();
    const [expense, setExpense] = useState<any>(null);

    const fetchExpense = async () => {
        if (!id) return;
        const res: any = await getExpenseDetails(id as string);
        setExpense(res?.data ?? null);
    };

    useEffect(() => {
        fetchExpense();
    }, [id]);

    if (!expense) {
        return (
            <ExpensesLayout>
                <div className="p-4 text-center text-gray-500">Loading expense details...</div>
            </ExpensesLayout>
        );
    }

    return (
        <ExpensesLayout>
            <ExpenseDetailsSection expense={expense} refresh={fetchExpense} />
        </ExpensesLayout>
    );
}
