/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const gamesDir = path.join(__dirname, "../public/images/games");
if (!fs.existsSync(gamesDir)) fs.mkdirSync(gamesDir, { recursive: true });

function createSvg({ title, subtitle, provider, bg1, bg2, accent, glow, icon, isPlaceholder = false }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bg1}" />
      <stop offset="100%" stop-color="${bg2}" />
    </linearGradient>
    <radialGradient id="glow-grad" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="${glow}" stop-opacity="0.6" />
      <stop offset="60%" stop-color="${glow}" stop-opacity="0.1" />
      <stop offset="100%" stop-color="${glow}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E9CA78" />
      <stop offset="50%" stop-color="#D1AE52" />
      <stop offset="100%" stop-color="#9A7B38" />
    </linearGradient>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" />
      <stop offset="100%" stop-color="${glow}" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="400" height="300" fill="url(#bg-grad)" rx="16" />
  
  <!-- Subtle pattern grid -->
  <g opacity="0.1" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="50" x2="400" y2="50" />
    <line x1="0" y1="100" x2="400" y2="100" />
    <line x1="0" y1="150" x2="400" y2="150" />
    <line x1="0" y1="200" x2="400" y2="200" />
    <line x1="0" y1="250" x2="400" y2="250" />
    <line x1="80" y1="0" x2="80" y2="300" />
    <line x1="160" y1="0" x2="160" y2="300" />
    <line x1="240" y1="0" x2="240" y2="300" />
    <line x1="320" y1="0" x2="320" y2="300" />
  </g>

  <!-- Glow orb -->
  <circle cx="200" cy="120" r="140" fill="url(#glow-grad)" />

  <!-- Center Artwork Icon -->
  ${icon}

  <!-- Dark gradient footer bar -->
  <rect x="0" y="210" width="400" height="90" fill="black" opacity="0.85" rx="0" />
  <rect x="0" y="210" width="400" height="2" fill="url(#gold-grad)" />

  <!-- Provider badge (top-left) -->
  <g transform="translate(16, 16)">
    <rect width="80" height="22" rx="6" fill="#0A0A0A" opacity="0.85" stroke="${accent}" stroke-width="1" />
    <text x="40" y="15" fill="#E9CA78" font-family="Arial, sans-serif" font-weight="900" font-size="10" text-anchor="middle" letter-spacing="1">${provider}</text>
  </g>

  <!-- Tag (top-right) -->
  <g transform="translate(310, 16)">
    <rect width="74" height="22" rx="6" fill="${accent}" />
    <text x="37" y="15" fill="#000000" font-family="Arial, sans-serif" font-weight="900" font-size="10" text-anchor="middle" letter-spacing="0.5">${isPlaceholder ? 'GAME' : 'PLAY'}</text>
  </g>

  <!-- Title & Subtitle in footer -->
  <text x="200" y="245" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle" letter-spacing="0.5">${title}</text>
  <text x="200" y="268" fill="#D1AE52" font-family="Arial, sans-serif" font-weight="700" font-size="11" text-anchor="middle" letter-spacing="0.5">${subtitle}</text>
  <text x="200" y="287" fill="#888888" font-family="Arial, sans-serif" font-weight="600" font-size="9" text-anchor="middle">DEMO ENTERTAINMENT MODE</text>
