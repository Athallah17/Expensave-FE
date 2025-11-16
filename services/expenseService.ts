import axiosInstance from "@/lib/axiosInstance";

export const expenseService = {
  createExpense: (data: any) => axiosInstance.post("/expenses/", data),

  getExpenses: () => axiosInstance.get("/expenses/", { params: { } }),

  getExpenseDetails: (id: string) => axiosInstance.get(`/expenses/${id}`),

  updateExpense: (id: string, data: any) =>
    axiosInstance.put(`/expenses/${id}`, data),

  deleteExpense: (id: string) => axiosInstance.delete(`/expenses/${id}`),

  // Auto split expense in a group
  splitExpense: (groupId: string) => axiosInstance.post(`/expenses/split/${groupId}`),
};