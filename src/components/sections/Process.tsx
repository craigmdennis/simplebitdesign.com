import type { z } from "zod";
import type { process } from "@/lib/sections/schema";

type Props = z.infer<typeof process>;

export function Process({ title, steps }: Props) {
  return (
    <section aria-labelledby="process-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <h2 id="process-h" className="font-serif text-3xl md:text-5xl text-ink">{title}</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.label} className="rounded-[var(--radius)] bg-panel p-5">
              <div className="font-serif text-2xl text-teal">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-2 font-semibold text-ink">{s.label}</div>
              <p className="mt-1 text-sm text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
