"use client";

import React from "react";
import { LANGUAGES } from "./data";
import { CloseIcon } from "../shared/icons";

interface LanguageModalProps {
  isOpen: boolean;
  currentLanguage: string;
  onSelectLanguage: (code: string) => void;
  onClose: () => void;
}

export function LanguageModal({
  isOpen,
  currentLanguage,
  onSelectLanguage,
  onClose,
}: LanguageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-md bg-[#161616] border border-[#333333] rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#333333] mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>🌐</span>
            <span>Select Language / भाषा चुनें</span>
          </h3>
          <button
            onClick={onClose}
            aria-label="Close Language Modal"
            className="text-gray-400 hover:text-white p-1"
          >
            <CloseIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-[#251D0D] border-[#D1AE52] text-[#D1AE52]"
                    : "bg-[#111111] border-[#2A2A2A] text-gray-300 hover:bg-[#1E1E1E] hover:text-white"
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <div>
                  <span className="block text-xs font-bold leading-tight">{lang.name}</span>
                  <span className="block text-[11px] text-gray-400 leading-tight">
                    {lang.nativeName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
