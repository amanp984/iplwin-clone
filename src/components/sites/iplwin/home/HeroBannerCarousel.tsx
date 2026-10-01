"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BANNERS } from "./data";
import { ChevronLeftIcon, ChevronRightIcon } from "../shared/icons";

interface HeroBannerCarouselProps {
  onBannerAction: (slideId: number) => void;
}

export function HeroBannerCarousel({ onBannerAction }: HeroBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 pt-4 pb-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#333333] shadow-2xl bg-[#141414] aspect-[16/7] sm:aspect-[21/8] min-h-[220px]">
        {BANNERS.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background gradient & decorative styling */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} opacity-90`}
              />

              {/* Background artwork */}
              {banner.imageUrl && (
                <div
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
                  style={{ backgroundImage: `url(${banner.imageUrl})` }}
                />
              )}

              {/* Radial lighting accents */}
              <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-[#D1AE52]/20 via-transparent to-transparent pointer-events-none" />

              {/* Content Overlay */}
              <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#0A0A0A]/80 border border-[#D1AE52]/40 text-[#E9CA78] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#04BE02]" />
                  {banner.badge}
                </div>

                {/* Main Heading */}
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-md">
                  <span className="gold-gradient-text">{banner.title.split(" ")[0]}</span>{" "}
                  {banner.title.split(" ").slice(1).join(" ")}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#D5D5D5] max-w-lg mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
                  {banner.subtitle}
                </p>

                {/* CTA Button */}
                <div>
                  <button
                    onClick={() => onBannerAction(banner.id)}
                    className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#E9CA78] via-[#D1AE52] to-[#B88C35] hover:from-[#F5DC96] hover:to-[#CBA048] text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-[#D1AE52]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {banner.ctaText} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 text-white"
        >
          <ChevronLeftIcon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 text-white"
        >
          <ChevronRightIcon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 bg-[#D1AE52] shadow-sm shadow-[#D1AE52]"
                  : "w-2 bg-[#666666]/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
