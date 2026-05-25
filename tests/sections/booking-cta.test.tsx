import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { BookingCTA } from "@/components/site/BookingCTA";
import { site } from "@/lib/config";

test("renders a link with the default label", () => {
  render(<BookingCTA />);
  const link = screen.getByRole("link", { name: "Start with a teardown" });
  expect(link).toBeDefined();
});

test("link href equals site.bookingUrl", () => {
  render(<BookingCTA />);
  const link = screen.getByRole("link", { name: "Start with a teardown" });
  expect(link).toHaveAttribute("href", site.bookingUrl);
});

test("link opens in a new tab with noopener", () => {
  render(<BookingCTA />);
  const link = screen.getByRole("link", { name: "Start with a teardown" });
  expect(link).toHaveAttribute("target", "_blank");
  expect(link.getAttribute("rel")).toContain("noopener");
});

test("renders a custom label when provided", () => {
  render(<BookingCTA label="Book now" />);
  expect(screen.getByRole("link", { name: "Book now" })).toBeDefined();
});
