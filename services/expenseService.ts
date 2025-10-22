import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export const expenseService = {
    createExpense: (data: any) =>
        axiosInstance.post(API.EXPENSES.BASE, data),
    getExpenses: () => axiosInstance.get(API.EXPENSES.LIST),
    getExpenseDetails: (id: string) => axiosInstance.get(API.EXPENSES.DETAILS(id)),
    updateExpense: (id: string, data: any) =>
        axiosInstance.put(API.EXPENSES.UPDATE(id), data),
    deleteExpense: (id: string) => axiosInstance.delete(API.EXPENSES.DELETE(id)),

}