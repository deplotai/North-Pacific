import type { Metadata } from "next";
import { GFS_Didot } from "next/font/google";
import "./globals.css";

const didot = GFS_Didot({
  subsets: ["latin"],
  variable: "--font-didot",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "NORTH PACIFIC | Premium Streetwear",
  description: "Premium streetwear and apparel by North Pacific. Order direct via WhatsApp.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${didot.variable} h-full antialiased`}
    >
      <head>
        {/* FontAwesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
