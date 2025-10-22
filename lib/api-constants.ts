import { List } from "lucide-react";

export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/users/me",
  },
  GROUPS: {
    BASE: "/groups",
    CREATE: "/groups", // POST
    LIST: "/groups", // GET
    DETAILS: (groupId: string) => `/groups/${groupId}`, // GET
    UPDATE: (groupId: string) => `/groups/${groupId}`, // PUT
    DELETE: (groupId: string) => `/groups/${groupId}`, // DELETE
    ADD_MEMBER: (groupId: string) => `/groups/${groupId}/add`, // POST
    REMOVE_MEMBER: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}`, // DELETE
    JOIN_BY_CODE: () => `/groups/join/code`, // POST
  },
  EXPENSES: {
    BASE: "/expenses", //POST (Create New expense)
    LIST: "/expenses", // GET (List expenses)
    DETAILS: (id: string) => `/expenses/${id}`, // GET
    UPDATE: (id: string) => `/expenses/${id}`, // PUT
    DELETE: (id: string) => `/expenses/${id}`, // DELETE
    SPLIT: (id: string) => `/expenses/${id}/split`,
  },
};
