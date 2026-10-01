"use client";

import React, { useState } from "react";
import Link from "next/link";
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

export default function SupportPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST_USER);
  const [transactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("general");

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw" | "history">("deposit");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const faqs = [
    {
      category: "general",
      q: "How does the IPLwin demo platform work?",
      a: "IPLwin is an entertainment gaming platform providing simulated sports exchange, live table simulations, crash games (Aviator), and slot engines. All balances and transactions are simulated in demo mode for training, strategy testing, and entertainment.",
    },
    {
      category: "general",
      q: "How do I earn Free Spins on slots like Fortune Gems 3 and Super Ace?",
      a: "Under Rule 13, Free Spins are NOT granted automatically by default when opening a game. They must be earned by completing active missions in the Tasks & Rewards Hub. Once claimed, they appear in your inventory and are consumed 1-by-1 when you spin eligible games.",
    },
    {
      category: "account",
      q: "How do I register an account and claim the starter demo credits?",
      a: "Click 'Register' in the top header, enter any standard 10-digit mobile number, and set a password. New registrations automatically receive ₹111 in demo starter bonus credits to immediately start testing games.",
    },
    {
      category: "account",
      q: "Why are some games marked 'Members Only'?",
      a: "Certain live casino tables and sports exchanges require an active member profile to maintain player seat state and tournament leaderboard rankings. Simply log in or complete fast registration to access all member games.",
    },
    {
      category: "wallet",
      q: "How do simulated deposits and withdrawals work?",
      a: "You can test recharging your demo wallet by clicking 'Deposit' or navigating to the Wallet section. You can simulate instant deposits via UPI, PhonePe, Paytm, IMPS, or USDT. Simulated withdrawal requests are recorded in your transaction history ledger.",
    },
    {
      category: "games",
      q: "Are the game outcomes fair and random?",
      a: "Yes. All demo games utilize industry-standard cryptographic pseudorandom number algorithms (verified RNG simulation) ensuring that slot reels, dice rolls, crash curves, and card deals are 100% unbiased and transparent.",
    },
  ];

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory || activeCategory === "general");

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
        {/* Support Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171717] via-[#0E202B] to-[#171717] border border-[#2B2B2B] p-6 sm:p-10 mb-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#00B0FF]/20 text-[#00B0FF] border border-[#00B0FF]/40 tracking-wider">
              24/7 Platform Help Desk
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-2 tracking-tight">
              Customer Service & Knowledge Base
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Find answers to common platform questions regarding gameplay mechanics, demo wallet simulation, free spin rules, and account settings.
            </p>
          </div>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2B2B2B] flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-3 block">💬</span>
              <h3 className="text-base font-bold text-white mb-1">Telegram Official Desk</h3>
              <p className="text-xs text-gray-400 mb-4">
                Join our official community channel for live updates, announcements, and demo support assistance.
              </p>
            </div>
            <a
              href="https://t.me/iplwin_official"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-[#0088CC] hover:bg-[#0099E6] text-white text-xs font-bold text-center transition-colors"
            >
              Open Telegram @iplwin_official
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2B2B2B] flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-3 block">🎧</span>
              <h3 className="text-base font-bold text-white mb-1">Live Chat Simulator</h3>
              <p className="text-xs text-gray-400 mb-4">
                Chat with our automated customer service bot for instant guide walkthroughs and rules clarification.
              </p>
            </div>
            <button
              onClick={() => alert("Automated Assistant: IPLwin platform is operational. All game engines, demo wallet, and Tasks & Rewards are online!")}
              className="py-2.5 px-4 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#444444] text-white text-xs font-bold transition-colors"
            >
              Start Live Chat
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#2B2B2B] flex flex-col justify-between">
            <div>
              <span className="text-3xl mb-3 block">🎁</span>
              <h3 className="text-base font-bold text-white mb-1">Earn Free Spins Help</h3>
              <p className="text-xs text-gray-400 mb-4">
                Need help claiming earned free spins? Visit our Rewards Hub to check your daily mission progress.
              </p>
            </div>
            <Link
              href="/rewards"
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black text-xs font-extrabold text-center transition-all hover:brightness-105"
            >
              View Rewards Hub
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>❓</span>
              <span>Frequently Asked Questions</span>
            </h2>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-[#141414] border border-[#2B2B2B] rounded-xl self-start sm:self-auto">
              {[
                { id: "general", label: "All Topics" },
                { id: "account", label: "Account" },
                { id: "wallet", label: "Demo Wallet" },
                { id: "games", label: "Games & RNG" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategory === c.id
                      ? "bg-[#D1AE52] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#141414] border border-[#282828] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 hover:bg-[#1A1A1A] transition-colors"
                  >
                    <span className="text-sm font-bold text-white">{faq.q}</span>
                    <span className="text-gray-400 text-sm">{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-gray-400 leading-relaxed border-t border-[#222222] pt-3 bg-[#111111]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />

      <BottomNav
        activeTab="home"
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
