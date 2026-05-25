import type { z } from "zod";
import type { cta } from "@/lib/sections/schema";
import { BookingCTA } from "@/components/site/BookingCTA";

type Props = z.infer<typeof cta>;

export function CTA({ headline, ctaLabel }: Props) {
  return (
    <section aria-labelledby="cta-h" className="bg-panel">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-24 text-center">
        <h2 id="cta-h" className="font-serif text-3xl md:text-5xl text-ink max-w-2xl mx-auto">{headline}</h2>
        <div className="mt-8 flex justify-center"><BookingCTA label={ctaLabel} /></div>
      </div>
    </section>
  );
}
