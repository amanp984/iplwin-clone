"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const PLINKO_BUCKETS = [5.0, 2.0, 1.2, 0.5, 1.2, 2.0, 5.0];

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

  // Global bet amount & processing lock (prevent double click)
  const [betAmount, setBetAmount] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Rule 13: Free Spins inventory check (earned ONLY through Tasks/Rewards)
  const availableFreeSpins = game ? (activeUser.earnedFreeSpins[String(game.id)] || 0) : 0;

  // --- ENGINE 1: AVIATOR / CRASH STATE ---
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashState, setCrashState] = useState<"betting" | "flying" | "crashed">("betting");
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [hasSettledAviator, setHasSettledAviator] = useState(false);
  const [aviatorWin, setAviatorWin] = useState(0);
  const aviatorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- ENGINE 2: SLOTS STATE ---
  const [reels, setReels] = useState(["💎", "👑", "7️⃣"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [slotWinMessage, setSlotWinMessage] = useState("");

  // --- ENGINE 3: MINES STATE ---
  const [minesState, setMinesState] = useState<"betting" | "active" | "cashed_out" | "exploded">("betting");
  const [minesGrid, setMinesGrid] = useState<Array<{ isMine: boolean; revealed: boolean }>>([]);
  const [minesGemsFound, setMinesGemsFound] = useState(0);
  const [minesMultiplier, setMinesMultiplier] = useState(1.0);
  const [minesWin, setMinesWin] = useState(0);

  // --- ENGINE 4: PLINKO STATE ---
  const [plinkoState, setPlinkoState] = useState<"betting" | "dropping" | "landed">("betting");
  const [plinkoLandingBucket, setPlinkoLandingBucket] = useState<number | null>(null);
  const [plinkoWin, setPlinkoWin] = useState(0);

  // --- ENGINE 5: DRAGON TIGER STATE ---
  const [dtChoice, setDtChoice] = useState<"dragon" | "tiger" | "tie">("dragon");
  const [dtDragonCard, setDtDragonCard] = useState<{ rank: string; suit: string; val: number } | null>(null);
  const [dtTigerCard, setDtTigerCard] = useState<{ rank: string; suit: string; val: number } | null>(null);
  const [dtOutcome, setDtOutcome] = useState<string>("");

  // --- ENGINE 6: ANDAR BAHAR STATE ---
  const [abChoice, setAbChoice] = useState<"andar" | "bahar">("andar");
  const [abJoker, setAbJoker] = useState<{ rank: string; suit: string } | null>(null);
  const [abCards, setAbCards] = useState<Array<{ side: "andar" | "bahar"; rank: string; suit: string }>>([]);
  const [abWinner, setAbWinner] = useState<"andar" | "bahar" | null>(null);
  const [abDealing, setAbDealing] = useState(false);

  // --- ENGINE 7: 7UP 7DOWN / DICE STATE ---
  const [diceChoice, setDiceChoice] = useState<"down" | "7" | "up">("up");
  const [diceRoll, setDiceRoll] = useState<[number, number]>([3, 4]);
  const [diceOutcome, setDiceOutcome] = useState("");

  // --- ENGINE 8: ROULETTE / LIVE CASINO STATE ---
  const [rouletteChoice, setRouletteChoice] = useState<"red" | "black" | "green">("red");
  const [rouletteResult, setRouletteResult] = useState<{ num: number; color: "red" | "black" | "green" } | null>(null);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);

  // --- ENGINE 9: SPORTS / FISHING / TABLE STATE ---
  const [genericStage, setGenericStage] = useState<"ready" | "in_action" | "settled">("ready");
  const [genericMessage, setGenericMessage] = useState("");

  // Reset all states when modal opens or game changes
  useEffect(() => {
    if (isOpen) {
      setIsProcessing(false);
      setFeedbackMsg("");
      // Reset Aviator
      setMultiplier(1.0);
      setCrashState("betting");
      setHasCashedOut(false);
      setHasSettledAviator(false);
      setAviatorWin(0);
      if (aviatorIntervalRef.current) clearInterval(aviatorIntervalRef.current);
      // Reset Slots
      setIsSpinning(false);
      setSlotWinMessage("");
      // Reset Mines
      setMinesState("betting");
      setMinesGrid([]);
      setMinesGemsFound(0);
      setMinesMultiplier(1.0);
      setMinesWin(0);
      // Reset Plinko
      setPlinkoState("betting");
      setPlinkoLandingBucket(null);
      setPlinkoWin(0);
      // Reset Dragon Tiger
      setDtDragonCard(null);
      setDtTigerCard(null);
      setDtOutcome("");
      // Reset Andar Bahar
      setAbJoker(null);
      setAbCards([]);
      setAbWinner(null);
      setAbDealing(false);
      // Reset Dice
      setDiceOutcome("");
      // Reset Roulette
      setIsWheelSpinning(false);
      setRouletteResult(null);
      // Reset Generic
      setGenericStage("ready");
      setGenericMessage("");
    }
  }, [isOpen, game?.id]);

  // Clean up timers on unmount or close
  useEffect(() => {
    return () => {
      if (aviatorIntervalRef.current) clearInterval(aviatorIntervalRef.current);
    };
  }, []);

  // Determine game engine type
  const isAviatorOrCrash = !!(
    game && (
      game.id === 312001 ||
      game.id === 5001 ||
      game.id === 3660003 ||
      game.id === 3660008 ||
      game.name.includes("Aviator") ||
      game.name.includes("Crash")
    )
  );
  const isSlotGame = game?.category === "slot";
  const isMinesGame = game?.id === 312005;
  const isPlinkoGame = game?.id === 5008;
  const isDragonTigerGame = game?.id === 1016;
  const isAndarBaharGame = game?.id === 10280084;
  const isDiceGame = game?.id === 3150124 || game?.id === 312010;
  const isRouletteOrLive = !!(
    game && (
      game.category === "live" ||
      game.id === 317000 ||
      game.id === 317010 ||
      game.id === 317020 ||
      game.id === 1012000
    )
  );

  // Safe Close Handler: If Aviator was in mid-air, settle it safely
  const handleSafeClose = () => {
    if (isAviatorOrCrash && crashState === "flying" && !hasSettledAviator && game) {
      playRound({
        game,
        stake: betAmount,
        payout: 0,
        result: "loss",
        isFreeSpin: false,
        details: "Round ended on exit",
      });
      setHasSettledAviator(true);
    }
    if (aviatorIntervalRef.current) clearInterval(aviatorIntervalRef.current);
    onClose();
  };

  // -------------------------------------------------------------
  // ENGINE 1: AVIATOR / CRASH HANDLERS
  // -------------------------------------------------------------
  const handleAviatorLaunch = () => {
    if (!game || isProcessing || crashState === "flying") return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for this round.");
      notify("warning", "Insufficient demo balance. Top-up in Demo Wallet.", "Demo Balance");
      return;
    }

    setIsProcessing(true);
    setCrashState("flying");
    setMultiplier(1.0);
    setHasCashedOut(false);
    setHasSettledAviator(false);
    setAviatorWin(0);
    setFeedbackMsg("");

    let curr = 1.0;
    // Crash point determination (random between 1.15x and 12.0x, with house edge)
    const crashThreshold = +(1.1 + Math.random() * Math.random() * 8.5).toFixed(2);

    aviatorIntervalRef.current = setInterval(() => {
      curr = +(curr + 0.03 + curr * 0.015).toFixed(2);
      setMultiplier(curr);

      if (curr >= crashThreshold) {
        if (aviatorIntervalRef.current) clearInterval(aviatorIntervalRef.current);
        setCrashState("crashed");
        setIsProcessing(false);

        // If player didn't cash out, settle as crash loss
        setHasSettledAviator((settled) => {
          if (!settled && game) {
            const res = playRound({
              game,
              stake: betAmount,
              payout: 0,
              result: "loss",
              isFreeSpin: false,
              details: `Flew away at ${curr}x`,
            });
            if (onUpdateBalance && res.balanceAfter !== undefined) {
              onUpdateBalance(res.balanceAfter);
            }
          }
          return true;
        });
      }
    }, 90);
  };

  const handleAviatorCashOut = () => {
    if (crashState !== "flying" || hasCashedOut || hasSettledAviator || !game) return;
    if (aviatorIntervalRef.current) clearInterval(aviatorIntervalRef.current);

    setHasCashedOut(true);
    setHasSettledAviator(true);
    setIsProcessing(false);

    const won = +(betAmount * multiplier).toFixed(2);
    setAviatorWin(won);

    const res = playRound({
      game,
      stake: betAmount,
      payout: won,
      result: "win",
      isFreeSpin: false,
      details: `Cashed out at ${multiplier}x (+₹${won.toLocaleString()})`,
    });
    if (onUpdateBalance && res.balanceAfter !== undefined) {
      onUpdateBalance(res.balanceAfter);
    }
  };

  // -------------------------------------------------------------
  // ENGINE 2: SLOTS HANDLERS (Rule 13 Free Spin Enforced)
  // -------------------------------------------------------------
  const handleSlotSpin = useCallback(
    (isFree: boolean) => {
      if (isSpinning || isProcessing || !game) return;
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
      setIsProcessing(true);
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
          const finalReels = [
            SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
            SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
            SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
          ];

          // If free spin, give favorable chance of matching
          if (isFree && Math.random() < 0.7) {
            const lucky = SLOT_SYMBOLS[Math.floor(Math.random() * 3)];
            finalReels[0] = lucky;
            finalReels[1] = lucky;
            finalReels[2] = lucky;
          }

          setReels(finalReels);
          setIsSpinning(false);
          setIsProcessing(false);

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

          const res = playRound({
            game,
            stake: isFree ? 0 : betAmount,
            payout: win,
            result: win > 0 ? "win" : "loss",
            isFreeSpin: isFree,
            details,
          });
          if (onUpdateBalance && res.balanceAfter !== undefined) {
            onUpdateBalance(res.balanceAfter);
          }
        }
      }, 70);
    },
    [isSpinning, isProcessing, activeUser, betAmount, game, playRound, onUpdateBalance, notify]
  );

  // -------------------------------------------------------------
  // ENGINE 3: MINES HANDLERS
  // -------------------------------------------------------------
  const startMinesGame = () => {
    if (!game || isProcessing) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for Mines.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    // Generate 25 tiles with 3 hidden mines
    const minePositions = new Set<number>();
    while (minePositions.size < 3) {
      minePositions.add(Math.floor(Math.random() * 25));
    }
    const initialGrid = Array.from({ length: 25 }, (_, i) => ({
      isMine: minePositions.has(i),
      revealed: false,
    }));

    setMinesGrid(initialGrid);
    setMinesGemsFound(0);
    setMinesMultiplier(1.0);
    setMinesWin(0);
    setMinesState("active");
    setFeedbackMsg("Click tiles to discover gems. Cash out anytime!");
  };

  const handleMinesTileClick = (index: number) => {
    if (minesState !== "active" || isProcessing || !game) return;
    if (minesGrid[index].revealed) return;

    const tile = minesGrid[index];
    const newGrid = [...minesGrid];
    newGrid[index] = { ...tile, revealed: true };

    if (tile.isMine) {
      // Hit a mine! Reveal all
      const explodedGrid = newGrid.map((t) => ({ ...t, revealed: true }));
      setMinesGrid(explodedGrid);
      setMinesState("exploded");
      setFeedbackMsg("💥 BOOM! Hit a mine. Round ended.");

      const res = playRound({
        game,
        stake: betAmount,
        payout: 0,
        result: "loss",
        isFreeSpin: false,
        details: `Hit a mine after ${minesGemsFound} gems`,
      });
      if (onUpdateBalance && res.balanceAfter !== undefined) {
        onUpdateBalance(res.balanceAfter);
      }
    } else {
      // Found a gem!
      const newCount = minesGemsFound + 1;
      const nextMultiplier = +(1.0 + newCount * 0.35 + (newCount > 3 ? newCount * 0.2 : 0)).toFixed(2);
      const currentWin = +(betAmount * nextMultiplier).toFixed(2);

      setMinesGrid(newGrid);
      setMinesGemsFound(newCount);
      setMinesMultiplier(nextMultiplier);
      setMinesWin(currentWin);
      setFeedbackMsg(`💎 Gem found! Current Cashout: ₹${currentWin} (${nextMultiplier}x)`);
    }
  };

  const handleMinesCashOut = () => {
    if (minesState !== "active" || minesGemsFound === 0 || !game) return;
    const revealedGrid = minesGrid.map((t) => ({ ...t, revealed: true }));
    setMinesGrid(revealedGrid);
    setMinesState("cashed_out");
    setFeedbackMsg(`🏆 Cashed out ₹${minesWin} at ${minesMultiplier}x!`);

    const res = playRound({
      game,
      stake: betAmount,
      payout: minesWin,
      result: "win",
      isFreeSpin: false,
      details: `Mines Cashout with ${minesGemsFound} gems (${minesMultiplier}x)`,
    });
    if (onUpdateBalance && res.balanceAfter !== undefined) {
      onUpdateBalance(res.balanceAfter);
    }
  };

  // -------------------------------------------------------------
  // ENGINE 4: PLINKO HANDLERS
  // -------------------------------------------------------------
  const handlePlinkoDrop = () => {
    if (!game || isProcessing || plinkoState === "dropping") return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for Plinko.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    setIsProcessing(true);
    setPlinkoState("dropping");
    setPlinkoLandingBucket(null);
    setFeedbackMsg("Ball dropping through pegs...");

    // Weighted random bucket landing (0 to 6)
    const weights = [0.05, 0.15, 0.25, 0.3, 0.25, 0.15, 0.05];
    const r = Math.random();
    let sum = 0;
    let chosenBucket = 3;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (r <= sum) {
        chosenBucket = i;
        break;
      }
    }

    setTimeout(() => {
      const bucketMultiplier = PLINKO_BUCKETS[chosenBucket];
      const win = +(betAmount * bucketMultiplier).toFixed(2);
      setPlinkoLandingBucket(chosenBucket);
      setPlinkoWin(win);
      setPlinkoState("landed");
      setIsProcessing(false);
      setFeedbackMsg(`Landed in ${bucketMultiplier}x bucket! Payout: ₹${win}`);

      const res = playRound({
        game,
        stake: betAmount,
        payout: win,
        result: win >= betAmount ? "win" : "loss",
        isFreeSpin: false,
        details: `Plinko bucket ${bucketMultiplier}x`,
      });
      if (onUpdateBalance && res.balanceAfter !== undefined) {
        onUpdateBalance(res.balanceAfter);
      }
    }, 1000);
  };

  // -------------------------------------------------------------
  // ENGINE 5: DRAGON TIGER HANDLERS
  // -------------------------------------------------------------
  const handleDragonTigerDeal = () => {
    if (!game || isProcessing) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for Dragon Tiger.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    setIsProcessing(true);
    setFeedbackMsg("Dealing Dragon & Tiger cards...");

    const dVal = Math.floor(Math.random() * 13) + 2; // 2 to 14
    const tVal = Math.floor(Math.random() * 13) + 2;
    const dSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
    const tSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
    const dRank = RANKS[dVal - 2];
    const tRank = RANKS[tVal - 2];

    setTimeout(() => {
      setDtDragonCard({ rank: dRank, suit: dSuit, val: dVal });
      setDtTigerCard({ rank: tRank, suit: tSuit, val: tVal });

      let winner: "dragon" | "tiger" | "tie" = "tie";
      if (dVal > tVal) winner = "dragon";
      else if (tVal > dVal) winner = "tiger";

      const won = dtChoice === winner;
      const payoutMultiplier = winner === "tie" && won ? 8 : won ? 2 : 0;
      const win = +(betAmount * payoutMultiplier).toFixed(2);

      setDtOutcome(
        won
          ? `🏆 Won! ${winner.toUpperCase()} won the hand (+₹${win})`
          : `Hand Result: ${winner.toUpperCase()} won.`
      );
      setIsProcessing(false);

      const res = playRound({
        game,
        stake: betAmount,
        payout: win,
        result: won ? "win" : "loss",
        isFreeSpin: false,
        details: `Dragon ${dRank}${dSuit} vs Tiger ${tRank}${tSuit} (${winner})`,
      });
      if (onUpdateBalance && res.balanceAfter !== undefined) {
        onUpdateBalance(res.balanceAfter);
      }
    }, 600);
  };

  // -------------------------------------------------------------
  // ENGINE 6: ANDAR BAHAR HANDLERS
  // -------------------------------------------------------------
  const handleAndarBaharDeal = () => {
    if (!game || isProcessing || abDealing) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for Andar Bahar.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    setIsProcessing(true);
    setAbDealing(true);
    setAbCards([]);
    setAbWinner(null);

    // Deal Joker card
    const jRank = RANKS[Math.floor(Math.random() * RANKS.length)];
    const jSuit = SUITS[Math.floor(Math.random() * SUITS.length)];
    setAbJoker({ rank: jRank, suit: jSuit });

    // Determine when match occurs (between card 3 and 10)
    const matchStep = Math.floor(Math.random() * 8) + 3;
    const winningSide: "andar" | "bahar" = matchStep % 2 === 1 ? "andar" : "bahar";

    const dealtCards: Array<{ side: "andar" | "bahar"; rank: string; suit: string }> = [];
    for (let i = 1; i <= matchStep; i++) {
      const side: "andar" | "bahar" = i % 2 === 1 ? "andar" : "bahar";
      if (i === matchStep) {
        dealtCards.push({ side, rank: jRank, suit: SUITS[Math.floor(Math.random() * SUITS.length)] });
      } else {
        const otherRanks = RANKS.filter((r) => r !== jRank);
        dealtCards.push({
          side,
          rank: otherRanks[Math.floor(Math.random() * otherRanks.length)],
          suit: SUITS[Math.floor(Math.random() * SUITS.length)],
        });
      }
    }

    setTimeout(() => {
      setAbCards(dealtCards);
      setAbWinner(winningSide);
      setAbDealing(false);
      setIsProcessing(false);

      const won = abChoice === winningSide;
      const win = won ? +(betAmount * (winningSide === "andar" ? 1.9 : 2.0)).toFixed(2) : 0;
      setFeedbackMsg(
        won
          ? `🏆 Matched on ${winningSide.toUpperCase()}! Won ₹${win}`
          : `Matched on ${winningSide.toUpperCase()}. Round complete.`
      );

      const res = playRound({
        game,
        stake: betAmount,
        payout: win,
        result: won ? "win" : "loss",
        isFreeSpin: false,
        details: `Joker ${jRank} matched on ${winningSide.toUpperCase()}`,
      });
      if (onUpdateBalance && res.balanceAfter !== undefined) {
        onUpdateBalance(res.balanceAfter);
      }
    }, 800);
  };

  // -------------------------------------------------------------
  // ENGINE 7: 7UP 7DOWN / DICE HANDLERS
  // -------------------------------------------------------------
  const handleDiceRoll = () => {
    if (!game || isProcessing) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for Dice roll.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    setIsProcessing(true);
    setFeedbackMsg("Rolling 2 dice...");

    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const sum = d1 + d2;
      setDiceRoll([d1, d2]);

      let outcome: "down" | "7" | "up" = "7";
      if (sum < 7) outcome = "down";
      else if (sum > 7) outcome = "up";

      const won = diceChoice === outcome;
      const multiplier = outcome === "7" && won ? 5.0 : won ? 2.0 : 0;
      const win = +(betAmount * multiplier).toFixed(2);

      setDiceOutcome(
        won
          ? `🏆 Rolled ${d1}+${d2} = ${sum} (${outcome.toUpperCase()})! Won ₹${win}`
          : `Rolled ${d1}+${d2} = ${sum} (${outcome.toUpperCase()}). Try again!`
      );
      setIsProcessing(false);

      const res = playRound({
        game,
        stake: betAmount,
        payout: win,
        result: won ? "win" : "loss",
        isFreeSpin: false,
        details: `Dice ${d1}+${d2} = ${sum} (${outcome})`,
      });
      if (onUpdateBalance && res.balanceAfter !== undefined) {
        onUpdateBalance(res.balanceAfter);
      }
    }, 500);
  };

  // -------------------------------------------------------------
  // ENGINE 8: ROULETTE / LIVE CASINO HANDLERS
  // -------------------------------------------------------------
  const handleRouletteSpin = () => {
    if (!game || isProcessing || isWheelSpinning) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for Roulette.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    setIsProcessing(true);
    setIsWheelSpinning(true);
    setRouletteResult(null);
    setFeedbackMsg("Roulette wheel spinning...");

    setTimeout(() => {
      const num = Math.floor(Math.random() * 37); // 0 to 36
      let color: "red" | "black" | "green" = "red";
      if (num === 0) color = "green";
      else if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)) color = "red";
      else color = "black";

      setRouletteResult({ num, color });
      setIsWheelSpinning(false);
      setIsProcessing(false);

      const won = rouletteChoice === color;
      const mult = color === "green" && won ? 14 : won ? 2 : 0;
      const win = +(betAmount * mult).toFixed(2);

      setFeedbackMsg(
        won
          ? `🎉 Landed on ${num} (${color.toUpperCase()})! Won ₹${win}`
          : `Landed on ${num} (${color.toUpperCase()}). Try next spin!`
      );

      const res = playRound({
        game,
        stake: betAmount,
        payout: win,
        result: won ? "win" : "loss",
        isFreeSpin: false,
        details: `Roulette pocket ${num} (${color})`,
      });
      if (onUpdateBalance && res.balanceAfter !== undefined) {
        onUpdateBalance(res.balanceAfter);
      }
    }, 700);
  };

  // -------------------------------------------------------------
  // ENGINE 9: SPORTS / FISHING / TABLE HANDLERS
  // -------------------------------------------------------------
  const handleGenericAction = () => {
    if (!game || isProcessing) return;
    if (activeUser.balance < betAmount) {
      setFeedbackMsg("Insufficient balance for this round.");
      notify("warning", "Insufficient demo balance.", "Top-up Required");
      return;
    }

    setIsProcessing(true);
    setGenericStage("in_action");
    setFeedbackMsg("Executing simulated round...");

    const isWin = Math.random() < 0.45;
    const winMult = isWin ? 1.95 : 0;
    const win = +(betAmount * winMult).toFixed(2);

    setTimeout(() => {
      setGenericStage("settled");
      setIsProcessing(false);

      let msg = "";
      if (game.category === "sports") {
        msg = isWin
          ? `🏆 Match Odds Settled! In-play prediction won (+₹${win})`
          : "Match In-Play concluded. Try next prediction!";
      } else if (game.category === "fishing") {
        msg = isWin
          ? `🐟 Target Locked & Captured! Harvested (+₹${win})`
          : "Fish swam away! Target next sea boss.";
      } else {
        msg = isWin
          ? `🏆 Table Hand Won (+₹${win})!`
          : "Dealer hand won. Play next hand!";
      }

      setGenericMessage(msg);

      const res = playRound({
        game,
        stake: betAmount,
        payout: win,
        result: isWin ? "win" : "loss",
        isFreeSpin: false,
        details: msg,
      });
      if (onUpdateBalance && res.balanceAfter !== undefined) {
        onUpdateBalance(res.balanceAfter);
      }
    }, 600);
  };

  if (!isOpen || !game) return null;

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
              <p className="text-[11px] text-gray-400">Provider: {game.provider} • Category: {game.category.toUpperCase()}</p>
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
              onClick={handleSafeClose}
              aria-label="Exit Game Modal"
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Entertainment Demo Disclaimer Ribbon */}
        <div className="bg-[#1F1705] border-b border-[#3B2C0A] px-4 py-1 text-center text-[11px] text-[#D1AE52] font-semibold flex items-center justify-center gap-2">
          <span>⚠️</span>
          <span>Simulated Entertainment Demo Experience — No real money deposits or gambling involved.</span>
        </div>

        {/* Interactive Game Canvas Engine */}
        <div className="relative flex-1 bg-gradient-to-b from-[#111111] to-[#080808] p-4 sm:p-6 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
          {/* Subtle Grid Canvas Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:18px_18px] opacity-40 pointer-events-none" />

          {/* 1. AVIATOR / CRASH ENGINE */}
          {isAviatorOrCrash && (
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
                      setHasSettledAviator(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-xs uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    Play Next Round
                  </button>
                </div>
              )}

              {crashState === "betting" && (
                <div className="text-center max-w-sm">
                  <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-3 border border-[#333333] shadow-lg">
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
                  <p className="text-xs text-gray-400 mb-5">
                    Place your demo bet and click Cash Out before the plane flies away!
                  </p>
                  <button
                    disabled={isProcessing}
                    onClick={handleAviatorLaunch}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
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

          {/* 2. SLOTS ENGINE */}
          {isSlotGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-md">
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

              {/* Action Buttons: Free Spin vs Regular Spin */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                {availableFreeSpins > 0 ? (
                  <button
                    disabled={isSpinning || isProcessing}
                    onClick={() => handleSlotSpin(true)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#04BE02] via-[#00c900] to-[#029100] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>🎰 USE EARNED FREE SPIN</span>
                    <span className="px-2 py-0.5 rounded bg-black/40 text-white text-xs">
                      ({availableFreeSpins} Left)
                    </span>
                  </button>
                ) : (
                  <button
                    disabled={isSpinning || isProcessing}
                    onClick={() => handleSlotSpin(false)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
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

          {/* 3. MINES ENGINE */}
          {isMinesGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-sm">
              <div className="flex items-center justify-between w-full mb-3 px-2">
                <span className="text-xs font-bold text-gray-400">Gems: {minesGemsFound} / 22</span>
                <span className="text-xs font-bold text-[#D1AE52] font-mono">Multiplier: {minesMultiplier}x</span>
              </div>

              {minesState === "betting" ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-3">💣</div>
                  <h4 className="text-lg font-black text-white mb-2">Spribe Mines 5x5</h4>
                  <p className="text-xs text-gray-400 mb-5">Uncover diamonds and cash out before hitting a mine!</p>
                  <button
                    disabled={isProcessing}
                    onClick={startMinesGame}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all"
                  >
                    Start Round (Bet ₹{betAmount})
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <div className="grid grid-cols-5 gap-2 bg-[#0A0A0A] p-3 rounded-2xl border border-[#2E2E2E] mb-3">
                    {minesGrid.map((tile, i) => (
                      <button
                        key={i}
                        disabled={tile.revealed || minesState !== "active"}
                        onClick={() => handleMinesTileClick(i)}
                        className={`aspect-square rounded-lg flex items-center justify-center text-lg font-bold transition-all ${
                          tile.revealed
                            ? tile.isMine
                              ? "bg-[#EA4E3D]/30 border border-[#EA4E3D]"
                              : "bg-[#04BE02]/30 border border-[#04BE02]"
                            : "bg-[#222222] hover:bg-[#2F2F2F] border border-[#383838] active:scale-95"
                        }`}
                      >
                        {tile.revealed ? (tile.isMine ? "💣" : "💎") : "?"}
                      </button>
                    ))}
                  </div>

                  {minesState === "active" && minesGemsFound > 0 && (
                    <button
                      onClick={handleMinesCashOut}
                      className="w-full py-3 rounded-xl bg-[#04BE02] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all animate-bounce"
                    >
                      Cash Out ₹{minesWin} ({minesMultiplier}x)
                    </button>
                  )}

                  {(minesState === "exploded" || minesState === "cashed_out") && (
                    <button
                      onClick={() => setMinesState("betting")}
                      className="w-full py-3 rounded-xl bg-[#D1AE52] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all"
                    >
                      Play Next Round
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 4. PLINKO ENGINE */}
          {isPlinkoGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-sm">
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Plinko Pyramid Drop</h4>
              {/* Pegs Graphic Representation */}
              <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-[#2D2D2D] w-full flex flex-col items-center gap-2 mb-3">
                {[3, 4, 5, 6, 7].map((count, rowIdx) => (
                  <div key={rowIdx} className="flex justify-center gap-3">
                    {Array.from({ length: count }).map((_, colIdx) => (
                      <span key={colIdx} className="w-2 h-2 rounded-full bg-[#D1AE52]/60" />
                    ))}
                  </div>
                ))}
                {/* Buckets */}
                <div className="grid grid-cols-7 gap-1 w-full pt-3 border-t border-[#222222] mt-1 text-center">
                  {PLINKO_BUCKETS.map((b, idx) => (
                    <div
                      key={idx}
                      className={`py-1.5 rounded text-[10px] font-bold font-mono transition-colors ${
                        plinkoLandingBucket === idx
                          ? "bg-[#04BE02] text-black animate-pulse"
                          : "bg-[#1E1E1E] text-gray-300"
                      }`}
                    >
                      {b}x
                    </div>
                  ))}
                </div>
                {plinkoState === "landed" && plinkoWin > 0 && (
                  <p className="text-center font-bold text-xs text-[#04BE02] mt-2 animate-bounce">
                    🎉 Won ₹{plinkoWin}!
                  </p>
                )}
              </div>

              <button
                disabled={isProcessing || plinkoState === "dropping"}
                onClick={handlePlinkoDrop}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {plinkoState === "dropping" ? "Ball Dropping..." : `Drop Ball (Bet ₹${betAmount})`}
              </button>
            </div>
          )}

          {/* 5. DRAGON TIGER ENGINE */}
          {isDragonTigerGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-md">
              {/* Cards Display */}
              <div className="grid grid-cols-2 gap-4 w-full mb-4">
                <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#EA4E3D]/50 text-center">
                  <span className="text-xs font-black text-[#EA4E3D] block uppercase mb-2">🐉 Dragon</span>
                  <div className="aspect-[3/4] w-24 mx-auto bg-[#0E0E0E] rounded-xl border border-[#333333] flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                    {dtDragonCard ? `${dtDragonCard.rank} ${dtDragonCard.suit}` : "🂠"}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#FFAA09]/50 text-center">
                  <span className="text-xs font-black text-[#FFAA09] block uppercase mb-2">🐯 Tiger</span>
                  <div className="aspect-[3/4] w-24 mx-auto bg-[#0E0E0E] rounded-xl border border-[#333333] flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                    {dtTigerCard ? `${dtTigerCard.rank} ${dtTigerCard.suit}` : "🂠"}
                  </div>
                </div>
              </div>

              {/* Bet Side Selection */}
              <div className="grid grid-cols-3 gap-2 w-full mb-3">
                {[
                  { id: "dragon", label: "Dragon (2x)", color: "border-[#EA4E3D]" },
                  { id: "tie", label: "Tie (8x)", color: "border-[#04BE02]" },
                  { id: "tiger", label: "Tiger (2x)", color: "border-[#FFAA09]" },
                ].map((side) => (
                  <button
                    key={side.id}
                    disabled={isProcessing}
                    onClick={() => setDtChoice(side.id as typeof dtChoice)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${side.color} ${
                      dtChoice === side.id ? "bg-[#D1AE52] text-black font-black" : "bg-[#1E1E1E] text-gray-300"
                    }`}
                  >
                    {side.label}
                  </button>
                ))}
              </div>

              {dtOutcome && <p className="text-xs font-bold text-[#E9CA78] mb-3">{dtOutcome}</p>}

              <button
                disabled={isProcessing}
                onClick={handleDragonTigerDeal}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? "Dealing Cards..." : `Deal Cards (Bet ₹${betAmount})`}
              </button>
            </div>
          )}

          {/* 6. ANDAR BAHAR ENGINE */}
          {isAndarBaharGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-md">
              {/* Joker Card */}
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Trump Joker Card</span>
                <div className="px-4 py-2 rounded-xl bg-[#0A0A0A] border-2 border-[#D1AE52] text-2xl font-bold font-mono text-white inline-block">
                  {abJoker ? `${abJoker.rank} ${abJoker.suit}` : "🂠"}
                </div>
              </div>

              {/* Side Selection */}
              <div className="grid grid-cols-2 gap-3 w-full mb-3">
                <button
                  disabled={isProcessing || abDealing}
                  onClick={() => setAbChoice("andar")}
                  className={`py-2 rounded-xl text-xs font-bold border border-[#00B0FF] ${
                    abChoice === "andar" ? "bg-[#00B0FF] text-black font-black" : "bg-[#1A1A1A] text-gray-300"
                  }`}
                >
                  🅰️ Andar (1.9x)
                </button>
                <button
                  disabled={isProcessing || abDealing}
                  onClick={() => setAbChoice("bahar")}
                  className={`py-2 rounded-xl text-xs font-bold border border-[#FFAA09] ${
                    abChoice === "bahar" ? "bg-[#FFAA09] text-black font-black" : "bg-[#1A1A1A] text-gray-300"
                  }`}
                >
                  🅱️ Bahar (2.0x)
                </button>
              </div>

              {/* Dealt Stream */}
              {abCards.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-2 mb-3 px-2 bg-[#0A0A0A] rounded-xl border border-[#2D2D2D]">
                  {abCards.map((c, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded text-xs font-bold shrink-0 ${
                        c.side === "andar" ? "bg-[#00B0FF]/20 text-[#00B0FF]" : "bg-[#FFAA09]/20 text-[#FFAA09]"
                      }`}
                    >
                      {c.side === "andar" ? "A" : "B"}:{c.rank}{c.suit}
                    </span>
                  ))}
                </div>
              )}

              {abWinner && (
                <p className="text-xs font-bold text-[#E9CA78] mb-2 text-center">
                  Winner: {abWinner.toUpperCase()}
                </p>
              )}

              <button
                disabled={isProcessing || abDealing}
                onClick={handleAndarBaharDeal}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {abDealing ? "Dealing Cards..." : `Deal Round (Bet ₹${betAmount})`}
              </button>
            </div>
          )}

          {/* 7. 7UP 7DOWN / DICE ENGINE */}
          {isDiceGame && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-sm">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border-2 border-[#D1AE52] flex items-center justify-center text-3xl font-black text-white shadow-lg">
                  {diceRoll[0]}
                </div>
                <span className="text-2xl text-gray-400 font-bold">+</span>
                <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border-2 border-[#D1AE52] flex items-center justify-center text-3xl font-black text-white shadow-lg">
                  {diceRoll[1]}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full mb-4">
                {[
                  { id: "down", label: "⬇️ 7 Down (2x)" },
                  { id: "7", label: "⭐ Lucky 7 (5x)" },
                  { id: "up", label: "⬆️ 7 Up (2x)" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    disabled={isProcessing}
                    onClick={() => setDiceChoice(opt.id as typeof diceChoice)}
                    className={`py-2 rounded-xl text-xs font-bold border border-[#333333] ${
                      diceChoice === opt.id ? "bg-[#D1AE52] text-black font-black" : "bg-[#1A1A1A] text-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {diceOutcome && <p className="text-xs font-bold text-[#E9CA78] mb-3">{diceOutcome}</p>}

              <button
                disabled={isProcessing}
                onClick={handleDiceRoll}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? "Rolling Dice..." : `Roll Dice (Bet ₹${betAmount})`}
              </button>
            </div>
          )}

          {/* 8. ROULETTE / LIVE CASINO ENGINE */}
          {isRouletteOrLive && (
            <div className="relative z-10 w-full flex flex-col items-center justify-center max-w-sm">
              <div className="w-24 h-24 rounded-full border-4 border-[#D1AE52] bg-[#0A0A0A] flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-4">
                {rouletteResult ? (
                  <span className={rouletteResult.color === "green" ? "text-[#04BE02]" : rouletteResult.color === "red" ? "text-[#EA4E3D]" : "text-white"}>
                    {rouletteResult.num}
                  </span>
                ) : (
                  "🎡"
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 w-full mb-4">
                {[
                  { id: "red", label: "🔴 Red (2x)", color: "border-[#EA4E3D]" },
                  { id: "green", label: "🟢 Zero (14x)", color: "border-[#04BE02]" },
                  { id: "black", label: "⚫ Black (2x)", color: "border-gray-500" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    disabled={isProcessing || isWheelSpinning}
                    onClick={() => setRouletteChoice(opt.id as typeof rouletteChoice)}
                    className={`py-2 rounded-xl text-xs font-bold border ${opt.color} ${
                      rouletteChoice === opt.id ? "bg-[#D1AE52] text-black font-black" : "bg-[#1A1A1A] text-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <button
                disabled={isProcessing || isWheelSpinning}
                onClick={handleRouletteSpin}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                {isWheelSpinning ? "Wheel Spinning..." : `Spin Wheel (Bet ₹${betAmount})`}
              </button>
            </div>
          )}

          {/* 9. SPORTS / FISHING / TABLE ENGINE */}
          {!isAviatorOrCrash &&
            !isSlotGame &&
            !isMinesGame &&
            !isPlinkoGame &&
            !isDragonTigerGame &&
            !isAndarBaharGame &&
            !isDiceGame &&
            !isRouletteOrLive && (
              <div className="relative z-10 text-center max-w-sm">
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-3 border border-[#333333] shadow-lg">
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
                <p className="text-xs text-gray-400 mb-5">
                  Interactive simulated {game.category.toUpperCase()} engine is active.
                </p>

                {genericMessage && (
                  <p className="text-xs font-bold text-[#E9CA78] mb-3">{genericMessage}</p>
                )}

                <button
                  disabled={isProcessing || genericStage === "in_action"}
                  onClick={handleGenericAction}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-black text-sm uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  {genericStage === "in_action" ? "Processing Round..." : `Place Bet (₹${betAmount})`}
                </button>
              </div>
            )}

          {/* Feedback message banner */}
          {feedbackMsg && (
            <p className="absolute bottom-3 text-xs font-bold text-[#E9CA78] animate-fadeIn text-center px-4">
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
                disabled={crashState === "flying" || isSpinning || isProcessing}
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
            {isAviatorOrCrash && crashState === "flying" && !hasCashedOut && (
              <button
                onClick={handleAviatorCashOut}
                className="px-6 py-2 rounded-xl bg-[#04BE02] text-black font-black text-xs uppercase shadow-md shadow-[#04BE02]/30 active:scale-95 transition-all animate-bounce"
              >
                Cash Out (₹{+(betAmount * multiplier).toFixed(2)})
              </button>
            )}

            <button
              onClick={handleSafeClose}
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
