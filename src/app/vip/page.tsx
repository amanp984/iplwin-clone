"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/DemoContext";
import { SiteHeader } from "@/components/sites/iplwin/home/SiteHeader";
import { NoticeMarquee } from "@/components/sites/iplwin/home/NoticeMarquee";
import { SiteFooter } from "@/components/sites/iplwin/home/SiteFooter";
import { BottomNav } from "@/components/sites/iplwin/home/BottomNav";
import { AuthModal } from "@/components/sites/iplwin/home/AuthModal";
import { WalletModal } from "@/components/sites/iplwin/home/WalletModal";
import { UserProfileModal } from "@/components/sites/iplwin/home/UserProfileModal";

export default function VIPPage() {
  const router = useRouter();
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const vipTiers = [
    { level: 1, name: "Bronze Starter", exp: "₹ 500", upgradeGift: "₹ 11", monthlyBonus: "₹ 55", birthdayGift: "₹ 111", cashback: "0.5%" },
    { level: 2, name: "Silver Knight", exp: "₹ 5,000", upgradeGift: "₹ 55", monthlyBonus: "₹ 155", birthdayGift: "₹ 333", cashback: "0.7%" },
    { level: 3, name: "Gold Champion", exp: "₹ 20,000", upgradeGift: "₹ 222", monthlyBonus: "₹ 555", birthdayGift: "₹ 888", cashback: "0.9%" },
    { level: 4, name: "Platinum Master", exp: "₹ 100,000", upgradeGift: "₹ 888", monthlyBonus: "₹ 1,888", birthdayGift: "₹ 2,888", cashback: "1.1%" },
    { level: 5, name: "Diamond High Roller", exp: "₹ 500,000", upgradeGift: "₹ 3,888", monthlyBonus: "₹ 8,888", birthdayGift: "₹ 12,888", cashback: "1.3%" },
    { level: 6, name: "Legendary Royal", exp: "₹ 2,000,000", upgradeGift: "₹ 18,888", monthlyBonus: "₹ 38,888", birthdayGift: "₹ 58,888", cashback: "1.5%" },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#D1AE52] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">Loading VIP Hub...</p>
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
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2B1F05] via-[#1C1402] to-[#121212] border border-[#D1AE52]/40 p-6 sm:p-10 mb-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#D1AE52]/20 text-[#D1AE52] border border-[#D1AE52]/40 tracking-wider">
              👑 Super VIP Tier System
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-2 tracking-tight">
              Exclusive High Roller Club
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Every simulated round and wager earns tier experience points. Upgrade your tier to unlock permanent monthly allowances, birthday gifts, and dedicated VIP support privileges in demo mode.
            </p>
          </div>
        </div>

        {/* Current User VIP Card */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-[#2B2B2B] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E9CA78] to-[#D1AE52] p-1 flex items-center justify-center text-2xl text-black shadow-lg">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {user.isLoggedIn ? user.username : "Guest Player"}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#D1AE52] text-black uppercase">
                  VIP {user.vipLevel || 0}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Current simulated demo balance: ₹{user.balance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} • Demo EXP: {user.vipPoints || 0} pts
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-xs uppercase shadow hover:brightness-105 transition-all"
              >
                Log In To View Status
              </button>
            ) : (
              <Link
                href="/games"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-xs uppercase shadow hover:brightness-105 transition-all"
              >
                Play Games For EXP →
              </Link>
            )}
          </div>
        </div>

        {/* VIP Progression Table */}
        <div className="overflow-hidden rounded-2xl bg-[#141414] border border-[#2B2B2B] shadow-xl">
          <div className="px-6 py-4 bg-[#1A1A1A] border-b border-[#2E2E2E] flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>📊</span>
              <span>VIP Tier Progression & Perks Matrix</span>
            </h2>
            <span className="text-xs text-gray-400">All rewards simulated in demo currency</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#121212] text-gray-400 uppercase font-semibold text-[11px] border-b border-[#242424]">
                <tr>
                  <th className="py-3.5 px-4">VIP Level</th>
                  <th className="py-3.5 px-4">Tier Title</th>
                  <th className="py-3.5 px-4">Required EXP</th>
                  <th className="py-3.5 px-4">Upgrade Bonus</th>
                  <th className="py-3.5 px-4">Monthly Gift</th>
                  <th className="py-3.5 px-4">Birthday Gift</th>
                  <th className="py-3.5 px-4">Cashback Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202020] text-gray-300">
                {vipTiers.map((tier) => {
                  const isCurrent = (user.vipLevel || 0) === tier.level;
                  return (
                    <tr
                      key={tier.level}
                      className={`hover:bg-[#1A1A1A] transition-colors ${
                        isCurrent ? "bg-[#251F0D] border-l-2 border-[#D1AE52]" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[#D1AE52]">
                        VIP {tier.level} {isCurrent && "(Current)"}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">{tier.name}</td>
                      <td className="py-3.5 px-4 font-mono">{tier.exp}</td>
                      <td className="py-3.5 px-4 font-mono text-[#04BE02] font-semibold">{tier.upgradeGift}</td>
                      <td className="py-3.5 px-4 font-mono">{tier.monthlyBonus}</td>
                      <td className="py-3.5 px-4 font-mono">{tier.birthdayGift}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#D1AE52]">{tier.cashback}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <SiteFooter />

      <BottomNav
        activeTab="vip"
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
        onOpenTasks={() => {
          router.push("/rewards");
        }}
        onLogout={logout}
        onResetDemo={resetDemoAccount}
      />
    </div>
  );
}
