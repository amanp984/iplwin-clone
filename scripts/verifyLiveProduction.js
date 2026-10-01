/* eslint-disable @typescript-eslint/no-require-imports */
const https = require("https");

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode, cache: res.headers["x-vercel-cache"], age: res.headers["age"] });
    }).on("error", (err) => resolve({ url, error: err.message }));
  });
}

async function verifyAllLive() {
  console.log("=== VERIFYING LIVE PRODUCTION ROUTES (https://iplwin-game.vercel.app) ===");
  const routes = [
    { path: "/", expected: 200, name: "Home Lobby" },
    { path: "/games", expected: 200, name: "Games Catalog" },
    { path: "/rewards", expected: 200, name: "Rewards & Tasks Hub" },
    { path: "/promotions", expected: 200, name: "Promotions & Bonus" },
    { path: "/vip", expected: 200, name: "VIP Club Showcase" },
    { path: "/support", expected: 200, name: "24/7 Support & FAQ" },
    { path: "/wallet", expected: 200, name: "Demo Wallet & Payout" },
    { path: "/profile", expected: 200, name: "Player Profile Hub" },
    { path: "/random-invalid-route-404-test", expected: 404, name: "404 Not Found Page" },
  ];

  let passed = 0;
  for (const r of routes) {
    const res = await check(`https://iplwin-game.vercel.app${r.path}`);
    const ok = res.status === r.expected;
    console.log(`[${ok ? "PASS" : "FAIL"}] ${r.path.padEnd(35)} -> Status ${res.status} (Cache: ${res.cache}, Age: ${res.age}s) - ${r.name}`);
    if (ok) passed++;
  }

  console.log(`\nResults: ${passed}/${routes.length} production routes verified successfully!`);
}

verifyAllLive();
