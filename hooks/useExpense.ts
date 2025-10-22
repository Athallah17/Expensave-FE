"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { expenseService } from "@/services/expenseService";

export function useExpense() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //Create Expense
    const createExpense = async (form: {
        groupId?: string;
        amount: number;
        description?: string;
        category?: string
    }) => {
        setLoading(true);
        setError("");

        try {
            await expenseService.createExpense(form);
            router.refresh();
            router.push("/expenses");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //Get List of Expense
    const getExpense = async () => {
        setLoading(true);
        setError("");
        try {
            const expenses = await expenseService.getExpenses();
            return expenses;
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to fetch expenses");
        } finally {
            setLoading(false);
        }
    };

    //Expense Details
    const getExpenseDetails = async (expenseId: string) => {
        setLoading(true);
        setError("");
        try {
            const expense = await expenseService.getExpenseDetails(expenseId);
            return expense;
        }
        catch (err: any) {
            setError(err.response?.data?.error || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    };

    //Update Expense
    const updateExpense = async (expenseId: string, form: {
        amount: number;
        description?: string;
        category?: string;
    }) => {
        setLoading(true);
        setError("");
        try {
            await expenseService.updateExpense(expenseId, form);
            router.refresh();
            router.push("/expenses");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    //Delete Expense
    const deleteExpense = async (expenseId: string) => {
        setLoading(true);
        setError("");
        try {
            await expenseService.deleteExpense(expenseId);
            router.refresh();
            router.push("/expenses");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createExpense,
        getExpense,
        getExpenseDetails,
        updateExpense,
        deleteExpense
    };
}
