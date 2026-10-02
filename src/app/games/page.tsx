"use client";

import React, { useState } from "react";
import { Game } from "@/types/site";
import { GAMES } from "@/components/sites/iplwin/home/data";
import { useDemo } from "@/lib/DemoContext";
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

  const [activeCategory, setActiveCategory] = useState("hot");
  const [activeProvider, setActiveProvider] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("en");

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

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleOpenWallet = (tab: "deposit" | "withdraw" | "history" | "game_history" = "deposit") => {
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

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#D1AE52] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">Loading Games Lobby...</p>
        </div>
      </div>
    );
  }

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
