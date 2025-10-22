import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export const groupService = {
    createGroup: (name: string, description?: string) =>
        axiosInstance.post(API.GROUPS.CREATE, { name, description }),

    getMyGroups: () => axiosInstance.get(API.GROUPS.LIST),

    getGroupDetails: (groupId: string) => axiosInstance.get(API.GROUPS.DETAILS(groupId)),

    updateGroup: (groupId: string, name: string, description?: string) =>
        axiosInstance.put(API.GROUPS.UPDATE(groupId), { name, description }),

    deleteGroup: (groupId: string) => axiosInstance.delete(API.GROUPS.DELETE(groupId)),

    addMember: (groupId: string, shortCode: string) =>
        axiosInstance.post(API.GROUPS.ADD_MEMBER(groupId), { shortCode }),

    removeMember: (groupId: string, userId: string) =>
        axiosInstance.delete(API.GROUPS.REMOVE_MEMBER(groupId, userId)),

    joinGroupByCode: (code: string) =>
        axiosInstance.post(API.GROUPS.JOIN_BY_CODE(), { code }),
};