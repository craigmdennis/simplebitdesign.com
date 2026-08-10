# Simple Bit Design — Site Design Spec

**Date:** 2026-05-24
**Status:** Draft for review
**Owner:** Craig Dennis

---

## 1. Purpose

Rebuild simplebitdesign.com from scratch as a **consulting studio site** whose job is to
win client work and support outbound contact ("start contacting again"). This is *not* a
job-hunting portfolio. (Supersedes the earlier saved note that the site's purpose was to
land a full-time Head of Product Design role — that decision has changed.)

The current Next.js scaffold (agency-voice "How we work" copy, placeholder images, dead
nav links) is replaced. Built greenfield on a new stack chosen for speed-to-live and AI-assisted development (see §8).

## 2. Positioning

**The studio:** Simple Bit Design — a one-person product-design studio for AI products.

**The lane (unified):** Design judgment for AI products. Whether AI is in the client's
*toolchain* (they built it with AI) or in their *product* (they're adding AI features), the
missing piece is the same: the design judgment AI can't provide.

**Thesis / POV:**
> AI gets any team to ~70% — functional, shipped, demo-ready. The last 30% — clarity,
> trust, and the judgment of *what to build and why people bounce* — is product design,
> and it's exactly the part AI can't hand you.

**Headline:** *"AI got you to 70%. I bring the 30% it can't."*
**Sub:** *Product design for AI products — the human judgment that makes people understand,
trust, and stick with them.*

**Differentiator:** Design judgment and craft — **not** AI tooling. This is deliberate:
the audience can already generate screens and prototypes with AI; that cannot be what we
sell them. What they lack (and know they lack) is taste, product judgment, and "why is
this confusing." The entire site points at that gap.

**Prototype, demoted to a delivery medium:** Craig still builds working prototypes (his
"I'll just build the thing" strength), but it is never the pitch. Framed as:
> "I don't hand you a deck of problems — I hand you the redesigned product, working."
The fact that it's built fast (AI-assisted) is invisible plumbing, never a headline.

## 3. Audience

Anyone shipping an AI product without strong design. Two sub-audiences, each addressed by
a dedicated landing page (see §5):

- **A — Built with AI:** Non-technical / seed-stage founders who vibe-coded a working v1
  that confuses users. Pain: bounce, support load, slow adoption despite impressive tech.
- **B — Adding AI:** Teams putting AI into an existing product (copilot, agent, chat, AI
  workflow) that isn't landing. Pain: users don't trust or understand the AI surface.

Buyers are founders/operators, not procurement. Copy is founder-to-founder: direct, warm,
specific, no corporate jargon. Engagements are scoped and fast to fit early-stage budgets.

## 4. Offer & conversion

- **Entry offer — "AI Product Teardown":** fixed scope (~1–2 weeks), **$4,000** fixed price.
  An expert diagnosis of *why the AI product isn't clicking*, plus the redesigned direction
  — and, where it helps, a working prototype of the single highest-impact fix. The thing
  sold is **judgment made concrete**, and it's a low-commitment first purchase that
  naturally leads to larger work.
- **Larger engagement:** a design sprint or ongoing partnership — named on the site, not
  detailed. Reached via the same contact path.
- **Primary CTA everywhere:** "Start with a teardown" → contact.
- **Contact mechanism:** a **booking link** (e.g. Cal.com / SavvyCal). The primary CTA opens
  it directly — no contact form.

## 5. Architecture: a landing-page *system*, not a page

The site is a **kit of reusable section components** composed into **content-driven pages**.
Each landing page = an ordered list of sections + its own copy, kept in content files (MDX
via `content-collections`, type-safe with Zod). Because the site is statically rendered,
every page pre-renders to its own fast URL.

**Section component kit (the building blocks):**
1. `Hero` — headline, sub, primary CTA, optional secondary.
2. `Problem` — founder-to-founder pain (copy varies per audience).
3. `PointOfView` — the 70/30 thesis; the memorable, non-commodity section.
4. `Process` — "How I work": judgment delivered as a working redesign. A steps reveal with
   restrained scroll motion. Trimmed flow:
   Diagnose → Prioritize → Design → (Prototype) → Validate.
5. `Work` — selected proof (see §7).
6. `About` — short, human credibility.
7. `Offer` — the Teardown + larger engagement.
8. `CTA` / footer — "Start a project."

**First pages to build (axis = audience/situation):**
- `/` — home, the unified 70/30 POV (speaks to both audiences).
- `/built-with-ai` — audience A, same POV in their exact words.
- `/adding-ai` — audience B, same POV in their exact words.

Pages share the offer and design system; only emphasis and copy change. The same kit
later supports A/B message variants and per-campaign/per-prospect pages with near-zero
marginal cost — no new architecture required.

## 6. Visual system — warm editorial

The aesthetic is the argument: in a category full of cold, near-black, neon-monospace AI
sites, a warm, calm, high-craft site *proves* "I make AI feel human and clear" before a
word is read. Evolves the existing brand rather than restarting.

- **Palette:** cream canvas `#fff9f5`; ink `#171717`; deep teal primary (`#1a4a48` /
  `#2d5a5a`); warm orange accent `#ff5722` used sparingly; cream panel `#f9ece4`. Encoded
  as Tailwind v4 `@theme` tokens.
  - **A11y guardrail:** orange `#ff5722` on cream fails WCAG AA for body text — restrict
    orange to large display text, accents, and CTA fills (white text on orange). Bake into
    the tokens so it's a guardrail, not a later audit failure.
- **Type:** **Lora** for large editorial statement headlines (the human/craft signal);
  **Plus Jakarta Sans** for UI and body, via `next/font`. Large display scale (~88px);
  tight letter-spacing.
- **Layout & motion:** generous whitespace, ~1200px max content width, a few asymmetric
  editorial moments, restrained scroll motion (Motion or GSAP) on one or two sections.

## 7. Proof / case studies

Lead with AI-product credibility, paired with a usability turnaround:
- An **AI-product outcome** demonstrating judgment (e.g. the AI quality-score / conversational
  -quality work — real AI product depth).
- A **"confusing → adopted"** redesign.

Craig's strongest saved case studies are currently framed as *leadership/visibility* wins
(built for a job hunt). For this audience they must be **repackaged around product outcomes**
(confusing → adopted, prototype → shipped → metric). At least one likely needs a real
before/after. Case studies are authored as MDX so they can deepen over time and get their
own pages later.

## 8. Tech approach

Greenfield rebuild — the existing Next 15 + Open Props/SCSS scaffold is discarded.

- **Framework:** Next.js 16 (App Router, React 19, TypeScript), static SSG.
- **Styling:** Tailwind CSS v4 with a CSS-first `@theme` token block encoding the
  warm-editorial palette, fonts, container width, and type scale.
- **Components (accessible substrate):** shadcn/ui on Base UI — copy-in / own-the-source,
  so every primitive (nav, mobile menu/disclosure, dialog, accordion) inherits the tokens
  with no generic-look lock-in.
- **Marketing sections:** composed from Tailark blocks (free, shadcn-native) as structural
  starting points, then repainted to the theme. Aceternity/Magic UI only for rare accents.
- **Content:** MDX via `content-collections` (type-safe frontmatter with Zod) for
  landing-page copy and case studies; section components map via the MDX `components` prop.
- **Fonts:** Lora + Plus Jakarta Sans via `next/font`.
- **Output & deploy:** static SSG → Netlify (Vercel equally fine). Contact via a booking
  link (e.g. Cal.com) — no form.
- **Why this stack:** fastest path to a great-looking site (richest marketing-block
  ecosystem) and the most AI/Claude-fluent stack for a solo, AI-assisted build. Astro 6 +
  Starwind was the leaner runner-up, set aside because perf/SEO wasn't a stated priority
  and `.astro` is less AI-fluent.

## 9. Voice

Studio-first, founder-to-founder, warm, specific, no jargon. When Craig's past role is
referenced (in `About`), use the title **"Head of Product Design"** (most recently **Head of
Product Design at Smith.ai**, an AI phone-services company) — name the employer for
credibility. Final site copy will be run through
the `my-voice` rules during implementation so it reads as human-written, not AI output.

## 10. Build approach (handled in the implementation plan)

Greenfield: scaffold the new Next 16 + Tailwind v4 + shadcn stack and discard the old
scaffold entirely (Open Props/SCSS, placeholder `*.jpg` files, default assets, dead nav
links to `/solutions` etc.). Order: establish the `@theme` token system + font loading
first → build the section kit → compose the home + audience pages from MDX.

## 11. Out of scope (for this build)

- A blog / CMS beyond MDX case studies.
- Multi-page agency IA (Home/Work/Services/About/Contact as separate pages) — sections live
  on composed landing pages instead.
- Analytics/SEO tuning beyond sensible defaults (can follow later).

## 12. Decisions

1. **Teardown price:** $4,000, fixed. *(decided)*
2. **Contact:** booking link (e.g. Cal.com / SavvyCal), no form. *(decided)*
3. **Employer named:** yes — Smith.ai, for credibility. *(decided)*
4. **Case-study lead:** not chosen yet. Plan default: lead with the AI product-quality /
   conversational-quality story + a "confusing → adopted" redesign; easy to swap later.
