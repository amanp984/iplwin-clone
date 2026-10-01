# Page Topology: IPLwin (iplwin.in)

## Layout Hierarchy (Top to Bottom)

```mermaid
graph TD
    A[Page Root: min-h-screen bg-#0A0A0A text-white] --> B[SiteHeader (sticky top-0 z-50)]
    A --> C[NoticeMarquee (horizontal scrolling ticker)]
    A --> D[HeroBannerCarousel (auto-rotating promo slider)]
    A --> E[QuickActionsBar (Deposit, Withdraw, VIP, App, Support, Promo)]
    A --> F[LiveJackpotBanner (Ticking progressive jackpot counter)]
    A --> G[WinnersFeed (Real-time live wins stream)]
    A --> H[CategoryNav (Category tabs + Provider sub-pills)]
    A --> I[GameGrid (Responsive interactive cards with search)]
    A --> J[VIPPromoShowcase (VIP tiers & promotion cards)]
    A --> K[AppDownloadBanner (QR code, Android/iOS download)]
    A --> L[SiteFooter (Payment badges, providers, license, 18+)]
    A --> M[BottomNav (Mobile-first sticky bottom navigation)]
    A --> N[Overlays: AuthModal, LanguageModal, GameModal]
```

## Component Breakdown & Working Names

1. **`SiteHeader`** (`src/components/sites/iplwin/home/SiteHeader.tsx`):
   - Logo: "IPLwin" with custom crown/cricket emblem
   - Search trigger & dynamic filter
   - Currency display pill: `₹ INR`
   - Language selector: Flag indicator & modal launcher
   - Auth buttons: "Login" & "Register" with bonus tag

2. **`NoticeMarquee`** (`src/components/sites/iplwin/home/NoticeMarquee.tsx`):
   - Loudspeaker icon with pulsing wave
   - Ticker text with real announcements extracted from iplwin.in
   - Click to open announcement details

3. **`HeroBannerCarousel`** (`src/components/sites/iplwin/home/HeroBannerCarousel.tsx`):
   - Visual banners for IPLwin campaigns (Welcome Bonus, Lucky Wheel, Deposit Cashback, Aviator)
   - Pagination dots & chevron navigation buttons

4. **`QuickActionsBar`** (`src/components/sites/iplwin/home/QuickActionsBar.tsx`):
   - Quick launch icons for core high-frequency player actions:
     - Deposit / Recharge
     - Withdraw
     - VIP Club (₹111,111 Bonus)
     - Download App
     - Promotions
     - 24/7 Support

5. **`LiveJackpotBanner`** (`src/components/sites/iplwin/home/LiveJackpotBanner.tsx`):
   - Progressive jackpot odometer ticking upward live
   - Gold gradient text with ambient glow
   - Multi-provider jackpot pool selector (Spribe, JILI, EVO)

6. **`WinnersFeed`** (`src/components/sites/iplwin/home/WinnersFeed.tsx`):
   - Live stream of recent winners with user ID masking (`3***87`), game icon, and payout amount

7. **`CategoryNav`** (`src/components/sites/iplwin/home/CategoryNav.tsx`):
   - Primary category tab bar (Hot, Sports, Live, Mini Games, Slot, Cards, Fishing, Cock Fighting, E-Sports, Lottery, Demo)
   - Secondary provider filter chips (JILI, PG Soft, Spribe, WG, EVO, SEXY, Ezugi, etc.)

8. **`GameGrid`** (`src/components/sites/iplwin/home/GameGrid.tsx`):
   - Dynamic game card renderer supporting categories, search query, and provider filters
   - Card features: Game thumbnail, provider badge, title, Hot/New tags, Play Now and Demo buttons

9. **`VIPPromoShowcase`** (`src/components/sites/iplwin/home/VIPPromoShowcase.tsx`):
   - Visual cards detailing Super VIP perks, registration bonuses, rebate rates

10. **`AppDownloadBanner`** (`src/components/sites/iplwin/home/AppDownloadBanner.tsx`):
    - App promotional banner with Android APK & iOS webclip download buttons

11. **`SiteFooter`** (`src/components/sites/iplwin/home/SiteFooter.tsx`):
    - Platform description, game providers list, banking partners, PAGCOR regulatory notice, 18+ Responsible Gaming notice

12. **`BottomNav`** (`src/components/sites/iplwin/home/BottomNav.tsx`):
    - Mobile bottom bar with 5 icons: Home, Promotions, Deposit, VIP, Profile

13. **`AuthModal`** (`src/components/sites/iplwin/home/AuthModal.tsx`):
    - Complete login & registration modal with quick mobile login, registration bonus alert, and validation

14. **`LanguageModal`** (`src/components/sites/iplwin/home/LanguageModal.tsx`):
    - Multi-language switcher supporting English, Hindi, Telugu, Tamil, Marathi, Bengali, Kannada, Punjabi

15. **`GameModal`** (`src/components/sites/iplwin/home/GameModal.tsx`):
    - Interactive simulated game player modal for launch & demo preview
