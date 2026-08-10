# Simple Bit Design Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Simple Bit Design studio site — a warm-editorial marketing site that sells "design judgment for AI products," composed from a reusable section kit into a home page plus audience landing pages, with MDX case studies and a booking-link CTA.

**Architecture:** Greenfield Next.js 16 (App Router, static SSG). Content lives in type-safe `content-collections` entries; each landing page is an ordered `sections[]` array (a Zod discriminated union) rendered through a registry that maps each section `type` to a React component. Visual brand is encoded once as Tailwind v4 `@theme` tokens; shadcn/ui (Base UI) supplies accessible primitives and Tailark blocks seed the section visuals, all repainted to the theme.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Tailark blocks, content-collections (+ Zod), next/font (Lora + Plus Jakarta Sans), Vitest + Testing Library, deploy to Netlify.

---

## Testing approach (read first)

- **TDD (red→green) for logic:** the content schema, the section registry, the section renderer, and any util. Write the failing test, see it fail, implement, see it pass.
- **Build/verify for visuals:** section components are verified with a render smoke test (renders without throwing, key copy present, has a landmark/heading), then refined visually via `npm run dev`. No contrived assertions on styling.
- **Accessibility is a first-class check**, not an afterthought: every interactive primitive comes from shadcn/Base UI (already accessible); each page gets an `axe` pass in Task 22.
- **Version reality:** before running any `create-*`/`init` command, confirm current flags via Context7 (`resolve-library-id` → `query-docs`) or `--help`. Versions move; this plan names them as of 2026-05 but the executor verifies.

---

## File structure

```
content/
  pages/
    home.md            # sections[] for /
    built-with-ai.md   # sections[] for /built-with-ai
    adding-ai.md        # sections[] for /adding-ai
  case-studies/
    *.mdx              # one per case study (MDX body + frontmatter)
content-collections.ts # collections + Zod schemas (pages, caseStudies, section union)
src/
  app/
    layout.tsx         # fonts, Navigation, Footer, base metadata
    globals.css        # Tailwind v4 + @theme tokens (the brand)
    page.tsx           # home (renders pages["home"])
    [slug]/page.tsx    # built-with-ai, adding-ai (generateStaticParams)
    work/[slug]/page.tsx # case study detail
    sitemap.ts         # static sitemap
  components/
    site/Navigation.tsx
    site/Footer.tsx
    site/BookingCTA.tsx   # the booking-link button (env-driven URL)
    sections/Hero.tsx
    sections/Problem.tsx
    sections/PointOfView.tsx
    sections/Process.tsx
    sections/Work.tsx
    sections/About.tsx
    sections/Offer.tsx
    sections/CTA.tsx
    SectionRenderer.tsx   # maps sections[] → components via registry
    ui/*                  # shadcn primitives (generated)
  lib/
    sections/registry.tsx # type → component map
    config.ts             # site constants (name, booking URL, nav)
tests/
  content-schema.test.ts
  registry.test.tsx
  section-renderer.test.tsx
  sections/*.test.tsx     # render smoke tests
```

---

## Phase 0 — Scaffold & tooling

### Task 1: Fresh Next.js 16 scaffold (repo pre-zeroed)

> **Controller note (2026-05-24):** repo already zeroed to a clean slate (only `.git/` + `docs/` remain) and branch `rebuild-2026` created. SKIP Step 1 (no snapshot commit — old files are in history at `04378c3`) and SKIP Step 3 (no cruft to remove). In Step 2 add `--exclude='docs'` to the rsync. In Step 5 do NOT `git add -A` — stage scaffold files explicitly, leave `docs/superpowers/` uncommitted (per `dont-commit-specs`), and do not push.

**Files:**
- Delete: everything in repo except `.git/`, `docs/`, `CLAUDE.md`, and the memory dir (outside repo, untouched).
- Create: new Next app in place.

- [ ] **Step 1: Archive the old scaffold on a branch (safety, not deletion)**

```bash
git add -A && git commit -m "chore: snapshot pre-rebuild scaffold" || true
git checkout -b rebuild-2026
```

- [ ] **Step 2: Scaffold Next 16 into a temp dir, then move in** (avoids create-next-app refusing a non-empty dir). Confirm flags via `npx create-next-app@latest --help` first.

```bash
npx create-next-app@latest /tmp/sbd --ts --app --eslint --src-dir --import-alias "@/*" --no-tailwind --use-npm
# Tailwind added manually in Task 2 to control v4 setup.
rsync -a --exclude='.git' /tmp/sbd/ ./
```

