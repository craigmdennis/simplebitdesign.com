import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CTA } from "@/components/sections/CTA";

test("cta renders headline as heading", () => {
  render(<CTA type="cta" headline="Ready to ship?" ctaLabel="Start with a teardown" />);
  expect(screen.getByRole("heading", { name: /Ready to ship\?/i })).toBeInTheDocument();
});

test("cta renders a CTA link", () => {
  render(<CTA type="cta" headline="Ready to ship?" ctaLabel="Start with a teardown" />);
  expect(screen.getByRole("link", { name: /Start with a teardown/i })).toBeInTheDocument();
});
