/**
 * Bridge script to run demo store logic in pure Node.js test environment.
 */

const DEFAULT_STORAGE_KEY = "iplwin_demo_platform_v4";
const DEMO_STORAGE_VERSION = 1;

function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const DEFAULT_GUEST_USER = {
  id: "guest",
  username: "Guest Player",
  phone: "",
  balance: 500,
  lockedBalance: 0,
  vipLevel: 0,
  vipPoints: 0,
  avatar: "👤",
  isLoggedIn: false,
  earnedFreeSpins: {},
  completedTasks: [],
  totalRoundsPlayed: 0,
  totalDemoWins: 0,
};

const INITIAL_TASKS = [
  {
    id: "task_daily",
    title: "Daily Login Check-In",
    description: "Sign in each day to claim ₹50 demo credits",
    rewardType: "demo_cash",
    rewardAmount: 50,
    icon: "📅",
    progress: 1,
    maxProgress: 1,
    claimed: false,
    isDaily: true,
  },
  {
    id: "task_play3",
    title: "Play 3 Demo Rounds",
    description: "Test any 3 games in demo mode",
    rewardType: "demo_cash",
    rewardAmount: 100,
    icon: "🎮",
    progress: 0,
    maxProgress: 3,
    claimed: false,
    isDaily: true,
  },
  {
    id: "task_share",
    title: "Community Share Challenge",
    description: "Earn 3 Free Spins for Fortune Gems 3",
    rewardType: "free_spins",
    rewardAmount: 3,
    targetGameId: 3150300,
    targetGameName: "Fortune Gems 3",
    icon: "🎰",
    progress: 1,
    maxProgress: 1,
    claimed: false,
    isDaily: false,
  },
];

const INITIAL_TRANSACTIONS = [
  {
    id: "tx_welcome_starter",
    type: "bonus",
    amount: 500,
    title: "Demo Guest Starting Credits",
    timestamp: "Just now",
    status: "completed",
    isDemo: true,
  },
];

function getDefaultDemoState() {
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

function loadStoredDemoState() {
  try {
    const raw = global.localStorage.getItem(DEFAULT_STORAGE_KEY);
    if (!raw) return getDefaultDemoState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return getDefaultDemoState();

    const today = getTodayDateString();
    const isNewDay = parsed.activeTaskDate !== today;

    const validatedTasks = INITIAL_TASKS.map((initialTask) => {
      const existing = (parsed.tasks || []).find((t) => t.id === initialTask.id);
      if (!existing) return { ...initialTask };
      if (initialTask.isDaily && isNewDay) {
        return {
          ...initialTask,
          progress: initialTask.id === "task_daily" ? 1 : 0,
          claimed: false,
        };
      }
      return {
        ...initialTask,
        progress: existing.progress || 0,
        claimed: Boolean(existing.claimed),
      };
    });

    return {
      version: DEMO_STORAGE_VERSION,
      lastUpdated: new Date().toISOString(),
      user: parsed.user || { ...DEFAULT_GUEST_USER },
      tasks: validatedTasks,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [...INITIAL_TRANSACTIONS],
      gameHistory: Array.isArray(parsed.gameHistory) ? parsed.gameHistory : [],
      activeTaskDate: today,
    };
  } catch (err) {
    console.warn("Storage corrupted, fallback to defaults", err);
    return getDefaultDemoState();
  }
}

function saveStoredDemoState(state) {
  try {
    global.localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Save error", err);
  }
}

function resetStoredDemoState() {
  const fresh = getDefaultDemoState();
  saveStoredDemoState(fresh);
  return fresh;
}

module.exports = {
  DEFAULT_STORAGE_KEY,
  DEMO_STORAGE_VERSION,
  getDefaultDemoState,
  loadStoredDemoState,
  saveStoredDemoState,
  resetStoredDemoState,
  getTodayDateString,
};
