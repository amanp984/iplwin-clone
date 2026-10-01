"use client";

import React from "react";
import { UserProfile } from "@/types/site";
import { CloseIcon, CrownIcon } from "../shared/icons";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenWallet: (tab: "deposit" | "withdraw" | "history") => void;
  onOpenTasks: () => void;
  onLogout: () => void;
}

export function UserProfileModal({
  isOpen,
  onClose,
  user,
  onOpenWallet,
  onOpenTasks,
  onLogout,
}: UserProfileModalProps) {
  if (!isOpen || !user.isLoggedIn) return null;

  const totalEarnedSpins = Object.values(user.earnedFreeSpins).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#141414] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#1A1A1A] border-b border-[#2E2E2E]">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>👤</span>
            <span>Player Account & Profile</span>
          </h3>
          <button
            onClick={onClose}
            aria-label="Close Profile Modal"
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-6 bg-gradient-to-b from-[#1F180A] to-[#141414] border-b border-[#2A2416] flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E9CA78] via-[#D1AE52] to-[#B88C35] p-0.5 shadow-lg flex items-center justify-center text-3xl">
            <div className="w-full h-full bg-[#111111] rounded-[14px] flex items-center justify-center">
              {user.avatar}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black text-white">{user.username}</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D1AE52] text-black">
                VIP {user.vipLevel || 1}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              +91 {user.phone ? user.phone.slice(0, 3) + "****" + user.phone.slice(-3) : "9876****10"}
            </p>
            <div className="text-xs font-bold text-[#D1AE52] mt-1 flex items-center gap-1">
              <span>Demo Balance: </span>
              <span className="text-white font-mono font-black">
                ₹ {user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Free Spins Inventory Highlight */}
        <div className="px-5 py-3 bg-[#1A1A1A] border-b border-[#2B2B2B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CrownIcon className="w-4 h-4 text-[#D1AE52]" />
            <span className="text-xs font-bold text-white">Free Spins Inventory:</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#D1AE52]/20 border border-[#D1AE52]/40 text-[#E9CA78] text-xs font-extrabold">
            {totalEarnedSpins} Spins
          </span>
        </div>

        {/* Quick Menu Options */}
        <div className="p-4 space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenWallet("deposit");
            }}
            className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#2B2B2B] flex items-center justify-between text-xs font-bold text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-lg">⚡</span>
              <span>Recharge Demo Credits</span>
            </span>
            <span className="text-gray-500">→</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenWallet("withdraw");
            }}
            className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#2B2B2B] flex items-center justify-between text-xs font-bold text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-lg">📤</span>
              <span>Request Simulated Withdrawal</span>
            </span>
            <span className="text-gray-500">→</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenTasks();
            }}
            className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#2B2B2B] flex items-center justify-between text-xs font-bold text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-lg">🎁</span>
              <span>Daily Tasks & Earn Free Spins</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#04BE02]/20 text-[#04BE02]">
              Active
            </span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenWallet("history");
            }}
            className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#2B2B2B] flex items-center justify-between text-xs font-bold text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-lg">📜</span>
              <span>Demo Transaction History</span>
            </span>
            <span className="text-gray-500">→</span>
          </button>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#222222]">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-[#201515] hover:bg-[#2B1B1B] border border-[#EA4E3D]/30 text-[#EA4E3D] font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
