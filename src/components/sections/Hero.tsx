import type { z } from "zod";
import type { hero } from "@/lib/sections/schema";
import { BookingCTA } from "@/components/site/BookingCTA";

type Props = z.infer<typeof hero>;

export function Hero({ headline, sub, ctaLabel, secondaryLabel }: Props) {
  return (
    <section aria-labelledby="hero-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-24 md:py-32">
        <h1
          id="hero-h"
          className="font-serif text-[length:var(--text-display)] leading-[1.05] tracking-tight text-ink max-w-4xl"
        >
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-teal-soft">{sub}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BookingCTA label={ctaLabel} />
          {secondaryLabel && (
            <a href="#work" className="text-teal underline-offset-4 hover:underline">
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
