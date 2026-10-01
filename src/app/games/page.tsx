"use client";

import React, { useState } from "react";
import { Game, UserProfile, TaskItem, WalletTransaction } from "@/types/site";
import {
  GAMES,
  DEFAULT_GUEST_USER,
  INITIAL_TASKS,
  INITIAL_TRANSACTIONS,
} from "@/components/sites/iplwin/home/data";
import { SiteHeader } from "@/components/sites/iplwin/home/SiteHeader";
import { NoticeMarquee } from "@/components/sites/iplwin/home/NoticeMarquee";
import { CategoryNav } from "@/components/sites/iplwin/home/CategoryNav";
import { GameGrid } from "@/components/sites/iplwin/home/GameGrid";
import { SiteFooter } from "@/components/sites/iplwin/home/SiteFooter";
import { BottomNav } from "@/components/sites/iplwin/home/BottomNav";
import { AuthModal } from "@/components/sites/iplwin/home/AuthModal";
import { LanguageModal } from "@/components/sites/iplwin/home/LanguageModal";
import { GameModal } from "@/components/sites/iplwin/home/GameModal";
import { RewardsTasksModal } from "@/components/sites/iplwin/home/RewardsTasksModal";
import { WalletModal } from "@/components/sites/iplwin/home/WalletModal";
import { UserProfileModal } from "@/components/sites/iplwin/home/UserProfileModal";

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState("hot");
  const [activeProvider, setActiveProvider] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("en");

  // User state
  const [user, setUser] = useState<UserProfile>(DEFAULT_GUEST_USER);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [gameMode, setGameMode] = useState<"real" | "demo">("demo");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw" | "history">("deposit");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (phone?: string, mode?: "login" | "register") => {
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
  };

  const handleOpenWallet = (tab: "deposit" | "withdraw" | "history" = "deposit") => {
    if (!user.isLoggedIn) {
      handleOpenAuth("login");
      return;
    }
    setWalletTab(tab);
    setIsWalletOpen(true);
  };

  const handleLaunchGame = (game: Game, mode: "real" | "demo") => {
    if (game.isMemberOnly && !user.isLoggedIn) {
      handleOpenAuth("login");
      return;
    }
    setActiveGame(game);
    setGameMode(mode);
  };

  const handleUseFreeSpin = (gameId: number | string) => {
    setUser((prev) => {
      const current = prev.earnedFreeSpins[gameId] || 0;
      if (current <= 0) return prev;
      return {
        ...prev,
        earnedFreeSpins: {
          ...prev.earnedFreeSpins,
          [gameId]: current - 1,
        },
      };
    });
  };

  const handleRecordWin = (amount: number, gameName: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    setTransactions((prev) => [
      {
        id: `tx_win_${Date.now()}`,
        type: "win",
        amount,
        title: `${gameName} Demo Win`,
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ]);
  };

  const handleClaimTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.claimed || task.progress < task.maxProgress) return;

    if (task.rewardType === "free_spins" && task.targetGameId) {
      setUser((prev) => ({
        ...prev,
        earnedFreeSpins: {
          ...prev.earnedFreeSpins,
          [task.targetGameId!]: (prev.earnedFreeSpins[task.targetGameId!] || 0) + task.rewardAmount,
        },
        completedTasks: [...prev.completedTasks, taskId],
      }));
    } else if (task.rewardType === "demo_cash") {
      setUser((prev) => ({
        ...prev,
        balance: prev.balance + task.rewardAmount,
        completedTasks: [...prev.completedTasks, taskId],
      }));
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, claimed: true } : t))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <SiteHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeLanguage={activeLanguage}
        onOpenLanguage={() => setIsLanguageOpen(true)}
        onOpenAuth={handleOpenAuth}
        user={user}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenWallet={handleOpenWallet}
      />

      <NoticeMarquee />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 pb-20 md:pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#262626]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <span>Complete Game Lobby</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore all {GAMES.length} interactive tables, slots, crash mini-games, and sports matches with instant demo play.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#333333] text-xs font-semibold text-[#D1AE52]">
              {GAMES.length} Interactive Titles
            </span>
          </div>
        </div>

        {/* Category & Provider Filter */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeProvider={activeProvider}
          onSelectProvider={setActiveProvider}
        />

        {/* Game Grid */}
        <GameGrid
          activeCategory={activeCategory}
          activeProvider={activeProvider}
          searchQuery={searchQuery}
          onLaunchGame={handleLaunchGame}
          onResetFilters={() => {
            setSearchQuery("");
            setActiveProvider("All");
            setActiveCategory("hot");
          }}
        />
      </main>

      <SiteFooter />

      <BottomNav
        activeTab="home"
        isLoggedIn={user.isLoggedIn}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectTab={() => {}}
        onOpenAuth={handleOpenAuth}
        onOpenDeposit={() => handleOpenWallet("deposit")}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <LanguageModal
        isOpen={isLanguageOpen}
        currentLanguage={activeLanguage}
        onSelectLanguage={setActiveLanguage}
        onClose={() => setIsLanguageOpen(false)}
      />

      <GameModal
        isOpen={!!activeGame}
        game={activeGame}
        mode={gameMode}
        user={user}
        onClose={() => setActiveGame(null)}
        onUpdateBalance={(newBal) =>
          setUser((prev) => ({ ...prev, balance: newBal }))
        }
        onUseFreeSpin={handleUseFreeSpin}
        onRecordWin={handleRecordWin}
      />

      <RewardsTasksModal
        isOpen={isTasksOpen}
        onClose={() => setIsTasksOpen(false)}
        tasks={tasks}
        user={user}
        onClaimTask={handleClaimTask}
        onLaunchGameById={(gameId) => {
          const target = GAMES.find((g) => g.id === gameId);
          if (target) {
            setIsTasksOpen(false);
            handleLaunchGame(target, "demo");
          }
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
          handleOpenWallet(tab);
        }}
        onOpenTasks={() => {
          setIsProfileOpen(false);
          setIsTasksOpen(true);
        }}
        onLogout={() => {
          setUser(DEFAULT_GUEST_USER);
          setIsProfileOpen(false);
        }}
      />
    </div>
  );
}
