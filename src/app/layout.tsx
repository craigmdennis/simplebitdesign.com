import "./globals.scss";
import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simple Bit Design",
  description:
    "Transform ideas into products people love with strategic design decisions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${lora.variable}`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
