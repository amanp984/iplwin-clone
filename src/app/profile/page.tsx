"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserProfile, WalletTransaction } from "@/types/site";
import { DEFAULT_GUEST_USER, INITIAL_TRANSACTIONS } from "@/components/sites/iplwin/home/data";
import { SiteHeader } from "@/components/sites/iplwin/home/SiteHeader";
import { NoticeMarquee } from "@/components/sites/iplwin/home/NoticeMarquee";
import { SiteFooter } from "@/components/sites/iplwin/home/SiteFooter";
import { BottomNav } from "@/components/sites/iplwin/home/BottomNav";
import { AuthModal } from "@/components/sites/iplwin/home/AuthModal";
import { WalletModal } from "@/components/sites/iplwin/home/WalletModal";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST_USER);
  const [transactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw" | "history">("deposit");

  const totalEarnedSpins = Object.values(user.earnedFreeSpins).reduce((a, b) => a + b, 0);

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
                  {user.isLoggedIn ? user.username : "Guest Account"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#D1AE52] text-black uppercase">
                  VIP {user.vipLevel || 0}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {user.isLoggedIn ? `Mobile: +91 ${user.phone}` : "Not logged in. Sign in to save gameplay progress."}
              </p>
            </div>
          </div>

          <div>
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
                onClick={() => setUser(DEFAULT_GUEST_USER)}
                className="px-5 py-2.5 rounded-xl bg-[#242424] hover:bg-[#2F2F2F] border border-[#444444] text-xs font-bold text-gray-300 hover:text-white transition-colors"
              >
                Log Out
              </button>
            )}
          </div>
        </div>

        {/* Balance & Inventory Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Demo Balance
              </span>
              <div className="text-3xl font-black text-[#D1AE52] font-mono">
                ₹{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <Link
              href="/wallet"
              className="px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-bold text-white transition-colors"
            >
              Open Wallet →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Earned Free Spins
              </span>
              <div className="text-3xl font-black text-[#04BE02] font-mono">
                {totalEarnedSpins} Spins
              </div>
              <span className="text-[10px] text-gray-500">Rule 13: 0 until earned from tasks</span>
            </div>
            <Link
              href="/rewards"
              className="px-4 py-2 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-bold text-white transition-colors"
            >
              Tasks Hub →
            </Link>
          </div>
        </div>

        {/* Free Spins Breakdown */}
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
                  <div className="text-2xl font-mono font-black text-[#04BE02]">{count}</div>
                  <span className="text-[10px] text-gray-400 uppercase">Available Spins</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links Menu */}
        <div className="rounded-2xl bg-[#141414] border border-[#2B2B2B] overflow-hidden divide-y divide-[#222222]">
          <Link
            href="/wallet"
            className="p-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">💳</span>
              <span className="text-sm font-semibold text-white">Deposit & Payout Demo Ledger</span>
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
              <span className="text-sm font-semibold text-white">Super VIP Privileges & Perks</span>
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

      <WalletModal
        isOpen={isWalletOpen}
        initialTab={walletTab}
        onClose={() => setIsWalletOpen(false)}
        user={user}
        transactions={transactions}
        onDemoDeposit={(amount) =>
          setUser((prev) => ({ ...prev, balance: prev.balance + amount }))
        }
        onDemoWithdraw={(amount) =>
          setUser((prev) => ({ ...prev, balance: Math.max(0, prev.balance - amount) }))
        }
      />
    </div>
  );
}
