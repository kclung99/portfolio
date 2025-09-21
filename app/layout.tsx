import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Navigation from "./components/Navigation";
import { getAssetPath } from "./lib/utils";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    <html lang="en" className="bg-gray-50">
      <body
        className={`${jetbrainsMono.variable} antialiased bg-gray-50`}
      >
        <div className="min-h-screen bg-gray-50 text-black font-mono">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Navigation />
            <main>
              {children}
            </main>
            <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <div>
                  ⓒ {new Date().getFullYear()} KC Lung
                </div>
                <div className="flex gap-4">
                  <a href="mailto:kclung99@gmail.com" className="text-blue-600 hover:text-blue-700 underline">
                    kclung99@gmail.com
                  </a>
                  <a href="https://github.com/kclung99" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                    github
                  </a>
                  <a href="https://www.linkedin.com/in/kclung99" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                    linkedin
                  </a>
                  <a href={getAssetPath("/kuan-cheng-lung-resume.pdf")} download="Kuan-Cheng-Lung-Resume.pdf" className="text-blue-600 hover:text-blue-700 underline">
                    resume
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
