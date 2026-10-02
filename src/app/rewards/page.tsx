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
import { UserProfileModal } from "@/components/sites/iplwin/home/UserProfileModal";

export default function RewardsPage() {
  const {
    user,
    tasks,
    transactions,
    gameHistory,
    isHydrated,
    login,
    logout,
    deposit,
    withdraw,
    claimTask,
    resetDemoAccount,
  } = useDemo();

  const [claimToast, setClaimToast] = useState("");

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw" | "history" | "game_history">("deposit");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleClaim = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const ok = claimTask(taskId);
    if (ok) {
      if (task.rewardType === "free_spins") {
        setClaimToast(`🎉 Claimed ${task.rewardAmount} Free Spins for ${task.targetGameName}!`);
      } else {
        setClaimToast(`🎉 Claimed ₹${task.rewardAmount} Demo Credits!`);
      }
      setTimeout(() => setClaimToast(""), 4000);
    }
  };

  const totalEarnedSpins = Object.values(user.earnedFreeSpins || {}).reduce((a, b) => a + b, 0);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#D1AE52] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">Loading Rewards Hub...</p>
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
        onOpenProfile={() => setIsProfileOpen(true)}
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-8 pb-20 md:pb-12">
        {/* Toast */}
        {claimToast && (
          <div className="mb-6 p-4 rounded-xl bg-[#142917] border border-[#04BE02]/50 text-[#04BE02] font-bold text-sm text-center shadow-lg animate-fadeIn">
            {claimToast}
          </div>
        )}

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171717] via-[#241908] to-[#171717] border border-[#333333] p-6 sm:p-10 mb-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#04BE02]/20 text-[#04BE02] border border-[#04BE02]/40 tracking-wider">
              Rewards Hub & Free Spins
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-2 tracking-tight">
              Tasks & Free Spin Center
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Complete daily platform challenges to earn genuine Free Spins and demo balances.
              Free spins are strictly earned rewards and only become accessible on eligible games after claiming!
            </p>
          </div>
        </div>

        {/* Inventory Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-sm">
            <span className="text-gray-400 text-xs font-semibold uppercase block mb-1">Total Earned Free Spins</span>
            <div className="text-3xl font-black text-[#D1AE52] font-mono flex items-center gap-2">
              <span>{totalEarnedSpins}</span>
              <span className="text-base text-gray-400 font-normal">Spins</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Rule 13 strictly enforced: 0 by default</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-sm">
            <span className="text-gray-400 text-xs font-semibold uppercase block mb-1">Completed Tasks</span>
            <div className="text-3xl font-black text-[#04BE02] font-mono flex items-center gap-2">
              <span>{tasks.filter((t) => t.claimed).length}</span>
              <span className="text-base text-gray-400 font-normal">/ {tasks.length}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Daily tasks reset automatically each local day</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-sm">
            <span className="text-gray-400 text-xs font-semibold uppercase block mb-1">Demo Play Balance</span>
            <div className="text-3xl font-black text-white font-mono flex items-center gap-2">
              <span>₹{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Simulated entertainment funds</p>
          </div>
        </div>

        {/* Free Spins Inventory Table */}
        <div className="mb-10 p-6 rounded-2xl bg-[#141414] border border-[#2E2E2E]">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>🎰</span>
            <span>Your Earned Free Spins Inventory</span>
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Free spins can only be used on eligible slot titles once claimed from active tasks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 3150300, name: "Fortune Gems 3", provider: "JILI" },
              { id: 3150049, name: "Super Ace", provider: "JILI" },
              { id: 3150051, name: "Money Coming", provider: "JILI" },
            ].map((slot) => {
              const count = user.earnedFreeSpins[slot.id] || 0;
              return (
                <div
                  key={slot.id}
                  className="p-4 rounded-xl bg-[#0D0D0D] border border-[#262626] flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">{slot.name}</h3>
                    <span className="text-[11px] text-gray-500">{slot.provider}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-mono font-black ${count > 0 ? "text-[#04BE02]" : "text-gray-600"}`}>
                      {count}
                    </span>
                    <span className="text-[10px] text-gray-500 block uppercase">Available</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Tasks Grid */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>Daily Missions & Challenges</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => {
              const isReady = !task.claimed && task.progress >= task.maxProgress;
              const percent = Math.min(100, Math.round((task.progress / task.maxProgress) * 100));

              return (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    task.claimed
                      ? "bg-[#111111] border-[#222222] opacity-70"
                      : isReady
                      ? "bg-[#161616] border-[#04BE02]/50 shadow-lg shadow-[#04BE02]/5"
                      : "bg-[#141414] border-[#2B2B2B]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-[#1F1F1F] border border-[#333333]">
                        {task.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{task.title}</h3>
                          {task.isDaily && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D1AE52]/20 text-[#E9CA78] font-bold uppercase">
                              Daily
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
                      </div>
                    </div>

                    {/* Reward Pill */}
                    <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase bg-[#D1AE52]/20 text-[#D1AE52] border border-[#D1AE52]/40 shrink-0">
                      {task.rewardType === "free_spins"
                        ? `${task.rewardAmount} Spins`
                        : `+₹${task.rewardAmount}`}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#202020] h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all duration-500 ${
                        task.claimed ? "bg-gray-600" : isReady ? "bg-[#04BE02]" : "bg-[#D1AE52]"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">
                      Progress: {task.progress}/{task.maxProgress}
                    </span>

                    {task.claimed ? (
                      <span className="text-xs font-bold text-gray-500 uppercase">✓ Claimed</span>
                    ) : isReady ? (
                      <button
                        onClick={() => handleClaim(task.id)}
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#04BE02] to-[#009688] text-white font-extrabold text-xs uppercase shadow hover:brightness-110 active:scale-95 transition-all"
                      >
                        Claim Reward
                      </button>
                    ) : (
                      <Link
                        href="/games"
                        className="px-3 py-1 rounded-lg bg-[#242424] hover:bg-[#333333] text-gray-300 font-bold text-xs transition-colors"
                      >
                        Play Now →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />

      <BottomNav
        activeTab="discount"
        isLoggedIn={user.isLoggedIn}
        onOpenProfile={() => setIsProfileOpen(true)}
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

      {/* Modals */}
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

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onOpenWallet={(tab) => {
          setIsProfileOpen(false);
          setWalletTab(tab);
          setIsWalletOpen(true);
        }}
        onOpenTasks={() => setIsProfileOpen(false)}
        onLogout={logout}
        onResetDemo={resetDemoAccount}
      />
    </div>
  );
}
