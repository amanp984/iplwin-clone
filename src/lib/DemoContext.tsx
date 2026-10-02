"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  UserProfile,
  TaskItem,
  WalletTransaction,
  GameRoundRecord,
  ToastNotification,
  DemoStorageState,
  Game,
} from "@/types/site";
import {
  loadStoredDemoState,
  saveStoredDemoState,
  resetStoredDemoState,
  getDefaultDemoState,
  getTodayDateString,
} from "./demoStore";

export interface PlayRoundParams {
  game: Game;
  stake: number;
  payout: number;
  result: "win" | "loss" | "push" | "free_spin_win";
  isFreeSpin: boolean;
  details?: string;
}

interface DemoContextValue {
  isLoaded: boolean;
  isHydrated: boolean;
  user: UserProfile;
  tasks: TaskItem[];
  transactions: WalletTransaction[];
  gameHistory: GameRoundRecord[];
  toasts: ToastNotification[];
  notify: (type: ToastNotification["type"], message: string, title?: string) => void;
  dismissToast: (id: string) => void;
  login: (phone: string, mode?: "login" | "register") => void;
  logout: () => void;
  deposit: (amount: number, method?: string) => boolean;
  withdraw: (
    amount: number,
    accountOrBankDetails?: string | { account: string; ifsc: string },
    ifsc?: string
  ) => { success: boolean; error?: string };
  claimTask: (taskId: string) => boolean;
  playRound: (params: PlayRoundParams) => { success: boolean; error?: string; balanceAfter?: number };
  useFreeSpin: (gameId: number | string) => boolean;
  resetDemoAccount: () => void;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState<DemoStorageState>(getDefaultDemoState());
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Hydrate from localStorage safely once on mount
  useEffect(() => {
    const loaded = loadStoredDemoState();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loaded);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes after initial hydration
  useEffect(() => {
    if (isLoaded) {
      saveStoredDemoState(state);
    }
  }, [state, isLoaded]);

  // Toast Notification Dispatcher
  const notify = useCallback(
    (type: ToastNotification["type"], message: string, title?: string) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      setToasts((prev) => [...prev.slice(-4), { id, type, message, title }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Login / Register Session Manager
  const login = useCallback(
    (phone: string, mode: "login" | "register" = "login") => {
      const cleanPhone = phone.replace(/\D/g, "").slice(0, 10) || "9876543210";
      const isNew = mode === "register";
      const bonus = isNew ? 111 : 0;

      setState((prev) => {
        const nextBalance = prev.user.balance + bonus;
        const nextUser: UserProfile = {
          ...prev.user,
          isLoggedIn: true,
          phone: cleanPhone,
          username: `Player_${cleanPhone.slice(-4)}`,
          balance: nextBalance,
          vipLevel: Math.max(1, prev.user.vipLevel || (isNew ? 1 : 1)),
          lastLoginDate: getTodayDateString(),
        };

        const newTransactions = [...prev.transactions];
        if (bonus > 0) {
          newTransactions.unshift({
            id: `tx_reg_${Date.now()}`,
            type: "bonus",
            amount: bonus,
            title: "New Member Starter Demo Bonus",
            description: "₹111 Welcome Demo Chips credited to test games",
            reference: `REG-${cleanPhone.slice(-4)}`,
            timestamp: "Just now",
            status: "completed",
            isDemo: true,
          });
        }

        return {
          ...prev,
          user: nextUser,
          transactions: newTransactions,
        };
      });

      if (isNew) {
        notify("success", "Registration bonus ₹111 credited to demo wallet!", "Welcome to IPLwin Demo");
      } else {
        notify("info", `Welcome back, Player_${cleanPhone.slice(-4)}!`, "Demo Session Active");
      }
    },
    [notify]
  );

  // Logout Session Manager
  const logout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        isLoggedIn: false,
      },
    }));
    notify("info", "Logged out of active demo session.", "Session Closed");
  }, [notify]);

  // Demo Deposit / Recharge
  const deposit = useCallback(
    (amount: number, method = "UPI Fast Demo") => {
      if (amount <= 0 || isNaN(amount)) {
        notify("error", "Please select a valid demo recharge amount.", "Invalid Amount");
        return false;
      }

      setState((prev) => {
        const nextBalance = prev.user.balance + amount;
        const tx: WalletTransaction = {
          id: `tx_dep_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          type: "deposit",
          amount,
          title: `Simulated Demo Top-up (${method})`,
          description: "Demo play credits added to testing wallet",
          reference: `DEMO-DEP-${Date.now().toString().slice(-6)}`,
          timestamp: "Just now",
          status: "completed",
          isDemo: true,
        };

        // Advance deposit task if not claimed
        const updatedTasks = prev.tasks.map((t) =>
          t.id === "task_deposit_demo" ? { ...t, progress: 1 } : t
        );

        return {
          ...prev,
          user: {
            ...prev.user,
            balance: nextBalance,
          },
          transactions: [tx, ...prev.transactions],
          tasks: updatedTasks,
        };
      });

      notify("success", `Added ₹${amount.toLocaleString()} demo credits to your wallet!`, "Demo Recharge Success");
      return true;
    },
    [notify]
  );

  // Demo Withdrawal Simulation
  const withdraw = useCallback(
    (
      amount: number,
      accountOrBankDetails?: string | { account: string; ifsc: string },
      ifscCode?: string
    ) => {
      if (amount <= 0 || isNaN(amount)) {
        notify("error", "Please enter a valid withdrawal amount.", "Invalid Amount");
        return { success: false, error: "Please enter a valid withdrawal amount." };
      }

      let account = "";
      let ifsc = ifscCode || "DEMO0001";
      if (typeof accountOrBankDetails === "string") {
        account = accountOrBankDetails;
      } else if (accountOrBankDetails && typeof accountOrBankDetails === "object") {
        account = accountOrBankDetails.account;
        if (accountOrBankDetails.ifsc) ifsc = accountOrBankDetails.ifsc;
      }

      let canWithdraw = false;
      let errReason = "";

      setState((prev) => {
        if (amount > prev.user.balance) {
          canWithdraw = false;
          errReason = "Insufficient demo balance for this payout request.";
          return prev;
        }

        canWithdraw = true;
        const nextBalance = prev.user.balance - amount;
        const txId = `tx_wd_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const tx: WalletTransaction = {
          id: txId,
          type: "withdraw",
          amount,
          title: "Simulated Demo Payout Request",
          description: account
            ? `Demo Payout to simulated A/C ending in ...${account.slice(-4)} (${ifsc})`
            : `Demo Payout to Simulated Bank Account (${ifsc})`,
          reference: `DEMO-WD-${Date.now().toString().slice(-6)}`,
          timestamp: "Just now",
          status: "processing",
          isDemo: true,
        };

        // Trigger delayed completion simulation (3.5s)
        setTimeout(() => {
          setState((late) => ({
            ...late,
            transactions: late.transactions.map((item) =>
              item.id === txId ? { ...item, status: "completed" } : item
            ),
          }));
          notify("success", `Simulated payout of ₹${amount.toLocaleString()} completed in demo ledger.`, "Payout Processed");
        }, 3500);

        return {
          ...prev,
          user: {
            ...prev.user,
            balance: nextBalance,
          },
          transactions: [tx, ...prev.transactions],
        };
      });

      if (!canWithdraw) {
        notify("error", errReason || "Insufficient demo balance.", "Balance Too Low");
        return { success: false, error: errReason || "Insufficient demo balance." };
      }

      notify("info", `Payout request for ₹${amount.toLocaleString()} submitted to demo ledger.`, "Request Received");
      return { success: true };
    },
    [notify]
  );

  // Claim Task / Reward (Rule 13 strictly preserved)
  const claimTask = useCallback(
    (taskId: string) => {
      let claimedSuccess = false;

      setState((prev) => {
        const task = prev.tasks.find((t) => t.id === taskId);
        if (!task || task.claimed || task.progress < task.maxProgress) {
          return prev;
        }

        claimedSuccess = true;
        const todayStr = getTodayDateString();
        let nextUser = { ...prev.user };
        const newTransactions = [...prev.transactions];

        if (task.rewardType === "free_spins" && task.targetGameId) {
          const gameKey = String(task.targetGameId);
          const currentSpins = nextUser.earnedFreeSpins[gameKey] || 0;
          nextUser = {
            ...nextUser,
            earnedFreeSpins: {
              ...nextUser.earnedFreeSpins,
              [gameKey]: currentSpins + task.rewardAmount,
            },
            completedTasks: Array.from(new Set([...nextUser.completedTasks, taskId])),
          };
          notify("success", `Claimed ${task.rewardAmount} Free Spins for ${task.targetGameName}!`, "Reward Unlocked");
        } else if (task.rewardType === "demo_cash") {
          nextUser = {
            ...nextUser,
            balance: nextUser.balance + task.rewardAmount,
            completedTasks: Array.from(new Set([...nextUser.completedTasks, taskId])),
          };
          newTransactions.unshift({
            id: `tx_reward_${Date.now()}`,
            type: "task_reward",
            amount: task.rewardAmount,
            title: `Task Reward: ${task.title}`,
            description: "Completed mission incentive bonus",
            reference: `TASK-${taskId}`,
            timestamp: "Just now",
            status: "completed",
            isDemo: true,
          });
          notify("success", `Claimed ₹${task.rewardAmount} Demo Credits!`, "Reward Unlocked");
        }

        const updatedTasks = prev.tasks.map((t) =>
          t.id === taskId ? { ...t, claimed: true, lastClaimDate: todayStr } : t
        );

        return {
          ...prev,
          user: nextUser,
          tasks: updatedTasks,
          transactions: newTransactions,
        };
      });

      return claimedSuccess;
    },
    [notify]
  );

  // Use One Earned Free Spin (Rule 13)
  const useFreeSpin = useCallback(
    (gameId: number | string) => {
      const gameKey = String(gameId);
      let success = false;

      setState((prev) => {
        const count = prev.user.earnedFreeSpins[gameKey] || 0;
        if (count <= 0) return prev;

        success = true;
        const remaining = count - 1;
        const nextSpins = { ...prev.user.earnedFreeSpins };
        if (remaining > 0) {
          nextSpins[gameKey] = remaining;
        } else {
          delete nextSpins[gameKey];
        }

        return {
          ...prev,
          user: {
            ...prev.user,
            earnedFreeSpins: nextSpins,
          },
        };
      });

      return success;
    },
    []
  );

  // Safe Idempotent Game Round Execution
  const playRound = useCallback(
    ({ game, stake, payout, result, isFreeSpin, details }: PlayRoundParams) => {
      let executionSuccess = false;
      let errorReason = "";
      let finalBalance = 0;

      setState((prev) => {
        const gameKey = String(game.id);

        // Balance & Free Spin Validation
        if (isFreeSpin) {
          const availableSpins = prev.user.earnedFreeSpins[gameKey] || 0;
          if (availableSpins <= 0) {
            errorReason = "No free spins remaining for this game.";
            return prev;
          }
        } else {
          if (prev.user.balance < stake) {
            errorReason = "Insufficient demo balance. Recharge in Demo Wallet.";
            return prev;
          }
        }

        executionSuccess = true;
        const balanceBefore = prev.user.balance;
        const effectiveStake = isFreeSpin ? 0 : stake;
        finalBalance = balanceBefore - effectiveStake + payout;

        // Decrement free spin inventory if free spin
        const nextSpins = { ...prev.user.earnedFreeSpins };
        if (isFreeSpin) {
          const rem = (nextSpins[gameKey] || 1) - 1;
          if (rem > 0) nextSpins[gameKey] = rem;
          else delete nextSpins[gameKey];
        }

        // Calculate VIP progression
        const earnedVipPoints = Math.max(1, Math.floor(effectiveStake / 20));
        const totalVipPoints = prev.user.vipPoints + earnedVipPoints;
        const calculatedVipLevel =
          totalVipPoints >= 10000 ? 5 :
          totalVipPoints >= 2500 ? 4 :
          totalVipPoints >= 500 ? 3 :
          totalVipPoints >= 100 ? 2 : 1;

        const nextUser: UserProfile = {
          ...prev.user,
          balance: finalBalance,
          vipPoints: totalVipPoints,
          vipLevel: Math.max(prev.user.vipLevel, calculatedVipLevel),
          earnedFreeSpins: nextSpins,
          totalRoundsPlayed: prev.user.totalRoundsPlayed + 1,
          totalDemoWins: prev.user.totalDemoWins + (payout > effectiveStake ? 1 : 0),
        };

        // Advance "Play 3 Rounds" daily task
        const updatedTasks = prev.tasks.map((t) =>
          t.id === "task_play3" && t.progress < t.maxProgress
            ? { ...t, progress: t.progress + 1 }
            : t
        );

        // Record round history
        const roundId = `RND-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
        const roundRecord: GameRoundRecord = {
          roundId,
          gameId: game.id,
          gameName: game.name,
          provider: game.provider,
          stake: effectiveStake,
          payout,
          profit: payout - effectiveStake,
          result: isFreeSpin && payout > 0 ? "free_spin_win" : result,
          isFreeSpin,
          balanceBefore,
          balanceAfter: finalBalance,
          timestamp: "Just now",
          details,
        };

        // Create transaction records
        const newTransactions = [...prev.transactions];
        if (effectiveStake > 0) {
          newTransactions.unshift({
            id: `tx_stake_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
            type: "bet",
            amount: effectiveStake,
            title: `${game.name} Demo Bet`,
            description: `Round ${roundId} placed with ${game.provider}`,
            reference: roundId,
            timestamp: "Just now",
            status: "completed",
            isDemo: true,
          });
        }
        if (payout > 0) {
          newTransactions.unshift({
            id: `tx_win_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
            type: "win",
            amount: payout,
            title: `${game.name} Demo Win 🎉`,
            description: details || `Round ${roundId} winnings credited`,
            reference: roundId,
            timestamp: "Just now",
            status: "completed",
            isDemo: true,
          });
        }

        return {
          ...prev,
          user: nextUser,
          tasks: updatedTasks,
          transactions: newTransactions.slice(0, 50), // keep latest 50 for performance
          gameHistory: [roundRecord, ...prev.gameHistory.slice(0, 99)], // keep latest 100 rounds
        };
      });

      if (!executionSuccess && errorReason) {
        notify("warning", errorReason, "Cannot Place Bet");
        return { success: false, error: errorReason };
      }

      return { success: true, balanceAfter: finalBalance };
    },
    [notify]
  );

  // Safe Demo Reset
  const resetDemoAccount = useCallback(() => {
    const clean = resetStoredDemoState();
    setState(clean);
    notify("info", "Demo account, wallet, tasks, and gameplay history have been reset to defaults.", "Account Reset");
  }, [notify]);

  const value: DemoContextValue = {
    isLoaded,
    isHydrated: isLoaded,
    user: state.user,
    tasks: state.tasks,
    transactions: state.transactions,
    gameHistory: state.gameHistory,
    toasts,
    notify,
    dismissToast,
    login,
    logout,
    deposit,
    withdraw,
    claimTask,
    playRound,
    useFreeSpin,
    resetDemoAccount,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
