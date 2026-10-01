"use client";

import React from "react";

export function AppDownloadBanner() {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171717] via-[#201A0D] to-[#171717] border border-[#333333] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        {/* Left side description */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1AE52]/20 border border-[#D1AE52]/40 text-[#D1AE52] text-xs font-bold uppercase tracking-wider mb-3">
            <span>⚡ Native Fast App</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            Download IPLwin Official Mobile App
          </h3>
          <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-lg mb-6 leading-relaxed">
            Experience ultra-smooth betting, live cricket match streaming in HD, instant deposits via UPI & 3-minute guaranteed withdrawals directly from your pocket.
          </p>

          {/* Download buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => alert("Android PWA: Open in Chrome/Brave, tap the three dots (⋮) in the top-right corner, and tap 'Add to Home screen' or 'Install App' for instant one-tap launch!")}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#444444] hover:border-[#D1AE52] transition-colors text-left group active:scale-95"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🤖</span>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Web App for</span>
                <span className="block text-xs font-bold text-white group-hover:text-[#D1AE52] transition-colors">Android PWA</span>
              </div>
            </button>

            <button
              onClick={() => alert("iOS Safari: Tap the Share button at the bottom of Safari, scroll down, and select 'Add to Home Screen' to enjoy full-screen app experience!")}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#444444] hover:border-[#D1AE52] transition-colors text-left group active:scale-95"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🍏</span>
              <div>
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Add to Home for</span>
                <span className="block text-xs font-bold text-white group-hover:text-[#D1AE52] transition-colors">Apple iOS</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right side QR code & App badge */}
        <div className="flex flex-col items-center justify-center bg-[#0E0E0E] p-4 rounded-xl border border-[#2D2D2D] shadow-inner shrink-0">
          <div className="w-28 h-28 bg-white rounded-lg p-2 flex items-center justify-center shadow">
            {/* SVG QR Code pattern */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
              <rect width="25" height="25" />
              <rect x="75" width="25" height="25" />
              <rect y="75" width="25" height="25" />
              <rect x="6" y="6" width="13" height="13" fill="white" />
              <rect x="81" y="6" width="13" height="13" fill="white" />
              <rect x="6" y="81" width="13" height="13" fill="white" />
              <rect x="9" y="9" width="7" height="7" />
              <rect x="84" y="9" width="7" height="7" />
              <rect x="9" y="84" width="7" height="7" />
              <rect x="35" y="10" width="8" height="8" />
              <rect x="50" y="15" width="12" height="8" />
              <rect x="35" y="35" width="30" height="30" />
              <rect x="15" y="45" width="10" height="15" />
              <rect x="75" y="45" width="15" height="10" />
              <rect x="40" y="75" width="15" height="15" />
              <rect x="65" y="70" width="20" height="10" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-[#D1AE52] mt-2">Scan to Install</span>
          <span className="text-[9px] text-[#777777]">Version v6.9.18</span>
        </div>
      </div>
    </div>
  );
}
