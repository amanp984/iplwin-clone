import React from "react";

export function BrandLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E9CA78] via-[#D1AE52] to-[#8F6D1F] p-0.5 shadow-md shadow-[#D1AE52]/20">
        <div className="w-full h-full bg-[#111111] rounded-[7px] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D1AE52] fill-current">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight uppercase leading-none">
          <span className="text-white">IPL</span>
          <span className="text-[#D1AE52] ml-0.5">WIN</span>
        </span>
        <span className="text-[9px] text-[#A0A0A0] tracking-widest uppercase font-semibold leading-none mt-0.5">
          Cricket & Casino
        </span>
      </div>
    </div>
  );
}

export function HotIcon({ className = "w-4 h-4 text-[#EA4E3D]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.9 2.5-7.5 5.5-10.5.5-.5 1.3-.2 1.4.5.3 1.8 1.1 3.5 2.1 4.5.2.2.6.1.6-.2.4-2.1 1.6-4.5 3.4-6.3.4-.4 1.1-.1 1.2.4 1.2 5.1 4.8 8.1 4.8 11.6 0 4.97-4.03 9-9 9zm0-15c-1.3 1.6-2.5 3.5-2.8 5.7-.1.7.4 1.3 1.1 1.3h3.4c.7 0 1.2-.6 1.1-1.3-.3-2.2-1.5-4.1-2.8-5.7z"/>
    </svg>
  );
}

export function SportsIcon({ className = "w-4 h-4 text-[#D1AE52]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"/>
      <path d="M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/>
    </svg>
  );
}

export function LiveCasinoIcon({ className = "w-4 h-4 text-[#D1AE52]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 4a2 2 0 1 0 2 2 2 2 0 0 0-2-2z"/>
    </svg>
  );
}

export function MiniGameIcon({ className = "w-4 h-4 text-[#FFAA09]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.13 2.21a1.5 1.5 0 0 0-2.26 0L4.2 9.5a2.5 2.5 0 0 0-.67 1.54L2.8 18.2a1 1 0 0 0 1.15 1.14l7.15-.72a2.5 2.5 0 0 0 1.54-.68l6.63-6.63a1.5 1.5 0 0 0 0-2.12l-6.14-6.98zM9 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
    </svg>
  );
}

export function SlotIcon({ className = "w-4 h-4 text-[#04BE02]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm2 4v8h3V8H6zm5 0v8h3V8h-3zm5 0v8h3V8h-3z"/>
    </svg>
  );
}

export function CardsIcon({ className = "w-4 h-4 text-[#D1AE52]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C9.5 5.5 5 8 5 12c0 3.5 2.5 6 6 6 .5 0 1 1.5 1 3h0c0-1.5.5-3 1-3 3.5 0 6-2.5 6-6 0-4-4.5-6.5-7-10z"/>
    </svg>
  );
}

export function FishingIcon({ className = "w-4 h-4 text-[#368DEC]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12c-3.5 3-7 4-11 2l-4 4 1-5c-2.5-1-4.5-3-5-6 3.5-3 7-4 11-2l4-4-1 5c2.5 1 4.5 3 5 6z"/>
    </svg>
  );
}

export function CockfightIcon({ className = "w-4 h-4 text-[#EA4E3D]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.5 9.5c-.83 0-1.5-.67-1.5-1.5 0-1.1-.9-2-2-2s-2 .9-2 2c0 .83-.67 1.5-1.5 1.5S11 8.83 11 8c0-1.1-.9-2-2-2s-2 .9-2 2c0 .83-.67 1.5-1.5 1.5S4 8.83 4 8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .38.06.74.16 1.08C12.78 8.41 13.56 8 14.5 8c.94 0 1.72.41 2.34 1.08.1-.34.16-.7.16-1.08 0-2.21 1.79-4 4-4s4 1.79 4 4c0 .83-.67 1.5-1.5 1.5zM12 13c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z"/>
    </svg>
  );
}

export function ESportsIcon({ className = "w-4 h-4 text-[#C609FF]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );
}

export function LotteryIcon({ className = "w-4 h-4 text-[#FFAA09]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path fill="#0A0A0A" d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-1 3h2v6h-2V9z"/>
    </svg>
  );
}

export function DemoIcon({ className = "w-4 h-4 text-[#04BE02]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  );
}

export function TrophyIcon({ className = "w-5 h-5 text-[#D1AE52]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.76 2.7 3.11 3.43V19H8v2h8v-2h-2.5v-2.63c1.35-.73 2.48-1.93 3.11-3.43C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
    </svg>
  );
}

export function SpeakerIcon({ className = "w-4 h-4 text-[#D1AE52]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  );
}

export function CrownIcon({ className = "w-4 h-4 text-[#D1AE52]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
    </svg>
  );
}

export function SearchIcon({ className = "w-4 h-4 text-[#999999]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

export function ChevronLeftIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

export function CloseIcon({ className = "w-5 h-5 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
