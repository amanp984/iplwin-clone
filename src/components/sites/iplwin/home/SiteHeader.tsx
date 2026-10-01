"use client";

import React from "react";
import { BrandLogo, SearchIcon } from "../shared/icons";

interface SiteHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeLanguage: string;
  onOpenLanguage: () => void;
  onOpenAuth: (mode: "login" | "register") => void;
  userBalance?: number;
}

export function SiteHeader({
  searchQuery,
  onSearchChange,
  activeLanguage,
  onOpenLanguage,
  onOpenAuth,
  userBalance = 111,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#333333] shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <BrandLogo />
        </div>

        {/* Center: Search input (desktop) */}
        <div className="hidden md:flex flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search games, sports or providers..."
              className="w-full bg-[#0E0E0E] text-sm text-white placeholder-[#777777] pl-9 pr-4 py-2 rounded-full border border-[#333333] focus:border-[#D1AE52] focus:outline-none focus:ring-1 focus:ring-[#D1AE52] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Currency pill, Language selector, Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E0E0E] border border-[#333333] text-xs font-semibold text-[#D1AE52]">
            <span className="w-2 h-2 rounded-full bg-[#04BE02] animate-pulse"></span>
            <span>INR ₹</span>
            <span className="text-white ml-0.5">{userBalance.toLocaleString()}</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={onOpenLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2C2C2C] text-xs text-white border border-[#383838] transition-colors"
            title="Switch Language"
          >
            <span className="text-sm">🌐</span>
            <span className="uppercase font-medium text-[11px] hidden sm:inline">{activeLanguage}</span>
            <span className="text-[#888888] text-[10px]">▼</span>
          </button>

          {/* Login Button */}
          <button
            onClick={() => onOpenAuth("login")}
            className="px-3.5 py-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] text-xs sm:text-sm font-semibold text-white border border-[#444444] transition-all hover:border-[#666666] active:scale-95"
          >
            Login
          </button>

          {/* Register Button (Gold Primary) */}
          <button
            onClick={() => onOpenAuth("register")}
            className="relative px-3.5 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] hover:from-[#F0D58C] hover:to-[#CDA453] text-[#0A0A0A] text-xs sm:text-sm font-bold shadow-md shadow-[#D1AE52]/20 transition-all active:scale-95"
          >
            <span>Register</span>
            <span className="hidden lg:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-extrabold bg-[#0A0A0A] text-[#E9CA78] rounded">
              +₹111
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar row */}
      <div className="md:hidden px-3 pb-2.5 pt-1">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Aviator, Rummy, Slots..."
            className="w-full bg-[#0E0E0E] text-xs text-white placeholder-[#777777] pl-9 pr-4 py-2 rounded-full border border-[#333333] focus:border-[#D1AE52] focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}
