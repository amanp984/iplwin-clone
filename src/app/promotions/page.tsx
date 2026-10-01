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
import { WalletModal } from "@/components/sites/iplwin/home/WalletModal";
import { UserProfileModal } from "@/components/sites/iplwin/home/UserProfileModal";

export default function PromotionsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST_USER);
  const [transactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<"all" | "member" | "vip" | "cashback">("all");
  const [toast, setToast] = useState("");

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw" | "history">("deposit");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const promos = [
    {
      id: "promo_1",
      category: "member",
      title: "New Member Starter Demo Bonus",
      amount: "₹ 111 FREE",
      badge: "HOT BONUS",
      description: "Sign up today with an Indian mobile number and instantly receive ₹111 in demo entertainment credits.",
      terms: "1x rollover requirement. Valid on all eligible demo slots and table games.",
      cta: "Claim ₹111 Now",
      gradient: "from-[#2A1005] via-[#1A0A02] to-[#121212]",
      accent: "#FF3D00",
    },
    {
      id: "promo_2",
      category: "vip",
      title: "Super VIP Tier Privilege Upgrade",
      amount: "₹ 111,111",
      badge: "HIGH ROLLER",
      description: "Progress through 10 tiered VIP levels and claim exclusive monthly allowances, birthday gifts & avatar crowns.",
      terms: "Tier progression calculated automatically on demo turnover. Zero deposit required.",
      cta: "View VIP Levels",
      gradient: "from-[#261E05] via-[#1A1402] to-[#121212]",
      accent: "#FFD700",
    },
    {
      id: "promo_3",
      category: "cashback",
      title: "Daily 1.5% Unlimited Demo Rebate",
      amount: "1.5% CASHBACK",
      badge: "DAILY AUTOMATIC",
      description: "Receive automatic 1.5% cashback on all simulated gameplay wagers every morning at 06:00 IST.",
      terms: "No caps or limits. Credited directly to your player wallet.",
      cta: "Join Daily Rebate",
      gradient: "from-[#082210] via-[#041208] to-[#121212]",
      accent: "#04BE02",
    },
    {
      id: "promo_4",
      category: "member",
      title: "Daily Tasks & Earned Free Spins",
      amount: "UP TO 15 SPINS",
      badge: "EARN FREE SPINS",
      description: "Complete daily active missions in the Rewards Hub to unlock genuine free spins on Fortune Gems 3 & Super Ace.",
      terms: "Free spins are strictly earned from missions. Only available upon task completion.",
      cta: "Go To Tasks Hub",
      gradient: "from-[#180A2B] via-[#0E0619] to-[#121212]",
      accent: "#D500F9",
    },
    {
      id: "promo_5",
      category: "vip",
      title: "Agent Affiliate Lifetime Share",
      amount: "45% COMMISSIONS",
      badge: "PARTNER PROGRAM",
      description: "Invite fellow gaming enthusiasts and receive up to 45% multi-tier revenue share on all demo volume.",
      terms: "Real-time commission dashboard with instant weekly demo settlements.",
      cta: "Become An Agent",
      gradient: "from-[#051C26] via-[#020F14] to-[#121212]",
      accent: "#00E5FF",
    },
  ];

  const filteredPromos = activeTab === "all" ? promos : promos.filter((p) => p.category === activeTab);

  const handleAction = (promo: (typeof promos)[0]) => {
    if (promo.id === "promo_1") {
      if (!user.isLoggedIn) {
        setAuthMode("register");
        setIsAuthOpen(true);
      } else {
        setToast("Starter bonus already claimed on your account!");
        setTimeout(() => setToast(""), 3000);
      }
    } else if (promo.id === "promo_4") {
      router.push("/rewards");
    } else if (promo.id === "promo_2") {
      router.push("/vip");
    } else {
      setToast(`Applied for ${promo.title}! Notification sent to your profile.`);
      setTimeout(() => setToast(""), 3000);
    }
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
        {toast && (
          <div className="mb-6 p-4 rounded-xl bg-[#1F1705] border border-[#FFD700]/50 text-[#FFD700] font-bold text-sm text-center shadow-lg animate-fadeIn">
            {toast}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#242424]">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#D1AE52]/20 text-[#D1AE52] border border-[#D1AE52]/40 tracking-wider">
              Exclusive Platform Offers
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
              Promotions & High Roller Privileges
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Discover welcome starter credits, daily rebates, free spin missions, and luxury VIP progression tiers.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141414] border border-[#2B2B2B] self-start md:self-auto overflow-x-auto">
            {[
              { id: "all", label: "All Promos" },
              { id: "member", label: "Members" },
              { id: "vip", label: "VIP Club" },
              { id: "cashback", label: "Rebates" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#D1AE52] text-black shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromos.map((promo) => (
            <div
              key={promo.id}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.gradient} border border-[#2D2D2D] p-6 flex flex-col justify-between shadow-xl hover:border-[#D1AE52]/60 hover:-translate-y-1 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                    style={{
                      backgroundColor: `${promo.accent}20`,
                      color: promo.accent,
                      border: `1px solid ${promo.accent}40`,
                    }}
                  >
                    {promo.badge}
                  </span>
                  <span className="text-xl">💎</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{promo.title}</h3>
                <div
                  className="text-2xl sm:text-3xl font-black font-mono tracking-tight mb-3"
                  style={{ color: promo.accent }}
                >
                  {promo.amount}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">{promo.description}</p>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-gray-400 mb-6">
                  <span className="font-semibold text-gray-300 block mb-0.5">Rules & Terms:</span>
                  {promo.terms}
                </div>
              </div>

              <button
                onClick={() => handleAction(promo)}
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                style={{
                  background:
                    promo.accent === "#FFD700"
                      ? "linear-gradient(90deg, #E9CA78, #D1AE52, #C39949)"
                      : promo.accent,
                  color: promo.accent === "#FFD700" ? "#0A0A0A" : "#FFFFFF",
                }}
              >
                <span>{promo.cta}</span>
                <span>→</span>
              </button>
            </div>
          ))}
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
        onLogout={() => {
          setUser(DEFAULT_GUEST_USER);
          setIsProfileOpen(false);
        }}
      />
    </div>
  );
}
