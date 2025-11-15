"use client";

import DashboardLayout from "@/components/templates/DashboardLayout";
import { DashboardContent } from "@/components/organisms/dashboard/DashboardContent";
import { useAuth } from "@/context/AuthContext";

// Type for Go backend user
type User = {
  id: number;
  uuid: string;
  shortCode: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();

   console.log("Dashboard user:", user);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-lg">Loading...</p>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <p className="text-center text-lg text-red-500">Please login to access the dashboard</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-6 font-semibold text-2xl">Welcome, {user?.name} 👋</p>
      <DashboardContent />
    </DashboardLayout>
  );
}
