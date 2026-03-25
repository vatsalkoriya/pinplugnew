"use client";

import { useAdmin } from "@/context/AdminContext";
import AdminLoginPage from "./AdminLoginPage";
import AdminDashboardPage from "./AdminDashboardPage";

export default function AdminPage() {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <AdminDashboardPage /> : <AdminLoginPage />;
}
