# ModelRouter landing page — design spec

Status: placeholder shipped; the real page (T8.5) builds on the theme reference below.

## Constraints (locked)
- One self-contained file: src/index.html — inline CSS, no build step,
  no external resource loads (fonts, scripts, images inlined or system).
- src/ holds exactly two files: index.html and this file. CI enforces it.
- Every push to main touching src/ auto-deploys to Vercel production.

## Guidelines (from the user)
The Chantlings style reference under "## Theme reference (verbatim)" below is
the design source for T8.5. Adapt its system to ModelRouter — map, don't copy:
ember = the router's signals, the install one-liner is the single chromatic
action, copy comes only from README.md / DEMO.md / docs/how-it-works.md.

## Decisions
- 2026-07-13: placeholder page ships first so the pipeline is proven
  end-to-end before the real design lands.
- 2026-07-13: theme reference (Chantlings) folded in verbatim at T8.0; it
  supersedes the "pending guidelines" placeholder from the original scaffold.
- 2026-07-13: pipeline e2e probe — this line proves push→deploy works.
- 2026-07-13 (T8.5): the real page shipped. Design Read: a developer-tool
  launch page for design-conscious Claude Code users, ceremonial
  candlelit-void language mapped from the Chantlings reference below.
  Dials (taste-skill): VARIANCE 7 / MOTION 3 / DENSITY 2.
