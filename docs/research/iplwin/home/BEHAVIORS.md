# Behaviors Specification: IPLwin (iplwin.in)

## 1. Header & Navigation Behavior
- **Sticky / Fixed**: Header remains pinned to top with `z-50`, dark solid backdrop `#1A1A1A` with subtle bottom border `#333333`.
- **Search Trigger**: Clicking search icon opens search bar overlay to instantly filter games by keyword.
- **Language Switch**: Clicking the language flag/icon opens a modal/sheet showing English, Hindi, Telugu, Tamil, Marathi, Kannada, Bengali, Punjabi.
- **Authentication**: Clicking "Login" or "Register" opens an interactive modal with quick register tabs, phone verification, and bonus highlights ("Registration 111 ₹ Bonus").

## 2. Notice Marquee
- **Continuous Marquee**: Horizontal smooth scroll ticker displaying real-time platform notices, withdrawal speed guarantees (under 3 mins), and IPLwin Lucky Bonus announcements.
- **Interaction**: Pauses on hover; clickable to view the full announcement details in a dialog.

## 3. Hero Banner Carousel
- **Auto-Play**: Cycles every 4.5 seconds with smooth slide/fade transition.
- **Dots Navigation**: Clickable pagination pills; active pill expands to gold gradient indicator.
- **Manual Controls**: Prev and Next arrow controls with subtle hover expansion.

## 4. Live Mega Jackpot Counter
- **Ticking Number Engine**: Real-time incrementing digit counter that updates every 1-2 seconds with subtle pulse effect on digits, formatted with Indian numbering system (`₹ XX,XX,XXX.XX`).
- **Visual Effects**: Golden border glow, ambient radial gradient behind jackpot number.

## 5. Live Winners Carousel / Ticker
- **Stream of Wins**: Displays latest big winners dynamically (`userID won ₹Amount in GameName`).
- **Updates**: Auto-scrolls upward or horizontal ticker showing continuous community winnings.

## 6. Category Tabs & Provider Sub-Filters
- **Category Switching**: Instant click-driven tab switching without page reload.
  - Active tab styling: Deep gold gradient or `#232323` elevated background with `#D1AE52` active border and text.
- **Provider Sub-Filter**: Below main category tabs, renders horizontal scrollable list of providers for the active category (e.g. Spribe, JILI, PG Soft, WG, Evolution).
- **Filtering**: Clicking a provider filters the game grid immediately.

## 7. Game Cards Interaction
- **Hover State**:
  - Image scales up subtly (`scale-105`, duration 300ms).
  - Overlay gradient darkens to reveal "Play Now" (gold button) and "Demo" (glassmorphism outline button).
  - Provider badge positioned at top-left.
  - "HOT" or "NEW" badge positioned at top-right with pulse animation.
- **Click**: Launches game container or demo preview dialog with full-screen capability.

## 8. Mobile & Responsive Layout
- **Desktop (1440px)**: Multi-column grid (5-6 games per row), full header with buttons, side layout elements.
- **Tablet (768px)**: 3-4 games per row, compact header.
- **Mobile (390px)**: 2-3 games per row, bottom sticky navigation bar with active indicators (Home, Promo, Deposit, VIP, Profile).
