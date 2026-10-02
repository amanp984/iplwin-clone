import { Game, GameCategory, BannerSlide, WinnerRecord, Notice, LanguageOption, TaskItem, UserProfile, WalletTransaction } from "@/types/site";
import { GAME_ARTWORK_MAP } from "@/lib/gameArtwork";

export const GAMES: Game[] = Object.values(GAME_ARTWORK_MAP).map((entry) => ({
  id: entry.id,
  name: entry.name,
  category: entry.category,
  provider: entry.provider,
  thumbnail: entry.artwork,
  tag: entry.tag,
  rating: entry.rating,
  playCount: entry.playCount,
  supportsFreeSpins: entry.supportsFreeSpins,
  isMemberOnly: entry.isMemberOnly,
}));

export function getCategoryCount(catId: string): number {
  if (catId === "hot") {
    return GAMES.filter((g) => g.tag === "HOT" || g.tag === "JACKPOT").length;
  }
  if (catId === "demo") {
    return GAMES.length;
  }
  return GAMES.filter((g) => g.category === catId).length;
}

export function getCategoryProviders(catId: string): string[] {
  let relevantGames: Game[] = [];
  if (catId === "hot") {
    relevantGames = GAMES.filter((g) => g.tag === "HOT" || g.tag === "JACKPOT");
  } else if (catId === "demo") {
    relevantGames = GAMES;
  } else {
    relevantGames = GAMES.filter((g) => g.category === catId);
  }
  const provs = Array.from(new Set(relevantGames.map((g) => g.provider))).sort();
  return ["All", ...provs];
}

export const CATEGORIES: GameCategory[] = [
  { id: "hot", name: "Hot", iconName: "HotIcon", count: getCategoryCount("hot"), providers: getCategoryProviders("hot") },
  { id: "sports", name: "Sports", iconName: "SportsIcon", count: getCategoryCount("sports"), providers: getCategoryProviders("sports") },
  { id: "live", name: "Live Casino", iconName: "LiveCasinoIcon", count: getCategoryCount("live"), providers: getCategoryProviders("live") },
  { id: "minigames", name: "Mini Games", iconName: "MiniGameIcon", count: getCategoryCount("minigames"), providers: getCategoryProviders("minigames") },
  { id: "slot", name: "Slots", iconName: "SlotIcon", count: getCategoryCount("slot"), providers: getCategoryProviders("slot") },
  { id: "cards", name: "Cards", iconName: "CardsIcon", count: getCategoryCount("cards"), providers: getCategoryProviders("cards") },
  { id: "fishing", name: "Fishing", iconName: "FishingIcon", count: getCategoryCount("fishing"), providers: getCategoryProviders("fishing") },
  { id: "cockfight", name: "Cock Fighting", iconName: "CockfightIcon", count: getCategoryCount("cockfight"), providers: getCategoryProviders("cockfight") },
  { id: "esports", name: "E-Sports", iconName: "ESportsIcon", count: getCategoryCount("esports"), providers: getCategoryProviders("esports") },
  { id: "lottery", name: "Lottery", iconName: "LotteryIcon", count: getCategoryCount("lottery"), providers: getCategoryProviders("lottery") },
  { id: "demo", name: "Demo", iconName: "DemoIcon", count: getCategoryCount("demo"), providers: getCategoryProviders("demo") },
];

export const BANNERS: BannerSlide[] = [
  {
    id: 1,
    title: "Super VIP Tier Rewards",
    subtitle: "Unlock exclusive VIP privileges, faster demo processing, weekly tier bonuses & custom avatar frames",
    badge: "VIP CLUB",
    ctaText: "Explore VIP Levels",
    bgGradient: "from-[#2A1E00] via-[#1A1A1A] to-[#0A0A0A]",
    imageUrl: "/images/banners/banner_vip.svg",
  },
  {
    id: 2,
    title: "Registration 111 ₹ Starter Bonus",
    subtitle: "Sign up today with your phone number and get ₹111 free demo credits credited to your account!",
    badge: "NEW MEMBER",
    ctaText: "Register Now",
    bgGradient: "from-[#3B1200] via-[#1F1005] to-[#0A0A0A]",
    imageUrl: "/images/banners/banner_bonus.svg",
  },
  {
    id: 3,
    title: "Daily Tasks & Earn Free Spins",
    subtitle: "Complete easy daily tasks to earn genuine free spins on Fortune Gems 3, Super Ace and Money Coming!",
    badge: "TASKS & REWARDS",
    ctaText: "View Daily Tasks",
    bgGradient: "from-[#0E2413] via-[#121B14] to-[#0A0A0A]",
    imageUrl: "/images/banners/banner_tasks.svg",
  },
  {
    id: 4,
    title: "Aviator & Chicken Road 2.0 Challenge",
    subtitle: "Test your prediction skill in real-time crash multiplier games with interactive demo gameplay",
    badge: "CRASH MINI GAMES",
    ctaText: "Play Demo Games",
    bgGradient: "from-[#261533] via-[#17121D] to-[#0A0A0A]",
    imageUrl: "/images/banners/banner_aviator.svg",
  },
];

