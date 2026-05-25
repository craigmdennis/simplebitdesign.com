import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Problem } from "@/components/sections/Problem";

test("problem renders title as heading", () => {
  render(
    <Problem
      type="problem"
      title="The real problem"
      body="AI gets you 70% there."
      bullets={["A", "B"]}
    />
  );
  expect(screen.getByRole("heading", { name: /The real problem/i })).toBeInTheDocument();
});

test("problem renders body text", () => {
  render(
    <Problem
      type="problem"
      title="The real problem"
      body="AI gets you 70% there."
      bullets={["A", "B"]}
    />
  );
  expect(screen.getByText(/AI gets you 70% there/i)).toBeInTheDocument();
});

test("problem renders each bullet as a list item", () => {
  render(
    <Problem
      type="problem"
      title="The real problem"
      body="AI gets you 70% there."
      bullets={["A", "B"]}
    />
  );
  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(2);
  expect(screen.getByText("A")).toBeInTheDocument();
  expect(screen.getByText("B")).toBeInTheDocument();
});
