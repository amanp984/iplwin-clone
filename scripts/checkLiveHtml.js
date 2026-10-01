/* eslint-disable @typescript-eslint/no-require-imports */
const https = require("https");

https.get("https://iplwin-game.vercel.app/", (res) => {
  let body = "";
  res.on("data", (c) => (body += c));
  res.on("end", () => {
    console.log("Status:", res.statusCode);
    console.log("X-Vercel-Cache:", res.headers["x-vercel-cache"]);
    console.log("Age:", res.headers["age"]);

    // Find title occurrences
    const titleRegex = /"title","0",\{"children":"([^"]+)"\}/;
    const match = body.match(titleRegex);
    if (match) {
      console.log("Metadata Title:", match[1]);
    }

    // Check categories and count
    const hotMatch = body.match(/"Hot"[^}]+count":([0-9]+)/);
    console.log("Hot category raw match:", hotMatch ? hotMatch[0] : "Not found");

    // Check images
    const images = body.match(/\/images\/games\/[a-zA-Z0-9_\.]+\.svg/g) || [];
    console.log("Unique game images in payload:", [...new Set(images)].length);
    console.log("Sample game images:", [...new Set(images)].slice(0, 10));

    // Check unsplash
    const unsplash = body.match(/unsplash/gi) || [];
    console.log("Unsplash count:", unsplash.length);
  });
});
