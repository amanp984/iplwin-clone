import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/sites/iplwin/shared/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-[#141414] border border-[#2D2D2D] rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#D1AE52]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex justify-center mb-6">
          <BrandLogo />
        </div>

        <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#9A7B38] mb-2 font-mono">
          404
        </div>

        <h1 className="text-xl font-extrabold text-white mb-2">
          Page or Game Not Found
        </h1>

        <p className="text-xs text-[#888888] leading-relaxed mb-6">
          The requested route, tournament, or game table is currently unavailable or moved to our live lobby.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-sm shadow-lg shadow-[#D1AE52]/20 hover:brightness-105 active:scale-95 transition-all"
        >
          <span>Return To Lobby</span>
          <span>🏠</span>
        </Link>
      </div>
    </div>
  );
}
