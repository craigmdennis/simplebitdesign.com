---
name: Simple Bit Design
description: "The Plain Page: editorial restraint for an AI product design consultancy."
colors:
  cream: "#fff9f5"
  panel: "#f9ece4"
  ink: "#171717"
  teal: "#1a4a48"
  teal-soft: "#2d5a5a"
  orange: "#ff5722"
  orange-cta: "#c2410c"
  border-warm: "oklch(0.9 0.02 60)"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "2px"
  md: "4px"
  lg: "6px"
  pill: "9999px"
spacing:
  section-y: "5rem"
  section-y-lg: "7rem"
  hero-y: "6rem"
  hero-y-lg: "8rem"
  container-x: "1.5rem"
  container-max: "75rem"
components:
  button-primary:
    backgroundColor: "{colors.orange-cta}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0.625rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.orange-cta}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.875rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.875rem"
  card-work:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1.5rem"
  card-offer:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sm}"
    padding: "2rem"
  callout-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.25rem"
---

# Design System: Simple Bit Design

## 1. Overview

**Creative North Star: "The Plain Page"**

The Plain Page is print-magazine restraint applied to a digital consulting site. The discipline is to leave things out so the words can carry. Generous margins, sparse ornament, type as the principal voice. The page IS the design.

This is the visual counterpart to PRODUCT.md's "Plainspoken, never performative" principle. Where a SaaS landing would reach for a gradient, this system reaches for a comma. Where an agency template would reach for a parallax scene, this system trusts a paragraph. The reader is treated as a senior peer, not an audience that needs to be wowed.

Colours are warm but quiet: cream paper, ink, a deep teal as the considered voice, a burnt orange used sparingly when the page asks the reader to act. There are no shadows. Depth comes from background colour shifting between sections, not from elevation. There are no decorative graphics or imagery in service of mood; imagery, when it appears, earns its place by communicating real work.

**Key Characteristics:**
- Flat surfaces, tonal layering (cream, then panel, then teal, then ink).
- Editorial type pairing: Lora serif for display and headlines, Plus Jakarta Sans for body.
- Sharp 2px corners across all components. Type, not shape, carries identity.
- One accent (burnt orange) used only on the primary CTA. Teal carries weight everywhere else.
- No shadows, no gradients, no glass. No motion beyond colour transitions on links.

## 2. Colors

The palette is a warm editorial set: cream paper, ink text, teal as the considered voice, and a single burnt orange reserved for the call to action.

### Primary
- **Burnt Orange** (`#c2410c`, token `orange-cta`). The CTA fill. This is the only place full-saturation orange appears on the page. Its rarity is what makes it readable as the action. Meets WCAG AA against white text at ~5.2:1.

### Secondary
- **Deep Teal** (`#1a4a48`, token `teal`). Carries the studio's voice on the page: the point-of-view section, the offer block, primary links, list numbering, focus rings. Where another site would reach for the accent orange, this one reaches for teal. Orange stays reserved.
- **Signal Orange** (`#ff5722`, token `orange`). Reserved for large display accents and graphics only. Fails WCAG AA against cream for body-text contrast, so never used as text on cream.

### Neutral
- **Cream** (`#fff9f5`, token `cream`). Page background and the default surface. The "paper" of The Plain Page.
- **Panel Tan** (`#f9ece4`, token `panel`). The recessed surface: cards, footer, secondary section backgrounds, navigation underline. One small warm step darker than cream.
- **Ink** (`#171717`, token `ink`). Primary text. Near-black with a slight warm cast; never `#000`.
- **Soft Teal** (`#2d5a5a`, token `teal-soft`). Secondary text on cream (hero sub-paragraph, footer tagline, support copy in cards). Lighter than teal so it reads as a supporting voice.
- **Warm Border** (`oklch(0.9 0.02 60)`, token `border-warm`). The default border and input outline. Warm enough to belong on cream; never grey.

### Named Rules

