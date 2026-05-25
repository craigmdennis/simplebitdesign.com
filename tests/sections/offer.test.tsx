import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Offer } from "@/components/sections/Offer";

test("offer renders price", () => {
  render(
    <Offer
      type="offer"
      title="The Teardown"
      price="$500"
      body="A focused review of your product."
      ctaLabel="Book a teardown"
    />
  );
  expect(screen.getByText(/\$500/)).toBeInTheDocument();
});

test("offer renders a CTA link with ctaLabel", () => {
  render(
    <Offer
      type="offer"
      title="The Teardown"
      price="$500"
      body="A focused review of your product."
      ctaLabel="Book a teardown"
    />
  );
  expect(screen.getByRole("link", { name: /Book a teardown/i })).toBeInTheDocument();
});
