"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemo } from "@/lib/DemoContext";
import { SiteHeader } from "@/components/sites/iplwin/home/SiteHeader";
import { NoticeMarquee } from "@/components/sites/iplwin/home/NoticeMarquee";
import { SiteFooter } from "@/components/sites/iplwin/home/SiteFooter";
import { BottomNav } from "@/components/sites/iplwin/home/BottomNav";
import { AuthModal } from "@/components/sites/iplwin/home/AuthModal";
import { WalletModal } from "@/components/sites/iplwin/home/WalletModal";

export default function ProfilePage() {
  const {
    user,
    transactions,
    gameHistory,
    isHydrated,
    login,
    logout,
    deposit,
    withdraw,
    resetDemoAccount,
  } = useDemo();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw" | "history" | "game_history">("deposit");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const totalEarnedSpins = Object.values(user.earnedFreeSpins || {}).reduce((a, b) => a + b, 0);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#D1AE52] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">Loading Demo Profile...</p>
        </div>
      </div>
    );
  }

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
        onOpenProfile={() => {}}
        onOpenWallet={(tab) => {
          if (!user.isLoggedIn) {
            setAuthMode("login");
            setIsAuthOpen(true);
            return;
          }
          setWalletTab(tab);
          setIsWalletOpen(true);
        }}
      />

      <NoticeMarquee />

      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-8 pb-20 md:pb-12">
        {/* User Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171717] via-[#241A0A] to-[#171717] border border-[#333333] mb-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E9CA78] to-[#D1AE52] p-1 flex items-center justify-center text-4xl text-black shadow-xl">
              {user.avatar || "👤"}
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {user.isLoggedIn ? user.username : "Guest Demo Account"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#D1AE52] text-black uppercase">
                  VIP {user.vipLevel || 0}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {user.isLoggedIn && user.phone
                  ? `Mobile: +91 ${user.phone}`
                  : "Guest mode. Sign in with demo mobile to persist across browsers."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!user.isLoggedIn ? (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setIsAuthOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-xs uppercase shadow-lg hover:brightness-105 active:scale-95 transition-all"
              >
                Log In To Account
              </button>
            ) : (
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2F2F2F] border border-[#444444] text-xs font-bold text-gray-300 hover:text-white transition-colors"
              >
                Log Out
              </button>
            )}
          </div>
        </div>

        {/* Balance & Genuine Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Demo Balance
              </span>
              <div className="text-3xl font-black text-[#D1AE52] font-mono">
                ₹{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <button
              onClick={() => {
                setWalletTab("deposit");
                setIsWalletOpen(true);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-bold text-white transition-colors text-center"
            >
              Recharge Credits →
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Winning Rounds
              </span>
              <div className="text-3xl font-black text-[#04BE02] font-mono">
                {user.totalDemoWins || 0} Wins
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">
                {user.totalRoundsPlayed > 0 ? Math.round(((user.totalDemoWins || 0) / user.totalRoundsPlayed) * 100) : 0}% win rate across {user.totalRoundsPlayed || 0} played rounds
              </span>
            </div>
            <button
              onClick={() => {
                setWalletTab("game_history");
                setIsWalletOpen(true);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-bold text-white transition-colors text-center"
            >
              View Round History →
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Earned Free Spins
              </span>
              <div className="text-3xl font-black text-[#E9CA78] font-mono">
                {totalEarnedSpins} Spins
              </div>
              <span className="text-[10px] text-gray-500 mt-1 block">Rule 13: strictly earned via Tasks</span>
            </div>
            <Link
              href="/rewards"
              className="mt-4 px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-bold text-white transition-colors text-center"
            >
              Tasks Hub →
            </Link>
          </div>
        </div>

        {/* Free Spins Inventory Breakdown */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] mb-8 shadow-md">
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <span>🎰</span>
            <span>Earned Free Spin Inventory Breakdown</span>
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Free spins can only be earned by completing active missions in the Tasks Hub and apply only to eligible demo slots.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 3150300, name: "Fortune Gems 3", provider: "JILI" },
              { id: 3150049, name: "Super Ace", provider: "JILI" },
              { id: 3150051, name: "Money Coming", provider: "JILI" },
            ].map((slot) => {
              const count = user.earnedFreeSpins[slot.id] || 0;
              return (
                <div key={slot.id} className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626]">
                  <h3 className="text-xs font-bold text-white">{slot.name}</h3>
                  <span className="text-[10px] text-gray-500 block mb-2">{slot.provider}</span>
                  <div className={`text-2xl font-mono font-black ${count > 0 ? "text-[#04BE02]" : "text-gray-600"}`}>
                    {count}
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase">Available Spins</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Game Activity Log */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] mb-8 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>🎮</span>
              <span>Recent Authentic Game History ({gameHistory.length})</span>
            </h2>
            <button
              onClick={() => {
                setWalletTab("game_history");
                setIsWalletOpen(true);
              }}
              className="text-xs text-[#D1AE52] hover:underline"
            >
              Full Ledger →
            </button>
          </div>

          {gameHistory.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#0D0D0D] border border-[#222222] text-center">
              <span className="text-3xl block mb-2">🎲</span>
              <p className="text-xs text-gray-400 font-medium">No game rounds recorded yet.</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Play any demo game in the lobby to see your real round results, stakes, and payouts!
              </p>
              <Link
                href="/games"
                className="inline-block mt-4 px-4 py-2 rounded-xl bg-[#242424] hover:bg-[#2F2F2F] text-xs font-bold text-[#E9CA78]"
              >
                Browse 36 Games →
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {gameHistory.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#242424] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {record.result === "win" ? "🏆" : "🎲"}
                    </span>
                    <div>
                      <h4 className="font-bold text-white">{record.gameName}</h4>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {record.timestamp} • Round {record.roundId.slice(-6)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono font-bold ${
                        record.result === "win" ? "text-[#04BE02]" : "text-[#EA4E3D]"
                      }`}
                    >
                      {record.result === "win"
                        ? `+₹${(record.payout || record.win || 0).toLocaleString()}`
                        : `-₹${record.stake.toLocaleString()}`}
                    </span>
                    <span className="text-[10px] text-gray-500 block font-mono">
                      Bal: ₹{record.balanceAfter.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Menu */}
        <div className="rounded-2xl bg-[#141414] border border-[#2B2B2B] overflow-hidden divide-y divide-[#222222] mb-8">
          <Link
            href="/wallet"
            className="p-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">💳</span>
              <span className="text-sm font-semibold text-white">Deposit & Payout Demo Ledger ({transactions.length})</span>
            </div>
            <span className="text-gray-500">→</span>
          </Link>
          <Link
            href="/rewards"
            className="p-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎁</span>
              <span className="text-sm font-semibold text-white">Tasks & Earn Free Spins Center</span>
            </div>
            <span className="text-gray-500">→</span>
          </Link>
          <Link
            href="/vip"
            className="p-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">👑</span>
              <span className="text-sm font-semibold text-white">Super VIP Privileges & Perks (Level {user.vipLevel || 0})</span>
            </div>
            <span className="text-gray-500">→</span>
          </Link>
          <Link
            href="/support"
            className="p-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎧</span>
              <span className="text-sm font-semibold text-white">24/7 Help Desk & FAQ</span>
            </div>
            <span className="text-gray-500">→</span>
          </Link>
        </div>

        {/* Reset Demo Account Box */}
        <div className="p-6 rounded-2xl bg-[#161210] border border-[#EA4E3D]/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#EA4E3D] flex items-center gap-2">
              <span>⚠️</span>
              <span>Reset Demo Account</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Clear all simulated demo balances, transaction records, task progress, and game histories to start fresh.
            </p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-5 py-2.5 rounded-xl bg-[#261616] hover:bg-[#341B1B] border border-[#EA4E3D]/50 text-[#EA4E3D] font-bold text-xs uppercase shrink-0 transition-colors"
          >
            Reset Demo Data
          </button>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-sm p-6 rounded-2xl bg-[#161616] border border-[#333333] shadow-2xl text-center">
              <span className="text-4xl block mb-3">🔄</span>
              <h4 className="text-base font-black text-white mb-2">Reset Demo Account?</h4>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Reset all demo progress, wallet balance, rewards, transactions, and game history to fresh default state?
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2F2F2F] text-xs font-bold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    resetDemoAccount();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#EA4E3D] hover:bg-[#D43D2D] text-xs font-black text-white shadow-lg"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />

      <BottomNav
        activeTab="mine"
        isLoggedIn={user.isLoggedIn}
        onOpenProfile={() => {}}
        onSelectTab={() => {}}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        onOpenDeposit={() => {
          if (!user.isLoggedIn) {
            setAuthMode("login");
            setIsAuthOpen(true);
            return;
          }
          setWalletTab("deposit");
          setIsWalletOpen(true);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(phone, mode) => {
          login(phone || "9876543210", mode);
        }}
      />

      <WalletModal
        isOpen={isWalletOpen}
        initialTab={walletTab}
        onClose={() => setIsWalletOpen(false)}
        user={user}
        transactions={transactions}
        gameHistory={gameHistory}
        onDemoDeposit={(amount) => deposit(amount)}
        onDemoWithdraw={(amount, account, ifsc) => withdraw(amount, account, ifsc)}
      />
    </div>
  );
}
