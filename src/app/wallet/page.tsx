"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfile, WalletTransaction } from "@/types/site";
import { DEFAULT_GUEST_USER, INITIAL_TRANSACTIONS } from "@/components/sites/iplwin/home/data";
import { SiteHeader } from "@/components/sites/iplwin/home/SiteHeader";
import { NoticeMarquee } from "@/components/sites/iplwin/home/NoticeMarquee";
import { SiteFooter } from "@/components/sites/iplwin/home/SiteFooter";
import { BottomNav } from "@/components/sites/iplwin/home/BottomNav";
import { AuthModal } from "@/components/sites/iplwin/home/AuthModal";
import { UserProfileModal } from "@/components/sites/iplwin/home/UserProfileModal";

export default function WalletPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST_USER);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "history">("deposit");

  // Deposit state
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [depositMethod, setDepositMethod] = useState("UPI Fast");

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(100);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  const [feedback, setFeedback] = useState("");

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;

    setUser((prev) => ({
      ...prev,
      balance: prev.balance + depositAmount,
    }));

    setTransactions((prev) => [
      {
        id: `tx_dep_${Date.now()}`,
        type: "deposit",
        amount: depositAmount,
        title: `Simulated Demo Deposit via ${depositMethod}`,
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ]);

    setFeedback(`🎉 Successfully added ₹${depositAmount.toLocaleString()} simulated demo credits!`);
    setTimeout(() => setFeedback(""), 4000);
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
    setUser((prev) => ({
      ...prev,
      balance: prev.balance - withdrawAmount,
    }));

    setTransactions((prev) => [
      {
        id: `tx_wd_${Date.now()}`,
        type: "withdraw",
        amount: withdrawAmount,
        title: "Simulated Demo Payout Request",
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ]);

    setFeedback(`✅ Simulated payout request for ₹${withdrawAmount.toLocaleString()} recorded in demo ledger.`);
    setTimeout(() => setFeedback(""), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <SiteHeader
        searchQuery=""
        onSearchChange={() => {}}
        activeLanguage="en"
        onOpenLanguage={() => {}}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenWallet={(tab) => setActiveTab(tab)}
      />

      <NoticeMarquee />

      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-8 pb-20 md:pb-12">
        {feedback && (
          <div className="mb-6 p-4 rounded-xl bg-[#142917] border border-[#04BE02]/50 text-[#04BE02] font-bold text-sm text-center shadow-lg animate-fadeIn">
            {feedback}
          </div>
        )}

        {/* Demo Notice Warning */}
        <div className="mb-6 p-4 rounded-2xl bg-[#1C1402] border border-[#D1AE52]/40 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h3 className="text-xs font-bold text-[#E9CA78] uppercase tracking-wider">
              Simulated Demo Entertainment Mode
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
              This wallet operates exclusively in simulation demo mode. All deposits, balances, and payouts are virtual demo credits designed for entertainment and game mechanic testing. No real financial currency is processed.
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171717] via-[#241908] to-[#171717] border border-[#333333] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Simulated Demo Balance
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono flex items-center gap-2">
              <span className="text-[#D1AE52]">₹</span>
              <span>{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Account: <span className="text-white font-semibold">{user.isLoggedIn ? user.phone : "Guest Account"}</span> • VIP {user.vipLevel || 0}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("deposit")}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase transition-all shadow-md ${
                activeTab === "deposit"
                  ? "bg-gradient-to-r from-[#E9CA78] to-[#D1AE52] text-black"
                  : "bg-[#222222] text-white hover:bg-[#2C2C2C] border border-[#333333]"
              }`}
            >
              + Add Demo Funds
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase transition-all shadow-md ${
                activeTab === "withdraw"
                  ? "bg-gradient-to-r from-[#E9CA78] to-[#D1AE52] text-black"
                  : "bg-[#222222] text-white hover:bg-[#2C2C2C] border border-[#333333]"
              }`}
            >
              Simulate Payout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#141414] p-1.5 rounded-2xl border border-[#2B2B2B] mb-6">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === "deposit" ? "bg-[#242424] text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            💳 Demo Top-up
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === "withdraw" ? "bg-[#242424] text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            ⚡ Demo Payout
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeTab === "history" ? "bg-[#242424] text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            📋 Ledger & History ({transactions.length})
          </button>
        </div>

        {/* Tab 1: Demo Top-up */}
        {activeTab === "deposit" && (
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#2B2B2B] shadow-xl">
            <h2 className="text-base font-bold text-white mb-2">Simulate Fast Demo Recharge</h2>
            <p className="text-xs text-gray-400 mb-6">
              Select a quick preset amount to add simulated chips to your demo wallet for testing games.
            </p>

            <form onSubmit={handleDepositSubmit} className="space-y-6">
              {/* Presets */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Select Preset Amount
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {[200, 500, 1000, 2000, 5000, 10000].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setDepositAmount(amt)}
                      className={`py-3 rounded-xl font-mono font-bold text-xs sm:text-sm border transition-all ${
                        depositAmount === amt
                          ? "bg-gradient-to-r from-[#E9CA78] to-[#D1AE52] text-black border-transparent shadow-md"
                          : "bg-[#1E1E1E] text-white border-[#333333] hover:border-gray-500"
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gateway Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Simulated Gateway
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["UPI Fast", "PhonePe Auto", "Paytm QR", "IMPS Bank"].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setDepositMethod(m)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        depositMethod === m
                          ? "bg-[#252525] border-[#D1AE52] text-white"
                          : "bg-[#1A1A1A] border-[#303030] text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="text-xs font-bold block">{m}</span>
                      <span className="text-[10px] text-[#04BE02]">Instant Simulation</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-105 active:scale-[0.99] transition-all"
              >
                Confirm Demo Recharge of ₹{depositAmount.toLocaleString()}
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Demo Withdrawal */}
        {activeTab === "withdraw" && (
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#2B2B2B] shadow-xl">
            <h2 className="text-base font-bold text-white mb-2">Simulate Demo Withdrawal Request</h2>
            <p className="text-xs text-gray-400 mb-6">
              Test the simulated withdrawal flow. Virtual funds will be deducted from your demo balance.
            </p>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-300 font-semibold mb-1">
                  Withdrawal Amount (₹)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#0E0E0E] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D1AE52] focus:outline-none font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 font-semibold mb-1">
                    Simulated Account / UPI ID
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="user@upi or 1234567890"
                    className="w-full bg-[#0E0E0E] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D1AE52] focus:outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-semibold mb-1">
                    IFSC / Bank Code
                  </label>
                  <input
                    type="text"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    placeholder="HDFC0001234"
                    className="w-full bg-[#0E0E0E] text-white px-4 py-3 rounded-xl border border-[#333333] focus:border-[#D1AE52] focus:outline-none text-xs"
                  />
                </div>
              </div>

              {withdrawError && (
                <p className="text-xs text-[#EA4E3D] font-bold">{withdrawError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-105 active:scale-[0.99] transition-all"
              >
                Submit Demo Payout Request
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: History */}
        {activeTab === "history" && (
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#2B2B2B] shadow-xl">
            <h2 className="text-base font-bold text-white mb-2">Simulated Transaction Ledger</h2>
            <p className="text-xs text-gray-400 mb-6">
              Complete chronological audit trail of all demo deposits, withdrawals, and game wins.
            </p>

            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-xl bg-[#0E0E0E] border border-[#262626] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl p-2 rounded-lg bg-[#1A1A1A]">
                      {tx.type === "deposit" ? "💳" : tx.type === "withdraw" ? "⚡" : "🎁"}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{tx.title}</h4>
                      <span className="text-[10px] text-gray-500 font-mono">{tx.timestamp}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-mono font-black ${
                        tx.type === "deposit" || tx.type === "task_reward" || tx.type === "win"
                          ? "text-[#04BE02]"
                          : "text-[#EA4E3D]"
                      }`}
                    >
                      {tx.type === "withdraw" ? "-" : "+"}₹{tx.amount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-gray-500 block uppercase">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />

      <BottomNav
        activeTab="deposit"
        isLoggedIn={user.isLoggedIn}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectTab={() => {}}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        onOpenDeposit={() => setActiveTab("deposit")}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(phone, mode) => {
          const phoneNumber = phone || "9876543210";
          const bonus = mode === "register" ? 111 : 0;
          setUser((prev) => ({
            ...prev,
            isLoggedIn: true,
            phone: phoneNumber,
            username: `Player_${phoneNumber.slice(-4)}`,
            balance: prev.balance + bonus,
            vipLevel: Math.max(1, prev.vipLevel),
          }));
        }}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onOpenWallet={(tab) => {
          setIsProfileOpen(false);
          setActiveTab(tab);
        }}
        onOpenTasks={() => {
          router.push("/rewards");
        }}
        onLogout={() => {
          setUser(DEFAULT_GUEST_USER);
          setIsProfileOpen(false);
        }}
      />
    </div>
  );
}
