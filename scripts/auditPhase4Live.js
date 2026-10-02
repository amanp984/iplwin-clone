/* eslint-disable @typescript-eslint/no-require-imports */
const https = require("https");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on("error", reject);
  });
}

async function auditPhase4Live() {
  console.log("=================================================");
  console.log("=== AUDITING LIVE PRODUCTION DEPLOYMENT (PHASE 4) ===");
  console.log("URL: https://iplwin-game.vercel.app/");
  console.log("=================================================\n");

  const routes = [
    { path: "/", name: "Homepage & Lobby", keywords: ["IPLWIN", "Games", "Live", "Slot"] },
    { path: "/games", name: "36-Game Catalogue", keywords: ["Aviator", "Fortune Gems 3", "Super Ace", "Rummy"] },
    { path: "/wallet", name: "Persistent Demo Wallet", keywords: ["Wallet", "Recharge", "Simulated"] },
    { path: "/rewards", name: "Rewards & Rule 13 Tasks", keywords: ["Tasks", "Rewards", "Check-in", "Free Spins"] },
    { path: "/profile", name: "Demo User Profile", keywords: ["Profile", "Demo", "VIP"] },
    { path: "/vip", name: "VIP Progression System", keywords: ["VIP", "Level", "Tier"] },
    { path: "/promotions", name: "Promotions & Starter Bonus", keywords: ["Promotions", "Bonus"] },
    { path: "/support", name: "24/7 Support Desk", keywords: ["Support", "FAQ"] },
    { path: "/non-existent-test-404", name: "404 Not Found Page", expectedStatus: 404, keywords: ["404"] },
  ];

  let passedRoutes = 0;
  for (const r of routes) {
    const fullUrl = `https://iplwin-game.vercel.app${r.path}`;
    try {
      const res = await fetchUrl(fullUrl);
      const expectedStatus = r.expectedStatus || 200;
      const statusOk = res.statusCode === expectedStatus;
      
      const foundKeywords = (r.keywords || []).filter((kw) => res.body.includes(kw));
      const keywordsOk = foundKeywords.length > 0 || expectedStatus === 404;

      if (statusOk && keywordsOk) {
        console.log(`✅ [PASS] ${r.name.padEnd(28)}: Status ${res.statusCode} | Keywords matched: [${foundKeywords.join(", ")}]`);
        passedRoutes++;
      } else {
        console.log(`❌ [FAIL] ${r.name.padEnd(28)}: Status ${res.statusCode} (expected ${expectedStatus}) | Keywords found: ${foundKeywords.length}`);
      }
    } catch (e) {
      console.log(`❌ [ERROR] ${r.name}: ${e.message}`);
    }
  }

  console.log(`\nRoutes Summary: ${passedRoutes} / ${routes.length} verified.`);
}

auditPhase4Live().catch(console.error);
