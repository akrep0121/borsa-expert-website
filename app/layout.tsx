import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeyboardShortcut from "@/components/KeyboardShortcut";

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '900'],
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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;900&display=swap" rel="stylesheet" />
      </head>
      <body className="overflow-x-hidden">
        <KeyboardShortcut />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
