'use client'
import { createContext, useState, useEffect, ReactNode } from "react";
import {authService} from "@/services/authService";
import { User } from "@/types/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        // Try calling /me (cookie or Bearer token)
        const meRes = await authService.me();
        setUser(meRes.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Login returns access_token + user
      const res = await authService.login(email, password);

      // Save token for Bearer auth
      localStorage.setItem("access_token", res.data.access_token);

      // Fetch user info
      const meRes = await authService.me();
      setUser(meRes.data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      // Remove token from localStorage
      localStorage.removeItem("access_token");
      setUser(null);
    }
  };

  const refresh = async () => {
    try {
      await authService.refresh();
      // After refresh, call /me to update user
      const meRes = await authService.me();
      setUser(meRes.data);
    } catch (err) {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  };

  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
