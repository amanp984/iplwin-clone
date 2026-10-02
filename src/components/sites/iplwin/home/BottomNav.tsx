"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface BottomNavProps {
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onOpenAuth: (mode: "login" | "register") => void;
  onOpenDeposit: () => void;
  isLoggedIn?: boolean;
  onOpenProfile?: () => void;
}

export function BottomNav({
  activeTab,
  onSelectTab,
  onOpenAuth,
  onOpenDeposit,
  isLoggedIn,
  onOpenProfile,
}: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on route if not explicitly passed
  let currentTab = activeTab;
  if (!currentTab) {
    if (pathname === "/") currentTab = "home";
    else if (pathname === "/promotions" || pathname === "/rewards") currentTab = "discount";
    else if (pathname === "/vip") currentTab = "vip";
    else if (pathname === "/profile") currentTab = "mine";
    else if (pathname === "/wallet") currentTab = "deposit";
    else currentTab = "home";
  }

  const navItems = [
    { key: "home", label: "Home", icon: "🏠", path: "/" },
    { key: "discount", label: "Promos", icon: "🎁", path: "/promotions" },
    { key: "deposit", label: "Recharge", icon: "⚡", special: true },
    { key: "vip", label: "VIP", icon: "👑", path: "/vip" },
    { key: "mine", label: "Profile", icon: "👤", path: "/profile" },
  ];

  const handleTabClick = (item: (typeof navItems)[0]) => {
    if (item.special) {
      onOpenDeposit();
      return;
    }

    if (item.key === "mine") {
      if (isLoggedIn) {
        if (pathname === "/profile") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (onOpenProfile) {
          onOpenProfile();
        } else {
          router.push("/profile");
        }
      } else {
        onOpenAuth("login");
      }
      return;
    }

    if (item.key === "home") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (onSelectTab) onSelectTab("home");
      } else {
        router.push("/");
      }
      return;
    }

    if (item.key === "discount") {
      if (pathname === "/promotions") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/promotions");
      }
      if (onSelectTab) onSelectTab("discount");
      return;
    }

    if (item.key === "vip") {
      if (pathname === "/vip") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/vip");
      }
      if (onSelectTab) onSelectTab("vip");
      return;
    }

    if (onSelectTab) {
      onSelectTab(item.key);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur-md border-t border-[#262626] px-2 py-1 shadow-2xl safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentTab === item.key;

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
              onClick={() => handleTabClick(item)}
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
