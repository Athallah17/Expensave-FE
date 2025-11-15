import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export const settlementService = {
  // Get all settlements for the logged-in user
  getMySettlements: () => axiosInstance.get(API.SETTLEMENTS.MY),

  // Optional: mark a specific settlement as paid (if needed)
  markPaid: (groupId: string, settlementId: string) =>
    axiosInstance.patch(`/groups/${groupId}/settlements/${settlementId}/pay`),
};
