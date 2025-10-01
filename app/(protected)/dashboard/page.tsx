"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { DashboardContent } from "@/components/organisms/DashboardContent";
import { authService } from "@/services/authService";
import { Card } from "@/components/atoms/Card";
import { SkeletonCard } from "@/components/atoms/SkeletonCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const [me, setMe] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .me()
      .then((res) => setMe(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);


  return (
    <DashboardLayout>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : me ? (
          <p className="mb-6 font-semibold text-2xl">Welcome, {me.name} 👋</p>
        ) : (
          <p>Unable to fetch user info</p>
        )}
      <DashboardContent />
    </DashboardLayout>
  );
}
