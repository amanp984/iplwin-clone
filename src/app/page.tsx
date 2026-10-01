"use client";

import React, { useState } from "react";
import { Game } from "@/types/site";
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

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("hot");
  const [activeProvider, setActiveProvider] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [userBalance, setUserBalance] = useState(111);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [gameMode, setGameMode] = useState<"real" | "demo">("real");
  const [bottomNavTab, setBottomNavTab] = useState("home");

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLaunchGame = (game: Game, mode: "real" | "demo") => {
    setActiveGame(game);
    setGameMode(mode);
  };

  const handleQuickAction = (key: string) => {
    if (key === "deposit" || key === "withdraw") {
      handleOpenAuth("register");
    } else if (key === "vip" || key === "promo") {
      setActiveCategory("hot");
      const element = document.getElementById("vip-showcase");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (key === "download") {
      const element = document.getElementById("app-download");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
        userBalance={userBalance}
      />

      {/* 2. Scrolling Notice Marquee */}
      <NoticeMarquee />

      {/* Main Flow Content */}
      <main className="flex-1 pb-16 md:pb-6">
        {/* 3. Hero Promotional Banner Carousel */}
        <HeroBannerCarousel
          onBannerAction={() => handleOpenAuth("register")}
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
            onPromoClick={() => handleOpenAuth("register")}
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
        onSelectTab={(tab) => {
          setBottomNavTab(tab);
          if (tab === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (tab === "discount" || tab === "vip") {
            const el = document.getElementById("vip-showcase");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        onOpenAuth={handleOpenAuth}
        onOpenDeposit={() => handleOpenAuth("register")}
      />

      {/* 13. Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setUserBalance((b) => b + 111);
          alert("Success! Welcome to IPLwin. ₹111 free balance has been credited to your account!");
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
        userBalance={userBalance}
        onClose={() => setActiveGame(null)}
      />
    </div>
  );
}
