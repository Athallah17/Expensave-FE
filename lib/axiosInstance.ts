import axios, { InternalAxiosRequestConfig } from "axios";

const backendFlag = process.env.NEXT_PUBLIC_BACKEND || "go";

const baseURL = backendFlag === "go" ? process.env.NEXT_PUBLIC_API_URL_GOLANG || "http://localhost:8080/api/v2" : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
console.log("Axios baseURL:", baseURL);
const axiosInstance = axios.create({
  baseURL, // your backend base URL
  withCredentials: true, // if you are using cookies for auth
});

// Optional: you can keep request interceptor for extra headers
// Attach Bearer token if present in localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;