import type { z } from "zod";
import type { about } from "@/lib/sections/schema";

type Props = z.infer<typeof about>;

export function About({ title, body }: Props) {
  return (
    <section aria-labelledby="about-h" className="bg-panel">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28 grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 id="about-h" className="font-serif text-3xl md:text-4xl text-ink">{title}</h2>
        <p className="text-lg leading-relaxed text-ink/85">{body}</p>
      </div>
    </section>
  );
}
