"use client";

import React, { useState } from "react";
import { Game } from "@/types/site";
import { GAMES } from "./data";

interface GameGridProps {
  activeCategory: string;
  activeProvider: string;
  searchQuery: string;
  onLaunchGame: (game: Game, mode: "real" | "demo") => void;
  onResetFilters?: () => void;
}

export function GameGrid({
  activeCategory,
  activeProvider,
  searchQuery,
  onLaunchGame,
  onResetFilters,
}: GameGridProps) {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);

  // Filter games based on category, provider, search
  const filteredGames = GAMES.filter((game) => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        game.name.toLowerCase().includes(q) ||
        game.provider.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (activeCategory !== "hot" && activeCategory !== "demo") {
      if (game.category !== activeCategory) return false;
    }

    // Provider filter
    if (activeProvider !== "All") {
      if (game.provider.toLowerCase() !== activeProvider.toLowerCase()) return false;
    }

    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-wide">
            {activeCategory === "hot"
              ? "🔥 Popular & Featured Games"
              : activeCategory.toUpperCase() + " Games"}
          </h2>
          <span className="text-xs text-[#888888] font-semibold">
            ({filteredGames.length} Available)
          </span>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="w-full py-16 text-center bg-[#141414] rounded-2xl border border-[#2D2D2D] p-6 shadow-inner">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="text-base font-bold text-white mb-1">No Games Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-5">
            We couldn&apos;t find any games matching &quot;{searchQuery || activeCategory}&quot;. Try adjusting your search query or provider filter.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-xs uppercase rounded-xl shadow-lg hover:brightness-105 active:scale-95 transition-all"
            >
              Reset All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredGames.map((game) => {
            const isHovered = hoveredId === game.id;
            return (
              <div
                key={game.id}
                onMouseEnter={() => setHoveredId(game.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#2A2A2A] hover:border-[#D1AE52]/80 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#D1AE52]/10"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.thumbnail}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient bottom shadow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  {/* Ribbon Tag */}
                  {game.tag && (
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow ${
                          game.tag === "HOT"
                            ? "bg-[#EA4E3D] text-white"
                            : game.tag === "NEW"
                            ? "bg-[#04BE02] text-white"
                            : "bg-[#FFAA09] text-black"
                        }`}
                      >
                        {game.tag}
                      </span>
                    </div>
                  )}

                  {/* Provider Pill */}
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 backdrop-blur-sm text-[#D1AE52] border border-[#D1AE52]/30">
                      {game.provider}
                    </span>
                  </div>

                  {/* Hover Action Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 p-2 transition-opacity duration-200 ${
                      isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <button
                      onClick={() => onLaunchGame(game, "real")}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#C39949] text-black font-extrabold text-xs shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>▶</span>
                      <span>Play Now</span>
                    </button>
                    <button
                      onClick={() => onLaunchGame(game, "demo")}
                      className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] border border-white/20 transition-colors"
                    >
                      Demo Play
                    </button>
                  </div>
                </div>

                {/* Card Footer Content */}
                <div className="p-2.5 flex flex-col justify-between flex-1">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-[#D1AE52] transition-colors">
                    {game.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-[#888888]">
                    <span>{game.provider}</span>
                    {game.playCount && (
                      <span className="text-[#04BE02] font-semibold">{game.playCount} plays</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
