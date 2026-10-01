"use client";

import React from "react";
import { CATEGORIES } from "./data";
import {
  HotIcon,
  SportsIcon,
  LiveCasinoIcon,
  MiniGameIcon,
  SlotIcon,
  CardsIcon,
  FishingIcon,
  CockfightIcon,
  ESportsIcon,
  LotteryIcon,
  DemoIcon,
} from "../shared/icons";

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  activeProvider: string;
  onSelectProvider: (provider: string) => void;
}

export function CategoryNav({
  activeCategory,
  onSelectCategory,
  activeProvider,
  onSelectProvider,
}: CategoryNavProps) {
  const currentCategoryObj =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const renderIcon = (iconName: string, isActive: boolean) => {
    const iconColor = isActive ? "text-[#0A0A0A]" : "text-[#D1AE52]";
    switch (iconName) {
      case "HotIcon":
        return <HotIcon className={`w-4 h-4 ${isActive ? "text-[#0A0A0A]" : "text-[#EA4E3D]"}`} />;
      case "SportsIcon":
        return <SportsIcon className={`w-4 h-4 ${iconColor}`} />;
      case "LiveCasinoIcon":
        return <LiveCasinoIcon className={`w-4 h-4 ${iconColor}`} />;
      case "MiniGameIcon":
        return <MiniGameIcon className={`w-4 h-4 ${isActive ? "text-[#0A0A0A]" : "text-[#FFAA09]"}`} />;
      case "SlotIcon":
        return <SlotIcon className={`w-4 h-4 ${isActive ? "text-[#0A0A0A]" : "text-[#04BE02]"}`} />;
      case "CardsIcon":
        return <CardsIcon className={`w-4 h-4 ${iconColor}`} />;
      case "FishingIcon":
        return <FishingIcon className={`w-4 h-4 ${isActive ? "text-[#0A0A0A]" : "text-[#368DEC]"}`} />;
      case "CockfightIcon":
        return <CockfightIcon className={`w-4 h-4 ${isActive ? "text-[#0A0A0A]" : "text-[#EA4E3D]"}`} />;
      case "ESportsIcon":
        return <ESportsIcon className={`w-4 h-4 ${isActive ? "text-[#0A0A0A]" : "text-[#C609FF]"}`} />;
      case "LotteryIcon":
        return <LotteryIcon className={`w-4 h-4 ${isActive ? "text-[#0A0A0A]" : "text-[#FFAA09]"}`} />;
      case "DemoIcon":
        return <DemoIcon className={`w-4 h-4 ${iconColor}`} />;
      default:
        return <HotIcon className={`w-4 h-4 ${iconColor}`} />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-4 pb-2">
      {/* Category Tabs Scroll Strip */}
      <div className="relative">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onSelectProvider("All");
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-[#0A0A0A] shadow-md shadow-[#D1AE52]/20 scale-102"
                    : "bg-[#1A1A1A] hover:bg-[#252525] text-[#A0A0A0] hover:text-white border border-[#2D2D2D]"
                }`}
              >
                {renderIcon(cat.iconName, isActive)}
                <span>{cat.name}</span>
                {cat.count && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-[#0A0A0A]/20 text-black font-extrabold"
                        : "bg-[#252525] text-[#888888]"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-providers filter strip */}
      {currentCategoryObj.providers.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 mt-1 border-t border-[#222222]">
          <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider shrink-0 mr-1">
            Provider:
          </span>
          {currentCategoryObj.providers.map((prov) => {
            const isProvActive = prov === activeProvider;
            return (
              <button
                key={prov}
                onClick={() => onSelectProvider(prov)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  isProvActive
                    ? "bg-[#D1AE52]/15 text-[#D1AE52] border border-[#D1AE52]"
                    : "bg-[#141414] text-[#A0A0A0] hover:text-white border border-[#2A2A2A] hover:border-[#444444]"
                }`}
              >
                {prov}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
