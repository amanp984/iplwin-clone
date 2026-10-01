"use client";

import React, { useState, useEffect } from "react";
import { TrophyIcon } from "../shared/icons";

export function LiveJackpotBanner() {
  const [jackpotPool, setJackpotPool] = useState<"spribe" | "jili" | "evo">("spribe");
  const [baseAmount, setBaseAmount] = useState({
    spribe: 63249506.96,
    jili: 22312075.40,
    evo: 16135753.80,
  });

  // Ticking jackpot engine
  useEffect(() => {
    const timer = setInterval(() => {
      setBaseAmount((prev) => ({
        spribe: prev.spribe + (Math.random() * 8.5 + 1.2),
        jili: prev.jili + (Math.random() * 5.2 + 0.8),
        evo: prev.evo + (Math.random() * 4.1 + 0.5),
      }));
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  const currentAmount = baseAmount[jackpotPool];

  const formattedAmount = currentAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E190A] via-[#141414] to-[#1E190A] border border-[#D1AE52]/40 shadow-xl p-4 sm:p-6 text-center select-none">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(209,174,82,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Top Header */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#333333]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D1AE52]/20 border border-[#D1AE52]/50 flex items-center justify-center">
              <TrophyIcon className="w-4 h-4 text-[#D1AE52]" />
            </div>
            <div className="text-left">
              <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase">
                Grand Jackpot Pool
              </h3>
              <p className="text-[10px] text-[#A0A0A0]">
                Live Progressive Network Prize Pool
              </p>
            </div>
          </div>

          {/* Provider Tabs */}
          <div className="flex items-center gap-1 bg-[#0A0A0A] p-1 rounded-lg border border-[#2D2D2D]">
            {(
              [
                { key: "spribe", label: "Spribe Mini" },
                { key: "jili", label: "JILI Slots" },
                { key: "evo", label: "EVO Live" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setJackpotPool(tab.key)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  jackpotPool === tab.key
                    ? "bg-[#D1AE52] text-[#0A0A0A] shadow-md"
                    : "text-[#999999] hover:text-white hover:bg-[#1A1A1A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter Display */}
        <div className="relative py-2 sm:py-3">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#0A0A0A]/90 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl border border-[#D1AE52]/30 shadow-inner">
            <span className="text-2xl sm:text-4xl md:text-5xl font-black text-[#D1AE52] tracking-wider font-mono">
              ₹
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF3D1] via-[#E9CA78] to-[#D1AE52] tracking-tight font-mono drop-shadow-[0_0_20px_rgba(209,174,82,0.4)]">
              {formattedAmount}
            </span>
          </div>
        </div>

        {/* Sub-strip with live status */}
        <div className="relative mt-2 flex items-center justify-center gap-3 text-xs text-[#A0A0A0]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#04BE02] animate-ping" />
            <span className="text-[#04BE02] font-semibold">Ticking Live</span>
          </span>
          <span>•</span>
          <span>Next Winner Draw In: <span className="text-white font-mono font-semibold">03:42</span></span>
        </div>
      </div>
    </div>
  );
}
