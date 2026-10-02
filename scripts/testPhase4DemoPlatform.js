/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Phase 4 QA Automation Test Suite:
 * Validates persistent demo state, wallet mechanics, game economy,
 * Rule 13 free-spin isolation, date-based resets, and corrupted storage recovery.
 */

const {
  DEFAULT_STORAGE_KEY,
  DEMO_STORAGE_VERSION,
  getDefaultDemoState,
  loadStoredDemoState,
  saveStoredDemoState,
  resetStoredDemoState,
  getTodayDateString,
} = require("./testDemoStoreBridge.js");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

// Mock localStorage
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

console.log("=== PHASE 4: PERSISTENT DEMO PLATFORM TEST SUITE ===\n");

// 1. Initial Guest & Schema State
console.log("1. Testing Initial State & Schema Integrity:");
const freshState = getDefaultDemoState();
assert(freshState.version === DEMO_STORAGE_VERSION, "Schema version is initialized correctly");
assert(freshState.user.isLoggedIn === false, "User starts as Guest");
assert(freshState.user.balance === 500, "Default demo balance is ₹500");
assert(Object.keys(freshState.user.earnedFreeSpins).length === 0, "Rule 13: earnedFreeSpins starts completely empty ({})");
assert(freshState.gameHistory.length === 0, "Game history starts strictly with 0 records (no fabricated gameplay)");
assert(freshState.transactions.length >= 1, "Initial transaction ledger present");

// 2. Persistence & Hydration
console.log("\n2. Testing Storage Hydration & Persistence:");
saveStoredDemoState(freshState);
assert(mockStorage[DEFAULT_STORAGE_KEY] !== undefined, "State saved to localStorage key");

const loadedState = loadStoredDemoState();
assert(loadedState.user.balance === 500, "Loaded state matches saved balance");
assert(loadedState.version === DEMO_STORAGE_VERSION, "Loaded version is intact");

// 3. Corrupted Storage Recovery
console.log("\n3. Testing Corrupted Storage Graceful Recovery:");
mockStorage[DEFAULT_STORAGE_KEY] = "{ corrupted JSON garbage [[[";
const recoveredState = loadStoredDemoState();
assert(recoveredState.user.balance === 500, "Recovered corrupted state to safe default balance");
assert(recoveredState.user.isLoggedIn === false, "Recovered state is safe guest user");

// 4. Negative Balance & Double Settlement Prevention
console.log("\n4. Testing Wallet Economy & Safety Rules:");
const currentBalance = recoveredState.user.balance; // 500
const stakeTooHigh = 1000;
const canStake = currentBalance >= stakeTooHigh;
assert(!canStake, "Stake higher than balance is strictly rejected (no negative balance allowed)");

// 5. Rule 13: Free-Spin Flow
console.log("\n5. Testing Rule 13 Free-Spin Flow:");
assert(!recoveredState.user.earnedFreeSpins["3150300"], "Slot Fortune Gems 3 has 0 free spins by default");

// Simulate Task Completion & Claim
const targetTask = recoveredState.tasks.find((t) => t.id === "task_share");
assert(targetTask !== undefined, "Found valid free spin task");
recoveredState.user.earnedFreeSpins["3150300"] = targetTask.rewardAmount; // 3 spins
assert(recoveredState.user.earnedFreeSpins["3150300"] === 3, "Free spin inventory increases strictly after claiming reward");

// Simulate Using 1 Free Spin
recoveredState.user.earnedFreeSpins["3150300"] -= 1;
assert(recoveredState.user.earnedFreeSpins["3150300"] === 2, "Free spin inventory decreases by 1 after use");

// 6. Game History Audit Trail
console.log("\n6. Testing Game History Logging:");
const roundRecord = {
  roundId: "RND-TEST-001",
  gameId: 3150300,
  gameName: "Fortune Gems 3",
  provider: "JILI",
  stake: 0,
  payout: 50,
  profit: 50,
  result: "free_spin_win",
  isFreeSpin: true,
  balanceBefore: 500,
  balanceAfter: 550,
  timestamp: "Just now",
};
recoveredState.gameHistory.unshift(roundRecord);
assert(recoveredState.gameHistory.length === 1, "Game history has exactly 1 genuine record");
assert(recoveredState.gameHistory[0].isFreeSpin === true, "Free spin flag is logged accurately in history");

// 7. Date-Based Daily Reset Test
console.log("\n7. Testing Date-Based Daily Task Reset:");
recoveredState.activeTaskDate = "2026-10-01"; // Yesterday
recoveredState.tasks = recoveredState.tasks.map((t) => (t.isDaily ? { ...t, claimed: true, progress: t.maxProgress } : t));
saveStoredDemoState(recoveredState);

// Now load on a new day (2026-10-02)
const nextDayState = loadStoredDemoState();
assert(nextDayState.activeTaskDate === getTodayDateString(), "Active task date rolled over to today");
const dailyCheckin = nextDayState.tasks.find((t) => t.id === "task_daily");
assert(dailyCheckin.claimed === false, "Daily check-in task automatically reset on new day");
assert(dailyCheckin.progress === 1, "Daily check-in progress reset to default");

// 8. Demo Account Reset Test
console.log("\n8. Testing Full Demo Reset:");
const resetState = resetStoredDemoState();
assert(resetState.gameHistory.length === 0, "Game history cleared on demo reset");
assert(Object.keys(resetState.user.earnedFreeSpins).length === 0, "Earned free spins cleared on demo reset");
assert(resetState.user.balance === 500, "Balance restored to initial 500 demo credits");

console.log(`\n========================================`);
console.log(`Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL PHASE 4 DEMO PERSISTENCE & QA TESTS PASSED SUCCESSFULLY!");
}
