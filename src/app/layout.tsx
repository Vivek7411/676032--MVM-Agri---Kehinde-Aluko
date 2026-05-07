import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriMarket Nigeria — Bulk Agricultural Marketplace",
  description: "Nigeria's leading bulk agricultural marketplace. Buy directly from farmers and aggregators with weight-based quantities and secure delivery.",
  keywords: ["AgriMarket", "Nigeria", "agriculture", "marketplace", "bulk", "farmers"],
  authors: [{ name: "AgriMarket Nigeria" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F6F3] text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
