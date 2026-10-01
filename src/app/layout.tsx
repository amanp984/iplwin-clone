import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IPLwin : Cricket Online Betting Website",
  description:
    "IPLwin - The world's favourite online sports betting company. Watch Live Sport and enjoy The most comprehensive In-Play service. IPLwin Bring you the safest and fastest gaming environment.",
  keywords: "Sport, ICC, IPL, Match, Aviator, Rummy, T20, Cricket, Game",
  authors: [{ name: "IPLwin" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "IPLwin : Cricket Online Betting Website",
    description:
      "IPLwin - The world's favourite online sports betting company. Watch Live Sport and enjoy The most comprehensive In-Play service.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white selection:bg-[#D1AE52] selection:text-black">
        {children}
      </body>
    </html>
  );
}
