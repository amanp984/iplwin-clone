"use client";

import React, { useState } from "react";
import { BrandLogo, SearchIcon } from "../shared/icons";
import { UserProfile } from "@/types/site";

interface SiteHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeLanguage: string;
  onOpenLanguage: () => void;
  onOpenAuth: (mode: "login" | "register") => void;
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenWallet: (tab: "deposit" | "withdraw") => void;
}

export function SiteHeader({
  searchQuery,
  onSearchChange,
  activeLanguage,
  onOpenLanguage,
  onOpenAuth,
  user,
  onOpenProfile,
  onOpenWallet,
}: SiteHeaderProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#141414]/95 backdrop-blur-md border-b border-[#2B2B2B] shadow-lg select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <BrandLogo />
        </div>

        {/* Center: Search input (desktop) */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Aviator, Rummy, Slots, Sports..."
              className="w-full bg-[#0A0A0A] text-xs sm:text-sm text-white placeholder-[#777777] pl-9 pr-8 py-2 rounded-full border border-[#333333] focus:border-[#D1AE52] focus:outline-none focus:ring-1 focus:ring-[#D1AE52] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                aria-label="Clear Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search toggle button */}
          <button
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label="Toggle Search"
            className="md:hidden w-8 h-8 rounded-lg bg-[#222222] border border-[#333333] flex items-center justify-center text-gray-300"
          >
            <SearchIcon className="w-4 h-4 text-gray-300" />
          </button>

          {/* Language Selector */}
          <button
            onClick={onOpenLanguage}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2C2C2C] text-xs text-white border border-[#383838] transition-colors"
            title="Switch Language"
          >
            <span className="text-sm">🌐</span>
            <span className="uppercase font-semibold text-[11px] hidden sm:inline">{activeLanguage}</span>
            <span className="text-[#888888] text-[9px]">▼</span>
          </button>

          {/* User state: Logged In vs Guest */}
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Demo Balance Pill with Deposit Action */}
              <div
                onClick={() => onOpenWallet("deposit")}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0A] border border-[#D1AE52]/40 hover:border-[#D1AE52] transition-colors shadow-inner"
              >
                <span className="w-2 h-2 rounded-full bg-[#04BE02] animate-pulse" />
                <span className="text-[11px] text-gray-400 font-bold">INR ₹</span>
                <span className="text-xs sm:text-sm font-mono font-black text-[#D1AE52]">
                  {user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="hidden sm:inline-block ml-1 px-1.5 py-0.2 rounded text-[10px] font-black bg-[#D1AE52] text-black">
                  +
                </span>
              </div>

              {/* User Profile Avatar Button */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] hover:border-[#D1AE52]/60 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E9CA78] to-[#D1AE52] p-0.5 flex items-center justify-center text-xs font-bold text-black">
                  {user.avatar || "👤"}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight truncate max-w-[80px]">
                    {user.username}
                  </span>
                  <span className="text-[9px] text-[#D1AE52] font-semibold leading-tight">
                    VIP {user.vipLevel || 1}
                  </span>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Currency badge hint */}
              <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0A0A0A] border border-[#2D2D2D] text-[11px] text-gray-400">
                <span className="text-[#04BE02]">●</span>
                <span>Demo INR ₹</span>
              </div>

              {/* Login Button */}
              <button
                onClick={() => onOpenAuth("login")}
                className="px-3 sm:px-4 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2F2F2F] text-xs sm:text-sm font-bold text-white border border-[#3D3D3D] hover:border-gray-400 transition-all active:scale-95"
              >
                Login
              </button>

              {/* Fast Register Button */}
              <button
                onClick={() => onOpenAuth("register")}
                className="relative px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] hover:from-[#F2D78E] hover:to-[#CAA14D] text-[#0A0A0A] text-xs sm:text-sm font-extrabold shadow-md shadow-[#D1AE52]/20 transition-all active:scale-95 flex items-center gap-1"
              >
                <span>Register</span>
                <span className="hidden sm:inline-block px-1 py-0.2 rounded text-[9px] font-black bg-black text-[#E9CA78]">
                  +₹111
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {mobileSearchOpen && (
        <div className="md:hidden px-3 pb-3 pt-1 border-t border-[#222222]">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Aviator, Rummy, Slots, Sports..."
              className="w-full bg-[#0A0A0A] text-xs text-white placeholder-[#777777] pl-9 pr-4 py-2 rounded-full border border-[#333333] focus:border-[#D1AE52] focus:outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
}
