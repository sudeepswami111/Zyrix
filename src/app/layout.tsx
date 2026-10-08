import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zyrix — Every Concept, Taught the Way It Actually Makes Sense",
  description:
    "An editorial interactive learning platform for machine learning and data science. Live 3D visualizations, interactive simulations, and plain-language intuition.",
  keywords: [
    "Machine Learning",
    "Data Science",
    "3D Visualizations",
    "Gradient Descent",
    "Interactive Learning",
    "Zyrix",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF6EF] text-[#2B2521] selection:bg-[#F1E2CF] selection:text-[#C1502E]">
        {children}
      </body>
    </html>
  );
}
