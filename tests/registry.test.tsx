import { expect, test } from "vitest";
import { registry } from "@/lib/sections/registry";
test("every section type has a component", () => {
  for (const t of ["hero","problem","pointOfView","process","work","about","offer","cta"]) {
    expect(registry[t as keyof typeof registry]).toBeTypeOf("function");
  }
});
