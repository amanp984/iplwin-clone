/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const gamesDir = path.join(__dirname, "../public/images/games");
const bannersDir = path.join(__dirname, "../public/images/banners");

if (!fs.existsSync(gamesDir)) fs.mkdirSync(gamesDir, { recursive: true });
if (!fs.existsSync(bannersDir)) fs.mkdirSync(bannersDir, { recursive: true });

const games = [
  {
    id: "312001",
    file: "aviator.svg",
    title: "AVIATOR",
    subtitle: "Spribe Crash Engine",
    provider: "SPRIBE",
    bg1: "#1A0507",
    bg2: "#3D0E13",
    accent: "#E51937",
    glow: "#FF455E",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Flight Multiplier Graph -->
        <path d="M -160,70 Q -60,65 0,30 T 120,-45" fill="none" stroke="#E51937" stroke-width="4" stroke-linecap="round"/>
        <path d="M -160,70 Q -60,65 0,30 T 120,-45 L 120,70 Z" fill="url(#aviator-grad)" opacity="0.25"/>
        <!-- Red Propeller Plane -->
        <g transform="translate(120, -45) rotate(-22)">
          <ellipse cx="0" cy="0" rx="36" ry="12" fill="#E51937" stroke="#FF8595" stroke-width="2"/>
          <path d="M -20, -5 L -35, -20 L -25, -22 L -10, -5 Z" fill="#C2122B"/>
          <path d="M 5, 2 L -5, 28 L 5, 30 L 15, 2 Z" fill="#B30E25"/>
          <ellipse cx="28" cy="0" rx="4" ry="10" fill="#FFBCC4"/>
          <circle cx="20" cy="-2" r="5" fill="#FFFFFF" opacity="0.9"/>
          <!-- Speed blur trails -->
          <line x1="-38" y1="0" x2="-65" y2="0" stroke="#FF455E" stroke-width="2" stroke-dasharray="4,4"/>
          <line x1="-38" y1="-8" x2="-55" y2="-8" stroke="#FF455E" stroke-width="1.5" stroke-dasharray="3,3"/>
        </g>
        <!-- Multiplier Tag -->
        <rect x="35" y="-95" width="85" height="30" rx="15" fill="#E51937" stroke="#FFA3AE" stroke-width="1.5"/>
        <text x="77" y="-75" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">18.42x</text>
      </g>
    `
  },
  {
    id: "3150300",
    file: "fortune_gems_3.svg",
    title: "FORTUNE GEMS 3",
    subtitle: "Mayan Treasure Slots",
    provider: "JILI",
    bg1: "#1F1500",
    bg2: "#3D2C04",
    accent: "#FFD700",
    glow: "#E9CA78",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Sun Disks / Aztec rays -->
        <circle cx="0" cy="0" r="70" fill="none" stroke="#FFD700" stroke-width="2" stroke-dasharray="6,4" opacity="0.5"/>
        <!-- Central Pyramid and Mask -->
        <polygon points="0,-60 65,40 -65,40" fill="#6B4B03" stroke="#FFD700" stroke-width="3"/>
        <polygon points="0,-45 48,32 -48,32" fill="#946908"/>
        <!-- Ruby Gem -->
        <polygon points="-40,-10 -25,-30 -10,-10 -25,10" fill="#E51937" stroke="#FFA3AE" stroke-width="2"/>
        <!-- Emerald Gem -->
        <polygon points="40,-10 25,-30 10,-10 25,10" fill="#04BE02" stroke="#75FF73" stroke-width="2"/>
        <!-- Sapphire Gem -->
        <polygon points="0,-10 15,-30 30,-10 15,10" fill="#00A2FF" stroke="#A8E0FF" stroke-width="2" transform="translate(-15, 20)"/>
        <!-- Gold Coin Shower -->
        <circle cx="-55" cy="45" r="10" fill="#FFD700" stroke="#FFFFFF" stroke-width="1"/>
        <circle cx="55" cy="45" r="10" fill="#FFD700" stroke="#FFFFFF" stroke-width="1"/>
        <text x="0" y="5" fill="#FFD700" font-family="Arial, sans-serif" font-weight="900" font-size="20" text-anchor="middle">💎 3X 💎</text>
      </g>
    `
  },
  {
    id: "3150049",
    file: "super_ace.svg",
    title: "SUPER ACE",
    subtitle: "Golden Card Cascades",
    provider: "JILI",
    bg1: "#120824",
    bg2: "#2A134D",
    accent: "#AA42FF",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Golden Playing Card -->
        <g transform="rotate(-10)">
          <rect x="-60" y="-70" width="70" height="100" rx="8" fill="#1C1A24" stroke="#FFD700" stroke-width="2"/>
          <text x="-48" y="-45" fill="#FFD700" font-family="Arial, sans-serif" font-weight="bold" font-size="18">A</text>
          <path d="M -25,-25 C -25,-40 -10,-35 -25,-10 C -40,-35 -25,-40 -25,-25 Z" fill="#FFD700"/>
        </g>
        <g transform="rotate(10) translate(20, -5)">
          <rect x="-20" y="-70" width="70" height="100" rx="8" fill="#FFFDF0" stroke="#FFD700" stroke-width="2.5"/>
          <text x="-8" y="-45" fill="#E51937" font-family="Arial, sans-serif" font-weight="bold" font-size="18">A</text>
          <!-- Ace Heart -->
          <path d="M 15,-30 C 15,-40 25,-40 25,-30 C 25,-20 15,-10 15,-10 C 15,-10 5,-20 5,-30 C 5,-40 15,-40 15,-30 Z" fill="#E51937"/>
          <text x="15" y="15" fill="#1C1A24" font-family="Arial, sans-serif" font-weight="900" font-size="22" text-anchor="middle">ACE</text>
        </g>
        <!-- Gold Crown on Top -->
        <path d="M -25,-75 L -10,-60 L 0,-85 L 10,-60 L 25,-75 L 20,-50 L -20,-50 Z" fill="#FFD700" stroke="#FFFFFF" stroke-width="1.5"/>
      </g>
    `
  },
  {
    id: "3150094",
    file: "rummy.svg",
    title: "RUMMY",
    subtitle: "Classic Indian Card Game",
    provider: "JILI",
    bg1: "#061A0C",
    bg2: "#0E381A",
    accent: "#04BE02",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Felt table circle -->
        <circle cx="0" cy="0" r="70" fill="#0C401E" stroke="#FFD700" stroke-width="2"/>
        <!-- Hand of Cards spread -->
        <g transform="translate(-35, -30) rotate(-15)">
          <rect x="0" y="0" width="35" height="55" rx="4" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1"/>
          <text x="6" y="15" fill="#E51937" font-size="12" font-weight="bold">K♥</text>
        </g>
        <g transform="translate(-15, -35) rotate(-5)">
          <rect x="0" y="0" width="35" height="55" rx="4" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1"/>
          <text x="6" y="15" fill="#E51937" font-size="12" font-weight="bold">Q♥</text>
        </g>
        <g transform="translate(5, -35) rotate(5)">
          <rect x="0" y="0" width="35" height="55" rx="4" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1"/>
          <text x="6" y="15" fill="#E51937" font-size="12" font-weight="bold">J♥</text>
        </g>
        <g transform="translate(25, -30) rotate(15)">
          <rect x="0" y="0" width="35" height="55" rx="4" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1"/>
          <text x="6" y="15" fill="#1C1A24" font-size="12" font-weight="bold">10♠</text>
        </g>
        <!-- Joker Badge -->
        <circle cx="0" cy="35" r="22" fill="#FFD700" stroke="#FFFFFF" stroke-width="2"/>
        <text x="0" y="42" fill="#000000" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">JOKER</text>
      </g>
    `
  },
  {
    id: "3150124",
    file: "7up_7down.svg",
    title: "7UP 7DOWN",
    subtitle: "High Roll Dice Action",
    provider: "JILI",
    bg1: "#1A0B2E",
    bg2: "#351561",
    accent: "#00E5FF",
    glow: "#FF0077",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Dice 1 (Red) -->
        <g transform="translate(-40, -10) rotate(-15)">
          <rect x="-30" y="-30" width="60" height="60" rx="10" fill="#E51937" stroke="#FF8595" stroke-width="2"/>
          <circle cx="-15" cy="-15" r="5" fill="#FFFFFF"/>
          <circle cx="15" cy="-15" r="5" fill="#FFFFFF"/>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
          <circle cx="-15" cy="15" r="5" fill="#FFFFFF"/>
          <circle cx="15" cy="15" r="5" fill="#FFFFFF"/>
        </g>
        <!-- Dice 2 (Blue) -->
        <g transform="translate(40, -15) rotate(15)">
          <rect x="-30" y="-30" width="60" height="60" rx="10" fill="#0077FF" stroke="#85C2FF" stroke-width="2"/>
          <circle cx="-15" cy="-15" r="5" fill="#FFFFFF"/>
          <circle cx="15" cy="15" r="5" fill="#FFFFFF"/>
        </g>
        <!-- 7 Badge -->
        <rect x="-45" y="32" width="90" height="28" rx="14" fill="#FFD700" stroke="#FFFFFF" stroke-width="1.5"/>
        <text x="0" y="52" fill="#000000" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">LUCKY 7</text>
      </g>
    `
  },
  {
    id: "3150200",
    file: "pappu.svg",
    title: "PAPPU",
    subtitle: "Fast Indian Card Game",
    provider: "JILI",
    bg1: "#2B1100",
    bg2: "#592300",
    accent: "#FF9100",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <circle cx="0" cy="0" r="65" fill="#421B02" stroke="#FF9100" stroke-width="2"/>
        <circle cx="0" cy="0" r="50" fill="#662A03"/>
        <text x="0" y="10" fill="#FFD700" font-family="Arial, sans-serif" font-weight="900" font-size="34" text-anchor="middle">पप्पू</text>
        <circle cx="-35" cy="40" r="14" fill="#FFD700" stroke="#FFFFFF" stroke-width="1"/>
        <text x="-35" y="45" fill="#000000" font-size="12" font-weight="bold" text-anchor="middle">₹</text>
        <circle cx="35" cy="40" r="14" fill="#FFD700" stroke="#FFFFFF" stroke-width="1"/>
        <text x="35" y="45" fill="#000000" font-size="12" font-weight="bold" text-anchor="middle">₹</text>
      </g>
    `
  },
  {
    id: "3150051",
    file: "money_coming.svg",
    title: "MONEY COMING",
    subtitle: "Instant Multiplier Reel",
    provider: "JILI",
    bg1: "#2B1D00",
    bg2: "#543A02",
    accent: "#FFD700",
    glow: "#FFAA00",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Gold Coin Stacks -->
        <ellipse cx="-45" cy="30" rx="30" ry="12" fill="#C29000"/>
        <ellipse cx="-45" cy="20" rx="30" ry="12" fill="#E6AB00"/>
        <ellipse cx="-45" cy="10" rx="30" ry="12" fill="#FFD700" stroke="#FFFFFF" stroke-width="1"/>
        <!-- Golden Wheel / Vault -->
        <circle cx="25" cy="-5" r="45" fill="#1C1808" stroke="#FFD700" stroke-width="4"/>
        <circle cx="25" cy="-5" r="35" fill="#3D320B"/>
        <text x="25" y="-12" fill="#FFD700" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">1000X</text>
        <text x="25" y="12" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="22" text-anchor="middle">7 7 7</text>
        <!-- Floating Rupee symbol -->
        <circle cx="-20" cy="-40" r="18" fill="#FFD700" stroke="#FFFFFF" stroke-width="2"/>
        <text x="-20" y="-33" fill="#000000" font-family="Arial, sans-serif" font-weight="900" font-size="20" text-anchor="middle">₹</text>
      </g>
    `
  },
  {
    id: "2000135",
    file: "wild_bounty.svg",
    title: "WILD BOUNTY",
    subtitle: "Showdown Western Slots",
    provider: "PG Soft",
    bg1: "#2B1408",
    bg2: "#4F260E",
    accent: "#E05A19",
    glow: "#FFB03B",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Sheriff Star -->
        <polygon points="0,-60 14,-25 50,-25 22,-2 32,32 0,14 -32,32 -22,-2 -50,-25 -14,-25" fill="#FFD700" stroke="#875E02" stroke-width="2"/>
        <circle cx="0" cy="-2" r="18" fill="#4F260E"/>
        <text x="0" y="5" fill="#FFD700" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">SHERIFF</text>
        <!-- Western Revolvers crossed -->
        <line x1="-50" y1="45" x2="50" y2="45" stroke="#D1AE52" stroke-width="5" stroke-linecap="round"/>
        <text x="0" y="65" fill="#FFB03B" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">1024 WAYS</text>
      </g>
    `
  },
  {
    id: "3660003",
    file: "chicken_road_2.svg",
    title: "CHICKEN ROAD 2.0",
    subtitle: "Multiplier Cross Road",
    provider: "INOUT",
    bg1: "#141F0C",
    bg2: "#2A3D18",
    accent: "#76FF03",
    glow: "#FFEA00",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Road with lane marks -->
        <rect x="-80" y="-30" width="160" height="60" rx="6" fill="#2B2B2B" stroke="#444444" stroke-width="2"/>
        <line x1="-70" y1="0" x2="-30" y2="0" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="-10" y1="0" x2="30" y2="0" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="0" x2="70" y2="0" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <!-- Chicken Character -->
        <circle cx="0" cy="-20" r="24" fill="#FFD700" stroke="#FFA000" stroke-width="2"/>
        <!-- Comb -->
        <polygon points="-8,-44 0,-54 8,-44" fill="#E51937"/>
        <!-- Beak -->
        <polygon points="18,-24 30,-18 18,-12" fill="#FF6D00"/>
        <!-- Eye -->
        <circle cx="10" cy="-24" r="4" fill="#000000"/>
        <circle cx="12" cy="-26" r="1.5" fill="#FFFFFF"/>
        <!-- Multiplier pill -->
        <rect x="-35" y="38" width="70" height="24" rx="12" fill="#76FF03"/>
        <text x="0" y="55" fill="#000000" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">50.0X</text>
      </g>
    `
  },
  {
    id: "3660008",
    file: "chicken_road.svg",
    title: "CHICKEN ROAD",
    subtitle: "Classic Arcade Run",
    provider: "INOUT",
    bg1: "#1A150A",
    bg2: "#3D3114",
    accent: "#FFAB00",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <circle cx="0" cy="-10" r="35" fill="#FFB300" stroke="#FFD54F" stroke-width="3"/>
        <polygon points="-10,-45 0,-60 10,-45" fill="#D32F2F"/>
        <polygon points="25,-15 42,-8 25,-1" fill="#E65100"/>
        <circle cx="15" cy="-15" r="5" fill="#000000"/>
        <circle cx="17" cy="-18" r="2" fill="#FFFFFF"/>
        <text x="0" y="55" fill="#FFD54F" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">GO CHICKEN!</text>
      </g>
    `
  },
  {
    id: "5008",
    file: "plinko.svg",
    title: "PLINKO",
    subtitle: "High Drop Peg Pyramid",
    provider: "WG",
    bg1: "#1A062E",
    bg2: "#380D63",
    accent: "#E040FB",
    glow: "#00E5FF",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Pegs Grid -->
        <circle cx="0" cy="-60" r="4" fill="#FFFFFF"/>
        <circle cx="-20" cy="-40" r="4" fill="#FFFFFF"/>
        <circle cx="20" cy="-40" r="4" fill="#FFFFFF"/>
        <circle cx="-40" cy="-20" r="4" fill="#FFFFFF"/>
        <circle cx="0" cy="-20" r="4" fill="#FFFFFF"/>
        <circle cx="40" cy="-20" r="4" fill="#FFFFFF"/>
        <circle cx="-60" cy="0" r="4" fill="#FFFFFF"/>
        <circle cx="-20" cy="0" r="4" fill="#FFFFFF"/>
        <circle cx="20" cy="0" r="4" fill="#FFFFFF"/>
        <circle cx="60" cy="0" r="4" fill="#FFFFFF"/>
        <!-- Plinko Ball -->
        <circle cx="12" cy="-25" r="10" fill="#E040FB" stroke="#FFFFFF" stroke-width="2"/>
        <!-- Buckets at bottom -->
        <rect x="-65" y="25" width="22" height="24" rx="4" fill="#E51937"/>
        <text x="-54" y="42" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">16x</text>
        <rect x="-40" y="25" width="22" height="24" rx="4" fill="#FF9100"/>
        <text x="-29" y="42" fill="#000000" font-size="11" font-weight="bold" text-anchor="middle">4x</text>
        <rect x="-15" y="25" width="30" height="24" rx="4" fill="#04BE02"/>
        <text x="0" y="42" fill="#000000" font-size="11" font-weight="bold" text-anchor="middle">1.2x</text>
        <rect x="18" y="25" width="22" height="24" rx="4" fill="#FF9100"/>
        <text x="29" y="42" fill="#000000" font-size="11" font-weight="bold" text-anchor="middle">4x</text>
        <rect x="43" y="25" width="22" height="24" rx="4" fill="#E51937"/>
        <text x="54" y="42" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">16x</text>
      </g>
    `
  },
  {
    id: "5001",
    file: "crash.svg",
    title: "CRASH",
    subtitle: "Rocket Multiplier Game",
    provider: "WG",
    bg1: "#0B152B",
    bg2: "#142854",
    accent: "#00E5FF",
    glow: "#2979FF",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Trajectory curve -->
        <path d="M -70,50 Q -10,40 50,-40" fill="none" stroke="#00E5FF" stroke-width="4" stroke-linecap="round"/>
        <!-- Rocket -->
        <g transform="translate(50, -40) rotate(-45)">
          <path d="M 0,-30 C 15,-15 15,15 0,30 C -15,15 -15,-15 0,-30 Z" fill="#FFFFFF"/>
          <path d="M -10,15 L -20,25 L -5,25 Z" fill="#E51937"/>
          <path d="M 10,15 L 20,25 L 5,25 Z" fill="#E51937"/>
          <circle cx="0" cy="-5" r="7" fill="#00E5FF"/>
          <!-- Fire Thruster -->
          <polygon points="0,30 -6,45 0,40 6,45" fill="#FF9100"/>
        </g>
        <text x="-15" y="0" fill="#00E5FF" font-family="Arial, sans-serif" font-weight="900" font-size="28">7.82x</text>
      </g>
    `
  },
  {
    id: "312005",
    file: "mines.svg",
    title: "MINES",
    subtitle: "High Stakes Grid Pick",
    provider: "Spribe",
    bg1: "#121217",
    bg2: "#22222E",
    accent: "#00E676",
    glow: "#E51937",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Grid tiles -->
        <g transform="translate(-45, -45)">
          <rect x="0" y="0" width="40" height="40" rx="8" fill="#0E2E1B" stroke="#00E676" stroke-width="2"/>
          <text x="20" y="27" fill="#00E676" font-size="20" text-anchor="middle">⭐</text>
        </g>
        <g transform="translate(5, -45)">
          <rect x="0" y="0" width="40" height="40" rx="8" fill="#0E2E1B" stroke="#00E676" stroke-width="2"/>
          <text x="20" y="27" fill="#00E676" font-size="20" text-anchor="middle">💎</text>
        </g>
        <g transform="translate(-45, 5)">
          <rect x="0" y="0" width="40" height="40" rx="8" fill="#0E2E1B" stroke="#00E676" stroke-width="2"/>
          <text x="20" y="27" fill="#00E676" font-size="20" text-anchor="middle">⭐</text>
        </g>
        <g transform="translate(5, 5)">
          <rect x="0" y="0" width="40" height="40" rx="8" fill="#3D0F14" stroke="#E51937" stroke-width="2"/>
          <!-- Naval Mine -->
          <circle cx="20" cy="20" r="10" fill="#E51937"/>
          <line x1="20" y1="5" x2="20" y2="35" stroke="#E51937" stroke-width="3"/>
          <line x1="5" y1="20" x2="35" y2="20" stroke="#E51937" stroke-width="3"/>
        </g>
      </g>
    `
  },
  {
    id: "10280084",
    file: "andar_bahar.svg",
    title: "ANDAR BAHAR",
    subtitle: "Real Indian Table Action",
    provider: "KingMidas",
    bg1: "#2B0B0E",
    bg2: "#52141A",
    accent: "#FFD700",
    glow: "#E51937",
    icon: `
      <g transform="translate(200, 130)">
        <rect x="-80" y="-45" width="75" height="90" rx="8" fill="#0E2615" stroke="#04BE02" stroke-width="2"/>
        <text x="-42" y="-20" fill="#04BE02" font-weight="900" font-size="14" text-anchor="middle">ANDAR</text>
        <rect x="-60" y="-5" width="36" height="45" rx="4" fill="#FFFFFF"/>
        <text x="-42" y="24" fill="#E51937" font-weight="bold" font-size="16" text-anchor="middle">A♠</text>

        <rect x="5" y="-45" width="75" height="90" rx="8" fill="#2E0E13" stroke="#E51937" stroke-width="2"/>
        <text x="42" y="-20" fill="#E51937" font-weight="900" font-size="14" text-anchor="middle">BAHAR</text>
        <rect x="25" y="-5" width="36" height="45" rx="4" fill="#FFFFFF"/>
        <text x="43" y="24" fill="#141414" font-weight="bold" font-size="16" text-anchor="middle">8♦</text>
      </g>
    `
  },
  {
    id: "1016",
    file: "dragon_tiger.svg",
    title: "DRAGON TIGER",
    subtitle: "Legendary Clash",
    provider: "WG",
    bg1: "#260E00",
    bg2: "#4F1D00",
    accent: "#FF9100",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Dragon side -->
        <circle cx="-40" cy="0" r="35" fill="#E51937" stroke="#FFD700" stroke-width="2"/>
        <text x="-40" y="8" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">🐉 DRAGON</text>
        <!-- VS -->
        <circle cx="0" cy="0" r="16" fill="#FFD700"/>
        <text x="0" y="5" fill="#000000" font-weight="900" font-size="12" text-anchor="middle">VS</text>
        <!-- Tiger side -->
        <circle cx="40" cy="0" r="35" fill="#FF9100" stroke="#FFD700" stroke-width="2"/>
        <text x="40" y="8" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">🐅 TIGER</text>
      </g>
    `
  },
  {
    id: "3150289",
    file: "ocean_king.svg",
    title: "OCEAN KING",
    subtitle: "Deep Sea Jackpot Fishing",
    provider: "JILI",
    bg1: "#03172E",
    bg2: "#072C59",
    accent: "#00E5FF",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Sea depth bubbles -->
        <circle cx="-50" cy="-40" r="8" fill="#00E5FF" opacity="0.4"/>
        <circle cx="60" cy="-20" r="12" fill="#00E5FF" opacity="0.3"/>
        <!-- Golden Fish King -->
        <path d="M -40,0 C -20,-30 20,-30 40,0 C 20,30 -20,30 -40,0 Z" fill="#FFD700" stroke="#FFF" stroke-width="2"/>
        <polygon points="-40,0 -65,-20 -65,20" fill="#FFA000"/>
        <circle cx="20" cy="-6" r="4" fill="#000000"/>
        <!-- Crown on Fish -->
        <polygon points="5,-25 15,-15 25,-32 35,-15 45,-25 35,-10 15,-10" fill="#FFD700"/>
        <text x="0" y="55" fill="#FFD700" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">JACKPOT POOL</text>
      </g>
    `
  },
  {
    id: "3150074",
    file: "mega_fishing.svg",
    title: "MEGA FISHING",
    subtitle: "High Power Laser Hunt",
    provider: "JILI",
    bg1: "#022426",
    bg2: "#054347",
    accent: "#00E5FF",
    glow: "#76FF03",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Cannon -->
        <rect x="-15" y="10" width="30" height="40" rx="6" fill="#37474F" stroke="#00E5FF" stroke-width="2"/>
        <line x1="0" y1="10" x2="0" y2="-45" stroke="#76FF03" stroke-width="4" stroke-dasharray="6,4"/>
        <!-- Target Crosshair -->
        <circle cx="0" cy="-45" r="24" fill="none" stroke="#FF1744" stroke-width="2"/>
        <circle cx="0" cy="-45" r="6" fill="#FF1744"/>
        <!-- Swimming Shark silhouette -->
        <path d="M -50,-45 Q -20,-60 20,-45 Q -10,-35 -50,-45 Z" fill="#00E5FF"/>
      </g>
    `
  },
  {
    id: "317000",
    file: "live_roulette.svg",
    title: "LIVE ROULETTE",
    subtitle: "Evolution Real Studio",
    provider: "Evolution",
    bg1: "#1A0609",
    bg2: "#3D0E15",
    accent: "#FFD700",
    glow: "#E51937",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Roulette Wheel -->
        <circle cx="0" cy="0" r="60" fill="#3E2723" stroke="#FFD700" stroke-width="4"/>
        <circle cx="0" cy="0" r="48" fill="#1A0609" stroke="#D7CCC8" stroke-width="1"/>
        <!-- Alternating slots -->
        <circle cx="0" cy="0" r="35" fill="#2E080C" stroke="#FFD700" stroke-width="2"/>
        <!-- Center brass turret -->
        <circle cx="0" cy="0" r="14" fill="#FFD700" stroke="#FFFFFF" stroke-width="1.5"/>
        <!-- Ivory ball -->
        <circle cx="28" cy="-28" r="6" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1"/>
        <text x="0" y="5" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">LIVE</text>
      </g>
    `
  },
  {
    id: "1012000",
    file: "sexy_baccarat.svg",
    title: "SEXY BACCARAT",
    subtitle: "Live Asian Dealers",
    provider: "SEXY Live",
    bg1: "#2B071A",
    bg2: "#570F35",
    accent: "#FF4081",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <circle cx="0" cy="0" r="60" fill="#3D0B26" stroke="#FF4081" stroke-width="3"/>
        <rect x="-45" y="-35" width="40" height="55" rx="4" fill="#FFFFFF" stroke="#D1AE52" stroke-width="1.5"/>
        <text x="-25" y="-15" fill="#E51937" font-weight="bold" font-size="14" text-anchor="middle">8</text>
        <rect x="5" y="-35" width="40" height="55" rx="4" fill="#FFFFFF" stroke="#D1AE52" stroke-width="1.5"/>
        <text x="25" y="-15" fill="#141414" font-weight="bold" font-size="14" text-anchor="middle">9</text>
        <text x="0" y="42" fill="#FFD700" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">NATURAL 9</text>
      </g>
    `
  },
  {
    id: "1014000",
    file: "9wickets_cricket.svg",
    title: "9WICKETS CRICKET",
    subtitle: "Live Match Exchange",
    provider: "9Wickets",
    bg1: "#061A2B",
    bg2: "#0D3559",
    accent: "#00E5FF",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Cricket Stadium Turf -->
        <ellipse cx="0" cy="15" rx="75" ry="35" fill="#1B5E20" stroke="#FFD700" stroke-width="2"/>
        <!-- Pitch -->
        <rect x="-15" y="-5" width="30" height="40" fill="#D7CCC8"/>
        <!-- Wickets -->
        <line x1="-8" y1="-5" x2="-8" y2="-30" stroke="#FFD700" stroke-width="3"/>
        <line x1="0" y1="-5" x2="0" y2="-30" stroke="#FFD700" stroke-width="3"/>
        <line x1="8" y1="-5" x2="8" y2="-30" stroke="#FFD700" stroke-width="3"/>
        <line x1="-10" y1="-30" x2="10" y2="-30" stroke="#FFD700" stroke-width="3"/>
        <!-- Red Leather Cricket Ball -->
        <circle cx="35" cy="-25" r="14" fill="#C62828" stroke="#FFFFFF" stroke-width="1.5"/>
        <path d="M 28,-35 Q 35,-25 42,-15" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="2,2"/>
        <text x="0" y="45" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">IN-PLAY 24/7</text>
      </g>
    `
  },
  {
    id: "328000",
    file: "saba_sports.svg",
    title: "SABA SPORTS",
    subtitle: "Global Sportsbook Odds",
    provider: "SABA",
    bg1: "#0B1E12",
    bg2: "#163D24",
    accent: "#00E676",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Football -->
        <circle cx="-35" cy="-10" r="28" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
        <polygon points="-35,-20 -25,-12 -28,0 -42,0 -45,-12" fill="#000000"/>
        <!-- Basketball -->
        <circle cx="35" cy="-10" r="28" fill="#E65100" stroke="#000000" stroke-width="2"/>
        <line x1="10" y1="-10" x2="60" y2="-10" stroke="#000000" stroke-width="2"/>
        <path d="M 35,-38 Q 20,-10 35,18" fill="none" stroke="#000000" stroke-width="2"/>
        <text x="0" y="48" fill="#00E676" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">TOP ODDS</text>
      </g>
    `
  },
  {
    id: "87000",
    file: "sv388_cockfight.svg",
    title: "SV388 COCKFIGHT",
    subtitle: "Live Arena Streams",
    provider: "SV388",
    bg1: "#2B0B00",
    bg2: "#571600",
    accent: "#FF3D00",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <circle cx="0" cy="0" r="60" fill="#3E1500" stroke="#FF3D00" stroke-width="3"/>
        <circle cx="0" cy="-15" r="25" fill="#FFD700"/>
        <!-- Crest -->
        <polygon points="-8,-45 0,-60 8,-45" fill="#D50000"/>
        <polygon points="15,-20 28,-14 15,-8" fill="#FF6D00"/>
        <circle cx="8" cy="-20" r="4" fill="#000000"/>
        <text x="0" y="38" fill="#FFD700" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">ARENA 1</text>
      </g>
    `
  },
  {
    id: "74000",
    file: "db_esports.svg",
    title: "DB E-SPORTS",
    subtitle: "Dota, CS:GO & Valorant",
    provider: "DB E-Sports",
    bg1: "#0C1226",
    bg2: "#19244D",
    accent: "#2979FF",
    glow: "#00E5FF",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Gaming Controller -->
        <rect x="-55" y="-30" width="110" height="60" rx="25" fill="#212121" stroke="#2979FF" stroke-width="3"/>
        <!-- D-Pad -->
        <rect x="-35" y="-12" width="20" height="6" fill="#00E5FF"/>
        <rect x="-28" y="-19" width="6" height="20" fill="#00E5FF"/>
        <!-- Action buttons -->
        <circle cx="25" cy="-15" r="4" fill="#E51937"/>
        <circle cx="35" cy="-5" r="4" fill="#00E676"/>
        <circle cx="15" cy="-5" r="4" fill="#2979FF"/>
        <circle cx="25" cy="5" r="4" fill="#FFD700"/>
        <text x="0" y="55" fill="#00E5FF" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">LIVE LEAGUES</text>
      </g>
    `
  },
  {
    id: "39000",
    file: "tcg_lottery.svg",
    title: "TCG LOTTERY",
    subtitle: "Fast 1-Min Draw Balls",
    provider: "TCG Lottery",
    bg1: "#1A0924",
    bg2: "#3D1454",
    accent: "#D500F9",
    glow: "#FFD700",
    icon: `
      <g transform="translate(200, 130)">
        <!-- Lottery drum -->
        <circle cx="0" cy="-5" r="50" fill="#1D0A2B" stroke="#FFD700" stroke-width="3"/>
        <!-- Numbered balls -->
        <circle cx="-20" cy="-15" r="16" fill="#E51937"/>
        <text x="-20" y="-9" fill="#FFF" font-weight="900" font-size="13" text-anchor="middle">07</text>
        <circle cx="20" cy="-20" r="16" fill="#0077FF"/>
        <text x="20" y="-14" fill="#FFF" font-weight="900" font-size="13" text-anchor="middle">77</text>
        <circle cx="0" cy="15" r="16" fill="#FFD700"/>
        <text x="0" y="21" fill="#000" font-weight="900" font-size="13" text-anchor="middle">11</text>
        <text x="0" y="65" fill="#FFD700" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">QUICK 3 DRAW</text>
      </g>
    `
  }
];

