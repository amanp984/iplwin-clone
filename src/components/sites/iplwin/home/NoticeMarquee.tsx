"use client";

import React, { useState } from "react";
import { SpeakerIcon } from "../shared/icons";
import { NOTICES } from "./data";

export function NoticeMarquee() {
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);

  const activeNotice = selectedNotice ? NOTICES.find((n) => n.id === selectedNotice) : null;

  return (
    <div className="w-full bg-[#121212] border-b border-[#252525] py-2 px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Loudspeaker Tag */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#201B11] border border-[#D1AE52]/30 text-[#D1AE52] text-xs font-semibold shrink-0">
          <SpeakerIcon className="w-3.5 h-3.5 text-[#D1AE52] animate-bounce" />
          <span className="uppercase text-[11px] tracking-wider hidden sm:inline">Notice</span>
        </div>

        {/* Marquee Ticker */}
        <div className="flex-1 overflow-hidden relative cursor-pointer" onClick={() => setSelectedNotice(1)}>
          <div className="animate-marquee whitespace-nowrap text-xs text-[#CCCCCC] font-normal flex items-center gap-12">
            {NOTICES.map((notice) => (
              <span key={notice.id} className="inline-flex items-center gap-2 hover:text-[#D1AE52] transition-colors">
                <span className="text-[#D1AE52] font-semibold">[{notice.title}]</span>
                <span>{notice.content}</span>
              </span>
            ))}
            {/* Duplicated for seamless infinite ticker */}
            {NOTICES.map((notice) => (
              <span key={`dup-${notice.id}`} className="inline-flex items-center gap-2 hover:text-[#D1AE52] transition-colors">
                <span className="text-[#D1AE52] font-semibold">[{notice.title}]</span>
                <span>{notice.content}</span>
              </span>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => setSelectedNotice(1)}
          className="text-[11px] text-[#D1AE52] hover:text-[#E9CA78] font-medium underline shrink-0 hidden sm:inline"
        >
          Details
        </button>
      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#333333]">
              <div className="flex items-center gap-2 text-[#D1AE52]">
                <SpeakerIcon className="w-5 h-5" />
                <h3 className="font-bold text-base text-white">{activeNotice.title}</h3>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-gray-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>
            <div className="py-4 text-sm text-[#CCCCCC] leading-relaxed">
              {activeNotice.content}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-[#333333] text-xs text-gray-500">
              <span>Date: {activeNotice.date}</span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-1.5 bg-[#D1AE52] text-black font-semibold rounded-md hover:bg-[#E0BE63] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
