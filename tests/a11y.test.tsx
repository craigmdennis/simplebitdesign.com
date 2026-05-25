import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { expect, test } from "vitest";
import { allPages } from "content-collections";
import { SectionRenderer } from "@/components/SectionRenderer";
import { Navigation } from "@/components/site/Navigation";
import { Footer } from "@/components/site/Footer";

for (const slug of ["home", "built-with-ai", "adding-ai"]) {
  test(`${slug} page has no axe violations`, async () => {
    const page = allPages.find((p) => p.slug === slug)!;
    const { container } = render(
      <main>
        <SectionRenderer sections={page.sections} />
      </main>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
}

test("Navigation has no axe violations", async () => {
  const { container } = render(
    <div>
      <Navigation />
    </div>
  );
  expect(await axe(container)).toHaveNoViolations();
});

test("Footer has no axe violations", async () => {
  // Footer renders its own <footer> landmark; no wrapper needed.
  const { container } = render(<Footer />);
  expect(await axe(container)).toHaveNoViolations();
});
