"use client";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Inter, Playfair_Display } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import { LenisProvider } from "@/providers/lenis-provider";
import { DashboardNavbar } from "@/components/pages/admin/dashboard/dashboard-navbar";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isHideNavbar = path === "/login";
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <QueryProvider>
            {!isHideNavbar && <DashboardNavbar />}
            {children}
          </QueryProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
