"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Game } from "@/types/site";
import { GAMES } from "@/components/sites/iplwin/home/data";
import { useDemo } from "@/lib/DemoContext";
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
  const router = useRouter();
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
    playRound,
    useFreeSpin,
    resetDemoAccount,
  } = useDemo();

  // Navigation & Filtering
  const [activeCategory, setActiveCategory] = useState("hot");
  const [activeProvider, setActiveProvider] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [bottomNavTab, setBottomNavTab] = useState("home");

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [gameMode, setGameMode] = useState<"real" | "demo">("demo");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<"deposit" | "withdraw" | "history" | "game_history">("deposit");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);

  // Auth Triggers
  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Wallet Handlers
  const handleOpenWallet = (tab: "deposit" | "withdraw" | "history" | "game_history" = "deposit") => {
    if (!user.isLoggedIn) {
      handleOpenAuth("login");
      return;
    }
    setWalletTab(tab);
    setIsWalletOpen(true);
  };

  // Game Launch Logic with Guest Enforcement (Rule 12)
  const handleLaunchGame = (game: Game, mode: "real" | "demo") => {
    if (game.isMemberOnly && !user.isLoggedIn) {
      handleOpenAuth("login");
      return;
    }

    setActiveGame(game);
    setGameMode(mode);
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
      router.push("/support");
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#D1AE52] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">Loading IPLwin Platform...</p>
        </div>
      </div>
    );
  }

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
            onResetFilters={() => {
              setSearchQuery("");
              setActiveProvider("All");
              setActiveCategory("hot");
            }}
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
        onSuccess={(phone, mode) => {
          login(phone || "9876543210", mode);
        }}
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
        onPlayRound={playRound}
        onUseFreeSpin={useFreeSpin}
      />

      <RewardsTasksModal
        isOpen={isTasksOpen}
        onClose={() => setIsTasksOpen(false)}
        tasks={tasks}
        user={user}
        onClaimTask={claimTask}
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
          handleOpenWallet(tab);
        }}
        onOpenTasks={() => {
          setIsProfileOpen(false);
          setIsTasksOpen(true);
        }}
        onLogout={logout}
        onResetDemo={resetDemoAccount}
      />
    </div>
  );
}
