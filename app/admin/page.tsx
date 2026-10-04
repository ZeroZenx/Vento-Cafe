import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Inventory",
  robots: { index: false, follow: false }
};

export default async function AdminPage() {
  if (!(await hasAdminSession())) return <AdminLogin configured={isAdminConfigured()} />;
  return <AdminDashboard />;
}
