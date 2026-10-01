"use client";

import React from "react";
import { CrownIcon } from "../shared/icons";

interface VIPPromoShowcaseProps {
  onPromoClick: (promoName: string) => void;
}

export function VIPPromoShowcase({ onPromoClick }: VIPPromoShowcaseProps) {
  const promos = [
    {
      title: "Super VIP Program",
      amount: "₹ 111,111",
      tag: "VIP EXCLUSIVE",
      description: "Upgrade your tier and receive upgrade gifts, monthly bonus, birthday gifts & instant withdrawal limit.",
      cta: "Join Super VIP",
      gradient: "from-[#2A1D05] to-[#141414]",
      border: "border-[#D1AE52]/40",
      accent: "#D1AE52",
    },
    {
      title: "Free Sign-up Bonus",
      amount: "₹ 111 Free",
      tag: "INSTANT CREDIT",
      description: "Register with an Indian mobile number and verify your account to automatically receive ₹111 starter bonus.",
      cta: "Claim ₹111 Now",
      gradient: "from-[#1F0A00] to-[#141414]",
      border: "border-[#EA4E3D]/40",
      accent: "#EA4E3D",
    },
    {
      title: "Agents Commission",
      amount: "Millions ₹",
      tag: "AFFILIATE PROGRAM",
      description: "Invite your friends and players to earn up to 45% multi-tier lifetime revenue share on every single bet.",
      cta: "Become An Agent",
      gradient: "from-[#082210] to-[#141414]",
      border: "border-[#04BE02]/40",
      accent: "#04BE02",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6">
      <div className="flex items-center gap-2 mb-4">
        <CrownIcon className="w-5 h-5 text-[#D1AE52]" />
        <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-wide">
          Exclusive Rewards & High Roller Privileges
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promos.map((promo, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.gradient} border ${promo.border} p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                  style={{ backgroundColor: `${promo.accent}20`, color: promo.accent, border: `1px solid ${promo.accent}40` }}
                >
                  {promo.tag}
                </span>
                <span className="text-xl">💎</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{promo.title}</h3>
              <div
                className="text-2xl sm:text-3xl font-black font-mono tracking-tight mb-2"
                style={{ color: promo.accent }}
              >
                {promo.amount}
              </div>
              <p className="text-xs text-[#A0A0A0] leading-relaxed mb-6">
                {promo.description}
              </p>
            </div>

            <button
              onClick={() => onPromoClick(promo.title)}
              className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2"
              style={{
                background: promo.accent === "#D1AE52"
                  ? "linear-gradient(90deg, #E9CA78, #D1AE52, #C39949)"
                  : promo.accent,
                color: promo.accent === "#D1AE52" ? "#0A0A0A" : "#FFFFFF",
              }}
            >
              <span>{promo.cta}</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
