"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Game, UserProfile } from "@/types/site";
import { CloseIcon, CrownIcon } from "../shared/icons";
import { useDemo, PlayRoundParams } from "@/lib/DemoContext";

interface GameModalProps {
  isOpen: boolean;
  game: Game | null;
  mode: "real" | "demo";
  user?: UserProfile;
  onClose: () => void;
  onUpdateBalance?: (newBalance: number) => void;
  onUseFreeSpin?: (gameId: number | string) => void;
  onRecordWin?: (amount: number, gameName: string) => void;
  onPlayRound?: (params: PlayRoundParams) => unknown;
}

const SLOT_SYMBOLS = ["💎", "👑", "7️⃣", "⭐", "🔔", "💰", "🍒"];

export function GameModal({
  isOpen,
  game,
  mode,
  user,
  onClose,
  onUpdateBalance,
}: GameModalProps) {
  const { user: ctxUser, playRound, notify } = useDemo();
  const activeUser = user || ctxUser;

  // Aviator / Crash state
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashState, setCrashState] = useState<"betting" | "flying" | "crashed">("betting");
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [aviatorWin, setAviatorWin] = useState(0);

  // Slot machine state
  const [reels, setReels] = useState(["💎", "👑", "7️⃣"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [slotWinMessage, setSlotWinMessage] = useState("");

  // Card & table state
  const [isDealing, setIsDealing] = useState(false);

  // Common bet state
  const [betAmount, setBetAmount] = useState(10);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Earned Free Spins check (Rule 13: only if user actually earned them from Tasks/Rewards!)
  const availableFreeSpins = game ? (activeUser.earnedFreeSpins[String(game.id)] || 0) : 0;

  // Reset states when a new game opens
  useEffect(() => {
    if (isOpen) {
      setMultiplier(1.0);
      setCrashState("betting");
      setHasCashedOut(false);
      setAviatorWin(0);
      setIsSpinning(false);
      setIsDealing(false);
      setSlotWinMessage("");
      setFeedbackMsg("");
    }
  }, [isOpen, game?.id]);

  // Aviator loop
  useEffect(() => {
    if (!isOpen || !game) return;
    if (game.category !== "minigames" && !game.name.includes("Aviator")) return;

    let interval: NodeJS.Timeout;
    if (crashState === "flying") {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const next = +(prev + 0.04 + prev * 0.02).toFixed(2);
          // Crash condition
          if (next > 1.3 && Math.random() < 0.05) {
            setCrashState("crashed");
            return next;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpen, game, crashState]);

  // Handle Aviator Start
  const handleAviatorStart = () => {
    if (!game) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for this round.");
      notify("warning", "Insufficient demo balance. Top-up in Demo Wallet.", "Demo Balance");
      return;
    }

    const res = playRound({
      game,
      stake: betAmount,
      payout: 0,
      result: "loss",
      isFreeSpin: false,
      details: "Aviator takeoff stake",
    });

    if (!res.success) return;
    if (onUpdateBalance && res.balanceAfter !== undefined) {
      onUpdateBalance(res.balanceAfter);
    }

    setMultiplier(1.0);
    setHasCashedOut(false);
    setAviatorWin(0);
    setFeedbackMsg("");
    setCrashState("flying");
  };

  // Handle Aviator Cash Out
  const handleAviatorCashOut = () => {
    if (crashState !== "flying" || hasCashedOut || !game) return;
    setHasCashedOut(true);
    const won = +(betAmount * multiplier).toFixed(2);
    setAviatorWin(won);

    const res = playRound({
      game,
      stake: 0,
      payout: won,
      result: "win",
      isFreeSpin: false,
      details: `Cashed out at ${multiplier}x (+₹${won.toLocaleString()})`,
    });

    if (onUpdateBalance && res.balanceAfter !== undefined) {
      onUpdateBalance(res.balanceAfter);
    }
  };

  // Handle Slot Spin
  const handleSlotSpin = useCallback((isFree: boolean) => {
    if (isSpinning || !game) return;
    if (!isFree && activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance. Top-up in Demo Wallet.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }
    if (isFree && (activeUser.earnedFreeSpins[String(game.id)] || 0) <= 0) {
      setFeedbackMsg("No free spins remaining for this game.");
      return;
    }

    setIsSpinning(true);
    setSlotWinMessage("");
    setFeedbackMsg("");

    let spins = 0;
    const interval = setInterval(() => {
      setReels([
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      ]);
      spins++;
      if (spins > 12) {
        clearInterval(interval);
        // Determine outcome
        const finalReels = [
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
          SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        ];

        // If free spin, give a favorable chance of matching
        if (isFree && Math.random() < 0.75) {
          const lucky = SLOT_SYMBOLS[Math.floor(Math.random() * 3)];
          finalReels[0] = lucky;
          finalReels[1] = lucky;
          finalReels[2] = lucky;
        }

        setReels(finalReels);
        setIsSpinning(false);

        let win = 0;
        let details = `Spun ${finalReels.join(" ")}`;
        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          win = isFree ? betAmount * 10 : betAmount * 5;
          details = `🎉 3x Matching ${finalReels[0]} (+₹${win})`;
          setSlotWinMessage(`🎉 BIG WIN! 3x Matching ${finalReels[0]} +₹${win}!`);
        } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
          win = isFree ? betAmount * 2 : betAmount * 1.5;
          details = `⭐ Match 2 Symbols (+₹${win})`;
          setSlotWinMessage(`⭐ Match 2! Won +₹${win}!`);
        } else {
          setSlotWinMessage(isFree ? "Free Spin Round Complete!" : "Try again!");
        }

        playRound({
          game,
          stake: isFree ? 0 : betAmount,
          payout: win,
          result: win > 0 ? "win" : "loss",
          isFreeSpin: isFree,
          details,
        });
      }
    }, 70);
  }, [isSpinning, activeUser, betAmount, game, playRound, notify]);

  // Handle Card Deal
  const handleDealHand = () => {
    if (isDealing || !game) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for this hand.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    setIsDealing(true);
    const won = Math.random() > 0.4 ? betAmount * 2 : 0;
    const details = won > 0 ? `Player Hand Won (+₹${won})` : "Dealer Hand Won";

    const res = playRound({
      game,
      stake: betAmount,
      payout: won,
      result: won > 0 ? "win" : "loss",
      isFreeSpin: false,
      details,
    });

    if (onUpdateBalance && res.balanceAfter !== undefined) {
      onUpdateBalance(res.balanceAfter);
    }

    if (won > 0) {
      setFeedbackMsg(`🏆 Round Result: Player Hand Won +₹${won}!`);
    } else {
      setFeedbackMsg("Round Result: Dealer Won. Try again!");
    }

    setTimeout(() => setIsDealing(false), 500);
  };

  if (!isOpen || !game) return null;

  const isSlotGame = game.category === "slot";
  const isAviatorGame = game.category === "minigames" || game.name.includes("Aviator") || game.name.includes("Crash");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#141414] border border-[#333333] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Game Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-[#2E2E2E]">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎮</span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{game.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D1AE52]/20 text-[#D1AE52] border border-[#D1AE52]/40 font-bold uppercase">
                  {mode === "demo" ? "Demo Play" : "Play Mode"}
                </span>
                {/* Rule 13 Indicator: Earned Free Spins (only if earned from tasks) */}
                {availableFreeSpins > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#04BE02]/20 text-[#04BE02] border border-[#04BE02]/40 font-extrabold flex items-center gap-1 animate-pulse">
                    <CrownIcon className="w-3 h-3 text-[#04BE02]" />
                    <span>{availableFreeSpins} Free Spins Earned!</span>
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-gray-400">Provider: {game.provider}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#333333] text-xs font-semibold text-[#D1AE52]">
              <span>Demo Balance: </span>
              <span className="text-white font-mono font-bold">
                ₹ {activeUser.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Exit Game Modal"
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Entertainment Demo Disclaimer Ribbon */}
        <div className="bg-[#1F1705] border-b border-[#3B2C0A] px-4 py-1.5 text-center text-[11px] text-[#D1AE52] font-semibold flex items-center justify-center gap-2">
          <span>⚠️</span>
          <span>Simulated Entertainment Demo Experience — No real money deposits or gambling involved.</span>
        </div>

        {/* Interactive Game Canvas Engine */}
        <div className="relative flex-1 bg-gradient-to-b from-[#111111] to-[#080808] p-4 sm:p-8 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
          {/* Subtle Grid Canvas Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:18px_18px] opacity-40 pointer-events-none" />

          {/* ENGINE 1: AVIATOR / CRASH */}
          {isAviatorGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
              {crashState === "flying" && (
                <div className="text-center">
                  <div className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-white mb-3 drop-shadow-[0_0_30px_rgba(209,174,82,0.6)]">
                    <span className="text-[#D1AE52]">{multiplier}</span>x
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#04BE02]/20 border border-[#04BE02]/40 text-[#04BE02] text-xs font-bold uppercase tracking-wider animate-bounce">
                    <span>🚀 Takeoff In Progress...</span>
                  </div>
                </div>
              )}

              {crashState === "crashed" && (
                <div className="text-center">
                  <div className="text-6xl sm:text-8xl font-black font-mono text-[#EA4E3D] mb-3 drop-shadow-[0_0_30px_rgba(234,78,61,0.6)]">
                    {multiplier}x
                  </div>
                  <p className="text-sm font-extrabold text-[#EA4E3D] uppercase tracking-widest mb-4">
                    Flew Away!
                  </p>
                  <button
                    onClick={() => {
                      setCrashState("betting");
                      setMultiplier(1.0);
                      setHasCashedOut(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-xs uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    Play Next Round
                  </button>
                </div>
              )}

              {crashState === "betting" && (
                <div className="text-center max-w-sm">
                  <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-4 border border-[#333333] shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.thumbnail}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/games/game_placeholder.svg";
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-black text-white mb-1">{game.name}</h4>
                  <p className="text-xs text-gray-400 mb-6">
                    Place your demo bet and click Cash Out before the plane flies away!
                  </p>
                  <button
                    onClick={handleAviatorStart}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all"
                  >
                    Launch Round (Bet ₹{betAmount})
                  </button>
                </div>
              )}

              {hasCashedOut && (
                <div className="absolute top-4 px-6 py-2 rounded-xl bg-[#04BE02] text-black font-black text-sm shadow-xl animate-bounce">
                  Cashed Out! Won ₹{aviatorWin.toLocaleString()} 🎉
                </div>
              )}
            </div>
          )}

          {/* ENGINE 2: SLOTS (Fortune Gems, Super Ace, Money Coming) */}
          {isSlotGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-md">
              {/* Slot Reels Container */}
              <div className="w-full bg-[#181818] border-2 border-[#D1AE52]/50 rounded-2xl p-6 shadow-2xl shadow-[#D1AE52]/10 mb-4">
                <div className="grid grid-cols-3 gap-3 bg-[#0A0A0A] p-4 rounded-xl border border-[#2D2D2D]">
                  {reels.map((symbol, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-[#1A1A1A] rounded-xl border border-[#333333] flex items-center justify-center text-4xl sm:text-5xl shadow-inner select-none transition-transform"
                    >
                      {symbol}
                    </div>
                  ))}
                </div>

                {slotWinMessage && (
                  <p className="text-center font-bold text-xs sm:text-sm text-[#E9CA78] mt-3 animate-pulse">
                    {slotWinMessage}
                  </p>
                )}
              </div>

              {/* Action Buttons: Free Spin (Rule 13) vs Regular Spin */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                {/* RULE 13 ENFORCED: Free spin button ONLY displays if user earned spins through tasks! */}
                {availableFreeSpins > 0 ? (
                  <button
                    disabled={isSpinning}
                    onClick={() => handleSlotSpin(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#04BE02] via-[#00c900] to-[#029100] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>🎰 USE EARNED FREE SPIN</span>
                    <span className="px-2 py-0.5 rounded bg-black/40 text-white text-xs">
                      ({availableFreeSpins} Left)
                    </span>
                  </button>
                ) : (
                  <button
                    disabled={isSpinning}
                    onClick={() => handleSlotSpin(false)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all"
                  >
                    {isSpinning ? "Spinning Reels..." : `Spin (Bet ₹${betAmount})`}
                  </button>
                )}
              </div>

              {availableFreeSpins === 0 && (
                <p className="text-[11px] text-gray-500 mt-2 text-center">
                  💡 Free spins can be earned in the Daily Tasks & Rewards Hub.
                </p>
              )}
            </div>
          )}

          {/* ENGINE 3: CARDS & OTHER DEMO GAMES */}
          {!isAviatorGame && !isSlotGame && (
            <div className="relative z-10 text-center max-w-sm">
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden mb-4 border border-[#333333] shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/games/game_placeholder.svg";
                  }}
                />
              </div>
              <h4 className="text-xl font-black text-white mb-1">{game.name}</h4>
              <p className="text-xs text-gray-400 mb-6">
                Interactive demo table is ready. Simulated chip value: ₹{betAmount}.
              </p>
              <button
                disabled={isDealing}
                onClick={handleDealHand}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {isDealing ? "Dealing Hand..." : `Deal Hand (Bet ₹${betAmount})`}
              </button>
            </div>
          )}

          {feedbackMsg && (
            <p className="absolute bottom-4 text-xs font-bold text-[#E9CA78] animate-fadeIn">
              {feedbackMsg}
            </p>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 bg-[#181818] border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-bold">Bet Chip:</span>
            {[10, 50, 100, 500].map((amt) => (
              <button
                key={amt}
                disabled={crashState === "flying" || isSpinning}
                onClick={() => setBetAmount(amt)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  betAmount === amt
                    ? "bg-[#D1AE52] text-black"
                    : "bg-[#252525] text-gray-300 hover:bg-[#333333]"
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isAviatorGame && crashState === "flying" && !hasCashedOut && (
              <button
                onClick={handleAviatorCashOut}
                className="px-6 py-2 rounded-xl bg-[#04BE02] text-black font-black text-xs uppercase shadow-md shadow-[#04BE02]/30 active:scale-95 transition-all"
              >
                Cash Out (₹{+(betAmount * multiplier).toFixed(2)})
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#252525] hover:bg-[#333333] text-gray-300 text-xs font-bold transition-colors"
            >
              Exit to Lobby
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
