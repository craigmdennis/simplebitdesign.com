import type { Metadata } from "next";
import { allPages } from "content-collections";
import { SectionRenderer } from "@/components/SectionRenderer";

const homePage = allPages.find((p) => p.slug === "home")!;

export const metadata: Metadata = {
  title: { absolute: homePage.seoTitle },
  description: homePage.seoDescription,
};

export default function Home() {
  return <SectionRenderer sections={homePage.sections} />;
}
