import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Inter, Playfair_Display } from "next/font/google";
import { LenisProvider } from "@/providers/lenis-provider";
import { FloatingWhatsapp } from "@/components/shared/floating-whatsapp";
import { Navbar } from "../layout/navbar";
import { Footer } from "../layout/footer";

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

export const metadata: Metadata = {
  title: "Luxury Stay Hotel",
  description: "Book premium rooms instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Navbar />
          {children}
          <FloatingWhatsapp />
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
