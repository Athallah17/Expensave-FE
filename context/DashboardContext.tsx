"use client";

import { createContext, useContext, ReactNode, useEffect, useCallback, useState } from "react";
import { DashboardData, useDashboard } from "@/hooks/useDashboard";

type DashboardContextType = {
  data: DashboardData | null;
  loading: boolean;
  error: string;
  refetch: () => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ userId, children }: { userId: number; children: ReactNode }) {
    const { data, loading, error, refetch } = useDashboard(userId,10000);

return (
    <DashboardContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Hook to consume the dashboard context
export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboardContext must be used within DashboardProvider");
  return context;
}