function generateGameSvg(game) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bg-${game.id}" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${game.bg2}" />
      <stop offset="100%" stop-color="${game.bg1}" />
    </radialGradient>
    <linearGradient id="aviator-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E51937" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#E51937" stop-opacity="0"/>
    </linearGradient>
    <filter id="glow-${game.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="400" height="300" fill="url(#bg-${game.id})" />

  <!-- Ambient Glow -->
  <circle cx="200" cy="120" r="110" fill="${game.accent}" opacity="0.12" filter="url(#glow-${game.id})" />

  <!-- Grid Tech Lines -->
  <g opacity="0.08" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="50" x2="400" y2="50" />
    <line x1="0" y1="100" x2="400" y2="100" />
    <line x1="0" y1="150" x2="400" y2="150" />
    <line x1="0" y1="200" x2="400" y2="200" />
    <line x1="100" y1="0" x2="100" y2="300" />
    <line x1="200" y1="0" x2="200" y2="300" />
    <line x1="300" y1="0" x2="300" y2="300" />
  </g>

  <!-- Game Vector Illustration -->
  ${game.icon}

  <!-- Bottom Dark Gradient for Title Legibility -->
  <rect y="210" width="400" height="90" fill="url(#bottom-fade)" />
  <defs>
    <linearGradient id="bottom-fade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="60%" stop-color="#050505" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.98"/>
    </linearGradient>
  </defs>

  <!-- Provider Badge Top Left -->
  <rect x="14" y="14" width="76" height="22" rx="11" fill="#141414" stroke="#333333" stroke-width="1"/>
  <text x="52" y="29" fill="#D1AE52" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="10" text-anchor="middle" letter-spacing="1">${game.provider}</text>

  <!-- Game Title and Subtitle -->
  <text x="20" y="260" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="19" letter-spacing="0.5">${game.title}</text>
  <text x="20" y="280" fill="#A0A0A0" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="11">${game.subtitle}</text>

  <!-- Border Accent -->
  <rect x="0" y="0" width="400" height="300" fill="none" stroke="#2B2B2B" stroke-width="2" rx="1" />
</svg>`;
}

// Generate all game SVGs
games.forEach(g => {
  const filePath = path.join(gamesDir, g.file);
  fs.writeFileSync(filePath, generateGameSvg(g), "utf8");
  console.log("Wrote " + g.file);
});

// Generate 4 Hero Banner SVGs
const banners = [
  {
    file: "banner_vip.svg",
    title: "SUPER VIP CLUB",
    highlight: "₹ 111,111 BONUS",
    desc: "Unlock Tier Privileges • Fast Payout Priority • Custom Frames",
    bg1: "#1F1500",
    bg2: "#3D2B03",
    accent: "#FFD700"
  },
  {
    file: "banner_bonus.svg",
    title: "STARTER BONUS",
    highlight: "₹ 111 FREE DEMO",
    desc: "Instant Member Welcome Bonus • Zero Deposit Needed",
    bg1: "#2B0900",
    bg2: "#4F1200",
    accent: "#FF3D00"
  },
  {
    file: "banner_tasks.svg",
    title: "TASKS & REWARDS",
    highlight: "EARN FREE SPINS",
    desc: "Daily Check-in & Challenges • Fortune Gems 3 & Super Ace",
    bg1: "#061A0C",
    bg2: "#0E381A",
    accent: "#04BE02"
  },
  {
    file: "banner_aviator.svg",
    title: "AVIATOR & CRASH",
    highlight: "UP TO 100X MULTIPLIER",
    desc: "Live Crash Curves • Instant Cashout • Interactive Demo Mode",
    bg1: "#1A0507",
    bg2: "#3D0E13",
    accent: "#E51937"
  }
];

function generateBannerSvg(b) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="100%" height="100%">
  <defs>
    <linearGradient id="bbg-${b.file}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${b.bg2}"/>
      <stop offset="100%" stop-color="${b.bg1}"/>
    </linearGradient>
    <filter id="bglow-${b.file}">
      <feGaussianBlur stdDeviation="30" result="blur"/>
    </filter>
  </defs>

  <rect width="1200" height="480" fill="url(#bbg-${b.file})" />
  <circle cx="950" cy="240" r="220" fill="${b.accent}" opacity="0.18" filter="url(#bglow-${b.file})" />

  <!-- Diagonal dynamic lines -->
  <g opacity="0.12" stroke="#FFFFFF" stroke-width="2">
    <line x1="600" y1="0" x2="900" y2="480" />
    <line x1="750" y1="0" x2="1050" y2="480" />
    <line x1="900" y1="0" x2="1200" y2="480" />
  </g>

  <!-- Left Content Area -->
  <g transform="translate(80, 140)">
    <rect x="0" y="0" width="140" height="32" rx="16" fill="#141414" stroke="${b.accent}" stroke-width="1.5"/>
    <text x="70" y="21" fill="${b.accent}" font-family="system-ui, sans-serif" font-weight="900" font-size="12" text-anchor="middle" letter-spacing="1">IPLWIN OFFICIAL</text>

    <text x="0" y="80" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="900" font-size="44" letter-spacing="1">${b.title}</text>
    <text x="0" y="140" fill="${b.accent}" font-family="system-ui, sans-serif" font-weight="900" font-size="52" letter-spacing="0">${b.highlight}</text>
    <text x="0" y="180" fill="#D0D0D0" font-family="system-ui, sans-serif" font-weight="500" font-size="18">${b.desc}</text>
  </g>

  <!-- Right Visual 3D Ring/Badge -->
  <g transform="translate(950, 240)">
    <circle cx="0" cy="0" r="130" fill="none" stroke="${b.accent}" stroke-width="3" stroke-dasharray="8,6" opacity="0.6"/>
    <circle cx="0" cy="0" r="100" fill="#141414" stroke="#333333" stroke-width="3"/>
    <text x="0" y="10" fill="${b.accent}" font-family="system-ui, sans-serif" font-weight="900" font-size="36" text-anchor="middle">IPLwin</text>
    <text x="0" y="40" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="700" font-size="14" text-anchor="middle">LIVE PLATFORM</text>
  </g>
</svg>`;
}

banners.forEach(b => {
  const filePath = path.join(bannersDir, b.file);
  fs.writeFileSync(filePath, generateBannerSvg(b), "utf8");
  console.log("Wrote " + b.file);
});
