"use client";

import React, { useState } from "react";
import { UserProfile, WalletTransaction, GameRoundRecord } from "@/types/site";
import { CloseIcon } from "../shared/icons";
import { useDemo } from "@/lib/DemoContext";

interface WalletModalProps {
  isOpen: boolean;
  initialTab?: "deposit" | "withdraw" | "history" | "rounds" | "game_history";
  onClose: () => void;
  user?: UserProfile;
  transactions?: WalletTransaction[];
  gameHistory?: GameRoundRecord[];
  onDemoDeposit?: (amount: number) => void;
  onDemoWithdraw?: (amount: number, account?: string, ifsc?: string) => void;
}

export function WalletModal({
  isOpen,
  initialTab = "deposit",
  onClose,
  user,
  transactions,
  gameHistory: propGameHistory,
  onDemoDeposit,
  onDemoWithdraw,
}: WalletModalProps) {
  const {
    user: ctxUser,
    transactions: ctxTransactions,
    gameHistory: ctxGameHistory,
    deposit,
    withdraw,
  } = useDemo();

  const activeUser = user || ctxUser;
  const activeTransactions = transactions || ctxTransactions;
  const activeGameHistory = propGameHistory || ctxGameHistory;

  const normalizedInitial = initialTab === "game_history" ? "rounds" : initialTab;
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "history" | "rounds">(normalizedInitial);

  // Sync tab whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab === "game_history" ? "rounds" : initialTab);
    }
  }, [isOpen, initialTab]);

  // Deposit state
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [depositMethod, setDepositMethod] = useState("UPI Fast Demo");

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(100);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("State Bank Demo");
  const [withdrawError, setWithdrawError] = useState("");
  const [isProcessingWd, setIsProcessingWd] = useState(false);

  // History filtering
  const [historyTypeFilter, setHistoryTypeFilter] = useState<string>("all");
  const [historySearch, setHistorySearch] = useState<string>("");

  if (!isOpen) return null;

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;

    if (onDemoDeposit) {
      onDemoDeposit(depositAmount);
    } else {
      deposit(depositAmount, depositMethod);
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) {
      setWithdrawError("Enter a valid withdrawal amount");
      return;
    }
    if (withdrawAmount > activeUser.balance) {
      setWithdrawError("Insufficient demo balance");
      return;
    }
    if (!accountNumber || accountNumber.length < 8) {
      setWithdrawError("Enter a valid 8-16 digit simulated account number");
      return;
    }

    setWithdrawError("");
    setIsProcessingWd(true);

    if (onDemoWithdraw) {
      onDemoWithdraw(withdrawAmount);
      setIsProcessingWd(false);
    } else {
      withdraw(withdrawAmount, { account: accountNumber, ifsc });
      setIsProcessingWd(false);
    }
  };

  // Filtered transactions
  const filteredTransactions = activeTransactions.filter((tx) => {
    if (historyTypeFilter !== "all") {
      if (historyTypeFilter === "recharge" && tx.type !== "deposit") return false;
      if (historyTypeFilter === "payout" && tx.type !== "withdraw") return false;
      if (historyTypeFilter === "gameplay" && tx.type !== "bet" && tx.type !== "win") return false;
      if (historyTypeFilter === "rewards" && tx.type !== "task_reward" && tx.type !== "bonus") return false;
    }
    if (historySearch.trim()) {
      const q = historySearch.toLowerCase().trim();
      const match =
        tx.title.toLowerCase().includes(q) ||
        (tx.reference && tx.reference.toLowerCase().includes(q)) ||
        (tx.description && tx.description.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

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
                Manage your testing credits, payout simulation & gameplay ledger
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
              <span>
                {activeUser.balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 block">Tier:</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D1AE52]/20 text-[#D1AE52] border border-[#D1AE52]/40">
              VIP {activeUser.vipLevel || 1}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0E0E0E] p-1 border-b border-[#222222] overflow-x-auto no-scrollbar">
          {(
            [
              { key: "deposit", label: "Top-up Credits", icon: "⚡" },
              { key: "withdraw", label: "Demo Payout", icon: "📤" },
              { key: "history", label: "Ledger", icon: "📜" },
              { key: "rounds", label: "Game History", icon: "🎮" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setWithdrawError("");
              }}
              className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
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

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* TAB 1: DEPOSIT */}
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
                          ? "bg-[#D1AE52] text-black border-[#D1AE52] shadow-sm"
                          : "bg-[#1C1C1C] text-gray-300 border-[#2E2E2E] hover:border-gray-500"
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Custom Amount:
                </label>
                <div className="flex items-center rounded-xl bg-[#0A0A0A] border border-[#333333] px-3 py-2.5 focus-within:border-[#D1AE52]">
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

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Simulated Gateway:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["UPI Fast Demo", "Paytm Demo", "USDT Demo"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDepositMethod(method)}
                      className={`py-2 px-2 text-[11px] font-bold rounded-lg border text-center transition-all ${
                        depositMethod === method
                          ? "bg-[#D1AE52]/20 border-[#D1AE52] text-[#D1AE52]"
                          : "bg-[#181818] border-[#2A2A2A] text-gray-400 hover:text-white"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Demo Credit Rate:</span>
                  <span className="text-white font-semibold">1 INR = 1 Demo Chip</span>
                </div>
                <div className="flex justify-between">
                  <span>Simulated Processing:</span>
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

          {/* TAB 2: WITHDRAWAL */}
          {activeTab === "withdraw" && (
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Payout Amount (Demo):
                </label>
                <div className="flex items-center rounded-xl bg-[#0A0A0A] border border-[#333333] px-3 py-2.5 focus-within:border-[#D1AE52]">
                  <span className="text-gray-400 font-bold mr-2">₹</span>
                  <input
                    type="number"
                    min="10"
                    max={activeUser.balance}
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
                    disabled={amt > activeUser.balance}
                    onClick={() => setWithdrawAmount(amt)}
                    className="py-1.5 text-xs font-bold rounded-lg bg-[#1C1C1C] hover:bg-[#252525] border border-[#2E2E2E] text-gray-300 disabled:opacity-30"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                    Simulated Bank Name:
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#333333] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D1AE52]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                      Account Number:
                    </label>
                    <input
                      type="text"
                      placeholder="98765432100"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                      className="w-full bg-[#0A0A0A] border border-[#333333] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D1AE52] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                      IFSC Code:
                    </label>
                    <input
                      type="text"
                      placeholder="SBIN0001234"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value.toUpperCase().slice(0, 11))}
                      className="w-full bg-[#0A0A0A] border border-[#333333] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D1AE52] font-mono uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2D2D] text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Gross Payout:</span>
                  <span className="text-white font-mono">₹{withdrawAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Simulated Fee:</span>
                  <span className="text-[#04BE02] font-mono">₹0.00 (Free)</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 border-t border-[#262626]">
                  <span>Net Demo Amount:</span>
                  <span className="text-[#D1AE52] font-mono">₹{withdrawAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={activeUser.balance <= 0 || isProcessingWd}
                className="w-full py-3 rounded-xl bg-[#04BE02] hover:bg-[#03a002] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg active:scale-98 transition-all disabled:opacity-40"
              >
                {isProcessingWd ? "Submitting Demo Request..." : "Request Demo Withdrawal"}
              </button>
            </form>
          )}

          {/* TAB 3: TRANSACTION LEDGER */}
          {activeTab === "history" && (
            <div className="space-y-3">
              {/* Filter Strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                {[
                  { id: "all", label: "All" },
                  { id: "recharge", label: "Top-ups" },
                  { id: "payout", label: "Payouts" },
                  { id: "gameplay", label: "Games" },
                  { id: "rewards", label: "Bonuses" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setHistoryTypeFilter(f.id)}
                    className={`px-2.5 py-1 rounded-lg border font-bold whitespace-nowrap transition-colors ${
                      historyTypeFilter === f.id
                        ? "bg-[#D1AE52] text-black border-[#D1AE52]"
                        : "bg-[#181818] border-[#2A2A2A] text-gray-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search transactions by reference or title..."
                className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D1AE52]"
              />

              {/* Transactions List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-xs">
                    <p className="text-2xl mb-1">📜</p>
                    <p>No matching transactions found</p>
                  </div>
                ) : (
                  filteredTransactions.map((tx) => {
                    const isCredit =
                      tx.type === "deposit" ||
                      tx.type === "task_reward" ||
                      tx.type === "win" ||
                      tx.type === "bonus";

                    return (
                      <div
                        key={tx.id}
                        className="p-3 rounded-xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-between text-xs hover:border-[#383838] transition-colors"
                      >
                        <div>
                          <span className="font-bold text-white block">{tx.title}</span>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
                            <span>{tx.timestamp}</span>
                            {tx.reference && (
                              <span className="font-mono text-gray-400">#{tx.reference}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`font-mono font-bold block text-sm ${
                              isCredit ? "text-[#04BE02]" : "text-[#EA4E3D]"
                            }`}
                          >
                            {isCredit ? "+" : "-"}₹{tx.amount.toLocaleString()}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                              tx.status === "completed"
                                ? "bg-[#04BE02]/15 text-[#04BE02]"
                                : tx.status === "processing"
                                ? "bg-[#FFAA09]/15 text-[#FFAA09]"
                                : "bg-[#EA4E3D]/15 text-[#EA4E3D]"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 4: GAME ROUNDS HISTORY */}
          {activeTab === "rounds" && (
            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {activeGameHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-xs">
                  <p className="text-2xl mb-1">🎮</p>
                  <p>No game rounds played yet.</p>
                  <p className="text-[11px] text-gray-600 mt-1">
                    Launch any demo game to record live rounds here.
                  </p>
                </div>
              ) : (
                activeGameHistory.map((r) => {
                  const isWin = r.result === "win" || r.result === "free_spin_win";

                  return (
                    <div
                      key={r.roundId}
                      className="p-3 rounded-xl bg-[#1A1A1A] border border-[#262626] flex items-center justify-between text-xs hover:border-[#383838] transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{r.gameName}</span>
                          {r.isFreeSpin && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#04BE02]/20 text-[#04BE02] font-black uppercase">
                              Free Spin
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
                          <span>{r.provider}</span>
                          <span className="font-mono">#{r.roundId}</span>
                          <span>• {r.timestamp}</span>
                        </div>
                        {r.details && (
                          <span className="text-[10px] text-gray-400 block mt-0.5">{r.details}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-mono font-bold block text-sm ${
                            isWin ? "text-[#04BE02]" : "text-gray-400"
                          }`}
                        >
                          {isWin ? `+₹${r.payout.toLocaleString()}` : `-₹${r.stake.toLocaleString()}`}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          Bal: ₹{r.balanceAfter.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })
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
