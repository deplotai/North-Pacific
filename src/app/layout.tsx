import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Oswald, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const scriptFont = Mrs_Saint_Delafield({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "North Pacific | Premium Catalogue & Custom Apparel",
  description: "Explore the North Pacific collection. Editorial minimal T-shirts, shirts, and custom clothing crafted with premium care. Direct ordering via WhatsApp.",
  keywords: "North Pacific, clothing, premium t-shirts, shirts, clothing manufacturer, fashion brand, custom orders, catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${oswald.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-bg text-brand-text flex flex-col">{children}</body>
    </html>
  );
}
