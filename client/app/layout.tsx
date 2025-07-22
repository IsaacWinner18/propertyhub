import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { PropertyProvider } from "../contexts/PropertyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PropertyHub - Find Your Next Home",
  description: "Browse apartments and houses for sale or rent",
  openGraph: {
    images: [
      {
        url: "/environment-precious.jpeg",
        width: 1200,
        height: 630,
        alt: "PropertyHub Preview Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PropertyProvider>
      <body className={inter.className}>{children}</body>
        
       </PropertyProvider>
    </html>
  );
}
