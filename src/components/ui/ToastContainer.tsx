"use client";

import React from "react";
import { useDemo } from "@/lib/DemoContext";

export function ToastContainer() {
  const { toasts, dismissToast } = useDemo();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-3 sm:right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";
        const isWarning = toast.type === "warning";

        const bg = isSuccess
          ? "bg-[#0E2012] border-[#04BE02]/50 text-white"
          : isError
          ? "bg-[#290C0C] border-[#EA4E3D]/50 text-white"
          : isWarning
          ? "bg-[#261E0A] border-[#FFAA09]/50 text-white"
          : "bg-[#181818] border-[#333333] text-white";

        const icon = isSuccess ? "✅" : isError ? "❌" : isWarning ? "⚠️" : "ℹ️";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${bg}`}
          >
            <span className="text-base shrink-0 mt-0.5">{icon}</span>
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h5 className="text-xs font-black uppercase tracking-wider text-[#D1AE52] mb-0.5">
                  {toast.title}
                </h5>
              )}
              <p className="text-xs text-gray-200 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-white text-xs p-1 rounded hover:bg-white/10 shrink-0"
              aria-label="Dismiss Notification"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
