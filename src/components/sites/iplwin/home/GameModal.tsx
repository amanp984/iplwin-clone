"use client";

import React, { useState, useEffect } from "react";
import { Game } from "@/types/site";
import { CloseIcon } from "../shared/icons";

interface GameModalProps {
  isOpen: boolean;
  game: Game | null;
  mode: "real" | "demo";
  userBalance: number;
  onClose: () => void;
}

export function GameModal({
  isOpen,
  game,
  mode,
  userBalance,
  onClose,
}: GameModalProps) {
  const [multiplier, setMultiplier] = useState(1.0);
  const [gameState, setGameState] = useState<"betting" | "flying" | "crashed">("betting");
  const [betAmount, setBetAmount] = useState(10);
  const [demoBalance, setDemoBalance] = useState(mode === "demo" ? 5000 : userBalance);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [winAmount, setWinAmount] = useState(0);

  // Aviator / game simulation loop
  useEffect(() => {
    if (!isOpen || !game) return;

    let interval: NodeJS.Timeout;
    if (gameState === "flying") {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const next = +(prev + 0.05 + prev * 0.03).toFixed(2);
          // 4% chance to crash on each tick if above 1.5x
          if (next > 1.5 && Math.random() < 0.04) {
            setGameState("crashed");
            return next;
          }
          return next;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isOpen, game, gameState]);

  if (!isOpen || !game) return null;

  const handleStartGame = () => {
    if (demoBalance < betAmount) return;
    setDemoBalance((prev) => prev - betAmount);
    setMultiplier(1.0);
    setHasCashedOut(false);
    setWinAmount(0);
    setGameState("flying");
  };

  const handleCashOut = () => {
    if (gameState !== "flying" || hasCashedOut) return;
    const won = +(betAmount * multiplier).toFixed(2);
    setWinAmount(won);
    setDemoBalance((prev) => +(prev + won).toFixed(2));
    setHasCashedOut(true);
  };

  const handleResetRound = () => {
    setGameState("betting");
    setMultiplier(1.0);
    setHasCashedOut(false);
    setWinAmount(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md select-none">
      <div className="relative w-full max-w-4xl bg-[#141414] border border-[#333333] rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* Game Modal Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-[#2E2E2E]">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎮</span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{game.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D1AE52]/20 text-[#D1AE52] border border-[#D1AE52]/40 font-semibold uppercase">
                  {mode === "demo" ? "Free Demo" : "Real Mode"}
                </span>
              </h3>
              <p className="text-[11px] text-gray-400">Powered by {game.provider}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#333333] text-xs font-semibold text-[#D1AE52]">
              <span>Balance: </span>
              <span className="text-white font-mono font-bold">₹ {demoBalance.toLocaleString()}</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Game Modal"
              className="text-gray-400 hover:text-white p-1 rounded hover:bg-white/10"
            >
              <CloseIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Game Canvas Area */}
        <div className="relative flex-1 bg-gradient-to-b from-[#0F0F0F] to-[#050505] p-6 flex flex-col items-center justify-center min-h-[350px]">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#252525_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {gameState === "flying" && (
            <div className="relative z-10 text-center animate-pulse">
              <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white mb-2 drop-shadow-[0_0_25px_rgba(209,174,82,0.6)]">
                <span className="text-[#D1AE52]">{multiplier}</span>x
              </div>
              <p className="text-xs text-[#04BE02] font-bold uppercase tracking-widest animate-bounce">
                🚀 Multiplier Rising...
              </p>
            </div>
          )}

          {gameState === "crashed" && (
            <div className="relative z-10 text-center">
              <div className="text-6xl sm:text-7xl font-black font-mono text-[#EA4E3D] mb-2 drop-shadow-[0_0_25px_rgba(234,78,61,0.6)]">
                {multiplier}x
              </div>
              <p className="text-sm text-[#EA4E3D] font-bold uppercase tracking-wider mb-4">
                Flew Away! (Crash)
              </p>
              <button
                onClick={handleResetRound}
                className="px-6 py-2.5 rounded-xl bg-[#D1AE52] text-black font-extrabold text-xs uppercase shadow-lg hover:brightness-110"
              >
                Play Next Round
              </button>
            </div>
          )}

          {gameState === "betting" && (
            <div className="relative z-10 text-center max-w-sm">
              <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-4 border border-[#333333] shadow-lg">
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-extrabold text-white mb-1">{game.name}</h4>
              <p className="text-xs text-gray-400 mb-6">
                Place your bet and cash out before the multiplier crashes!
              </p>

              <button
                onClick={handleStartGame}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-98 transition-all"
              >
                Start Game (Bet ₹{betAmount})
              </button>
            </div>
          )}

          {/* Winning Overlay */}
          {hasCashedOut && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-6 py-2 rounded-xl bg-[#04BE02] text-black font-black text-sm shadow-xl animate-bounce">
              Cashed Out! Won ₹{winAmount.toLocaleString()} 🎉
            </div>
          )}
        </div>

        {/* Game Controller Bottom Bar */}
        <div className="p-4 bg-[#181818] border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold">Bet Amount:</span>
            {[10, 50, 100, 500].map((amt) => (
              <button
                key={amt}
                disabled={gameState === "flying"}
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

          <div>
            {gameState === "flying" && !hasCashedOut ? (
              <button
                onClick={handleCashOut}
                className="px-8 py-2.5 rounded-xl bg-[#04BE02] hover:bg-[#039e01] text-black font-black text-sm uppercase shadow-lg shadow-[#04BE02]/30 active:scale-95 transition-all"
              >
                Cash Out (₹{+(betAmount * multiplier).toFixed(2)})
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#252525] hover:bg-[#333333] text-gray-300 text-xs font-bold transition-colors"
              >
                Exit to Lobby
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
