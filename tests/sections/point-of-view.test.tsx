import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PointOfView } from "@/components/sections/PointOfView";

test("pointOfView renders title as heading", () => {
  render(
    <PointOfView
      type="pointOfView"
      title="Design judgment is the product."
      body="AI tools amplify taste, not replace it."
    />
  );
  expect(
    screen.getByRole("heading", { name: /Design judgment is the product/i })
  ).toBeInTheDocument();
});

test("pointOfView renders body text", () => {
  render(
    <PointOfView
      type="pointOfView"
      title="Design judgment is the product."
      body="AI tools amplify taste, not replace it."
    />
  );
  expect(screen.getByText(/AI tools amplify taste/i)).toBeInTheDocument();
});

test("pointOfView has a section landmark", () => {
  render(
    <PointOfView
      type="pointOfView"
      title="Design judgment is the product."
      body="AI tools amplify taste, not replace it."
    />
  );
  expect(
    screen.getByRole("region", { name: /Design judgment is the product/i })
  ).toBeInTheDocument();
});