**The One Accent Rule.** Burnt orange (`#c2410c`) is used only on the primary CTA fill. It is never used for headings, links, decoration, or hover states. Its job is to mark the one place the reader is asked to act. Repeating it anywhere dilutes the signal.

**The No-Black Rule.** `#000` is forbidden. All "blacks" use Ink (`#171717`), which carries a faint warmth that belongs on cream. Pure black on cream reads as harsh and breaks the editorial-warm tone.

**The Teal-Carries-Voice Rule.** Teal, not orange, is the studio's spoken voice on the page. Links, the POV block, the offer block, primary text accents: all teal. Orange is action; teal is thought.

## 3. Typography

**Display Font:** Lora (Georgia fallback). A humanist serif by Cyreal: warm, slightly contemporary, designed for screen text. Carries the studio's voice in headlines and section titles.

**Body Font:** Plus Jakarta Sans (ui-sans-serif fallback). A geometric-humanist sans with warm terminals. Pairs with Lora because both share a slight warmth; neither tilts cold or technical.

**Character:** A working editorial pairing. Lora gives the page authority and warmth; Plus Jakarta gives the body legibility at small sizes without the genericness of Inter or Geist. Together they read as "a writer who designs" rather than "a tool that ships."

### Hierarchy
- **Display** (Lora 500, `clamp(2.75rem, 6vw, 5.5rem)`, line-height 1.05, letter-spacing -0.015em). Hero headline only. Tight tracking belongs here, where the optical bunching helps the headline read as one shape.
- **Headline** (Lora 500, `clamp(1.875rem, 3vw, 3rem)`, line-height 1.1, letter-spacing -0.01em). Section titles across POV, Problem, Process, Work, Offer, About, CTA. Slightly looser tracking than Display.
- **Title** (Lora 500, `1.5rem`, line-height 1.2, letter-spacing normal). Card titles, sub-section headings. Normal tracking because small serif sets tighter than it reads.
- **Body** (Plus Jakarta 400, `1.125rem`, line-height 1.625, letter-spacing normal). Paragraph body across all sections. Max line length 65 to 75 characters per line.
- **Label** (Plus Jakarta 500, `0.875rem`, line-height 1.4, letter-spacing normal). Nav links, footer text, card meta (client name, date).

### Named Rules

**The Body-Has-Air Rule.** Body copy uses normal letter-spacing and `line-height: 1.625`. The tight tracking that makes display type sing makes body type cramp. Negative tracking is permitted only on Display and Headline; never on Body, never globally on the `<body>` element.

**The One Serif Rule.** Lora is the only serif. Plus Jakarta is the only sans. No third typeface. No mono. No icon font. If a heading needs to feel different, change its size or weight, not its family.

## 4. Elevation

The system is flat. There are no `box-shadow` tokens because the design never reaches for one. Depth is conveyed by **tonal layering** between section backgrounds: a cream section is the default surface, a panel section is the recessed (one warm step darker) surface, a teal section is the emphasised surface where the studio's voice carries. Cards on a cream surface use panel as their fill; cards on a panel surface would use cream.

### Named Rules

**The No-Shadow Rule.** `box-shadow` is forbidden on every component (buttons, cards, callouts, navigation). Depth is communicated by background colour and adjacency, never by drop shadow, inner shadow, or border glow.

**The Tonal-Layering Rule.** Section sequence creates rhythm: cream, panel, teal (where the voice carries), cream, panel. Adjacent sections never share the exact same background colour. The colour break IS the section break.

## 5. Components

Components are **hand-set and direct**: 2px corners, no shadows, no decorative borders, no hover-lift animations. They feel like elements set on a page, not affordances built for a touchscreen. Type carries identity; surfaces stay quiet.

