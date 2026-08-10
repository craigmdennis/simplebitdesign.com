# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # next dev — also regenerates .content-collections
npm run build        # next build (typechecks + SSG)
npm run lint         # eslint
npm test             # vitest run — full suite
npm run test:watch   # vitest watch
npx tsc --noEmit     # typecheck without a build
```

Run a single test file or test:

```bash
npx vitest run tests/sections/hero.test.tsx
npx vitest run -t "hero shows headline"
```

**Before tests will run on a fresh clone:** run `npm run dev` or `npm run build` once.
`.content-collections/generated` is gitignored and is produced only by the
`withContentCollections` plugin in `next.config.ts` — there is no standalone CLI. Both the
app and the test suite import from the `content-collections` alias, so vitest cannot
resolve its imports until that directory exists.

## Architecture

A statically-generated Next.js 16 marketing site for Craig Dennis's consulting studio. Its
job is to get the right founders to book the $4k AI Product Teardown — see `PRODUCT.md` for
audience, positioning, and the anti-references the design must not resemble.

### The section pipeline

Landing pages are not hand-built JSX. They are an ordered `sections[]` array in markdown
frontmatter, rendered through a registry. One section `type` flows through four files:

1. `src/lib/sections/schema.ts` — a Zod discriminated union on `type`. The source of truth.
2. `content-collections.ts` — imports `sectionSchema` to validate `content/pages/*.md`
   frontmatter **at build time**. Invalid frontmatter fails the build, not the page.
3. `src/lib/sections/registry.tsx` — maps each `type` to its component.
4. `src/components/SectionRenderer.tsx` — looks up the component and spreads the section.

**Adding a section type means editing all four.** `tests/registry.test.tsx` fails if a
schema variant has no registered component. Section components take
`z.infer<typeof <variant>>` as props, so the frontmatter shape and the prop shape can't drift.

### Content

`content-collections` generates two typed collections from `content/`:

- `allPages` (`content/pages/*.md`) — `sections[]` frontmatter; body content is unused.
  `home.md` renders at `/` via `src/app/page.tsx`; every other slug renders through
  `src/app/[slug]/page.tsx`.
- `allCaseStudies` (`content/case-studies/*.mdx`) — MDX compiled to `body`, rendered with
  `<MDXContent>` at `/work/[slug]`. The `work` section type references these by slug.

Case-study copy currently carries `[VERIFY]` / `[CONFIRM]` markers on outcomes and metrics.
Do not publish or repeat those numbers as fact — they need Craig's confirmation first.

### UI primitives

`src/components/ui/*` is shadcn (`base-nova` style) built on **Base UI, not Radix**.
Composition uses the `render` prop, not `asChild`:

```tsx
<SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
```

Keep `"use client"` confined to what needs it — currently only `Navigation`, `dialog`, and
`sheet`. Sections and pages are server components.

### Design tokens

`DESIGN.md` (with `DESIGN.json` as its machine-readable twin) is the design system of
record. Tokens live once in `src/app/globals.css` under Tailwind v4 `@theme`; use them
rather than raw hex.

Two rules that bite in code:

- **Orange contrast.** `--color-orange` (`#ff5722`) fails AA on cream for body text.
  Filled CTAs use the `.cta-orange` helper (`#c2410c`, ~5.2:1 on white). Reserve full
  orange for large display accents only, and only on the primary CTA.
- **No tight tracking on `body`.** Negative letter-spacing is scoped to display and
  headline type. Body stays at `line-height: 1.625`, normal tracking.

The system is flat: no shadows, no gradients, no glass, 2px corners. `DESIGN.md` §6 lists
the full do/don't set, including the three "reflex" looks (generic SaaS, AI-startup neon,
agency template) the site must not drift toward.

### Environment and deploy

Cloudflare Workers static assets. `output: "export"` in `next.config.ts` prerenders
everything to `out/`, which `wrangler.jsonc` serves — an assets-only Worker with no `main`
and therefore no `binding`. `npm run preview` builds and serves it through wrangler
locally; `npm run deploy` builds and ships it.

The site is 100% static: no middleware, route handlers, server actions, or dynamic APIs.
**Adding any of those breaks the export** and means moving to `@opennextjs/cloudflare`.
Two consequences worth knowing:

- Any route that isn't a page — `sitemap.ts`, `opengraph-image.tsx` — needs
  `export const dynamic = "force-static"` or the export fails at build.
- `opengraph-image.tsx` compiles to a *route*, so export writes an extensionless file at
  `/opengraph-image`. Cloudflare types assets by extension and would send none, breaking
  social cards. `public/_headers` sets `Content-Type: image/png` explicitly.

`npm start` (`next start`) no longer works under static export — use `npm run preview`.

Two public env vars, set in the Workers Builds config and falling back to hardcoded
defaults in `src/lib/config.ts` and `src/app/layout.tsx`:

- `NEXT_PUBLIC_BOOKING_URL` — the Cal.com booking link every CTA points at.
- `NEXT_PUBLIC_SITE_URL` — canonical origin, no trailing slash; used by `sitemap.ts` and
  `metadataBase`.

## Testing conventions

Vitest + Testing Library + jsdom, with `vitest-axe` registered in `vitest.setup.ts`.

- **TDD for logic** — schema, registry, renderer, utils.
- **Smoke tests for visuals** — a section test asserts a heading, key copy, and a landmark.
  Do not assert on styling.
- **Accessibility is a gate, not a follow-up.** `tests/a11y.test.tsx` runs axe over every
  page's rendered sections plus nav and footer. Target is WCAG 2.2 AA, and motion must
  honour `prefers-reduced-motion`. Keep it green.
