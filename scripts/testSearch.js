/* eslint-disable @typescript-eslint/no-require-imports */
const { GAMES } = require("../src/components/sites/iplwin/home/data.ts");

function searchGames(query, category = "hot", provider = "All") {
  return GAMES.filter((game) => {
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const matchesSearch =
        game.name.toLowerCase().includes(q) ||
        game.provider.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    if (category === "hot") {
      if (provider === "All" && !query.trim()) {
        if (!game.tag || (game.tag !== "HOT" && game.tag !== "JACKPOT")) return false;
      }
    } else if (category === "demo") {
      // All demo games
    } else {
      if (game.category !== category) return false;
    }

    if (provider !== "All") {
      if (game.provider.toLowerCase() !== provider.toLowerCase()) return false;
    }

    return true;
  });
}

const testCases = [
  { name: "Exact game name: Aviator", query: "Aviator", minExpected: 1 },
  { name: "Lowercase: super ace", query: "super ace", minExpected: 1 },
  { name: "Uppercase: FORTUNE GEMS", query: "FORTUNE GEMS", minExpected: 1 },
  { name: "Partial name: chick", query: "chick", minExpected: 2 },
  { name: "Provider search: Spribe", query: "Spribe", minExpected: 3 },
  { name: "Provider search: JILI", query: "JILI", minExpected: 8 },
  { name: "Provider search: Evolution", query: "Evolution", minExpected: 3 },
  { name: "Category keyword: slot", query: "slot", minExpected: 8 },
  { name: "Category keyword: live", query: "live", minExpected: 5 },
  { name: "No results query: xyzabc123nonexistent", query: "xyzabc123nonexistent", minExpected: 0, maxExpected: 0 },
  { name: "Clear search (empty string)", query: "", minExpected: 20 },
];

let failed = 0;
console.log("=== RUNNING SEARCH VERIFICATION TESTS ===");
for (const tc of testCases) {
  const results = searchGames(tc.query);
  const passMin = results.length >= tc.minExpected;
  const passMax = tc.maxExpected !== undefined ? results.length <= tc.maxExpected : true;
  const pass = passMin && passMax;
  console.log(`[${pass ? "PASS" : "FAIL"}] ${tc.name} -> Found ${results.length} games`);
  if (!pass) failed++;
}

if (failed === 0) {
  console.log(">>> ALL SEARCH TEST CASES PASSED! <<<");
} else {
  console.error(`>>> ${failed} SEARCH TESTS FAILED! <<<`);
  process.exit(1);
}