- 2026-07-13 (T8.5): stack decision: hand-crafted vanilla HTML/CSS, no
  build chain, no JS. The ceremonial static aesthetic gains nothing from
  React/Tailwind, and one hand-authored file is the most reviewable form
  of the self-containment constraint. Fonts: Cormorant Garamond 300
  roman + italic (the spec's Mija substitute) embedded as base64 woff2
  data URIs (latin subsets, ~22 KB each); zero external requests.
- 2026-07-13 (T8.5): theme mapping (map, don't copy): ember #ffaa20 is
  reserved for the router's signals (route/escalation arrows, the stats
  headline) and the install block border, which takes the App Store
  badge role as the page's single chromatic action; the ghost phone
  becomes an empty ghost terminal outline; the creature section becomes
  the /router:stats card, quoted verbatim from README.md and captioned
  as the seeded sample. #ff8800 (Amber Glow) is unused: no surface
  earned a chromatic fill. All copy from README.md / DEMO.md /
  docs/how-it-works.md only.
- 2026-07-13 (T8.5): recorded taste-skill overrules (theme spec wins per
  the phase instruction): single dark theme, no light variant ("the void
  is the brand"); Bone stays pure #ffffff (named brand token); no
  photography or generated imagery (the layout vocabulary is wordmark,
  artifact, and silence); the install command wraps inside its badge on
  mobile (it is a copyable command, not a button label); em-dashes in
  quoted README copy re-punctuated, claims unchanged.

- 2026-07-13 (T8.7): landing page v2, rebuilt on the user's launch feedback.
  Priority order used throughout: user feedback > theme reference below >
  taste-skill defaults. Identity kept (obsidian void, graphite hairlines,
  one ember accent, Cormorant display); dosage changed.
  Dials: VARIANCE 7 / MOTION 5 / DENSITY 5 (v1 was 7 / 3 / 2).
- 2026-07-13 (T8.7): typography. Body is now Cormorant Garamond 400 (roman
  + italic, same base64 woff2 pipeline, latin subset); 300 stays for
  display only. At 20-23px the 300 weight read as too thin, and the
  feedback ranks readability over delicacy. Reading sizes: body 20-21px,
  lede 23px, measures widened to 66-68ch. The Chantlings type scale
  (14/20/24/25/32) is therefore overruled upward.
- 2026-07-13 (T8.7): the ghost terminal is no longer empty. docs/demo.gif
  (880x520, 3.3 MB, 90s) is re-encoded to H.264 (12 fps, crf 30, 727 KB)
  and embedded as a base64 data URI: same visual, ~4.5x smaller, still one
  self-contained file (the two-file CI guard makes a separate asset file
  impossible). Muted, looping, playsinline. This overrules the theme's
  "the product is implied, never demonstrated" rule: the demo is the proof
  the page exists to deliver.
- 2026-07-13 (T8.7): the page has JS now, reversing v1's no-JS decision.
  It buys three things the feedback asked for and nothing else: a copy
  button on the install one-liner (navigator.clipboard, "Copied" announced
  via aria-live, a Cmd-C fallback when the API is unavailable), a
  play/pause control on the demo, and IntersectionObserver scroll reveals.
  No libraries, no scroll listeners, ~40 lines inline.
- 2026-07-13 (T8.7): motion. Hero load-in cascade, scroll reveals with a
  staggered signal list, hover and active physics on the button and links,
  and one ambient signal: the install border breathes ember (the router's
  pilot light). All of it collapses to static under prefers-reduced-motion,
  where the demo also stays on its first frame behind a Play control.
- 2026-07-13 (T8.7): narrative is benefit-first now, not atmospheric. Arc:
  the outcome (make your Max plan last the whole week) and the demo, then
  What you get, then The payoff (the stats card, still verbatim and still
  captioned as a seeded sample), then How it works, then Install. Every
  claim still traces to README.md / DEMO.md / docs/how-it-works.md.
- 2026-07-13 (T8.7): spacing. Section padding 60px desktop / 44px mobile
  (v1: 100/72), heading gaps 28px (v1: 64px), hero pulled together. The
  theme's 100-196px ceremonial vertical rhythm is explicitly overruled by
  the feedback; horizontal padding stays generous (84px at 1440).
- 2026-07-13 (T8.7): shape rule, stated so it stays consistent: surfaces
  (install block, terminal, stats card) are 6px radius, buttons are full
  pill. The Copy button is the theme's single filled chromatic action
  (ember fill, obsidian text, 8.3:1).
- 2026-07-13 (T8.7): codex review (xhigh) caught the stats card and its
  caption clipping between 900 and 1120px; the pair now stacks below
  1120px. Reviewed against a build carrying real font and video payloads,
  not placeholders.

- 2026-07-13 (T8.8): the copy button carries a real copy icon now (Tabler
  Icons, MIT, inlined as SVG paths because the page loads nothing
  external), label kept beside it. On a successful copy the icon swaps to
  a check while the aria-live region announces "Copied"; the failure path
  keeps the copy icon and offers the Cmd-C fallback.
- 2026-07-13 (T8.8): every italic is set one step heavier than its roman.
  Cormorant's italic reads optically lighter than its roman at the same
  weight, which left the small italic UI text (install label, captions,
  terminal label, trust line) looking frail. Those go to 500 (new 500
  italic face embedded); the display italic in the headline goes to 400
  against the 300 roman. The 300 italic face is dropped: nothing is set
  that light any more, so it was 30 KB of dead payload.

## Theme reference (verbatim)

# Chantlings — Style Reference
> Candlelit cave, ember in the void

**Theme:** dark

Chantlings lives in near-total darkness — a cinematic, candlelit void where warm amber punctuations glow against deep charcoal. The entire interface is built from three near-black neutrals and one whisper-quiet serif (Mija) used exclusively at weights 100 and 300, which gives every word the quality of breath or breath-of-sound. Color appears only as a single warm flicker: the App Store badge border, the creature's eyes, the faintest hint of a button fill — never decoration, always a tiny signal of life. Layout breathes with extreme generosity (100–196px horizontal padding, 65–100px section gaps), and surfaces are essentially flat with hairline borders, never elevated by shadow. The result is an intimate, almost ceremonial product page that treats negative space as a primary material.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Obsidian | `#222222` | `--color-obsidian` | Page background, deep surface layer — the cavern floor of the design |
| Graphite | `#333333` | `--color-graphite` | Dominant structural neutral — card borders, icon strokes, dividers, link underlines. Far more present than its visual weight suggests; carries 90% of the UI scaffolding |
| Bone | `#ffffff` | `--color-bone` | Primary text, card border highlights, inverse surface moments — the only luminance in the system |
| Ember | `#ffaa20` | `--color-ember` | Accent signal color — App Store badge border, link underlines, the creature's eyes and highlights. Warm amber against graphite creates a firelight-in-darkness effect, not a CTA color |
| Amber Glow | `#ff8800` | `--color-amber-glow` | Filled button background — the single chromatic fill in the system. Deeper, more saturated than Ember; used sparingly to mark the one real interactive surface (App Store download) |

## Tokens — Typography

### Mija — The only typeface. Display and body both drawn from this single family. Weight 100 is the brand's signature — used for the 'Chantlings' wordmark and headlines, creating an almost handwritten, incense-thin quality. Weight 300 handles body and UI text. The custom nature means no system-font fallback can match the optical contrast between its hairlines and thicker strokes. · `--font-mija`
- **Substitute:** Cormorant Garamond (weight 300) or Italiana for display; for body, pair with Cormorant at 300 or use a humanist sans like Lora at 300
- **Weights:** 100, 300
- **Sizes:** 14, 20, 24, 25, 32
- **Line height:** 0.80–1.50 (display uses 0.80–1.06 tight leading; body uses 1.33–1.50)
- **Letter spacing:** normal across all sizes — Mija's own spacing is designed for its hairline weights
- **Role:** The only typeface. Display and body both drawn from this single family. Weight 100 is the brand's signature — used for the 'Chantlings' wordmark and headlines, creating an almost handwritten, incense-thin quality. Weight 300 handles body and UI text. The custom nature means no system-font fallback can match the optical contrast between its hairlines and thicker strokes.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 14px | 1.5 | — | `--text-caption` |
| body | 20px | 1.42 | — | `--text-body` |
| subheading | 24px | 1.33 | — | `--text-subheading` |
| heading-lg | 32px | 1.06 | — | `--text-heading-lg` |
| display | 56px | 0.83 | — | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 24 | 24px | `--spacing-24` |
| 40 | 40px | `--spacing-40` |
| 100 | 100px | `--spacing-100` |
| 108 | 108px | `--spacing-108` |
| 196 | 196px | `--spacing-196` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 0px |
| icons | 0px |
| buttons | 50px |

### Layout

- **Page max-width:** 1440px
- **Section gap:** 100px
- **Card padding:** 24px
- **Element gap:** 10px

## Components

### App Store Badge (Outlined)
**Role:** Primary download entry — the only filled chromatic surface in the system

Black background with white Apple logo and 'Download on the App Store' text. Wrapped in an Ember (#ffaa20) border, ~1px, giving the badge a candlelit outline against the void. Rounded with 4–8px radius. The chromatic border is what makes this the singular action element on the page.

### Display Wordmark
**Role:** Brand headline — the 'Chantlings' hero title

Mija weight 100, ~56px, line-height 0.83, white (#ffffff). Extremely tight leading causes the glyphs to nearly touch. This near-touching is a signature — the wordmark reads as a single drawn shape rather than discrete letters. No tracking adjustment; Mija's default spacing at this weight creates the effect.

### Hero Subhead
**Role:** Supporting description beneath the wordmark

Mija weight 300, ~20px, line-height 1.42, white. Max-width ~280px so the copy stays as a compact whisper column aligned left. Generous vertical gap (24–40px) between wordmark and subhead.

### Phone Frame Mockup
**Role:** Product device outline in the hero composition

Pure outline (no fill, no screen content) rendered in Graphite (#333333) at ~1px stroke. The phone is a ghost — a suggestion of hardware rather than a screenshot. ~340px wide, positioned right of the wordmark, roughly vertically centered with the headline.

### Hamburger Menu
**Role:** Top-right navigation trigger

Two thin white (#ffffff) horizontal lines, 1px stroke, ~24px wide total. Sits at top-right with 100–108px from the right edge. No background, no border — just two marks.

### Brand Mark
**Role:** Top-left logo — a small paired-circle glyph

Two overlapping circles in white (#ffffff), ~32px, positioned 100–108px from the left edge. Functions as a wordmark substitute; no type accompanies it.

### Abstract Background Polygons
**Role:** Atmospheric depth — large dark geometric shapes

Faceted, shard-like polygons in shades slightly darker or lighter than the #222222 canvas (near-black with the faintest warm tint). Positioned around the page edges (left, right, bottom) as a decorative void-within-void. No stroke, flat fill, overlap the page edge to feel infinite.

### Creature Illustration
**Role:** Product character — the Chantling mascot

A small bulb-shaped character with two round Ember (#ffaa20) eyes. Body is a warm brown-orange gradient (deep amber to near-black at edges). Centered on its own dark section, floating in the void. Functions as the emotional anchor — the only living form in an otherwise still composition.

### Ghost Link
**Role:** Text link in body copy

No underline by default; on hover or active, receives a 1px Ember (#ffaa20) bottom border. Text remains white. The chromatic border is the only state change — no fill, no color shift on the text itself.

### App Store Filled Button
**Role:** Alternative primary action — solid variant

Amber Glow (#ff8800) background, dark text, 50px radius (full pill), 18px vertical / 23px horizontal padding. This is the only filled chromatic button in the system; used only when the outlined App Store badge is insufficient.

## Do's and Don'ts

### Do
- Use Mija weight 100 for any display or wordmark-sized text — its hairline strokes are the brand's voice, not a stylistic choice you can substitute.
- Set the page background to #222222 and let the surface stack be nearly invisible; use 1px #333333 hairline borders to delineate cards, never background-color shifts.
- Reserve #ffaa20 and #ff8800 for signals of life in the dark — the App Store badge, the creature's eyes, one filled button. Never use them for large fills, backgrounds, or decoration.
- Use 100–108px horizontal page padding at desktop and let sections breathe with 65–100px vertical gaps. Density must feel ceremonial, not efficient.
- Use 50px radius for pill buttons and 0px radius for everything else — the geometry should read as a single rounded action against a sea of sharp rectangular surfaces.
- Let the hamburger menu be two white lines on the dark canvas with no chrome. The top bar is a whisper, not a banner.
- Let the phone mockup be an empty outline with no screen content. The product is implied, never demonstrated.

### Don't
- Do not add drop shadows, glows, or any elevation effects — the system defines itself through the absence of lift. A shadow here would break the flatness that makes the amber accents glow.
- Do not use any font other than Mija for the wordmark or headlines. System fonts at any weight will read as a different product.
- Do not introduce additional accent colors. The warm amber is the only chromatic note; adding blue, green, or red would shatter the candlelit palette.
- Do not use light-theme variants or white backgrounds. The void is the brand — a white page would feel like a different product entirely.
- Do not add icons with fills or multicolor treatments. Icons in this system are 1px graphite (#333333) or white (#ffffff) strokes only.
- Do not tighten horizontal padding below 80px at desktop. The 100–196px breathing room is what makes the design feel intimate rather than crowded.
- Do not use the App Store badge's amber border for anything other than that one element. It is the only outlined-chromatic element in the system by design.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#222222` | Page canvas — the full dark stage on which everything floats |
| 1 | Hollow | `#1a1a1a` | Implicit card surface — barely distinguishable from the canvas; the system relies on hairline graphite borders rather than tonal steps to define cards |
| 2 | Edge | `#333333` | Hairline borders and icon strokes — the only visible 'lift' cue in the entire system |

## Elevation

The system is deliberately shadowless. Surfaces are distinguished only by hairline 1px borders in #333333 and by their position in an extremely compressed value range (#222222 → #1a1a1a → #333333). Elevation is communicated through outline, not depth — a card next to the canvas is the same color as the canvas with a 1px graphite line drawn around it. This flatness is what allows the single warm amber accent to feel luminous; in a shadow-heavy system, that same amber would compete with subtle drop shadows and lose its candlelight quality.

## Imagery

Two modes coexist: abstract atmospheric geometry and a single illustrated character. The background uses large, faceted dark polygons — shard-like forms in near-black tones that overlap the page edges to create an infinite-cave feeling. No photography, no product screenshots, no gradients. The hero pairs this void with a ghost-outline phone frame. The second section centers a single illustrated creature: a small bulb-shaped figure with glowing amber eyes and a warm brown-orange body, floating alone in darkness. The illustration style is flat with soft gradient transitions, no outlines, no texture — it reads as a digital painting of a living candle. Icons throughout the UI are absent or minimal; the hamburger is two white strokes, the logo is two overlapping circles. The overall visual density is very low — the page is mostly negative space with two focal points: the wordmark and the creature.

## Layout

Full-bleed dark sections stacked vertically, no visible section dividers. The hero is a two-column composition at desktop: left column holds the wordmark, subhead, and App Store badge (roughly 40% width, left-aligned with 100–196px page padding), right column holds the ghost-outline phone mockup. The second section is a single centered composition: the creature illustration floats in the middle of the void with vast empty space above and below. The top bar is minimal — small brand mark at top-left, hamburger at top-right, both positioned 100–108px from their respective edges. No sticky header, no sidebar, no navigation rail. The page model is max-width 1440px with extremely generous horizontal padding that makes the content column feel narrow and contemplative. Section rhythm is one hero + one centered illustration + (presumably) additional content sections, all sharing the same dark canvas. There are no card grids, no pricing tables, no feature matrices — the layout vocabulary is wordmark, illustration, and silence.

## Agent Prompt Guide

**Quick Color Reference**
- text: #ffffff
- background: #222222
- border: #333333
- accent: #ffaa20
- primary action: #ff8800 (filled action)

**Example Component Prompts**
1. Create a hero section: #222222 background. Display wordmark 'Chantlings' in Mija weight 100 at 56px, line-height 0.83, color #ffffff, aligned left. Subhead in Mija weight 300 at 20px, line-height 1.42, color #ffffff, max-width 280px, 32px gap below wordmark. App Store outlined badge below subhead with 24px gap, #ffaa20 1px border, 6px radius, 8px 12px padding. Right column: phone mockup outline 1px #333333, ~340px wide, no fill, no screen content. 100px page padding both sides.

2. Create a centered illustration section: full-bleed #222222, no text. A single bulb-shaped creature illustration ~200px tall, centered horizontally and vertically. Body is a warm brown-to-amber gradient with two round #ffaa20 eyes. The creature sits alone with no other elements — the void is the composition.

3. Create a ghost link button: no background, no border, Mija weight 300 at 18px, color #ffffff. On hover, a 1px #ffaa20 bottom border appears. Padding 8px 0. Used inline within body copy, never as a standalone button.

4. Create the top bar: full-bleed transparent over #222222, 100–108px horizontal padding, ~32px vertical padding. Left: two overlapping white circles ~16px each forming the brand mark. Right: two horizontal white lines, 1px stroke, 24px wide total, functioning as a hamburger menu. No background, no border, no shadow.

5. Create an outlined App Store badge: black background, white Apple logo on the left, 'Download on the App Store' in two lines of Mija weight 300 white text on the right. Badge wrapped in a 1px #ffaa20 border with 6px corner radius. Total height ~52px, horizontal padding ~16px. This is the only bordered-chromatic element in the system.

## Similar Brands

- **Things 3 (Cultured Code)** — Same whisper-thin serif treatment against dark backgrounds, with a single warm accent used as functional punctuation rather than decoration
- **Are.na** — Same generous negative space, near-total darkness, and hairline-only surface treatment — content floats in a void rather than sitting on a card
- **Teenage Engineering** — Same product-as-artifact presentation: a single illustrated object or product is the page, surrounded by vast dark breathing room with minimal type
- **Kallaway (personal site)** — Same hairline serif on near-black with extreme horizontal padding and a single warm accent color for signals rather than decoration

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-obsidian: #222222;
  --color-graphite: #333333;
  --color-bone: #ffffff;
  --color-ember: #ffaa20;
  --color-amber-glow: #ff8800;

  /* Typography — Font Families */
  --font-mija: 'Mija', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 14px;
  --leading-caption: 1.5;
  --text-body: 20px;
  --leading-body: 1.42;
  --text-subheading: 24px;
  --leading-subheading: 1.33;
  --text-heading-lg: 32px;
  --leading-heading-lg: 1.06;
  --text-display: 56px;
  --leading-display: 0.83;

  /* Typography — Weights */
  --font-weight-thin: 100;
  --font-weight-light: 300;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-24: 24px;
  --spacing-40: 40px;
  --spacing-100: 100px;
  --spacing-108: 108px;
  --spacing-196: 196px;

  /* Layout */
  --page-max-width: 1440px;
  --section-gap: 100px;
  --card-padding: 24px;
  --element-gap: 10px;

  /* Border Radius */
  --radius-full: 50px;

  /* Named Radii */
  --radius-cards: 0px;
  --radius-icons: 0px;
  --radius-buttons: 50px;

  /* Surfaces */
  --surface-void: #222222;
  --surface-hollow: #1a1a1a;
  --surface-edge: #333333;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-obsidian: #222222;
  --color-graphite: #333333;
  --color-bone: #ffffff;
  --color-ember: #ffaa20;
  --color-amber-glow: #ff8800;

  /* Typography */
  --font-mija: 'Mija', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 14px;
  --leading-caption: 1.5;
  --text-body: 20px;
  --leading-body: 1.42;
  --text-subheading: 24px;
  --leading-subheading: 1.33;
  --text-heading-lg: 32px;
  --leading-heading-lg: 1.06;
  --text-display: 56px;
  --leading-display: 0.83;

  /* Spacing */
  --spacing-24: 24px;
  --spacing-40: 40px;
  --spacing-100: 100px;
  --spacing-108: 108px;
  --spacing-196: 196px;

  /* Border Radius */
  --radius-full: 50px;
}
```
