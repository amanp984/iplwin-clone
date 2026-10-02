export interface Game {
  id: number | string;
  name: string;
  category: string;
  provider: string;
  thumbnail: string;
  tag?: 'HOT' | 'NEW' | 'JACKPOT';
  badge?: string;
  rating?: number;
  playCount?: string;
  isMemberOnly?: boolean;
  supportsFreeSpins?: boolean;
}

export interface GameCategory {
  id: string;
  name: string;
  iconName: string;
  count?: number;
  providers: string[];
}

export interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  bgGradient: string;
  imageUrl?: string;
}

export interface WinnerRecord {
  id: string;
  userId: string;
  gameName: string;
  amount: number;
  currency: string;
  provider: string;
  timestamp?: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface UserProfile {
  id: string;
  username: string;
  phone: string;
  balance: number;
  lockedBalance: number;
  vipLevel: number;
  vipPoints: number;
  avatar: string;
  isLoggedIn: boolean;
  earnedFreeSpins: Record<string, number>; // gameId -> spins count (Rule 13)
  completedTasks: string[];
  totalRoundsPlayed: number;
  totalDemoWins: number;
  lastLoginDate?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  rewardType: "free_spins" | "demo_cash";
  rewardAmount: number;
  targetGameId?: number | string;
  targetGameName?: string;
  icon: string;
  progress: number;
  maxProgress: number;
  claimed: boolean;
  isDaily?: boolean;
  lastClaimDate?: string;
}

export interface WalletTransaction {
  id: string;
  type: "deposit" | "withdraw" | "task_reward" | "win" | "bet" | "bonus" | "adjustment";
  amount: number;
  netAmount?: number;
  fee?: number;
  title: string;
  description?: string;
  reference?: string;
  timestamp: string;
  status: "completed" | "processing" | "cancelled" | "rejected";
  isDemo: true;
}

export interface GameRoundRecord {
  roundId: string;
  id?: string;
  gameId: number | string;
  gameName: string;
  provider: string;
  stake: number;
  payout: number;
  win?: number;
  profit: number; // payout - stake
  multiplier?: number;
  result: "win" | "loss" | "push" | "free_spin_win";
  isFreeSpin: boolean;
  balanceBefore: number;
  balanceAfter: number;
  timestamp: string;
  details?: string;
}

export interface DemoStorageState {
  version: number;
  lastUpdated: string;
  user: UserProfile;
  tasks: TaskItem[];
  transactions: WalletTransaction[];
  gameHistory: GameRoundRecord[];
  activeTaskDate: string;
}

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  title?: string;
  durationMs?: number;
}

