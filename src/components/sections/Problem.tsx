import type { z } from "zod";
import type { problem } from "@/lib/sections/schema";

type Props = z.infer<typeof problem>;

export function Problem({ title, body, bullets }: Props) {
  return (
    <section aria-labelledby="problem-h" className="bg-panel">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <h2 id="problem-h" className="font-serif text-3xl md:text-5xl text-ink max-w-3xl">{title}</h2>
        <p className="mt-6 max-w-2xl text-lg text-ink/80">{body}</p>
        {bullets && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 max-w-3xl">
            {bullets.map((b) => (
              <li key={b} className="rounded-[var(--radius)] bg-cream px-5 py-4 text-ink/90">{b}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
