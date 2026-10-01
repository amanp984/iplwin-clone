"use client";

import React, { useState } from "react";
import { UserProfile, WalletTransaction } from "@/types/site";
import { CloseIcon } from "../shared/icons";

interface WalletModalProps {
  isOpen: boolean;
  initialTab?: "deposit" | "withdraw" | "history";
  onClose: () => void;
  user: UserProfile;
  transactions: WalletTransaction[];
  onDemoDeposit: (amount: number) => void;
  onDemoWithdraw: (amount: number) => void;
}

export function WalletModal({
  isOpen,
  initialTab = "deposit",
  onClose,
  user,
  transactions,
  onDemoDeposit,
  onDemoWithdraw,
}: WalletModalProps) {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "history">(initialTab);
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(100);
  const [withdrawError, setWithdrawError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;
    onDemoDeposit(depositAmount);
    setSuccessMsg(`Simulated demo deposit of ₹${depositAmount.toLocaleString()} added!`);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) {
      setWithdrawError("Enter a valid withdrawal amount");
      return;
    }
    if (withdrawAmount > user.balance) {
      setWithdrawError("Insufficient demo balance");
      return;
    }
    setWithdrawError("");
    onDemoWithdraw(withdrawAmount);
    setSuccessMsg(`Simulated demo withdrawal request of ₹${withdrawAmount.toLocaleString()} submitted!`);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141414] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#1A1A1A] border-b border-[#2E2E2E]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💳</span>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Demo Wallet Manager</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D1AE52]/20 text-[#D1AE52] border border-[#D1AE52]/40 font-bold uppercase">
                  Simulated
                </span>
              </h3>
              <p className="text-[11px] text-gray-400">
                Manage your testing credits and view transactions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Wallet Modal"
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <CloseIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Current Balance Bar */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#241A0A] to-[#141414] border-b border-[#332A15] flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
              Available Demo Balance:
            </span>
            <div className="text-2xl font-black font-mono text-[#D1AE52] flex items-center gap-1">
              <span>₹</span>
              <span>{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 block">Status:</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#04BE02]/20 text-[#04BE02] border border-[#04BE02]/40">
              Active Member
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0E0E0E] p-1 border-b border-[#222222]">
          {(
            [
              { key: "deposit", label: "Top-up Credits", icon: "⚡" },
              { key: "withdraw", label: "Simulated Payout", icon: "📤" },
              { key: "history", label: "Transaction History", icon: "📜" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setWithdrawError("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.key
                  ? "bg-[#252525] text-[#D1AE52] shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="m-4 p-3 rounded-xl bg-[#04BE02]/20 border border-[#04BE02]/50 text-[#04BE02] text-xs font-bold text-center">
            {successMsg}
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === "deposit" && (
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Select Demo Top-up Amount:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 500, 1000, 5000].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setDepositAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        depositAmount === amt
                          ? "bg-[#D1AE52] text-black border-[#D1AE52]"
                          : "bg-[#1C1C1C] text-gray-300 border-[#2E2E2E] hover:border-gray-500"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Custom Amount:
                </label>
                <div className="flex items-center rounded-xl bg-[#0A0A0A] border border-[#333333] px-3 py-2.5">
                  <span className="text-gray-400 font-bold mr-2">₹</span>
                  <input
                    type="number"
                    min="10"
                    max="50000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Demo Credit Rate:</span>
                  <span className="text-white font-semibold">1 INR = 1 Demo Chip</span>
                </div>
                <div className="flex justify-between">
                  <span>Simulated Processing Time:</span>
                  <span className="text-[#04BE02] font-semibold">Instant (&lt; 1 sec)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#D1AE52]/20 hover:brightness-105 active:scale-98 transition-all"
              >
                Top-up ₹{depositAmount.toLocaleString()} Demo Balance
              </button>
            </form>
          )}

          {activeTab === "withdraw" && (
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Withdrawal Amount:
                </label>
                <div className="flex items-center rounded-xl bg-[#0A0A0A] border border-[#333333] px-3 py-2.5">
                  <span className="text-gray-400 font-bold mr-2">₹</span>
                  <input
                    type="number"
                    min="10"
                    max={user.balance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-white focus:outline-none font-mono"
                  />
                </div>
                {withdrawError && (
                  <p className="text-xs text-[#EA4E3D] font-semibold mt-1.5">{withdrawError}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[50, 100, 500].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    disabled={amt > user.balance}
                    onClick={() => setWithdrawAmount(amt)}
                    className="py-1.5 text-xs font-bold rounded-lg bg-[#1C1C1C] hover:bg-[#252525] border border-[#2E2E2E] text-gray-300 disabled:opacity-30"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Simulated Destination:</span>
                  <span className="text-white font-semibold">Demo Bank Account</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Guarantee:</span>
                  <span className="text-[#D1AE52] font-semibold">Instant in Demo Mode</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={user.balance <= 0}
                className="w-full py-3 rounded-xl bg-[#04BE02] hover:bg-[#03a002] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-98 transition-all disabled:opacity-40"
              >
                Request Demo Withdrawal
              </button>
            </form>
          )}

          {activeTab === "history" && (
            <div className="space-y-2">
              {transactions.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6">No transaction records yet</p>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{tx.title}</span>
                      <span className="text-[10px] text-gray-500">{tx.timestamp}</span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-mono font-bold block ${
                          tx.type === "deposit" || tx.type === "task_reward" || tx.type === "win"
                            ? "text-[#04BE02]"
                            : "text-[#EA4E3D]"
                        }`}
                      >
                        {tx.type === "deposit" || tx.type === "task_reward" || tx.type === "win" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-gray-400 capitalize">{tx.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-3 bg-[#111111] border-t border-[#222222] text-center text-[10px] text-gray-500">
          🔒 Notice: This is a demonstration wallet environment. No real funds or real money transactions occur.
        </div>
      </div>
    </div>
  );
}
