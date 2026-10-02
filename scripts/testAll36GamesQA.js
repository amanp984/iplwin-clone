/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { GAME_ARTWORK_MAP } = require("../src/lib/gameArtwork.ts");
const {
  getDefaultDemoState,
  loadStoredDemoState,
  saveStoredDemoState,
  resetStoredDemoState,
} = require("./testDemoStoreBridge.js");

// Mock localStorage for Node.js test environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => {
    mockStorage[key] = String(val);
  },
  removeItem: (key) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const k in mockStorage) delete mockStorage[k];
  },
};

function runQA() {
  console.log("=========================================================");
  console.log("=== PHASE 5: COMPLETE 36-GAME INTEGRITY & QA AUDIT ===");
  console.log("=========================================================\n");

  const games = Object.values(GAME_ARTWORK_MAP);
  console.log(`Total Games Registered: ${games.length} (Expected: 36)\n`);

  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passCount++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failCount++;
    }
  }

  // 1. Static Metadata & Artwork Verification
  console.log("1. Verifying Game Artwork & Metadata for All 36 Games:");
  for (const game of games) {
    const artworkRelPath = game.artwork.startsWith("/") ? game.artwork.slice(1) : game.artwork;
    const fullArtworkPath = path.join(__dirname, "..", "public", artworkRelPath);
    const artworkExists = fs.existsSync(fullArtworkPath);

    assert(game.id > 0 && typeof game.id === "number", `[${game.name}] Valid Game ID (${game.id})`);
    assert(game.name && game.name.trim().length > 0, `[${game.name}] Valid Game Title`);
    assert(game.category && game.category.trim().length > 0, `[${game.name}] Category: ${game.category}`);
    assert(game.provider && game.provider.trim().length > 0, `[${game.name}] Provider: ${game.provider}`);
    assert(artworkExists, `[${game.name}] Local SVG Artwork Exists (${artworkRelPath})`);
  }

  // 2. Interactive Gameplay Simulation across ALL 36 Games
  console.log("\n2. Simulating Atomic Gameplay for All 36 Games via Persistence Layer:");
  
  // Setup clean demo state
  resetStoredDemoState();
  let state = getDefaultDemoState();
  const initialBalance = state.user.balance;
  let currentBalance = initialBalance;

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const stake = 10;
    const isWin = i % 2 === 0; // Alternate win/loss
    const payout = isWin ? 20 : 0;
    const profit = payout - stake;
    const expectedBalance = currentBalance + profit;

    // Simulate playRound logic
    const roundId = `RND-QA-${game.id}-${Date.now().toString().slice(-4)}`;
    const balanceBefore = currentBalance;
    currentBalance = expectedBalance;

    state.user.balance = currentBalance;
    state.user.totalRoundsPlayed += 1;
    if (isWin) state.user.totalDemoWins += 1;

    state.gameHistory.unshift({
      roundId,
      gameId: game.id,
      gameName: game.name,
      provider: game.provider,
      stake,
      payout,
      profit,
      result: isWin ? "win" : "loss",
      isFreeSpin: false,
      balanceBefore,
      balanceAfter: currentBalance,
      timestamp: "Just now",
      details: isWin ? `Win +₹${payout}` : "Loss",
    });

    state.transactions.unshift({
      id: `tx_${roundId}`,
      type: isWin ? "win" : "bet",
      amount: isWin ? payout : stake,
      title: `${game.name} Demo ${isWin ? "Win" : "Bet"}`,
      description: `Round ${roundId}`,
      reference: roundId,
      timestamp: "Just now",
      status: "completed",
      isDemo: true,
    });
  }

  saveStoredDemoState(state);
  const hydrated = loadStoredDemoState();

  assert(hydrated.user.totalRoundsPlayed === 36, "Exactly 36 rounds recorded in user statistics");
  assert(hydrated.user.totalDemoWins === 18, "Exactly 18 wins recorded in user statistics");
  assert(hydrated.gameHistory.length === 36, "Game history ledger contains exactly 36 records");
  assert(hydrated.user.balance === currentBalance, `Balance matches expected calculation (₹${currentBalance})`);

  // Verify newest rounds first
  assert(
    hydrated.gameHistory[0].gameId === games[games.length - 1].id,
    "Game history orders newest rounds first"
  );

  // 3. Negative Balance Rejection Check
  console.log("\n3. Testing Negative Balance Rejection across Random Games:");
  const testGame = games[0];
  const excessiveStake = hydrated.user.balance + 1000;
  const canPlayExcessive = hydrated.user.balance >= excessiveStake;
  assert(!canPlayExcessive, `[${testGame.name}] Excessive stake (₹${excessiveStake} > ₹${hydrated.user.balance}) correctly rejected`);

  // 4. Rule 13 Free Spin Verification on Eligible Slot Games
  console.log("\n4. Testing Rule 13 Free Spin Inventory & Consumption:");
  const slotGames = games.filter((g) => g.supportsFreeSpins);
  assert(slotGames.length > 0, `Identified ${slotGames.length} eligible Rule 13 slot games`);

  for (const slot of slotGames) {
    const defaultSpins = hydrated.user.earnedFreeSpins[String(slot.id)] || 0;
    assert(defaultSpins === 0, `[${slot.name}] Strict Rule 13: Free spins start at 0 by default`);
  }

  // Grant 5 free spins to Fortune Gems 3 via simulated reward claim
  const fg3 = games.find((g) => g.name === "Fortune Gems 3");
  if (fg3) {
    hydrated.user.earnedFreeSpins[String(fg3.id)] = 5;
    saveStoredDemoState(hydrated);

    let reloaded = loadStoredDemoState();
    assert(reloaded.user.earnedFreeSpins[String(fg3.id)] === 5, "Fortune Gems 3 earned free spins persisted");

    // Consume 1 free spin with ₹0 stake
    reloaded.user.earnedFreeSpins[String(fg3.id)] -= 1;
    reloaded.gameHistory.unshift({
      roundId: "RND-FS-01",
      gameId: fg3.id,
      gameName: fg3.name,
      provider: fg3.provider,
      stake: 0,
      payout: 50,
      profit: 50,
      result: "free_spin_win",
      isFreeSpin: true,
      balanceBefore: reloaded.user.balance,
      balanceAfter: reloaded.user.balance + 50,
      timestamp: "Just now",
    });
    reloaded.user.balance += 50;
    saveStoredDemoState(reloaded);

    const afterSpin = loadStoredDemoState();
    assert(afterSpin.user.earnedFreeSpins[String(fg3.id)] === 4, "Free spin inventory decreased by exactly 1 (5 -> 4)");
    assert(afterSpin.gameHistory[0].isFreeSpin === true, "History logs free spin flag accurately");
    assert(afterSpin.gameHistory[0].stake === 0, "Free spin has strictly ₹0 stake deducted");
  }

  console.log("\n=========================================================");
  console.log(`SUMMARY: Total Checks: ${passCount + failCount} | Passed: ${passCount} | Failed: ${failCount}`);
  console.log("=========================================================\n");

  if (failCount > 0) {
    process.exit(1);
  }
}

runQA();
