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

async function main() {
  console.log("--- AUDITING LIVE DEPLOYMENT: https://iplwin-game.vercel.app/ ---");
  const res = await fetchUrl("https://iplwin-game.vercel.app/");
  console.log("Status:", res.statusCode);
  console.log("Vercel Cache:", res.headers["x-vercel-cache"]);
  console.log("Vercel ID:", res.headers["x-vercel-id"]);
  console.log("Age:", res.headers["age"]);

  const body = res.body;

  // Check for unsplash
  const unsplashMatches = body.match(/unsplash/gi) || [];
  console.log("Unsplash occurrences in homepage HTML:", unsplashMatches.length);

  // Check for image URLs
  const imgMatches = body.match(/\/images\/[^"'\s]+/g) || [];
  console.log("Local /images/ references in homepage HTML:", [...new Set(imgMatches)]);

  // Check JS chunks
  const scriptMatches = body.match(/\/(_next\/static\/chunks\/[^"]+\.js)/g) || [];
  console.log("Script chunks found:", scriptMatches);

  for (const scriptPath of scriptMatches) {
    const scriptUrl = `https://iplwin-game.vercel.app${scriptPath}`;
    const sRes = await fetchUrl(scriptUrl);
    const unsplashInScript = sRes.body.match(/unsplash/gi) || [];
    const localSvgInScript = sRes.body.match(/\/images\/(games|banners)\/[a-zA-Z0-9_\.]+\.svg/g) || [];
    console.log(`\nChunk: ${scriptPath} (${sRes.body.length} bytes)`);
    console.log(`  Unsplash matches: ${unsplashInScript.length}`);
    if (unsplashInScript.length > 0) {
      console.log("  WARNING: Unsplash found in chunk! Snippet:");
      const idx = sRes.body.indexOf("unsplash");
      console.log(sRes.body.substring(Math.max(0, idx - 100), Math.min(sRes.body.length, idx + 100)));
    }
    console.log(`  Local SVG matches (${localSvgInScript.length}):`, [...new Set(localSvgInScript)].slice(0, 5));
  }
}

main().catch(console.error);