### Buttons
- **Shape:** Near-zero radius (2px, token `rounded.sm`). Buttons read as small slabs of colour, not pills.
- **Primary:** Burnt Orange fill (`#c2410c`), white text. Padding `0.625rem 1rem`. Used only for the booking CTA ("Start with a teardown"). Hover keeps the colour; the press state (single-pixel `translateY` on active) is the only motion.
- **Secondary:** Panel Tan fill, Ink text. Padding `0.5rem 0.875rem`. Used for non-primary actions and nav controls.
- **Ghost:** Transparent fill, Ink text. Hover background is Panel Tan. Used for icon-only nav (mobile menu trigger).
- **Link:** Teal text, underline offset 4px, underline appears on hover. Used inline (Hero "See the work" secondary action, Footer "Book a teardown").
- **Focus:** 3px teal ring at 50% opacity. The same ring on every variant.

**Open question.** Current default button height is 32px. The hero primary CTA inherits that size and reads small for its position. Worth re-deciding whether the hero CTA should use a larger size variant; this spec leaves that decision open for a follow-up.

### Cards
- **Corner Style:** 2px (token `rounded.sm`), matching buttons.
- **Background:** Panel Tan on cream sections; Cream on panel sections. Teal block on cream when the card is the offer or featured surface.
- **Shadow Strategy:** None. (See The No-Shadow Rule.)
- **Border:** None by default. Warm Border is only used on inputs, not on cards.
- **Internal Padding:** `1.5rem` for work cards; `2rem` to `3rem` for the offer block.

### Callouts (inline bullets)
- Cream fill on a panel section, Ink text at 90% opacity. 2px radius. Padding `1rem 1.25rem`.
- Used in the Problem section bullets. Never icon-prefixed; the bullet copy itself does the work.

### Navigation
- **Header:** Cream background, panel underline. Wordmark in Lora 600 at 18px; nav links in Plus Jakarta 500 at 14px. Hovered nav links shift to teal.
- **Mobile:** Sheet drawer from the right. Ghost trigger button with a Lucide `MenuIcon` at 16 to 20px. The wordmark in the drawer header uses Lora.

### Footer
- Panel Tan background, top border in panel. Wordmark and tagline on the left; booking link and copyright on the right. Soft Teal for the tagline and copyright; Teal for the booking link.

## 6. Do's and Don'ts

### Do:
- **Do** use Ink (`#171717`), not `#000`, for every "black" on the page.
- **Do** reserve Burnt Orange (`#c2410c`) for the primary CTA fill only. Anywhere else is a violation of The One Accent Rule.
- **Do** use teal for the studio's voice: links, the POV block, the offer block, list numbering, focus rings.
- **Do** set body copy at `line-height: 1.625` with normal letter-spacing. Tight tracking belongs on Display and Headline only.
- **Do** keep buttons and cards at 2px corners. Type carries identity; shape stays quiet.
- **Do** convey depth through background-colour shifts between sections, not through shadow or elevation.
- **Do** keep paragraph line length within 65 to 75 characters per line.

### Don't:
- **Don't** apply negative letter-spacing globally on `<body>`. It cramps every paragraph on the page. Scope tight tracking to Display and Headline classes only.
- **Don't** use `box-shadow` on any component. No card shadows, no button shadows, no hover-lift. The system is flat.
- **Don't** make buttons or cards more than 4px rounded. Pill buttons and 12px-plus radii pull the system back toward generic SaaS.
- **Don't** reach for gradient text, `background-clip: text`, or any decorative gradient. Single solid colors only.
- **Don't** use a third typeface, an icon font, or a mono font. Lora and Plus Jakarta are the entire type system.
- **Don't** ship the **Generic SaaS landing** reflex: centered hero with gradient text, icon-and-stat card grid, "trusted by" logo wall, parallax scenes.
- **Don't** ship the **"AI startup"** reflex: neon-on-black, terminal vibe, dark mode by default, glowing-orb illustrations. The site is about AI products; the design is not.
- **Don't** ship the **Agency template** reflex: parallax everything, glassmorphism, oversized motion, scroll-jacking, "creative studio" bravado.
- **Don't** ship the **Sober fintech / consultancy** reflex: navy and gold, stock photography of handshakes, "Trusted by Fortune 500" framing.
- **Don't** add motion beyond colour transitions on links. Any future motion must honour `prefers-reduced-motion`.
