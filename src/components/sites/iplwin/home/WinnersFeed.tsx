"use client";

import React from "react";
import { WINNERS } from "./data";
import { TrophyIcon } from "../shared/icons";

export function WinnersFeed() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 select-none">
      <div className="flex items-center gap-3 bg-[#141414] border border-[#2A2A2A] rounded-xl px-3 sm:px-4 py-2 overflow-hidden shadow-inner">
        {/* Label */}
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-[#333333]">
          <TrophyIcon className="w-4 h-4 text-[#D1AE52]" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D1AE52] hidden sm:inline">
            Latest Winners
          </span>
        </div>

        {/* Scrolling Strip */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap text-xs flex items-center gap-6">
            {WINNERS.map((winner) => (
              <div
                key={winner.id}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333333]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#04BE02]" />
                <span className="text-gray-400 font-mono text-[11px]">{winner.userId}</span>
                <span className="text-gray-300 text-[11px] font-medium">{winner.gameName}</span>
                <span className="text-[#04BE02] font-bold text-xs">
                  +{winner.currency} {winner.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            {/* Duplicated for smooth loop */}
            {WINNERS.map((winner) => (
              <div
                key={`dup-${winner.id}`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333333]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#04BE02]" />
                <span className="text-gray-400 font-mono text-[11px]">{winner.userId}</span>
                <span className="text-gray-300 text-[11px] font-medium">{winner.gameName}</span>
                <span className="text-[#04BE02] font-bold text-xs">
                  +{winner.currency} {winner.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
