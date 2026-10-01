# GameGrid Specification

## Overview
- **Target file:** `src/components/sites/iplwin/home/GameGrid.tsx`
- **Interaction model:** Hover overlay animations, click launch modal, search and provider filters
- **Computed Styles:**
  - Card background: `#1E1E1E` with border `1px solid #333333`
  - Border radius: `10px`
  - Thumbnail: Aspect ratio `1:1` or `4:3`, object-fit `cover`
  - Title: Font size `13px`, font-weight `600`, color `#FFFFFF`, text-truncate
  - Provider badge: Font size `10px`, background `rgba(0,0,0,0.6)`, text `#D1AE52`, rounded `4px`, padding `2px 6px`
  - Ribbon:
    - HOT: Background `linear-gradient(135deg, #FF4D4F, #F5222D)`, text `#FFFFFF`
    - NEW: Background `linear-gradient(135deg, #52C41A, #389E0D)`, text `#FFFFFF`
    - JACKPOT: Background `linear-gradient(135deg, #FAAD14, #D48806)`, text `#000000`

## Hover Interactions
- Image scale: `transform: scale(1.06)` with transition `300ms ease`
- Overlay: Gradient appears with opacity `100%`
- Play Now button: Gold button with icon
- Demo button: Subtle ghost button with icon
