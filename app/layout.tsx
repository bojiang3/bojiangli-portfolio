import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Bojiang Li — Platform Engineer",
    template: "%s — Bojiang Li",
  },
  description:
    "Platform Engineer at Amplitude. Building scalable, high-performance applications with Python, Java, Node.js, and Swift.",
  keywords: ["Bojiang Li", "Carmelo Li", "Software Engineer", "Platform Engineer", "Amplitude"],
  metadataBase: new URL("https://bojiangli.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
        <div className="dot-grid fixed inset-0 -z-10" />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
