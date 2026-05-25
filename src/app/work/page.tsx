import type { Metadata } from "next";
import Link from "next/link";
import { allCaseStudies } from "content-collections";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkIndex() {
  const studies = [...allCaseStudies].sort((a, b) => a.order - b.order);

  return (
    <section className="mx-auto max-w-[var(--container-content)] px-6 py-20">
      <h1 className="font-serif text-4xl font-semibold mb-12">Work</h1>
      <ul className="flex flex-col gap-10">
        {studies.map((cs) => (
          <li key={cs.slug}>
            <Link
              href={`/work/${cs.slug}`}
              className="group block hover:opacity-80 transition-opacity"
            >
              <p className="text-sm text-[var(--color-ink-muted)] mb-1">
                {cs.client}
              </p>
              <h2 className="font-serif text-2xl font-semibold mb-2 group-hover:underline">
                {cs.title}
              </h2>
              <p className="text-[var(--color-ink-muted)] leading-relaxed">
                {cs.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
