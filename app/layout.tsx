import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuan-Cheng Lung - Portfolio",
  description: "Software Engineer specializing in blockchain technology, full-stack development, and system optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-white text-black font-sans">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Navigation />
            <main>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
