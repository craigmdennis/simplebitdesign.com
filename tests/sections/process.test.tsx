import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Process } from "@/components/sections/Process";

const steps = [
  { label: "Diagnose", body: "We map the real problem." },
  { label: "Design", body: "We close the gap with judgment." },
];

test("process renders title as heading", () => {
  render(<Process type="process" title="How it works" steps={steps} />);
  expect(screen.getByRole("heading", { name: /How it works/i })).toBeInTheDocument();
});

test("process renders each step label", () => {
  render(<Process type="process" title="How it works" steps={steps} />);
  expect(screen.getByText("Diagnose")).toBeInTheDocument();
  expect(screen.getByText("Design")).toBeInTheDocument();
});
