import Link from "next/link";
import { allCaseStudies } from "content-collections";
import type { z } from "zod";
import type { work } from "@/lib/sections/schema";

type Props = z.infer<typeof work>;

export function Work({ title, caseStudySlugs }: Props) {
  const items = caseStudySlugs.map((s) => allCaseStudies.find((c) => c.slug === s)).filter(Boolean);
  return (
    <section id="work" aria-labelledby="work-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <h2 id="work-h" className="font-serif text-3xl md:text-5xl text-ink">{title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((c) => c && (
            <Link key={c.slug} href={`/work/${c.slug}`} className="group rounded-[var(--radius)] bg-panel p-6 transition hover:bg-panel/80">
              <div className="text-sm text-teal">{c.client}</div>
              <h3 className="mt-1 font-serif text-2xl text-ink">{c.title}</h3>
              <p className="mt-2 text-ink/80">{c.summary}</p>
              <p className="mt-4 font-medium text-teal">{c.outcome} →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
