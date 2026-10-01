"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "../shared/icons";

export function SiteFooter() {
  const paymentMethods = [
    { name: "UPI", color: "#0078FF" },
    { name: "PhonePe", color: "#5F259F" },
    { name: "Paytm", color: "#00BAF2" },
    { name: "IMPS", color: "#D1AE52" },
    { name: "USDT TRC20", color: "#26A17B" },
    { name: "NetBanking", color: "#E05020" },
  ];

  const providers = [
    "Evolution Gaming",
    "Spribe Aviator",
    "PG Soft",
    "JILI Games",
    "Ezugi Live",
    "Pragmatic Play",
    "SABA Sports",
    "9Wickets Exchange",
    "WG Casino",
    "KingMidas",
  ];

  return (
    <footer className="w-full bg-[#0D0D0D] border-t border-[#262626] pt-10 pb-20 md:pb-12 text-[#888888] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#222222]">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-2">
            <BrandLogo />
            <p className="text-xs text-[#999999] leading-relaxed max-w-md pt-2">
              IPLwin is a premier demo cricket sports exchange and entertainment gaming showcase platform. Offering simulated in-play cricket odds, live casino showcases, Aviator mini games, and interactive demo wallet management.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1F1F1F] border border-[#333333] text-sm text-[#D1AE52] font-black">
                18+
              </span>
              <span className="text-[11px] text-[#A0A0A0]">
                Strictly 18+. Responsible Entertainment. Designed solely for demonstration and gaming simulation purposes.
              </span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Platform Links
            </h4>
            <ul className="space-y-1.5 text-xs text-[#A0A0A0]">
              <li><Link href="/games" className="hover:text-[#D1AE52] transition-colors">Game Catalog</Link></li>
              <li><Link href="/vip" className="hover:text-[#D1AE52] transition-colors">VIP Privileges</Link></li>
              <li><Link href="/promotions" className="hover:text-[#D1AE52] transition-colors">Promotions & Bonus</Link></li>
              <li><Link href="/rewards" className="hover:text-[#D1AE52] transition-colors">Tasks & Rewards</Link></li>
              <li><Link href="/support" className="hover:text-[#D1AE52] transition-colors">24/7 Help Desk & FAQ</Link></li>
            </ul>
          </div>

          {/* Col 3: Fair Play & Security */}
          <div className="space-y-2">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Fair Play & Security
            </h4>
            <div className="space-y-2 text-[11px] text-[#999999]">
              <div className="p-2.5 rounded-lg bg-[#141414] border border-[#2A2A2A]">
                <span className="font-bold text-white block mb-0.5">Fair RNG Simulation</span>
                <span>All platform game outcomes run on unbiased random number algorithms for realistic demo results.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141414] border border-[#2A2A2A]">
                <span className="font-bold text-white block mb-0.5">TLS 256-Bit Encryption</span>
                <span>All player sessions and demo transaction logs are encrypted using enterprise web security.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Payment Badges */}
        <div className="py-6 border-b border-[#222222]">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 text-center sm:text-left">
            Simulated Fast Payment Gateways
          </h5>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {paymentMethods.map((pm, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#2B2B2B] text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pm.color }} />
                {pm.name}
              </span>
            ))}
          </div>
        </div>

        {/* Game Software Providers */}
        <div className="py-6 border-b border-[#222222]">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 text-center sm:text-left">
            Supported Game Engine Showcase
          </h5>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {providers.map((prov, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-[#181818] border border-[#262626] text-[11px] text-[#A0A0A0]"
              >
                {prov}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#666666]">
          <p>© 2026 IPLwin. All Rights Reserved. Demo Entertainment & Gaming Experience.</p>
          <p>UTC +05:30 (Indian Standard Time)</p>
        </div>
      </div>
    </footer>
  );
}
