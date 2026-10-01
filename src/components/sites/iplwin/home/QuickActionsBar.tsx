"use client";

import React from "react";

interface QuickActionsBarProps {
  onAction: (actionKey: string) => void;
}

export function QuickActionsBar({ onAction }: QuickActionsBarProps) {
  const actions = [
    {
      key: "deposit",
      title: "Deposit",
      subtitle: "+1.5% Bonus",
      icon: "💳",
      gradient: "from-[#FFD700]/20 to-[#FFA500]/10",
      highlight: true,
    },
    {
      key: "withdraw",
      title: "Withdraw",
      subtitle: "< 3 Mins",
      icon: "⚡",
      gradient: "from-[#00C853]/20 to-[#1B5E20]/10",
    },
    {
      key: "vip",
      title: "Super VIP",
      subtitle: "₹111,111",
      icon: "👑",
      gradient: "from-[#AA00FF]/20 to-[#4A148C]/10",
      badge: "HOT",
    },
    {
      key: "download",
      title: "App Download",
      subtitle: "Android / iOS",
      icon: "📲",
      gradient: "from-[#2979FF]/20 to-[#0D47A1]/10",
    },
    {
      key: "promo",
      title: "Promotions",
      subtitle: "Daily Rewards",
      icon: "🎁",
      gradient: "from-[#FF3D00]/20 to-[#BF360C]/10",
    },
    {
      key: "support",
      title: "24/7 Support",
      subtitle: "Live Help",
      icon: "🎧",
      gradient: "from-[#00B0FF]/20 to-[#01579B]/10",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-3">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {actions.map((item) => (
          <button
            key={item.key}
            onClick={() => onAction(item.key)}
            className={`group relative flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b ${item.gradient} bg-[#171717] border border-[#2D2D2D] hover:border-[#D1AE52]/60 hover:bg-[#1E1E1E] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm`}
          >
            {item.badge && (
              <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[#EA4E3D] text-white uppercase tracking-wider shadow">
                {item.badge}
              </span>
            )}
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="text-xs font-bold text-white group-hover:text-[#D1AE52] transition-colors leading-tight">
              {item.title}
            </span>
            <span className="text-[10px] text-[#A0A0A0] font-medium leading-tight mt-0.5">
              {item.subtitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
