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
import { HeroBannerCarousel } from "@/components/sites/iplwin/home/HeroBannerCarousel";
import { QuickActionsBar } from "@/components/sites/iplwin/home/QuickActionsBar";
import { LiveJackpotBanner } from "@/components/sites/iplwin/home/LiveJackpotBanner";
import { WinnersFeed } from "@/components/sites/iplwin/home/WinnersFeed";
import { CategoryNav } from "@/components/sites/iplwin/home/CategoryNav";
import { GameGrid } from "@/components/sites/iplwin/home/GameGrid";
import { VIPPromoShowcase } from "@/components/sites/iplwin/home/VIPPromoShowcase";
import { AppDownloadBanner } from "@/components/sites/iplwin/home/AppDownloadBanner";
import { SiteFooter } from "@/components/sites/iplwin/home/SiteFooter";
import { BottomNav } from "@/components/sites/iplwin/home/BottomNav";
import { AuthModal } from "@/components/sites/iplwin/home/AuthModal";
import { LanguageModal } from "@/components/sites/iplwin/home/LanguageModal";
import { GameModal } from "@/components/sites/iplwin/home/GameModal";
import { RewardsTasksModal } from "@/components/sites/iplwin/home/RewardsTasksModal";
import { WalletModal } from "@/components/sites/iplwin/home/WalletModal";
import { UserProfileModal } from "@/components/sites/iplwin/home/UserProfileModal";

