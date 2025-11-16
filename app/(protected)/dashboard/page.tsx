"use client";

import DashboardLayout from "@/components/templates/DashboardLayout";
import { DashboardContent } from "@/components/organisms/dashboard/DashboardContent";
import { useAuth } from "@/context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <DashboardLayout><p>Loading...</p></DashboardLayout>;
  if (!user) return <DashboardLayout><p>Please login</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <DashboardProvider userId={user.id}>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="mb-6 font-semibold text-2xl">Welcome, {user.name} 👋</p>
        <DashboardContent />
      </DashboardProvider>
    </DashboardLayout>
  );
}
