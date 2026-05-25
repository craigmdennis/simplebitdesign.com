import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCaseStudies } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";

export function generateStaticParams() {
  return allCaseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = allCaseStudies.find((c) => c.slug === slug);
  return cs ? { title: cs.title, description: cs.summary } : {};
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = allCaseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <article className="mx-auto max-w-[var(--container-content)] px-6 py-20">
      <header className="mb-12">
        <p className="text-sm text-[var(--color-ink-muted)] mb-2">{cs.client}</p>
        <h1 className="font-serif text-4xl font-semibold mb-4">{cs.title}</h1>
        <p className="text-xl text-[var(--color-ink-muted)] leading-relaxed mb-4">
          {cs.summary}
        </p>
        {cs.outcome && (
          <p className="text-base font-medium text-[var(--color-ink-base)]">
            Outcome: {cs.outcome}
          </p>
        )}
      </header>
      <div className="[&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-border)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--color-ink-muted)] [&_blockquote]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2">
        <MDXContent code={cs.body} />
      </div>
    </article>
  );
}
