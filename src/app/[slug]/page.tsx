import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allPages } from "content-collections";
import { SectionRenderer } from "@/components/SectionRenderer";

export function generateStaticParams() {
  return allPages
    .filter((p) => p.slug !== "home")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = allPages.find((x) => x.slug === slug);
  return p
    ? { title: { absolute: p.seoTitle }, description: p.seoDescription }
    : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = allPages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SectionRenderer sections={page.sections} />;
}
