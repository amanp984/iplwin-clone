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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {actions.map((item) => (
          <button
            key={item.key}
            onClick={() => onAction(item.key)}
            className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 min-h-[78px] sm:min-h-[88px] rounded-xl sm:rounded-2xl bg-gradient-to-b ${item.gradient} bg-[#161616] border border-[#2B2B2B] hover:border-[#D1AE52]/70 hover:bg-[#1C1C1C] transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] shadow-sm select-none`}
          >
            {item.badge && (
              <span className="absolute -top-1.5 -right-1 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-black bg-[#EA4E3D] text-white uppercase tracking-wider shadow-md">
                {item.badge}
              </span>
            )}
            <span className="text-xl sm:text-2xl mb-1 group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-white group-hover:text-[#D1AE52] transition-colors leading-tight text-center">
              {item.title}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#8E8E8E] font-medium leading-tight mt-0.5 text-center truncate w-full">
              {item.subtitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
