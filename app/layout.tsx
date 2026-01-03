import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeyboardShortcut from "@/components/KeyboardShortcut";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
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
        className={`${poppins.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <KeyboardShortcut />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
