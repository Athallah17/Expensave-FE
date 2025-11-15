import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export const groupService = {
  createGroup: (name: string, description?: string) =>
    axiosInstance.post("/groups/", { name, description }),

  getMyGroups: () => axiosInstance.get("/groups/"),

  getGroupDetails: (groupId: string) =>
    axiosInstance.get(`/groups/${groupId}`),

  updateGroup: (groupId: string, name: string, description?: string) =>
    axiosInstance.put(`/groups/${groupId}`, { name, description }),

  deleteGroup: (groupId: string) =>
    axiosInstance.delete(`/groups/${groupId}`),

  addMember: (groupId: string, shortCode: string) =>
    axiosInstance.post(`/groups/${groupId}/members`, { shortCode }),

  removeMember: (groupId: string, userId: string) =>
    axiosInstance.delete(`/groups/${groupId}/members/${userId}`),

  joinGroupByCode: (code: string) =>
    axiosInstance.post(`/groups/join`, { code }),

  // Auto split all expenses in a group
  autoSplit: (groupId: string) =>
    axiosInstance.post(`/groups/${groupId}/split`),

  // Get all settlements for a group
  getSettlements: (groupId: string) =>
    axiosInstance.get(`/groups/${groupId}/settlements`),

  // Mark a settlement as paid
  markPaid: (groupId: string, settlementId: string) =>
    axiosInstance.patch(`/groups/${groupId}/settlements/${settlementId}/mark-paid`),
};
