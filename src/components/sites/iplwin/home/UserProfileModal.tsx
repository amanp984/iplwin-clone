"use client";

import React, { useState } from "react";
import { UserProfile } from "@/types/site";
import { CloseIcon, CrownIcon } from "../shared/icons";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenWallet: (tab: "deposit" | "withdraw" | "history" | "game_history") => void;
  onOpenTasks: () => void;
  onLogout: () => void;
  onResetDemo?: () => void;
}

export function UserProfileModal({
  isOpen,
  onClose,
  user,
  onOpenWallet,
  onOpenTasks,
  onLogout,
  onResetDemo,
}: UserProfileModalProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const totalEarnedSpins = Object.values(user.earnedFreeSpins || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#141414] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#1A1A1A] border-b border-[#2E2E2E]">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>👤</span>
            <span>Player Account & Demo Profile</span>
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
        <div className="p-5 sm:p-6 bg-gradient-to-b from-[#1F180A] to-[#141414] border-b border-[#2A2416]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E9CA78] via-[#D1AE52] to-[#B88C35] p-0.5 shadow-lg flex items-center justify-center text-3xl shrink-0">
              <div className="w-full h-full bg-[#111111] rounded-[14px] flex items-center justify-center">
                {user.avatar || "👤"}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-black text-white truncate">{user.username}</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D1AE52] text-black shrink-0">
                  VIP {user.vipLevel || 0}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {user.isLoggedIn && user.phone
                  ? `+91 ${user.phone.slice(0, 3)}****${user.phone.slice(-3)}`
                  : "Guest Demo Account"}
              </p>
              <div className="text-xs font-bold text-[#D1AE52] mt-1 flex items-center gap-1.5 flex-wrap">
                <span>Demo Balance:</span>
                <span className="text-white font-mono font-black">
                  ₹ {user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Genuine Gameplay Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#262117]">
            <div className="p-2.5 rounded-xl bg-[#0D0D0D] border border-[#222222]">
              <span className="text-[10px] text-gray-400 block font-semibold uppercase">Total Rounds Played</span>
              <span className="text-base font-black text-white font-mono">{user.totalRoundsPlayed || 0}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0D0D0D] border border-[#222222]">
              <span className="text-[10px] text-gray-400 block font-semibold uppercase">Winning Rounds</span>
              <span className="text-base font-black text-[#04BE02] font-mono">
                {user.totalDemoWins || 0} Wins
              </span>
            </div>
          </div>
        </div>

        {/* Free Spins Inventory Highlight */}
        <div className="px-5 py-3 bg-[#1A1A1A] border-b border-[#2B2B2B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CrownIcon className="w-4 h-4 text-[#D1AE52]" />
            <span className="text-xs font-bold text-white">Rule 13 Free Spins:</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#D1AE52]/20 border border-[#D1AE52]/40 text-[#E9CA78] text-xs font-extrabold">
            {totalEarnedSpins} Spins
          </span>
        </div>

        {/* Quick Menu Options */}
        <div className="p-4 space-y-2 overflow-y-auto flex-1">
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
              <span>Transaction Ledger</span>
            </span>
            <span className="text-gray-500">→</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenWallet("game_history");
            }}
            className="w-full p-3 rounded-xl bg-[#1A1A1A] hover:bg-[#242424] border border-[#2B2B2B] flex items-center justify-between text-xs font-bold text-white transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className="text-lg">🎮</span>
              <span>Game Rounds History</span>
            </span>
            <span className="text-gray-500">→</span>
          </button>
        </div>

        {/* Action Buttons: Reset & Logout */}
        <div className="p-4 border-t border-[#222222] space-y-2 bg-[#121212]">
          {onResetDemo && (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2.5 rounded-xl bg-[#1E1914] hover:bg-[#2A2016] border border-[#D1AE52]/40 text-[#E9CA78] font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>🔄</span>
              <span>Reset Demo Account</span>
            </button>
          )}

          {user.isLoggedIn && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-[#201515] hover:bg-[#2B1B1B] border border-[#EA4E3D]/30 text-[#EA4E3D] font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Log Out</span>
            </button>
          )}
        </div>

        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <div className="absolute inset-0 z-10 bg-black/90 p-5 flex flex-col justify-center items-center text-center animate-fadeIn">
            <span className="text-4xl mb-3">⚠️</span>
            <h4 className="text-base font-extrabold text-white mb-2">Reset Demo Account?</h4>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed max-w-xs">
              Reset all demo progress, wallet balance, rewards, transactions, and game history to default state?
            </p>
            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2F2F2F] text-xs font-bold text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  if (onResetDemo) onResetDemo();
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#EA4E3D] hover:bg-[#D43D2D] text-xs font-black text-white shadow-lg"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
