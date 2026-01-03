import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeyboardShortcut from "@/components/KeyboardShortcut";

const inter = Inter({
  weight: ['300', '400', '900'],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Borsa ve Yatırım Uzmanı | Profesyonel Analiz Platformu",
  description: "20 yıllık tecrübe ile borsa yatırımı, teknik ve temel analiz üzerine uzman görüşler ve stratejiler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} antialiased min-h-screen`}
      >
        <KeyboardShortcut />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
