import type { z } from "zod";
import type { pointOfView } from "@/lib/sections/schema";

type Props = z.infer<typeof pointOfView>;

export function PointOfView({ title, body }: Props) {
  return (
    <section aria-labelledby="pov-h" className="bg-teal text-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-24 md:py-32">
        <h2 id="pov-h" className="font-serif text-3xl md:text-5xl leading-tight max-w-4xl">{title}</h2>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-cream/85">{body}</p>
      </div>
    </section>
  );
}
