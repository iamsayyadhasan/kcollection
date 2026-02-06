"use client";

import { usePathname } from "next/navigation";
import { Playfair_Display, Jost, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const sansFont = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${serifFont.variable} ${sansFont.variable} ${geistMono.variable} antialiased`}
      >
        {!isAdminRoute && <Navbar />}

        {children}

        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
