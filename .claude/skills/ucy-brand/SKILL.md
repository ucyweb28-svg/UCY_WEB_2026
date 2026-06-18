---
name: ucy-brand
description: >
  UCY Studio brand system — palette, typography, components, animations, and pricing rules
  for the UCY_WEB_2026 Next.js project. Consult this skill whenever you're building,
  editing, or reviewing ANY component, section, or page element in this codebase — even if
  the request seems simple. Mandatory for: color choices, backgrounds, typography (Syne/DM
  Sans), CTA buttons (GlowButton), badges, animations (ScrollReveal/Framer Motion variants),
  pricing display (always source from lib/utils/pricing.ts), new service/stays pages, icon
  usage (Phosphor), commit message formatting, and anything touching globals.css or
  public/logo.svg. When in doubt, check here first — it prevents palette drift, off-brand
  type choices, and broken builds.
---

# UCY Studio — Brand System

Stack: **Next.js 14 App Router · TypeScript strict · Tailwind CSS v4 · Framer Motion · next-intl (FR/EN) · @phosphor-icons/react**

---

## Palette

These are the only permitted colors for backgrounds, text, borders, and decorative elements. Never introduce colors outside this set.

| Token | Hex | CSS variable | Tailwind class |
|---|---|---|---|
| Ink (near-black) | `#000807` | `--color-black` | `bg-black` / `text-black` |
| White | `#FBF9FF` | `--color-bg` | `bg-bg` / `text-bg` |
| Purple | `#3626A7` | `--color-accent` | `bg-accent` / `text-accent` |
| Pink | `#DF57BC` | `--color-pop` | `bg-pop` / `text-pop` |
| Orange | `#DE541E` | `--color-energy` | `bg-energy` / `text-energy` |

**Gradient (brand signature):** `linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)`
- Animated variant: `gradientShift` keyframe (300% background-size, 4 s) — used on GlowButton gradient variant and glow shadow
- **Never** remove or modify the `gradientShift` or `gradient-shift` keyframes in `globals.css`

**Section background rule:** All section `background-color` values must be palette colors only — `#000807`, `#FBF9FF`, `#3626A7`, `#DF57BC`, or `#DE541E`. No grays, no off-whites, no arbitrary HEX.

---

## Typography

| Role | Font | Weight | CSS variable |
|---|---|---|---|
| Headings | Syne | 700–800 | `--font-heading` / `font-heading` |
| Body / UI | DM Sans | 400, 500, 600 | `--font-sans` / `font-sans` |
| Stays pages only | Trap (local) | variable | `font-trap` utility |
| Stays pages only | Montserrat | variable | `font-montserrat` utility |

**Rules:**
- All `<h1>`–`<h3>` and hero headlines → `font-heading` (Syne)
- Body copy, labels, badges, captions, nav links → `font-sans` (DM Sans)
- Never use system fonts (Inter, Arial, Roboto) in UCY Studio pages
- Stays section gets `font-trap` for display headings and `font-montserrat` for body — do not mix Syne into Stays

---

## CSS utilities (globals.css)

| Class | Effect |
|---|---|
| `gradient-text` | Animated gradient text (Purple→Pink→Orange→Purple), cycles every 4 s |
| `animate-gradient` | Shifts background-position (200% size, 3 s) |
| `no-scrollbar` | Hides scrollbar cross-browser |
| `nav-fullscreen-link` | Nav link hover gradient reveal |

**Helper:** `import { gradientText } from '@/lib/utils/gradientText'` returns the string `'gradient-text'` — use it instead of hardcoding the class name.

---

## UI Components

### GlowButton — `components/ui/GlowButton.tsx`

Primary CTA button with animated glow shadow on hover.

```tsx
import { GlowButton } from '@/components/ui/GlowButton';

<GlowButton href="/devis" variant="dark">Démarrer un projet</GlowButton>
<GlowButton href="/contact" variant="gradient">Nous contacter</GlowButton>
<GlowButton href="/pricing" variant="white">Voir les tarifs</GlowButton>
```

| Variant | Background | Text | Use case |
|---|---|---|---|
| `dark` (default) | `#0a0a0a` | white | On light backgrounds (sections bg-bg) |
| `gradient` | animated gradient | white | Hero CTAs, high-emphasis actions |
| `white` | `#ffffff` | `#0a0a0a` | On dark/color backgrounds |

Props: `href` (required), `children` (required), `variant?`, `external?`, `onClick?`, `className?`, `style?`.

Never render a plain `<a>` or `<button>` as primary CTA — always use GlowButton.

---

### Badge — `components/ui/Badge.tsx`

Section kicker / pill label.

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge>Notre approche</Badge>             {/* default — purple border on white */}
<Badge variant="dark">Innovation</Badge>  {/* white border on dark bg */}
```

Always place a Badge as the kicker above section headings. Render text in `uppercase tracking-widest text-xs font-sans`.

---

### ScrollReveal — `components/ui/ScrollReveal.tsx`

Scroll-triggered `opacity 0→1 + y 16→0` reveal. Wrap every section content block in it.

```tsx
import { ScrollReveal } from '@/components/ui/ScrollReveal';

