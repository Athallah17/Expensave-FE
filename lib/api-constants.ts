export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/me", // Go endpoint is /api/v2/me
    REFRESH: "/auth/refresh",
  },
  GROUPS: {
    BASE: "/groups",
    CREATE: "/groups", // POST
    LIST: "/groups", // GET
    DETAILS: (groupId: string) => `/groups/${groupId}`, // GET
    UPDATE: (groupId: string) => `/groups/${groupId}`, // PUT
    DELETE: (groupId: string) => `/groups/${groupId}`, // DELETE
    ADD_MEMBER: (groupId: string) => `/groups/${groupId}/members`, // POST (Go uses /members)
    REMOVE_MEMBER: (groupId: string, userId: string) => `/groups/${groupId}/members?userId=${userId}`, // DELETE (query param or body)
    JOIN_BY_CODE: () => `/groups/join/code`, // POST
    SPLITS_AUTO: (groupId: string) => `/groups/${groupId}/splits/auto`, // POST auto split
    SETTLEMENTS: (groupId: string) => `/groups/${groupId}/settlements`, // GET
    MARK_PAID: (groupId: string, settlementId: string) =>
      `/groups/${groupId}/settlements/${settlementId}/pay`, // PATCH
  },
  EXPENSES: {
    BASE: "/expenses", // POST
    LIST: "/expenses", // GET
    DETAILS: (id: string) => `/expenses/${id}`, // GET
    UPDATE: (id: string) => `/expenses/${id}`, // PUT
    DELETE: (id: string) => `/expenses/${id}`, // DELETE
    SPLIT: (groupId: string) => `/groups/${groupId}/splits/auto`, // Go: splits are group-based
  },
  SETTLEMENTS: {
    MY: "/my-settlements", // GET all settlements for logged-in user
  },
};

