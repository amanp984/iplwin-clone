import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IPLwin : Premium Cricket & Casino Gaming Platform (Demo)",
  description:
    "IPLwin — Premier demo gaming platform featuring cricket exchange, interactive slots, crash games, live tables, and daily rewards in a simulated entertainment environment.",
  keywords: "IPLwin, Cricket Exchange, Aviator, Slots, Casino, Demo, Gaming, Simulated Games",
  authors: [{ name: "IPLwin Gaming" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "IPLwin : Premium Cricket & Casino Gaming Platform (Demo)",
    description:
      "IPLwin — Premier demo gaming platform featuring cricket exchange, interactive slots, crash games, live tables, and daily rewards in a simulated entertainment environment.",
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
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white selection:bg-[#D1AE52] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