<ScrollReveal delay={0}>    {/* heading */}
<ScrollReveal delay={0.1}>  {/* subheading */}
<ScrollReveal delay={0.2}>  {/* body / CTA */}
```

`delay` is in seconds. Stagger sibling elements by 0.07–0.12 s. `once: true` — triggers only on first entry.

---

### GradientGlow — `components/ui/GradientGlow.tsx`

Decorative blurred blob. Use sparingly for atmospheric depth; never as a background fill.

---

## Animation System — `lib/utils/animations.ts`

Always import variants from here. Never define ad-hoc Framer Motion variants in component files.

```ts
import { fadeUp, fadeUpSubtle, stagger, staggerHero, staggerCards, EASE_REVEAL } from '@/lib/utils/animations';
```

| Export | Use case |
|---|---|
| `fadeUp` | Standard reveal (opacity+y, 0.6 s) |
| `fadeUpSubtle` | Lighter reveal for UI details (0.5 s, y:10) |
| `staggerHero` | Hero children — 0.12 s between items |
| `stagger` | Section headers and general content — 0.07 s |
| `staggerCards` | Card/grid layouts — 0.07 s |
| `staggerNav` | Nav links — 0.04 s |
| `EASE_REVEAL` | `[0.25, 0.1, 0.0, 1]` — use as `ease` in manual transitions |

**Pattern for staggered sections:**
```tsx
<motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  <motion.h2 variants={fadeUp}>…</motion.h2>
  <motion.p variants={fadeUpSubtle}>…</motion.p>
</motion.div>
```

---

## Section Anatomy

Every new section follows this structure. Dark and light variants differ only in background and Badge/text color.

### Light section (bg `#FBF9FF`)
```tsx
<section style={{ backgroundColor: '#FBF9FF', padding: '96px 0' }}>
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
    <ScrollReveal>
      <Badge>Kicker label</Badge>
    </ScrollReveal>
    <ScrollReveal delay={0.07}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#000807' }}>
        Titre section
      </h2>
    </ScrollReveal>
    <ScrollReveal delay={0.14}>
      <p style={{ fontFamily: 'var(--font-sans)', color: '#000807' }}>…</p>
    </ScrollReveal>
    <ScrollReveal delay={0.21}>
      <GlowButton href="/devis" variant="dark">CTA</GlowButton>
    </ScrollReveal>
  </div>
</section>
```

### Dark section (bg `#000807`)
```tsx
<section style={{ backgroundColor: '#000807', padding: '96px 0' }}>
  {/* Badge variant="dark", text colors white or #FBF9FF */}
  <Badge variant="dark">Kicker</Badge>
  <h2 style={{ color: '#FBF9FF', fontFamily: 'var(--font-heading)' }}>…</h2>
  <GlowButton href="/contact" variant="white">CTA</GlowButton>
</section>
```

---

## Icons — @phosphor-icons/react

```tsx
import { ArrowRight, Check, Sparkle, X, List } from '@phosphor-icons/react';

<ArrowRight size={20} weight="bold" />
```

- Always use Phosphor icons — never raw SVG paths or emoji in UI
- Default weight: `"bold"` for UI icons, `"regular"` for decorative
- Size: 16–20 px for inline, 24–32 px for standalone decorative

---

## Pricing — source of truth: `lib/utils/pricing.ts`

**Rule: Never hardcode prices or pack names in component JSX.** Always import from `lib/utils/pricing.ts`.

```ts
import { PRICING_PACKS, PRICING_OPTIONS, formatPrice } from '@/lib/utils/pricing';
```

### Packs

| id | EUR | ILS | featured |
|---|---|---|---|
| `presence` | 990 € | ₪3 400 | — |
| `conversion` | 1 990 € | ₪6 800 | ✓ |
| `autonomie` | 3 490 € | ₪11 900 | — |

### Options à la carte

| id | EUR | ILS | from prefix |
|---|---|---|---|
| `redaction` | from 290 € | from ₪990 | yes |
| `visuels` | 390 € | ₪1 350 | — |
| `photo` | 690 € | ₪2 350 | — |
| `seo` | 490 € | ₪1 690 | — |

`PricingPack.featured = true` on `conversion` — renders it highlighted (dark bg, gradient border, etc.).

All copy is i18n-keyed (e.g. `pack_presence_title`) — never render raw English strings in pricing cards.

---

## Code Rules

| Rule | Detail |
|---|---|
| **No hardcoded API keys** | Use `.env.local` + `process.env.*` only |
| **TypeScript** | Run `tsc --noEmit` before every commit — fix all errors |
| **Commits** | English only: `feat:`, `fix:`, `chore:`, `refine:`, `revert:` + short description |
| **i18n** | Every user-visible string goes in `lib/i18n/fr.json` + `lib/i18n/en.json` |
| **Imports** | Use `@/` path alias — never relative `../../` imports |

---

## Untouchable Files

Never modify these files under any circumstances:

- `app/globals.css` → `gradientShift` keyframe (and `gradient-shift`)
- `public/logo.svg` — master logo source
- `public/images/ai-bg.jpg` — AISection background
- `public/images/process-bg.jpg` — homepage ProcessSection background
- `public/images/process-bg2.jpg` — service detail ProcessSection background
- DNS / Vercel Pro deployment config

---

## Quick Reference — "What do I use for…?"

| Task | Answer |
|---|---|
| Primary CTA on light bg | `<GlowButton variant="dark">` |
| Primary CTA on dark bg | `<GlowButton variant="white">` |
| Hero / high-emphasis CTA | `<GlowButton variant="gradient">` |
| Section kicker on light bg | `<Badge>` (default) |
| Section kicker on dark bg | `<Badge variant="dark">` |
| Animated gradient headline | add `className={gradientText}` to heading |
| Scroll-triggered reveal | wrap in `<ScrollReveal delay={n}>` |
| Staggered list/grid | `motion.div variants={staggerCards}` + children `variants={fadeUp}` |
| Pricing card data | import `PRICING_PACKS` from `@/lib/utils/pricing` |
| Icon | `import { IconName } from '@phosphor-icons/react'` |
| Dark section bg | `backgroundColor: '#000807'` |
| Light section bg | `backgroundColor: '#FBF9FF'` |
| Purple accent section | `backgroundColor: '#3626A7'` |
