# LiveJackpotBanner Specification

## Overview
- **Target file:** `src/components/sites/iplwin/home/LiveJackpotBanner.tsx`
- **Interaction model:** Time-driven continuous progressive increment + click provider tabs
- **Computed Styles:**
  - Background: Gradient `radial-gradient(ellipse at center, #2a220e 0%, #151515 70%, #0d0d0d 100%)`
  - Border: `1px solid rgba(209, 174, 82, 0.4)`
  - Box shadow: `0 0 25px rgba(209, 174, 82, 0.15)`
  - Jackpot Number: Font size `32px` to `42px`, font-weight `900`, color `#D1AE52`, text-shadow `0 0 12px rgba(209, 174, 82, 0.5)`
  - Provider Tabs: Spribe, JILI, EVO pills with active indicator

## States & Behaviors
- **Ticking counter:** Increments randomly by ₹ 1.25 to ₹ 18.50 every 1.2 seconds to simulate network jackpot feed
- **Provider Switching:** Switches between Spribe Mini Games pool, JILI Slot pool, and EVO Live pool
