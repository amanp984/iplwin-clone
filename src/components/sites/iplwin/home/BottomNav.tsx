"use client";

import React from "react";

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: (mode: "login" | "register") => void;
  onOpenDeposit: () => void;
}

export function BottomNav({
  activeTab,
  onSelectTab,
  onOpenAuth,
  onOpenDeposit,
}: BottomNavProps) {
  const navItems = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "discount", label: "Promos", icon: "🎁" },
    { key: "deposit", label: "Recharge", icon: "⚡", special: true },
    { key: "vip", label: "VIP", icon: "👑" },
    { key: "mine", label: "Profile", icon: "👤" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur-md border-t border-[#262626] px-2 py-1 shadow-2xl safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;

          if (item.special) {
            return (
              <button
                key={item.key}
                onClick={onOpenDeposit}
                className="relative -top-3 flex flex-col items-center justify-center p-2 rounded-full bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] shadow-lg shadow-[#D1AE52]/40 text-black border-2 border-[#141414] active:scale-95 transition-transform"
              >
                <span className="text-xl">💳</span>
                <span className="text-[10px] font-black uppercase mt-0.5">Deposit</span>
              </button>
            );
          }

          return (
            <button
              key={item.key}
              onClick={() => {
                if (item.key === "mine") {
                  onOpenAuth("login");
                } else {
                  onSelectTab(item.key);
                }
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-colors ${
                isActive ? "text-[#D1AE52]" : "text-[#888888] hover:text-[#CCCCCC]"
              }`}
            >
              <span className="text-lg leading-none mb-1">{item.icon}</span>
              <span className={`text-[10px] ${isActive ? "font-bold" : "font-normal"}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D1AE52] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
