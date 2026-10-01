# HeroBannerCarousel Specification

## Overview
- **Target file:** `src/components/sites/iplwin/home/HeroBannerCarousel.tsx`
- **Interaction model:** Time-driven auto-cycle (4.5s) with click-driven pagination and navigation
- **Computed Styles:**
  - Container aspect ratio: `16:6` on desktop, `16:8` on mobile
  - Border radius: `12px`
  - Active dot: Background `#D1AE52`, width `24px`, height `6px`, border-radius `3px`
  - Inactive dot: Background `#666666`, width `6px`, height `6px`, border-radius `50%`
  - Slide banners: Rich promotional cards with typography, CTA buttons, and badge highlights

## States & Behaviors
- **Auto-Play:** Advances every 4500ms; pauses on mouse enter
- **Transitions:** Smooth fade / transform slide
- **Clicks:**
  - Dot click changes active slide
  - Arrow buttons navigate prev/next
  - Banner click triggers promo dialog or registration modal
