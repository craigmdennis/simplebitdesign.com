import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Bit Design - Product Design for B2B SaaS Startups",
  description:
    "Transform your startup idea into a fundable product. Expert product design from prototype to first 1000 users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
