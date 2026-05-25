import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { Navigation } from "@/components/site/Navigation";
import { site } from "@/lib/config";

test("renders the site name as a link to /", () => {
  render(<Navigation />);
  const logo = screen.getByRole("link", { name: site.name });
  expect(logo).toHaveAttribute("href", "/");
});

test("desktop nav renders all three nav links", () => {
  render(<Navigation />);
  const desktopNav = screen.getByRole("navigation", {
    name: "Main navigation",
  });
  const links = within(desktopNav).getAllByRole("link");
  const hrefs = links.map((l) => l.getAttribute("href"));
  expect(hrefs).toContain("/built-with-ai");
  expect(hrefs).toContain("/adding-ai");
  expect(hrefs).toContain("/work");
});

test("desktop nav renders nav link labels", () => {
  render(<Navigation />);
  const desktopNav = screen.getByRole("navigation", {
    name: "Main navigation",
  });
  expect(within(desktopNav).getByRole("link", { name: "Built with AI" })).toBeDefined();
  expect(within(desktopNav).getByRole("link", { name: "Adding AI" })).toBeDefined();
  expect(within(desktopNav).getByRole("link", { name: "Work" })).toBeDefined();
});

test("desktop nav renders a booking CTA link", () => {
  render(<Navigation />);
  const desktopNav = screen.getByRole("navigation", {
    name: "Main navigation",
  });
  const ctaLink = within(desktopNav).getByRole("link", {
    name: "Start with a teardown",
  });
  expect(ctaLink).toHaveAttribute("href", site.bookingUrl);
});
