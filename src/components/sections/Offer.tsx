import type { z } from "zod";
import type { offer } from "@/lib/sections/schema";
import { BookingCTA } from "@/components/site/BookingCTA";

type Props = z.infer<typeof offer>;

export function Offer({ title, price, body, ctaLabel }: Props) {
  return (
    <section aria-labelledby="offer-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <div className="rounded-[var(--radius)] bg-teal text-cream p-8 md:p-12 max-w-3xl">
          <h2 id="offer-h" className="font-serif text-3xl md:text-4xl">{title}</h2>
          <p className="mt-2 text-2xl font-semibold">{price}</p>
          <p className="mt-4 text-cream/85">{body}</p>
          <div className="mt-8"><BookingCTA label={ctaLabel} /></div>
        </div>
      </div>
    </section>
  );
}
