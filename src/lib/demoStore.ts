/**
 * Centralized Demo Platform Persistence & Storage Layer
 * Manages demo user state, simulated wallet ledger, rewards, free spins, and gameplay history.
 * All data is strictly kept in client-side demo storage and validated on hydration.
 */

import {
  UserProfile,
  TaskItem,
  WalletTransaction,
  GameRoundRecord,
  DemoStorageState,
} from "@/types/site";
import {
  DEFAULT_GUEST_USER,
  INITIAL_TASKS,
  INITIAL_TRANSACTIONS,
} from "@/components/sites/iplwin/home/data";

export const DEMO_STORAGE_KEY = "iplwin_demo_platform_v4";
export const DEMO_STORAGE_VERSION = 1;

/**
 * Returns today's date formatted as YYYY-MM-DD in the user's local time zone
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns pristine default demo storage state
 */
export function getDefaultDemoState(): DemoStorageState {
  return {
    version: DEMO_STORAGE_VERSION,
    lastUpdated: new Date().toISOString(),
    user: {
      ...DEFAULT_GUEST_USER,
      earnedFreeSpins: {},
      completedTasks: [],
    },
    tasks: INITIAL_TASKS.map((t) => ({ ...t })),
    transactions: INITIAL_TRANSACTIONS.map((tx) => ({ ...tx })),
    gameHistory: [],
    activeTaskDate: getTodayDateString(),
  };
}

/**
 * Validates a user profile object, restoring safe defaults if corrupted
 */
export function validateUserProfile(user: unknown): UserProfile {
  if (!user || typeof user !== "object") {
    return { ...DEFAULT_GUEST_USER };
  }

  const u = user as Partial<UserProfile>;
  const balance = typeof u.balance === "number" && !isNaN(u.balance) && u.balance >= 0 ? u.balance : 0;
  const lockedBalance = typeof u.lockedBalance === "number" && !isNaN(u.lockedBalance) && u.lockedBalance >= 0 ? u.lockedBalance : 0;
  const vipLevel = typeof u.vipLevel === "number" && !isNaN(u.vipLevel) && u.vipLevel >= 0 ? u.vipLevel : 0;
  const vipPoints = typeof u.vipPoints === "number" && !isNaN(u.vipPoints) && u.vipPoints >= 0 ? u.vipPoints : 0;

  // Validate free spins record (Rule 13: strictly non-negative numbers)
  const earnedFreeSpins: Record<string, number> = {};
  if (u.earnedFreeSpins && typeof u.earnedFreeSpins === "object") {
    for (const [key, val] of Object.entries(u.earnedFreeSpins)) {
      if (typeof val === "number" && val > 0) {
        earnedFreeSpins[key] = Math.floor(val);
      }
    }
  }

  return {
    id: typeof u.id === "string" ? u.id : "guest",
    username: typeof u.username === "string" && u.username ? u.username : "Guest Player",
    phone: typeof u.phone === "string" ? u.phone : "",
    balance,
    lockedBalance,
    vipLevel,
    vipPoints,
    avatar: typeof u.avatar === "string" ? u.avatar : "👤",
    isLoggedIn: Boolean(u.isLoggedIn),
    earnedFreeSpins,
    completedTasks: Array.isArray(u.completedTasks) ? u.completedTasks.filter((t) => typeof t === "string") : [],
    totalRoundsPlayed: typeof u.totalRoundsPlayed === "number" && u.totalRoundsPlayed >= 0 ? u.totalRoundsPlayed : 0,
    totalDemoWins: typeof u.totalDemoWins === "number" && u.totalDemoWins >= 0 ? u.totalDemoWins : 0,
    lastLoginDate: typeof u.lastLoginDate === "string" ? u.lastLoginDate : undefined,
  };
}

/**
 * Validates tasks array, merging with initial definitions
 */