- [ ] **Step 3: Remove leftover scaffold cruft** (Open Props/SCSS, placeholder jpgs, default svgs, sample page styles).

```bash
git rm -r --ignore-unmatch src/app/page.module.css src/app/page.module.scss src/app/globals.scss \
  public/*.svg ./*.jpg src/assets src/components/Steps.* src/components/Navigation.* \
  src/components/Button.* src/types/svg.d.ts 2>/dev/null || true
```

- [ ] **Step 4: Verify dev + build boot**

Run: `npm run dev` (open http://localhost:3000, see default page) then Ctrl-C; `npm run build`
Expected: dev serves; build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 16 app (greenfield)"
```

### Task 2: Tailwind CSS v4

**Files:**
- Create: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (import globals)
- Modify: `postcss.config.mjs`

- [ ] **Step 1: Install** (confirm package name/version via Context7 `tailwindcss`)

```bash
npm i tailwindcss @tailwindcss/postcss
```

- [ ] **Step 2: PostCSS config**

```js
// postcss.config.mjs
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

- [ ] **Step 3: Minimal globals.css (tokens come in Phase 1)**

```css
/* src/app/globals.css */
@import "tailwindcss";
```

- [ ] **Step 4: Import in layout, add a `bg-` utility to body to confirm Tailwind is live**

In `src/app/layout.tsx`: `import "./globals.css";` and set `<body className="bg-white text-black">`.

- [ ] **Step 5: Verify** — `npm run dev`, confirm a Tailwind utility (e.g. `p-8`) visibly applies. **Commit:** `git add -A && git commit -m "feat: add Tailwind v4"`

### Task 3: shadcn/ui (Base UI) + primitives

**Files:** Create `components.json`, `src/components/ui/*`, `src/lib/utils.ts`

- [ ] **Step 1: Init shadcn on Base UI** (confirm current init flags via `npx shadcn@latest init --help` / Context7 `shadcn`)

```bash
npx shadcn@latest init   # choose Base UI when prompted; New York/neutral base, CSS variables: yes
```

- [ ] **Step 2: Add the primitives this site actually uses**

```bash
npx shadcn@latest add button navigation-menu sheet accordion dialog
```

- [ ] **Step 3: Verify** — import `Button` into the default page, render it, `npm run dev` shows a styled button. Then revert that scratch edit.

- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: add shadcn/ui (Base UI) + primitives"`

### Task 4: Fonts (Lora + Plus Jakarta Sans)

**Files:** Modify `src/app/layout.tsx`

- [ ] **Step 1: Load via next/font and expose as CSS variables**

```tsx
// src/app/layout.tsx (font setup)
import { Plus_Jakarta_Sans, Lora } from "next/font/google";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"], weight: ["400", "500", "700", "800"],
  variable: "--font-sans", display: "swap",
});
const serif = Lora({
  subsets: ["latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-serif", display: "swap",
});
// <html className={`${sans.variable} ${serif.variable}`}>
```

- [ ] **Step 2: Verify** build succeeds; fonts requested in network tab. **Commit:** `git commit -am "feat: load Lora + Plus Jakarta Sans"`

### Task 5: Test tooling (Vitest + Testing Library)

**Files:** Create `vitest.config.ts`, `vitest.setup.ts`; Modify `package.json`

- [ ] **Step 1: Install**

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest-axe
```

- [ ] **Step 2: Config**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
```

- [ ] **Step 3: Add scripts** to `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Sanity test**

```ts
// tests/smoke.test.ts
import { expect, test } from "vitest";
test("vitest runs", () => { expect(1 + 1).toBe(2); });
```

Run: `npm test` — Expected: 1 passed. **Commit:** `git add -A && git commit -m "chore: add vitest + testing-library"`

### Task 6: content-collections

**Files:** Create `content-collections.ts`; Modify `next.config.ts`, `tsconfig.json`

- [ ] **Step 1: Install** (confirm via Context7 `content-collections`)

```bash
npm i -D @content-collections/core @content-collections/next @content-collections/mdx zod
```

- [ ] **Step 2: Wire the Next plugin**

```ts
// next.config.ts
import { withContentCollections } from "@content-collections/next";
const nextConfig = { /* default SSG; do NOT set output:"export" */ };
export default withContentCollections(nextConfig);
```

- [ ] **Step 3: tsconfig alias** — add `"content-collections": ["./.content-collections/generated"]` to `compilerOptions.paths`, and add `.content-collections` to `.gitignore`.

- [ ] **Step 4: Placeholder collection to verify generation** (real schema in Task 7)

```ts
// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
const pages = defineCollection({ name: "pages", directory: "content/pages", include: "*.md", schema: (z) => ({ title: z.string() }) });
export default defineConfig({ collections: [pages] });
```

Create `content/pages/home.md` with `---\ntitle: Home\n---`.

- [ ] **Step 5: Verify** — `npm run dev` generates `.content-collections/`. **Commit:** `git add -A && git commit -m "feat: add content-collections"`

---

## Phase 1 — Brand tokens (warm editorial) — FIRST per spec §10

### Task 7: Encode the theme as Tailwind v4 `@theme` tokens

**Files:** Modify `src/app/globals.css`

- [ ] **Step 1: Write the token block + map shadcn semantic vars**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-cream: #fff9f5;
  --color-panel: #f9ece4;
  --color-ink: #171717;
  --color-teal: #1a4a48;
  --color-teal-soft: #2d5a5a;
  --color-orange: #ff5722;

  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-serif), Georgia, serif;

  --container-content: 75rem; /* ~1200px */

  --text-display: clamp(2.75rem, 6vw, 5.5rem); /* ~44 → 88px */
  --text-display--line-height: 1.05;
  --tracking-tight: -0.015em;
}

/* shadcn semantic tokens → brand */
:root {
  --background: var(--color-cream);
  --foreground: var(--color-ink);
  --primary: var(--color-teal);
  --primary-foreground: #ffffff;
  --accent: var(--color-orange);
  --accent-foreground: #ffffff;
  --card: var(--color-panel);
  --muted: var(--color-panel);
  --radius: 0.75rem;
}

body { background: var(--color-cream); color: var(--color-ink); font-family: var(--font-sans); letter-spacing: var(--tracking-tight); }
```

- [ ] **Step 2: A11y guardrail comment + utility** — add a comment block stating: *orange on cream fails AA for body text; use `text-orange` only at display sizes or on filled CTAs (white on orange).* Add a `.cta-orange` utility (`background: var(--color-orange); color: #fff;`).

- [ ] **Step 3: Verify** — build a scratch page with `bg-cream text-ink font-serif text-[length:var(--text-display)]` heading; confirm warm palette + Lora render in `npm run dev`. Remove scratch.

- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: warm-editorial @theme tokens"`

---

## Phase 2 — Content model & rendering backbone

### Task 8: Section schema (Zod discriminated union) + page/case-study collections

**Files:** Modify `content-collections.ts`; Test `tests/content-schema.test.ts`

- [ ] **Step 1: Write the failing schema test**

```ts
// tests/content-schema.test.ts
import { expect, test } from "vitest";
import { sectionSchema } from "@/lib/sections/schema";

test("accepts a valid hero section", () => {
  const r = sectionSchema.safeParse({ type: "hero", headline: "AI got you to 70%.", sub: "x", ctaLabel: "Start with a teardown" });
  expect(r.success).toBe(true);
});
test("rejects unknown section type", () => {
  expect(sectionSchema.safeParse({ type: "nope" }).success).toBe(false);
});
```

- [ ] **Step 2: Run — Expected FAIL** (`@/lib/sections/schema` missing). `npm test -- content-schema`

- [ ] **Step 3: Implement the schema** (single source of truth, reused by collections + components)

```ts
// src/lib/sections/schema.ts
import { z } from "zod";

export const hero = z.object({ type: z.literal("hero"), headline: z.string(), sub: z.string(), ctaLabel: z.string(), secondaryLabel: z.string().optional() });
export const problem = z.object({ type: z.literal("problem"), title: z.string(), body: z.string(), bullets: z.array(z.string()).optional() });
export const pointOfView = z.object({ type: z.literal("pointOfView"), title: z.string(), body: z.string() });
export const process = z.object({ type: z.literal("process"), title: z.string(), steps: z.array(z.object({ label: z.string(), body: z.string() })) });
export const work = z.object({ type: z.literal("work"), title: z.string(), caseStudySlugs: z.array(z.string()) });
export const about = z.object({ type: z.literal("about"), title: z.string(), body: z.string() });
export const offer = z.object({ type: z.literal("offer"), title: z.string(), price: z.string(), body: z.string(), ctaLabel: z.string() });
export const cta = z.object({ type: z.literal("cta"), headline: z.string(), ctaLabel: z.string() });

export const sectionSchema = z.discriminatedUnion("type", [hero, problem, pointOfView, process, work, about, offer, cta]);
export type Section = z.infer<typeof sectionSchema>;
```

- [ ] **Step 4: Run — Expected PASS.** `npm test -- content-schema`

- [ ] **Step 5: Use the schema in collections**

```ts
// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { sectionSchema } from "./src/lib/sections/schema";

const pages = defineCollection({
  name: "pages", directory: "content/pages", include: "*.md",
  schema: (z) => ({ title: z.string(), slug: z.string(), seoTitle: z.string(), seoDescription: z.string(), sections: z.array(sectionSchema) }),
});
const caseStudies = defineCollection({
  name: "caseStudies", directory: "content/case-studies", include: "*.mdx",
  schema: (z) => ({ title: z.string(), slug: z.string(), client: z.string(), summary: z.string(), outcome: z.string(), cover: z.string().optional(), order: z.number() }),
  transform: async (doc, ctx) => ({ ...doc, body: await compileMDX(ctx, doc) }),
});
export default defineConfig({ collections: [pages, caseStudies] });
```

- [ ] **Step 6: Verify generation** — `npm run dev` regenerates types with no schema errors. **Commit:** `git add -A && git commit -m "feat: typed section schema + content collections"`

### Task 9: Section registry

**Files:** Create `src/lib/sections/registry.tsx`; Test `tests/registry.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// tests/registry.test.tsx
import { expect, test } from "vitest";
import { registry } from "@/lib/sections/registry";
test("every section type has a component", () => {
  for (const t of ["hero","problem","pointOfView","process","work","about","offer","cta"]) {
    expect(registry[t as keyof typeof registry]).toBeTypeOf("function");
  }
});
```

- [ ] **Step 2: Run — Expected FAIL.**

- [ ] **Step 3: Implement** (components created in Phase 3; import them as built — registry compiles once they exist, so create stubs now that return `null`, replaced per section task)

```tsx
// src/lib/sections/registry.tsx
import type { ComponentType } from "react";
import type { Section } from "./schema";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { PointOfView } from "@/components/sections/PointOfView";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Offer } from "@/components/sections/Offer";
import { CTA } from "@/components/sections/CTA";

type AnySection = ComponentType<any>;
export const registry: Record<Section["type"], AnySection> = {
  hero: Hero, problem: Problem, pointOfView: PointOfView, process: Process,
  work: Work, about: About, offer: Offer, cta: CTA,
};
```

> Before this compiles, create each `src/components/sections/<Name>.tsx` exporting a named component that returns `null`. They are fleshed out in Phase 3. This keeps the registry test green and unblocks the renderer.

- [ ] **Step 4: Run — Expected PASS.** **Commit:** `git add -A && git commit -m "feat: section registry + stub sections"`

### Task 10: SectionRenderer

**Files:** Create `src/components/SectionRenderer.tsx`; Test `tests/section-renderer.test.tsx`

- [ ] **Step 1: Failing test**

```tsx
// tests/section-renderer.test.tsx
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SectionRenderer } from "@/components/SectionRenderer";
test("renders sections in order by type", () => {
  render(<SectionRenderer sections={[{ type: "hero", headline: "H", sub: "S", ctaLabel: "Go" }]} />);
  expect(screen.getByRole("heading", { name: "H" })).toBeInTheDocument();
});
```

(Note: this test passes only after Hero is implemented in Task 11; until then it asserts no-throw. Adjust assertion to `expect(() => render(...)).not.toThrow()` while Hero is a stub, then tighten in Task 11.)

- [ ] **Step 2: Implement**

```tsx
// src/components/SectionRenderer.tsx
import { registry } from "@/lib/sections/registry";
import type { Section } from "@/lib/sections/schema";
export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (<>{sections.map((s, i) => { const C = registry[s.type]; return <C key={`${s.type}-${i}`} {...s} />; })}</>);
}
```

- [ ] **Step 3: Run — Expected PASS.** **Commit:** `git add -A && git commit -m "feat: SectionRenderer"`

### Task 11: Site config + BookingCTA

**Files:** Create `src/lib/config.ts`, `src/components/site/BookingCTA.tsx`; `.env.local`

- [ ] **Step 1: Config + env** (booking URL is config, set by Craig — not a code placeholder)

```ts
// src/lib/config.ts
export const site = {
  name: "Simple Bit Design",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/craigmdennis/teardown",
  nav: [ { href: "/built-with-ai", label: "Built with AI" }, { href: "/adding-ai", label: "Adding AI" }, { href: "/work", label: "Work" } ],
};
```

Add to `.env.local`: `NEXT_PUBLIC_BOOKING_URL=` (Craig pastes the real Cal.com link; fallback above keeps dev working).

- [ ] **Step 2: BookingCTA** (the primary conversion control everywhere)

```tsx
// src/components/site/BookingCTA.tsx
import { Button } from "@/components/ui/button";
import { site } from "@/lib/config";
export function BookingCTA({ label = "Start with a teardown", variant = "default" as const }) {
  return (
    <Button asChild variant={variant} className="cta-orange">
      <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">{label}</a>
    </Button>
  );
}
```

- [ ] **Step 3: Render smoke test** (`tests/sections/booking-cta.test.tsx`): renders, link points at `site.bookingUrl`, opens in new tab. Run `npm test`. **Commit:** `git add -A && git commit -m "feat: site config + BookingCTA"`

---

## Phase 3 — Section component kit

> Pattern for every section task: (1) define typed props = the matching schema export; (2) write a render smoke test (renders, key copy present, has a `<section>` landmark with an `aria-labelledby` heading); (3) implement starter JSX seeded from a Tailark block, themed with tokens; (4) `npm test` green; (5) `npm run dev` visual check; (6) commit. Replace the Task 9 stub.

### Task 12: Hero

**Files:** `src/components/sections/Hero.tsx`; Test `tests/sections/hero.test.tsx`

- [ ] **Step 1: Smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Hero } from "@/components/sections/Hero";
test("hero shows headline + CTA", () => {
  render(<Hero type="hero" headline="AI got you to 70%." sub="The 30% is judgment." ctaLabel="Start with a teardown" />);
  expect(screen.getByRole("heading", { name: /70%/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /teardown/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Implement (full)**

```tsx
// src/components/sections/Hero.tsx
import type { z } from "zod";
import type { hero } from "@/lib/sections/schema";
import { BookingCTA } from "@/components/site/BookingCTA";
type Props = z.infer<typeof hero>;
export function Hero({ headline, sub, ctaLabel, secondaryLabel }: Props) {
  return (
    <section aria-labelledby="hero-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-24 md:py-32">
        <h1 id="hero-h" className="font-serif text-[length:var(--text-display)] leading-[1.05] tracking-tight text-ink max-w-4xl">{headline}</h1>
        <p className="mt-6 max-w-2xl text-lg text-teal-soft">{sub}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BookingCTA label={ctaLabel} />
          {secondaryLabel && <a href="#work" className="text-teal underline-offset-4 hover:underline">{secondaryLabel}</a>}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** `npm test -- hero` PASS → tighten Task 10's renderer test back to the `getByRole` assertion → `npm run dev` visual check → **Commit:** `git commit -am "feat(section): Hero"`

### Task 13: Problem

**Files:** `src/components/sections/Problem.tsx`; Test `tests/sections/problem.test.tsx`

- [ ] **Step 1: Smoke test** — renders `title`, body text present, each bullet rendered as a list item.
- [ ] **Step 2: Implement**

```tsx
// src/components/sections/Problem.tsx
import type { z } from "zod"; import type { problem } from "@/lib/sections/schema";
type Props = z.infer<typeof problem>;
export function Problem({ title, body, bullets }: Props) {
  return (
    <section aria-labelledby="problem-h" className="bg-panel">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <h2 id="problem-h" className="font-serif text-3xl md:text-5xl text-ink max-w-3xl">{title}</h2>
        <p className="mt-6 max-w-2xl text-lg text-ink/80">{body}</p>
        {bullets && <ul className="mt-8 grid gap-3 sm:grid-cols-2 max-w-3xl">{bullets.map((b) => <li key={b} className="rounded-[var(--radius)] bg-cream px-5 py-4 text-ink/90">{b}</li>)}</ul>}
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** test PASS → preview → **Commit:** `git commit -am "feat(section): Problem"`

### Task 14: PointOfView (the 70/30 thesis)

**Files:** `src/components/sections/PointOfView.tsx`; Test `tests/sections/point-of-view.test.tsx`

- [ ] **Step 1: Smoke test** — renders title + body; section landmark present.
- [ ] **Step 2: Implement** — a high-contrast editorial statement block; teal background, cream text, oversized serif. Full JSX:

```tsx
// src/components/sections/PointOfView.tsx
import type { z } from "zod"; import type { pointOfView } from "@/lib/sections/schema";
type Props = z.infer<typeof pointOfView>;
export function PointOfView({ title, body }: Props) {
  return (
    <section aria-labelledby="pov-h" className="bg-teal text-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-24 md:py-32">
        <h2 id="pov-h" className="font-serif text-3xl md:text-5xl leading-tight max-w-4xl">{title}</h2>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-cream/85">{body}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** test PASS → preview → **Commit:** `git commit -am "feat(section): PointOfView"`

### Task 15: Process

**Files:** `src/components/sections/Process.tsx`; Test `tests/sections/process.test.tsx`

- [ ] **Step 1: Smoke test** — renders title and each step `label`.
- [ ] **Step 2: Implement** (ordered list of steps; restrained CSS reveal via `@starting-style`/transition — no JS needed for v1)

```tsx
// src/components/sections/Process.tsx
import type { z } from "zod"; import type { process } from "@/lib/sections/schema";
type Props = z.infer<typeof process>;
export function Process({ title, steps }: Props) {
  return (
    <section aria-labelledby="process-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <h2 id="process-h" className="font-serif text-3xl md:text-5xl text-ink">{title}</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.label} className="rounded-[var(--radius)] bg-panel p-5">
              <div className="font-serif text-2xl text-teal">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-2 font-semibold text-ink">{s.label}</div>
              <p className="mt-1 text-sm text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** test PASS → preview → **Commit:** `git commit -am "feat(section): Process"`

### Task 16: Work (proof)

**Files:** `src/components/sections/Work.tsx`; Test `tests/sections/work.test.tsx`

- [ ] **Step 1: Smoke test** — given `caseStudySlugs`, renders a card per resolved case study with its `title`.
- [ ] **Step 2: Implement** — resolves slugs against the generated `allCaseStudies`, renders linked cards. Full JSX:

```tsx
// src/components/sections/Work.tsx
import Link from "next/link";
import { allCaseStudies } from "content-collections";
import type { z } from "zod"; import type { work } from "@/lib/sections/schema";
type Props = z.infer<typeof work>;
export function Work({ title, caseStudySlugs }: Props) {
  const items = caseStudySlugs.map((s) => allCaseStudies.find((c) => c.slug === s)).filter(Boolean);
  return (
    <section id="work" aria-labelledby="work-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <h2 id="work-h" className="font-serif text-3xl md:text-5xl text-ink">{title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((c) => c && (
            <Link key={c.slug} href={`/work/${c.slug}`} className="group rounded-[var(--radius)] bg-panel p-6 transition hover:bg-panel/80">
              <div className="text-sm text-teal">{c.client}</div>
              <h3 className="mt-1 font-serif text-2xl text-ink">{c.title}</h3>
              <p className="mt-2 text-ink/80">{c.summary}</p>
              <p className="mt-4 font-medium text-teal">{c.outcome} →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** test PASS (seed 1–2 fixture case studies in Task 19 first if needed) → preview → **Commit:** `git commit -am "feat(section): Work"`

### Task 17: About

**Files:** `src/components/sections/About.tsx`; Test `tests/sections/about.test.tsx`

- [ ] **Step 1: Smoke test** — renders title + body; body must contain "Head of Product Design" when present (guard the title rule).
- [ ] **Step 2: Implement** — short, human bio block (cream bg, two-column on desktop: heading left, prose right). Full JSX:

```tsx
// src/components/sections/About.tsx
import type { z } from "zod"; import type { about } from "@/lib/sections/schema";
type Props = z.infer<typeof about>;
export function About({ title, body }: Props) {
  return (
    <section aria-labelledby="about-h" className="bg-panel">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28 grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 id="about-h" className="font-serif text-3xl md:text-4xl text-ink">{title}</h2>
        <p className="text-lg leading-relaxed text-ink/85">{body}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** test PASS → preview → **Commit:** `git commit -am "feat(section): About"`

### Task 18: Offer + CTA

**Files:** `src/components/sections/Offer.tsx`, `src/components/sections/CTA.tsx`; Tests alongside

- [ ] **Step 1: Smoke tests** — Offer renders `price` and `ctaLabel` (BookingCTA link present); CTA renders headline + BookingCTA.
- [ ] **Step 2: Implement Offer**

```tsx
// src/components/sections/Offer.tsx
import type { z } from "zod"; import type { offer } from "@/lib/sections/schema";
import { BookingCTA } from "@/components/site/BookingCTA";
type Props = z.infer<typeof offer>;
export function Offer({ title, price, body, ctaLabel }: Props) {
  return (
    <section aria-labelledby="offer-h" className="bg-cream">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-20 md:py-28">
        <div className="rounded-[var(--radius)] bg-teal text-cream p-8 md:p-12 max-w-3xl">
          <h2 id="offer-h" className="font-serif text-3xl md:text-4xl">{title}</h2>
          <p className="mt-2 text-2xl font-semibold">{price}</p>
          <p className="mt-4 text-cream/85">{body}</p>
          <div className="mt-8"><BookingCTA label={ctaLabel} /></div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement CTA**

```tsx
// src/components/sections/CTA.tsx
import type { z } from "zod"; import type { cta } from "@/lib/sections/schema";
import { BookingCTA } from "@/components/site/BookingCTA";
type Props = z.infer<typeof cta>;
export function CTA({ headline, ctaLabel }: Props) {
  return (
    <section aria-labelledby="cta-h" className="bg-panel">
      <div className="mx-auto max-w-[var(--container-content)] px-6 py-24 text-center">
        <h2 id="cta-h" className="font-serif text-3xl md:text-5xl text-ink max-w-2xl mx-auto">{headline}</h2>
        <div className="mt-8 flex justify-center"><BookingCTA label={ctaLabel} /></div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4:** tests PASS → preview → **Commit:** `git commit -am "feat(section): Offer + CTA"`

---

## Phase 4 — Content, pages, chrome

### Task 19: Author content (home + audience pages + 2 case studies)

**Files:** `content/pages/home.md`, `built-with-ai.md`, `adding-ai.md`; `content/case-studies/*.mdx`

- [ ] **Step 1:** Write `content/pages/home.md` with frontmatter: `title, slug: home, seoTitle, seoDescription`, and a `sections:` array using the real copy from spec §2/§4 (hero "AI got you to 70%. I bring the 30% it can't.", problem, pointOfView, process [Diagnose→Prioritize→Design→(Prototype)→Validate], work [2 slugs], about [names Smith.ai, "Head of Product Design"], offer [price "$4,000"], cta).
- [ ] **Step 2:** Write `built-with-ai.md` and `adding-ai.md` — same section order, audience-specific copy (A: vibe-coded v1 confuses users; B: adding AI features users don't trust).
- [ ] **Step 3:** Write 2 case study `.mdx` files (lead = AI product-quality / conversational-quality story; second = a "confusing → adopted" redesign) with frontmatter `title, slug, client, summary, outcome, order` + MDX body. Use real metrics only if verified (see `verify-metrics` rule); otherwise qualitative.
- [ ] **Step 4: Verify** — `npm run dev`, content generates, no Zod errors. **Commit:** `git add -A && git commit -m "content: home + audience pages + 2 case studies"`

> **Copy note:** all prose here is run through the `my-voice` skill before final commit so it reads as Craig, not AI.

### Task 20: Pages (home, audience, case study) via static rendering

**Files:** `src/app/page.tsx`, `src/app/[slug]/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/work/page.tsx`

- [ ] **Step 1: Home**

```tsx
// src/app/page.tsx
import { allPages } from "content-collections";
import { SectionRenderer } from "@/components/SectionRenderer";
export default function Home() {
  const page = allPages.find((p) => p.slug === "home")!;
  return <SectionRenderer sections={page.sections} />;
}
```

- [ ] **Step 2: Audience pages (static params)**

```tsx
// src/app/[slug]/page.tsx
import { allPages } from "content-collections";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/SectionRenderer";
export function generateStaticParams() { return allPages.filter((p) => p.slug !== "home").map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = allPages.find((x) => x.slug === params.slug); return p ? { title: p.seoTitle, description: p.seoDescription } : {};
}
export default function Page({ params }: { params: { slug: string } }) {
  const page = allPages.find((p) => p.slug === params.slug); if (!page) notFound();
  return <SectionRenderer sections={page.sections} />;
}
```

- [ ] **Step 3: Case study detail + index** — `work/[slug]/page.tsx` renders `MDXContent`; `work/page.tsx` lists all case studies sorted by `order`. (Use `@content-collections/mdx`'s `MDXContent`.)
- [ ] **Step 4: Verify** — `npm run build` prerenders `/`, `/built-with-ai/`, `/adding-ai/`, `/work/`, and each `/work/<slug>/`. **Commit:** `git add -A && git commit -m "feat: pages + static params"`

### Task 21: Navigation + Footer in layout

**Files:** `src/components/site/Navigation.tsx`, `src/components/site/Footer.tsx`; Modify `src/app/layout.tsx`

- [ ] **Step 1: Navigation** — desktop nav from `site.nav` + a `BookingCTA`; mobile uses shadcn `Sheet` (accessible drawer) with the same links. Keyboard + screen-reader correct by virtue of Base UI.
- [ ] **Step 2: Footer** — name, short tagline, booking link, year.
- [ ] **Step 3:** Wire both into `layout.tsx` (Nav above `{children}`, Footer below); set base `metadata` (title template `%s · Simple Bit Design`, description from spec §2).
- [ ] **Step 4: Smoke tests** for Nav (renders links + CTA) → preview desktop + mobile → **Commit:** `git add -A && git commit -m "feat: navigation + footer"`

---

## Phase 5 — Quality & ship

### Task 22: Accessibility + lint + typecheck gate

- [ ] **Step 1: axe test per page** — `tests/a11y.test.tsx` renders each page's `SectionRenderer` output and asserts `expect(await axe(container)).toHaveNoViolations()`.
- [ ] **Step 2:** Run `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` — all green.
- [ ] **Step 3:** Manual check: contrast (confirm no orange-on-cream body text), keyboard tab order through nav + mobile sheet + all CTAs, focus-visible rings present.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "test: a11y pass + green gate"`

### Task 23: SEO — metadata, sitemap, OG

**Files:** `src/app/sitemap.ts`, `src/app/opengraph-image.tsx` (or static), per-page `generateMetadata`

- [ ] **Step 1:** `sitemap.ts` enumerates `allPages` + `allCaseStudies` (+ `/work`).
- [ ] **Step 2:** Per-page metadata already set; add `metadataBase`, default OG image (a warm-editorial OG via `opengraph-image.tsx` using the tokens, or a static asset).
- [ ] **Step 3: Verify** — `npm run build`; check `/sitemap.xml` and OG tags in built HTML. **Commit:** `git add -A && git commit -m "feat: sitemap + OG + metadata"`

### Task 24: Deploy to Netlify

**Files:** `netlify.toml`

- [ ] **Step 1:** `netlify.toml` with `[build] command = "npm run build"`, `publish = ".next"`, and the official Next plugin (`@netlify/plugin-nextjs`). (Confirm current plugin config via Context7 `@netlify/plugin-nextjs`.)
- [ ] **Step 2:** Set `NEXT_PUBLIC_BOOKING_URL` in Netlify env to Craig's real Cal.com link.
- [ ] **Step 3: Deploy** — connect repo in Netlify (or `netlify deploy --build --prod`). **Ask Craig before pushing/connecting** (per `ask-before-push`).
- [ ] **Step 4: Verify live** — all routes load, fonts/colors correct, CTAs open the booking link, Lighthouse ≥95 perf/SEO/a11y. **Commit:** `git add -A && git commit -m "feat: Netlify deploy config"`

---

## Self-review (completed by author)

- **Spec coverage:** §1 purpose → whole build; §2 positioning/headline → Tasks 12/14/19; §3 audience pages → Tasks 19/20; §4 offer ($4,000) + booking CTA → Tasks 11/18/19; §5 section system + 3 pages → Tasks 8–10, 20; §6 warm-editorial tokens + a11y guardrail → Task 7; §7 case studies (MDX) → Tasks 19/20; §8 stack → Phase 0; §9 voice + "Head of Product Design"/Smith.ai → Tasks 17/19; §10 build order (tokens first) → Phases 1→3→4; §11 out-of-scope respected; §12 decisions encoded.
- **Placeholder scan:** booking URL and case-study metrics are *content/config* supplied by Craig, not code placeholders; the env fallback keeps builds working.
- **Type consistency:** section `type` literals match across schema, registry, and content; component props are derived from the schema exports (single source of truth).
- **Known sequencing note:** Task 9 creates `null`-returning section stubs so the registry/renderer compile; each Phase-3 task replaces its stub. Task 10's renderer test is loosened to no-throw until Task 12, then tightened.
