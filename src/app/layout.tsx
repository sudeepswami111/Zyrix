import type { Metadata } from "next";
import {
  Inter,
  Fraunces,
  JetBrains_Mono,
  Bricolage_Grotesque,
  Instrument_Sans,
} from "next/font/google";
import "./globals.css";
import { MarketingShell } from "@/components/MarketingShell";

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

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
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
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${bricolageGrotesque.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF6EF] text-[#2B2521] selection:bg-[#F1E2CF] selection:text-[#C1502E]">
        <MarketingShell>{children}</MarketingShell>
      </body>
    </html>
  );
}