export const WINNERS: WinnerRecord[] = [
  { id: "1", userId: "player_9***2", gameName: "Money Coming", amount: 505, currency: "₹", provider: "JILI", timestamp: "2m ago" },
  { id: "2", userId: "demo_user3***7", gameName: "Super Ace", amount: 119, currency: "₹", provider: "JILI", timestamp: "4m ago" },
  { id: "3", userId: "player_3***4", gameName: "Fortune Gems 3", amount: 71, currency: "₹", provider: "JILI", timestamp: "6m ago" },
  { id: "4", userId: "player_2***9", gameName: "Ocean King Jackpot", amount: 2018, currency: "₹", provider: "JILI", timestamp: "9m ago" },
  { id: "5", userId: "guest_1***2", gameName: "Money Coming", amount: 5001, currency: "₹", provider: "JILI", timestamp: "12m ago" },
  { id: "6", userId: "player_2***4", gameName: "Super Ace", amount: 79.5, currency: "₹", provider: "JILI", timestamp: "15m ago" },
  { id: "7", userId: "demo_7***1", gameName: "Money Coming", amount: 1990, currency: "₹", provider: "JILI", timestamp: "18m ago" },
  { id: "8", userId: "player_2***2", gameName: "Fortune Gems 3", amount: 495, currency: "₹", provider: "JILI", timestamp: "21m ago" },
  { id: "9", userId: "player_6***1", gameName: "Super Ace", amount: 102.3, currency: "₹", provider: "JILI", timestamp: "24m ago" },
  { id: "10", userId: "aviator_pro***0", gameName: "Aviator", amount: 14200, currency: "₹", provider: "Spribe", timestamp: "28m ago" },
  { id: "11", userId: "demo_8***7", gameName: "Chicken Road 2.0", amount: 3450, currency: "₹", provider: "INOUT", timestamp: "32m ago" },
  { id: "12", userId: "rummy_fan***1", gameName: "Rummy", amount: 8900, currency: "₹", provider: "JILI", timestamp: "35m ago" },
];

export const NOTICES: Notice[] = [
  {
    id: 1,
    title: "IPLwin Gaming Platform v2.0 Live",
    content: "Welcome to the upgraded IPLwin Gaming Experience. Enjoy ultra-smooth navigation, interactive demo games, and our new Tasks & Rewards Hub.",
    date: "2026-10-01"
  },
  {
    id: 2,
    title: "Earn Free Spins in Daily Tasks Hub",
    content: "Free spins are not granted automatically — complete daily check-ins and gameplay tasks in the Rewards section to earn genuine free spins for Super Ace and Fortune Gems 3!",
    date: "2026-10-01"
  },
  {
    id: 3,
    title: "Simulated Entertainment Mode Notice",
    content: "All demo balances, chips, and simulated games are intended solely for testing, demonstration, and gaming entertainment. Please enjoy responsibly.",
    date: "2026-09-30"
  }
];

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: "task_checkin",
    title: "Daily Check-in",
    description: "Sign in today to claim 3 Free Spins on Fortune Gems 3",
    rewardType: "free_spins",
    rewardAmount: 3,
    targetGameId: 3150300,
    targetGameName: "Fortune Gems 3",
    icon: "📅",
    progress: 1,
    maxProgress: 1,
    claimed: false,
    isDaily: true,
  },
  {
    id: "task_play3",
    title: "Play 3 Demo Rounds",
    description: "Play at least 3 rounds in any demo game to unlock 6 Free Spins on Super Ace",
    rewardType: "free_spins",
    rewardAmount: 6,
    targetGameId: 3150049,
    targetGameName: "Super Ace",
    icon: "🎮",
    progress: 0,
    maxProgress: 3,
    claimed: false,
    isDaily: true,
  },
  {
    id: "task_aviator",
    title: "Fly in Aviator Demo",
    description: "Launch Aviator demo and achieve a multiplier of 2.0x or higher",
    rewardType: "demo_cash",
    rewardAmount: 50,
    icon: "🚀",
    progress: 0,
    maxProgress: 1,
    claimed: false,
  },
  {
    id: "task_deposit_demo",
    title: "Try Demo Wallet Top-up",
    description: "Simulate a demo recharge in your wallet to earn 5 Free Spins on Money Coming",
    rewardType: "free_spins",
    rewardAmount: 5,
    targetGameId: 3150051,
    targetGameName: "Money Coming",
    icon: "💳",
    progress: 0,
    maxProgress: 1,
    claimed: false,
  },
];

export const DEFAULT_GUEST_USER: UserProfile = {
  id: "guest",
  username: "Guest Player",
  phone: "",
  balance: 0,
  lockedBalance: 0,
  vipLevel: 0,
  vipPoints: 0,
  avatar: "👤",
  isLoggedIn: false,
  earnedFreeSpins: {}, // Rule 13: Free spins are NOT default! They are empty until earned from tasks.
  completedTasks: [],
  totalRoundsPlayed: 0,
  totalDemoWins: 0,
};

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "tx_welcome",
    type: "bonus",
    amount: 111,
    title: "New Member Starter Demo Bonus",
    description: "Simulated registration demonstration chips",
    reference: "DEMO-INIT-001",
    timestamp: "Welcome",
    status: "completed",
    isDemo: true,
  },
];

