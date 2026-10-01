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