export default function HomePage() {
  // Navigation & Filtering
  const [activeCategory, setActiveCategory] = useState("hot");
  const [activeProvider, setActiveProvider] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [bottomNavTab, setBottomNavTab] = useState("home");

  // User & Economy State (Simulated Demo Platform)
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

  // Auth Triggers
  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (phone?: string, mode?: "login" | "register") => {
    const phoneNumber = phone || "9876543210";
    const bonus = mode === "register" ? 111 : 0;
    const isNew = mode === "register";

    setUser((prev) => ({
      ...prev,
      isLoggedIn: true,
      phone: phoneNumber,
      username: `Player_${phoneNumber.slice(-4)}`,
      balance: prev.balance + bonus,
      vipLevel: isNew ? 1 : Math.max(1, prev.vipLevel),
    }));

    if (bonus > 0) {
      setTransactions((prev) => [
        {
          id: `tx_bonus_${Date.now()}`,
          type: "task_reward",
          amount: bonus,
          title: "New Member Starter Demo Bonus",
          timestamp: "Just now",
          status: "completed",
        },
        ...prev,
      ]);
    }
  };

  const handleLogout = () => {
    setUser(DEFAULT_GUEST_USER);
    setIsProfileOpen(false);
  };

  // Wallet Handlers
  const handleOpenWallet = (tab: "deposit" | "withdraw" | "history" = "deposit") => {
    if (!user.isLoggedIn) {
      handleOpenAuth("login");
      return;
    }
    setWalletTab(tab);
    setIsWalletOpen(true);
  };

  const handleDemoDeposit = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));

    setTransactions((prev) => [
      {
        id: `tx_dep_${Date.now()}`,
        type: "deposit",
        amount,
        title: "Simulated Demo Deposit",
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ]);

    // Advance task if applicable
    setTasks((prev) =>
      prev.map((t) => (t.id === "task_deposit_demo" ? { ...t, progress: 1 } : t))
    );
  };

  const handleDemoWithdraw = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
    }));

    setTransactions((prev) => [
      {
        id: `tx_wd_${Date.now()}`,
        type: "withdraw",
        amount,
        title: "Simulated Demo Withdrawal Request",
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ]);
  };

  // Game Launch Logic with Guest Enforcement (Rule 12)
  const handleLaunchGame = (game: Game, mode: "real" | "demo") => {
    if (game.isMemberOnly && !user.isLoggedIn) {
      handleOpenAuth("login");
      return;
    }

    setActiveGame(game);
    setGameMode(mode);

    // Progress demo rounds task
    setTasks((prev) =>
      prev.map((t) =>
        t.id === "task_play3" && t.progress < t.maxProgress
          ? { ...t, progress: t.progress + 1 }
          : t
      )
    );
  };

  // Free Spin Consumption (Rule 13: strictly from earned rewards)
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

  // Game Win Record
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

  // Claim Rewards/Tasks
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

    setTransactions((prev) => [
      {
        id: `tx_task_${Date.now()}`,
        type: "task_reward",
        amount: task.rewardAmount,
        title: `Claimed: ${task.title}`,
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ]);
  };

  // Quick Action triggers
  const handleQuickAction = (key: string) => {
    if (key === "deposit") {
      handleOpenWallet("deposit");
    } else if (key === "withdraw") {
      handleOpenWallet("withdraw");
    } else if (key === "vip") {
      if (user.isLoggedIn) {
        setIsProfileOpen(true);
      } else {
        const element = document.getElementById("vip-showcase");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (key === "promo") {
      setIsTasksOpen(true);
    } else if (key === "download") {
      const element = document.getElementById("app-download");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else if (key === "support") {
      alert("IPLwin 24/7 Live Customer Support is ready to assist you. Telegram: @iplwin_official");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      {/* 1. Sticky Navigation Header */}
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

      {/* 2. Scrolling Notice Marquee */}
      <NoticeMarquee />

      {/* Main Flow Content */}
      <main className="flex-1 pb-16 md:pb-6">
        {/* 3. Hero Promotional Banner Carousel */}
        <HeroBannerCarousel
          onBannerAction={() => {
            if (!user.isLoggedIn) {
              handleOpenAuth("register");
            } else {
              setIsTasksOpen(true);
            }
          }}
        />

        {/* 4. Quick Actions Bar */}
        <QuickActionsBar onAction={handleQuickAction} />

        {/* 5. Live Progressive Ticking Jackpot Pool */}
        <LiveJackpotBanner />

        {/* 6. Live Community Winners Stream */}
        <WinnersFeed />

        {/* 7. Category Navigation & Sub-provider Filters */}
        <div id="games-section">
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            activeProvider={activeProvider}
            onSelectProvider={setActiveProvider}
          />

          {/* 8. Games Grid with Interactive Hover Cards */}
          <GameGrid
            activeCategory={activeCategory}
            activeProvider={activeProvider}
            searchQuery={searchQuery}
            onLaunchGame={handleLaunchGame}
          />
        </div>

        {/* 9. VIP Program & Bonus Promotion Showcase */}
        <div id="vip-showcase">
          <VIPPromoShowcase
            onPromoClick={(title) => {
              if (title.includes("Sign-up") && !user.isLoggedIn) {
                handleOpenAuth("register");
              } else if (title.includes("VIP")) {
                if (user.isLoggedIn) {
                  setIsProfileOpen(true);
                } else {
                  handleOpenAuth("login");
                }
              } else {
                setIsTasksOpen(true);
              }
            }}
          />
        </div>

        {/* 10. Native Mobile App Download Strip */}
        <div id="app-download">
          <AppDownloadBanner />
        </div>
      </main>

      {/* 11. Comprehensive Platform Footer */}
      <SiteFooter />

      {/* 12. Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={bottomNavTab}
        isLoggedIn={user.isLoggedIn}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectTab={(tab) => {
          setBottomNavTab(tab);
          if (tab === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (tab === "discount") {
            setIsTasksOpen(true);
          } else if (tab === "vip") {
            const el = document.getElementById("vip-showcase");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onOpenAuth={handleOpenAuth}
        onOpenDeposit={() => handleOpenWallet("deposit")}
      />

      {/* 13. Modals */}
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
        onDemoDeposit={handleDemoDeposit}
        onDemoWithdraw={handleDemoWithdraw}
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
        onLogout={handleLogout}
      />
    </div>
  );
}
