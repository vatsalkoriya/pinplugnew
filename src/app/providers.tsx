"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminProvider } from "@/context/AdminContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,        // Data stays fresh for 60s — no refetch on page switch
            gcTime: 5 * 60 * 1000,       // Keep unused data in cache for 5 min
            refetchOnWindowFocus: false,  // Don't refetch when user tabs back
            retry: 1,                     // Only retry once on failure
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          {children}
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
