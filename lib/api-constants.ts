export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/users/me",
  },
  GROUPS: {
    BASE: "/groups",
    MEMBERS: (id: string) => `/groups/${id}/members`,
  },
  EXPENSES: {
    BASE: "/expenses",
    SPLIT: (id: string) => `/expenses/${id}/split`,
  },
};
