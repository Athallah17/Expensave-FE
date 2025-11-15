import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export const authService = {
  login: (email: string, password: string) =>
    axiosInstance.post("/auth/login", { email, password }),

  logout: () => axiosInstance.post("/auth/logout"),

  me: () => axiosInstance.get("/me"),

  refresh: () => axiosInstance.post("/auth/refresh"),
};
