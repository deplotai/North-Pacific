import type { Metadata } from "next";
import { GFS_Didot } from "next/font/google";
import "./globals.css";

const didot = GFS_Didot({
  subsets: ["latin"],
  variable: "--font-didot",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northpacific.sa"),
  title: {
    default: "NORTH PACIFIC | Premium Streetwear & Apparel",
    template: "%s | NORTH PACIFIC",
  },
  description: "Premium streetwear brand combining minimalist design with structured silhouettes. Experience luxury clothing, custom uniforms, and premium fabrics.",
  keywords: ["streetwear", "premium apparel", "luxury clothing", "cuban collar shirts", "custom uniforms", "menswear", "fashion"],
  authors: [{ name: "North Pacific" }],
  creator: "North Pacific",
  publisher: "North Pacific",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "NORTH PACIFIC | Premium Streetwear & Apparel",
    description: "Premium streetwear brand combining minimalist design with structured silhouettes. Experience luxury clothing without boundaries.",
    url: "https://northpacific.sa",
    siteName: "NORTH PACIFIC",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "North Pacific Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NORTH PACIFIC | Premium Streetwear",
    description: "Premium streetwear brand combining minimalist design with structured silhouettes.",
    images: ["/logo.webp"],
    creator: "@northpacific",
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { CartProvider } from "@/context/CartContext";
import CookieBanner from "@/components/CookieBanner";
import SupportWidget from "@/components/SupportWidget";

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
        <link rel="preload" href="/logo.webp" as="image" />
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
          <SupportWidget />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
