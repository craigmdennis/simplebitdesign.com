import { z } from "zod";

export const hero = z.object({ type: z.literal("hero"), headline: z.string(), sub: z.string(), ctaLabel: z.string(), secondaryLabel: z.string().optional() });
export const problem = z.object({ type: z.literal("problem"), title: z.string(), body: z.string(), bullets: z.array(z.string()).optional() });
export const pointOfView = z.object({ type: z.literal("pointOfView"), title: z.string(), body: z.string() });
export const process = z.object({ type: z.literal("process"), title: z.string(), steps: z.array(z.object({ label: z.string(), body: z.string() })) });
export const work = z.object({ type: z.literal("work"), title: z.string(), caseStudySlugs: z.array(z.string()) });
export const about = z.object({ type: z.literal("about"), title: z.string(), body: z.string() });
export const offer = z.object({ type: z.literal("offer"), title: z.string(), price: z.string(), body: z.string(), ctaLabel: z.string() });
export const cta = z.object({ type: z.literal("cta"), headline: z.string(), ctaLabel: z.string() });

export const sectionSchema = z.discriminatedUnion("type", [hero, problem, pointOfView, process, work, about, offer, cta]);
export type Section = z.infer<typeof sectionSchema>;
