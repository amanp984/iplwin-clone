# SiteHeader Specification

## Overview
- **Target file:** `src/components/sites/iplwin/home/SiteHeader.tsx`
- **Interaction model:** Sticky header with click-driven modals (Auth, Language, Search)
- **Computed Styles:**
  - Background: `#1A1A1A` with borderBottom `1px solid #333333`
  - Height: `60px`
  - MaxWidth: `100%`, inner wrapper `max-w-7xl mx-auto px-4`
  - Primary button: Background `linear-gradient(90deg, #E9CA78, #D1AE52, #C39949)`, color `#0A0A0A`, font-weight `700`, border-radius `6px`
  - Outline button: Background `#262626`, border `1px solid #444444`, color `#FFFFFF`, hover `#333333`
  - Logo: "IPLwin" with gold gradient accent and crown symbol
  - Currency badge: Background `#262626`, text `#D1AE52`, border `1px solid #333333`, rounded pill

## States & Behaviors
- **Sticky on scroll:** `position: sticky; top: 0; z-index: 50;`
- **Search:** Toggles expand/collapse inline or modal input
- **Login Click:** Dispatches `onOpenAuth('login')`
- **Register Click:** Dispatches `onOpenAuth('register')`
- **Language Click:** Dispatches `onOpenLanguage()`
