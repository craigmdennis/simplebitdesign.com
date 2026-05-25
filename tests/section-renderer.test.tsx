import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SectionRenderer } from "@/components/SectionRenderer";
import type { Section } from "@/lib/sections/schema";

test("renders sections in order by type", () => {
  render(<SectionRenderer sections={[{ type: "hero", headline: "H", sub: "S", ctaLabel: "Go" }]} />);
  expect(screen.getByRole("heading", { name: "H" })).toBeInTheDocument();
});

test("renders multiple different section types without throwing", () => {
  const sections: Section[] = [
    { type: "hero", headline: "H", sub: "S", ctaLabel: "Go" },
    { type: "cta", headline: "Ready?", ctaLabel: "Start" },
    { type: "problem", title: "The Problem", body: "It hurts." },
  ];
  expect(() => render(<SectionRenderer sections={sections} />)).not.toThrow();
});
