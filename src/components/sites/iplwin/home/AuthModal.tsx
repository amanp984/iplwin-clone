"use client";

import React, { useState } from "react";
import { BrandLogo, CloseIcon } from "../shared/icons";

interface AuthModalProps {
  isOpen: boolean;
  initialMode: "login" | "register";
  onClose: () => void;
  onSuccess: (phone?: string, mode?: "login" | "register") => void;
}

export function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(phone, mode);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none">
      <div className="relative w-full max-w-md bg-[#161616] border border-[#333333] rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Auth Modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <CloseIcon className="w-5 h-5 text-gray-400" />
        </button>

        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <BrandLogo />
        </div>

        {/* Tabs: Login vs Register */}
        <div className="flex bg-[#0E0E0E] p-1 rounded-xl border border-[#2D2D2D] mb-5">
          <button
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              mode === "login"
                ? "bg-[#252525] text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Account Login
          </button>
          <button
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all relative ${
              mode === "register"
                ? "bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>Fast Register</span>
            <span className="absolute -top-2 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[#EA4E3D] text-white">
              +₹111
            </span>
          </button>
        </div>

        {/* Promo tag */}
        {mode === "register" && (
          <div className="p-2.5 rounded-lg bg-[#291F09] border border-[#D1AE52]/40 text-[#E9CA78] text-xs font-semibold text-center mb-4">
            🎁 Register now & receive instant ₹ 111 Free Bonus!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Input */}
          <div>
            <label className="block text-xs text-gray-300 font-semibold mb-1">
              Mobile Number
            </label>
            <div className="flex items-center rounded-xl bg-[#0E0E0E] border border-[#333333] focus-within:border-[#D1AE52] overflow-hidden">
              <span className="px-3 py-2.5 bg-[#1F1F1F] text-xs font-bold text-[#D1AE52] border-r border-[#333333]">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Enter 10-digit number"
                className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs text-gray-300 font-semibold mb-1">
              Password
            </label>
            <div className="rounded-xl bg-[#0E0E0E] border border-[#333333] focus-within:border-[#D1AE52] overflow-hidden">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-[#EA4E3D] font-semibold text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-sm shadow-lg shadow-[#D1AE52]/20 hover:brightness-105 active:scale-98 transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : mode === "login" ? "Login To Play" : "Register & Get ₹111"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-gray-400">
          {mode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-[#D1AE52] font-bold hover:underline"
              >
                Register Free
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-[#D1AE52] font-bold hover:underline"
              >
                Log In Here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
