import { expect, test } from "vitest";
import { sectionSchema } from "@/lib/sections/schema";

test("accepts a valid hero section", () => {
  const r = sectionSchema.safeParse({ type: "hero", headline: "AI got you to 70%.", sub: "x", ctaLabel: "Start with a teardown" });
  expect(r.success).toBe(true);
});
test("rejects unknown section type", () => {
  expect(sectionSchema.safeParse({ type: "nope" }).success).toBe(false);
});
