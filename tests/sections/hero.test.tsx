import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Hero } from "@/components/sections/Hero";

test("hero shows headline + CTA", () => {
  render(<Hero type="hero" headline="AI got you to 70%." sub="The 30% is judgment." ctaLabel="Start with a teardown" />);
  expect(screen.getByRole("heading", { name: /70%/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /teardown/i })).toBeInTheDocument();
});
