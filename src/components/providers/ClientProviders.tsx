"use client";

import React from "react";
import { DemoProvider } from "@/lib/DemoContext";
import { ToastContainer } from "@/components/ui/ToastContainer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <ToastContainer />
      {children}
    </DemoProvider>
  );
}