</svg>`;
}

const newGames = [
  {
    file: "game_placeholder.svg",
    title: "IPLWIN DEMO",
    subtitle: "Featured Game Table",
    provider: "IPLWIN",
    bg1: "#141414",
    bg2: "#0A0A0A",
    accent: "#D1AE52",
    glow: "#E9CA78",
    isPlaceholder: true,
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <polygon points="0,-45 42,-15 42,35 0,55 -42,35 -42,-15" fill="#181818" stroke="#D1AE52" stroke-width="3" />
        <circle cx="0" cy="5" r="22" fill="#D1AE52" opacity="0.2" />
        <text x="0" y="13" fill="#D1AE52" font-family="Arial, sans-serif" font-weight="900" font-size="24" text-anchor="middle">👑</text>
      </g>
    `
  },
  {
    file: "golden_empire.svg",
    title: "GOLDEN EMPIRE",
    subtitle: "Incan Treasure Megaways",
    provider: "JILI",
    bg1: "#2B1A00",
    bg2: "#120B00",
    accent: "#FFAA09",
    glow: "#FFD066",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <polygon points="0,-40 38,25 -38,25" fill="#FFAA09" stroke="#FFE082" stroke-width="2" />
        <polygon points="0,-25 24,20 -24,20" fill="#E65100" />
        <circle cx="0" cy="5" r="10" fill="#FFD54F" />
        <text x="0" y="9" fill="#000" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">☀</text>
      </g>
    `
  },
  {
    file: "boxing_king.svg",
    title: "BOXING KING",
    subtitle: "Knockout Multiplier Slots",
    provider: "JILI",
    bg1: "#26060B",
    bg2: "#100204",
    accent: "#E51937",
    glow: "#FF5E74",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <circle cx="-16" cy="0" r="24" fill="#E51937" stroke="#FF8595" stroke-width="2" />
        <circle cx="16" cy="0" r="24" fill="#C2122B" stroke="#FF8595" stroke-width="2" />
        <rect x="-30" y="10" width="60" height="12" rx="4" fill="#FFFFFF" opacity="0.9" />
        <text x="0" y="19" fill="#000" font-family="Arial, sans-serif" font-weight="900" font-size="9" text-anchor="middle">K.O.</text>
      </g>
    `
  },
  {
    file: "gates_of_olympus.svg",
    title: "GATES OF OLYMPUS",
    subtitle: "Zeus Lightning 5000x",
    provider: "PRAGMATIC",
    bg1: "#1A092B",
    bg2: "#0A0312",
    accent: "#00E5FF",
    glow: "#80D8FF",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <polygon points="0,-45 15,-10 5, -10 18,35 -5,0 5,0" fill="#00E5FF" stroke="#FFFFFF" stroke-width="2" />
        <circle cx="0" cy="-5" r="32" fill="none" stroke="#FFD700" stroke-width="2.5" stroke-dasharray="6,4" />
      </g>
    `
  },
  {
    file: "sweet_bonanza.svg",
    title: "SWEET BONANZA",
    subtitle: "Tumble Fruit Explosion",
    provider: "PRAGMATIC",
    bg1: "#2B0B1D",
    bg2: "#12030B",
    accent: "#FF4081",
    glow: "#FF80AB",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <circle cx="-15" cy="-8" r="20" fill="#E91E63" stroke="#FFF" stroke-width="1.5" />
        <circle cx="15" cy="-8" r="20" fill="#9C27B0" stroke="#FFF" stroke-width="1.5" />
        <circle cx="0" cy="18" r="18" fill="#00E676" stroke="#FFF" stroke-width="1.5" />
        <text x="0" y="8" fill="#FFF" font-family="Arial, sans-serif" font-weight="900" font-size="22" text-anchor="middle">🍭</text>
      </g>
    `
  },
  {
    file: "crazy_time.svg",
    title: "CRAZY TIME LIVE",
    subtitle: "Top Wheel Bonus Action",
    provider: "EVOLUTION",
    bg1: "#2B1A05",
    bg2: "#0E0801",
    accent: "#FF3D00",
    glow: "#FF9E80",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <circle cx="0" cy="0" r="38" fill="#222" stroke="#FFD700" stroke-width="3" />
        <circle cx="0" cy="0" r="32" fill="#E65100" stroke="#FFF" stroke-width="1.5" stroke-dasharray="10,6" />
        <circle cx="0" cy="0" r="14" fill="#FFD700" />
        <polygon points="0,-48 -7,-36 7,-36" fill="#00E676" stroke="#FFF" stroke-width="1" />
      </g>
    `
  },
  {
    file: "lightning_roulette.svg",
    title: "LIGHTNING ROULETTE",
    subtitle: "500x Lucky Number Hits",
    provider: "EVOLUTION",
    bg1: "#1A1502",
    bg2: "#080700",
    accent: "#FFD700",
    glow: "#FFE082",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <circle cx="0" cy="0" r="38" fill="#111" stroke="#FFD700" stroke-width="2.5" />
        <polygon points="0,-35 8,-8 2,-8 12,25 -2,0 3,0" fill="#FFD700" stroke="#FFF" stroke-width="1.5" />
      </g>
    `
  },
  {
    file: "teen_patti_live.svg",
    title: "TEEN PATTI LIVE",
    subtitle: "Desi 3-Card Table Deal",
    provider: "EZUGI",
    bg1: "#061A0C",
    bg2: "#020A04",
    accent: "#00E676",
    glow: "#69F0AE",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <rect x="-35" y="-25" width="30" height="45" rx="4" fill="#FFF" stroke="#222" transform="rotate(-15)" />
        <rect x="-15" y="-30" width="30" height="45" rx="4" fill="#FFF" stroke="#222" />
        <rect x="5" y="-25" width="30" height="45" rx="4" fill="#FFF" stroke="#222" transform="rotate(15)" />
        <text x="0" y="2" fill="#E51937" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">♠♥</text>
      </g>
    `
  },
  {
    file: "callbreak.svg",
    title: "CALLBREAK CHAMPION",
    subtitle: "Strategic Spades Trick-Taking",
    provider: "KINGMIDAS",
    bg1: "#0A1326",
    bg2: "#030610",
    accent: "#2979FF",
    glow: "#82B1FF",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <circle cx="0" cy="0" r="34" fill="#1565C0" stroke="#FFF" stroke-width="2" />
        <text x="0" y="12" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="34" text-anchor="middle">♠</text>
      </g>
    `
  },
  {
    file: "happy_fishing.svg",
    title: "HAPPY FISHING",
    subtitle: "Deep Ocean Laser Hunt",
    provider: "JILI",
    bg1: "#021A24",
    bg2: "#010A0F",
    accent: "#00B0FF",
    glow: "#40C4FF",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <ellipse cx="0" cy="0" rx="35" ry="18" fill="#00B0FF" stroke="#E1F5FE" stroke-width="2" />
        <polygon points="30,0 52,-15 52,15" fill="#0091EA" />
        <circle cx="-16" cy="-4" r="3" fill="#000" />
        <circle cx="-17" cy="-5" r="1" fill="#FFF" />
      </g>
    `
  },
  {
    file: "bti_sports.svg",
    title: "BTI SPORTS ARENA",
    subtitle: "Live Soccer & Cricket Odds",
    provider: "BTI",
    bg1: "#071B0B",
    bg2: "#020B04",
    accent: "#00E676",
    glow: "#B9F6CA",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <circle cx="0" cy="0" r="32" fill="#FFF" stroke="#000" stroke-width="2" />
        <polygon points="0,-12 11,-4 7,8 -7,8 -11,-4" fill="#000" />
      </g>
    `
  },
  {
    file: "hilo.svg",
    title: "HILO MASTER",
    subtitle: "High Low Card Predictor",
    provider: "SPRIBE",
    bg1: "#2B1103",
    bg2: "#100500",
    accent: "#FF9100",
    glow: "#FFD180",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <polygon points="0,-35 22,-8 -22,-8" fill="#00E676" stroke="#FFF" stroke-width="1.5" />
        <polygon points="0,35 22,8 -22,8" fill="#E51937" stroke="#FFF" stroke-width="1.5" />
        <circle cx="0" cy="0" r="6" fill="#FFF" />
      </g>
    `
  },
  {
    file: "wingo.svg",
    title: "WIN GO 1 MIN",
    subtitle: "Color Prediction Fast Rounds",
    provider: "TCG LOTTERY",
    bg1: "#1A0924",
    bg2: "#0A030E",
    accent: "#D500F9",
    glow: "#EA80FC",
    icon: `
      <g transform="translate(200, 115)" filter="url(#shadow)">
        <circle cx="-16" cy="0" r="20" fill="#00E676" stroke="#FFF" stroke-width="1.5" />
        <circle cx="16" cy="0" r="20" fill="#E51937" stroke="#FFF" stroke-width="1.5" />
        <circle cx="0" cy="-18" r="16" fill="#9C27B0" stroke="#FFF" stroke-width="1.5" />
      </g>
    `
  }
];

for (const game of newGames) {
  const svgContent = createSvg(game);
  fs.writeFileSync(path.join(gamesDir, game.file), svgContent);
  console.log(`Generated: public/images/games/${game.file}`);
}
console.log("All expanded artwork and placeholder generated successfully!");
