import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/site/Navigation";
import { Footer } from "@/components/site/Footer";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://simplebitdesign.com"
  ),
  title: {
    default: "Simple Bit Design · design judgement for AI products",
    template: "%s · Simple Bit Design",
  },
  description:
    "Product design for AI products: the human judgement that makes people understand, trust, and stick with them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
