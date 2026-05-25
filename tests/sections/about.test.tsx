import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { About } from "@/components/sections/About";

test("about renders title as heading", () => {
  render(<About type="about" title="About Craig" body="Craig is Head of Product Design at a startup." />);
  expect(screen.getByRole("heading", { name: /About Craig/i })).toBeInTheDocument();
});

test("about renders body text", () => {
  render(<About type="about" title="About Craig" body="Craig is Head of Product Design at a startup." />);
  expect(screen.getByText(/Craig is Head of Product Design at a startup\./i)).toBeInTheDocument();
});

test('about renders "Head of Product Design" verbatim', () => {
  render(
    <About
      type="about"
      title="About Craig"
      body="Craig is Head of Product Design and brings 15 years of experience."
    />
  );
  expect(screen.getByText(/Head of Product Design/)).toBeInTheDocument();
});
