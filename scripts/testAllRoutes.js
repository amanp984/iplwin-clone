/* eslint-disable @typescript-eslint/no-require-imports */
const http = require("http");

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on("error", reject);
  });
}

async function testAll() {
  console.log("=== COMPREHENSIVE PLATFORM QA TEST SUITE ===");

  const routes = [
    { path: "/", expected: 200, name: "Home Lobby" },
    { path: "/games", expected: 200, name: "Games Catalog" },
    { path: "/rewards", expected: 200, name: "Rewards & Tasks Hub" },
    { path: "/promotions", expected: 200, name: "Promotions & Bonus" },
    { path: "/vip", expected: 200, name: "VIP Club Showcase" },
    { path: "/support", expected: 200, name: "24/7 Support & FAQ" },
    { path: "/wallet", expected: 200, name: "Demo Wallet & Payout" },
    { path: "/profile", expected: 200, name: "Player Profile Hub" },
    { path: "/invalid-demo-route-test-404", expected: 404, name: "404 Not Found Handling" },
  ];

  let failedRoutes = 0;
  for (const r of routes) {
    try {
      const res = await get(`http://localhost:3000${r.path}`);
      const pass = res.status === r.expected;
      console.log(`[${pass ? "PASS" : "FAIL"}] Route: ${r.path} (${r.name}) -> Status ${res.status} (Expected ${r.expected})`);
      if (!pass) failedRoutes++;
    } catch (err) {
      console.error(`[FAIL] Route: ${r.path} - Error:`, err.message);
      failedRoutes++;
    }
  }

  console.log("\n=== TESTING LOCAL SVG GAME ARTWORK & BANNERS ===");
  const assets = [
    "/images/games/game_placeholder.svg",
    "/images/games/aviator.svg",
    "/images/games/fortune_gems_3.svg",
    "/images/games/super_ace.svg",
    "/images/games/money_coming.svg",
    "/images/games/rummy.svg",
    "/images/games/7up_7down.svg",
    "/images/games/pappu.svg",
    "/images/games/andar_bahar.svg",
    "/images/games/chicken_road.svg",
    "/images/games/chicken_road_2.svg",
    "/images/games/crash.svg",
    "/images/games/mines.svg",
    "/images/games/plinko.svg",
    "/images/games/ocean_king.svg",
    "/images/games/mega_fishing.svg",
    "/images/games/live_roulette.svg",
    "/images/games/sexy_baccarat.svg",
    "/images/games/9wickets_cricket.svg",
    "/images/games/saba_sports.svg",
    "/images/games/sv388_cockfight.svg",
    "/images/games/db_esports.svg",
    "/images/games/tcg_lottery.svg",
    "/images/games/wild_bounty.svg",
    "/images/games/dragon_tiger.svg",
    // Expanded 12 games
    "/images/games/golden_empire.svg",
    "/images/games/boxing_king.svg",
    "/images/games/gates_of_olympus.svg",
    "/images/games/sweet_bonanza.svg",
    "/images/games/crazy_time.svg",
    "/images/games/lightning_roulette.svg",
    "/images/games/teen_patti_live.svg",
    "/images/games/callbreak.svg",
    "/images/games/happy_fishing.svg",
    "/images/games/bti_sports.svg",
    "/images/games/hilo.svg",
    "/images/games/wingo.svg",
    // 4 Banners
    "/images/banners/banner_vip.svg",
    "/images/banners/banner_bonus.svg",
    "/images/banners/banner_tasks.svg",
    "/images/banners/banner_aviator.svg",
  ];

  let failedAssets = 0;
  for (const asset of assets) {
    try {
      const res = await get(`http://localhost:3000${asset}`);
      const pass = res.status === 200 && res.headers["content-type"].includes("image/svg+xml");
      if (!pass) {
        console.log(`[FAIL] Asset: ${asset} -> Status ${res.status}`);
        failedAssets++;
      }
    } catch (err) {
      console.error(`[FAIL] Asset: ${asset} - Error:`, err.message);
      failedAssets++;
    }
  }

  if (failedAssets === 0) {
    console.log(`[PASS] All ${assets.length} project-owned SVG artwork assets verified OK (Status 200, Content-Type: image/svg+xml)`);
  } else {
    console.log(`[FAIL] ${failedAssets} assets failed!`);
  }

  console.log("\n=== QA SUMMARY ===");
  console.log(`Routes Tested: ${routes.length}, Failed: ${failedRoutes}`);
  console.log(`Assets Tested: ${assets.length}, Failed: ${failedAssets}`);

  if (failedRoutes === 0 && failedAssets === 0) {
    console.log(">>> ALL CHECKS PASSED SUCCESSFULLY! <<<");
  } else {
    process.exit(1);
  }
}

testAll().catch((err) => {
  console.error("Test runner failed:", err);
  process.exit(1);
});