export function validateTasks(tasks: unknown, currentDate: string): TaskItem[] {
  if (!Array.isArray(tasks)) {
    return INITIAL_TASKS.map((t) => ({ ...t }));
  }

  return INITIAL_TASKS.map((initialTask) => {
    const existing = tasks.find((t) => t && typeof t === "object" && t.id === initialTask.id);
    if (!existing) {
      return { ...initialTask };
    }

    // Check if task is daily and date has changed
    const isDaily = Boolean(initialTask.isDaily || existing.isDaily);
    const lastClaimDate = typeof existing.lastClaimDate === "string" ? existing.lastClaimDate : "";
    const isNewDay = isDaily && lastClaimDate && lastClaimDate !== currentDate;

    if (isNewDay) {
      // Daily reset for this task
      return {
        ...initialTask,
        progress: initialTask.id === "task_checkin" ? 1 : 0,
        claimed: false,
        lastClaimDate: undefined,
      };
    }

    return {
      ...initialTask,
      progress: typeof existing.progress === "number" ? Math.max(0, existing.progress) : initialTask.progress,
      claimed: Boolean(existing.claimed),
      lastClaimDate,
    };
  });
}

/**
 * Validates transactions array
 */
export function validateTransactions(txs: unknown): WalletTransaction[] {
  if (!Array.isArray(txs)) {
    return INITIAL_TRANSACTIONS.map((t) => ({ ...t }));
  }

  const valid: WalletTransaction[] = [];
  for (const item of txs) {
    if (!item || typeof item !== "object") continue;
    const t = item as Partial<WalletTransaction>;
    if (!t.id || typeof t.amount !== "number" || isNaN(t.amount)) continue;

    valid.push({
      id: String(t.id),
      type: t.type || "deposit",
      amount: Math.abs(t.amount),
      netAmount: typeof t.netAmount === "number" ? t.netAmount : undefined,
      fee: typeof t.fee === "number" ? t.fee : 0,
      title: t.title || "Simulated Demo Transaction",
      description: t.description,
      reference: t.reference,
      timestamp: t.timestamp || "Recent",
      status: t.status || "completed",
      isDemo: true,
    });
  }

  return valid.length > 0 ? valid : INITIAL_TRANSACTIONS.map((t) => ({ ...t }));
}

/**
 * Validates game history array
 */
export function validateGameHistory(history: unknown): GameRoundRecord[] {
  if (!Array.isArray(history)) return [];

  const valid: GameRoundRecord[] = [];
  for (const item of history) {
    if (!item || typeof item !== "object") continue;
    const r = item as Partial<GameRoundRecord>;
    if (!r.roundId || !r.gameName) continue;

    valid.push({
      roundId: String(r.roundId),
      gameId: r.gameId || 0,
      gameName: String(r.gameName),
      provider: r.provider || "Demo Engine",
      stake: typeof r.stake === "number" ? r.stake : 0,
      payout: typeof r.payout === "number" ? r.payout : 0,
      profit: typeof r.profit === "number" ? r.profit : (r.payout || 0) - (r.stake || 0),
      result: r.result || "loss",
      isFreeSpin: Boolean(r.isFreeSpin),
      balanceBefore: typeof r.balanceBefore === "number" ? r.balanceBefore : 0,
      balanceAfter: typeof r.balanceAfter === "number" ? r.balanceAfter : 0,
      timestamp: r.timestamp || "Recent",
      details: r.details,
    });
  }

  return valid;
}

/**
 * Safely loads and hydrates demo state from localStorage
 */
export function loadStoredDemoState(): DemoStorageState {
  if (typeof window === "undefined") {
    return getDefaultDemoState();
  }

  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) {
      return getDefaultDemoState();
    }

    const parsed = JSON.parse(raw);
    const currentDate = getTodayDateString();

    const user = validateUserProfile(parsed.user);
    const tasks = validateTasks(parsed.tasks, currentDate);
    const transactions = validateTransactions(parsed.transactions);
    const gameHistory = validateGameHistory(parsed.gameHistory);

    return {
      version: DEMO_STORAGE_VERSION,
      lastUpdated: new Date().toISOString(),
      user,
      tasks,
      transactions,
      gameHistory,
      activeTaskDate: currentDate,
    };
  } catch (err) {
    console.warn("Recovered from corrupted demo localStorage state:", err);
    return getDefaultDemoState();
  }
}

/**
 * Safely persists demo state to localStorage
 */
export function saveStoredDemoState(state: DemoStorageState): void {
  if (typeof window === "undefined") return;

  try {
    const payload: DemoStorageState = {
      ...state,
      lastUpdated: new Date().toISOString(),
      activeTaskDate: state.activeTaskDate || getTodayDateString(),
    };
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Failed to persist demo state:", err);
  }
}

/**
 * Clears demo storage and returns clean default state
 */
export function resetStoredDemoState(): DemoStorageState {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  }
  return getDefaultDemoState();
}
