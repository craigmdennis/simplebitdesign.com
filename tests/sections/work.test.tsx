import { vi } from "vitest";

vi.mock("content-collections", () => ({
  allCaseStudies: [
    { slug: "alpha", client: "Acme", title: "Alpha redesign", summary: "Sum A", outcome: "Up 20%", order: 1 },
    { slug: "beta", client: "Beta Co", title: "Beta rebuild", summary: "Sum B", outcome: "Adopted", order: 2 },
  ],
}));

import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Work } from "@/components/sections/Work";

test("work renders a card for each resolved slug", () => {
  render(<Work type="work" title="Selected work" caseStudySlugs={["alpha", "beta"]} />);
  expect(screen.getByText("Alpha redesign")).toBeInTheDocument();
  expect(screen.getByText("Beta rebuild")).toBeInTheDocument();
});

test("work renders links to /work/<slug>", () => {
  render(<Work type="work" title="Selected work" caseStudySlugs={["alpha", "beta"]} />);
  expect(screen.getByRole("link", { name: /Alpha redesign/i })).toHaveAttribute("href", "/work/alpha");
  expect(screen.getByRole("link", { name: /Beta rebuild/i })).toHaveAttribute("href", "/work/beta");
});
