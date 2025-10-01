import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

export const authService = {
  login: (email: string, password: string) =>
    axiosInstance.post(API.AUTH.LOGIN, { email, password }),

  register: (name: string, email: string, password: string) =>
    axiosInstance.post(API.AUTH.REGISTER, { name, email, password }),

  me: () => axiosInstance.get(API.AUTH.ME),
};
