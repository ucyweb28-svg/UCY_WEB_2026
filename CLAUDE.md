> Lis aussi architecture.md au début de chaque session — il contient
> l'architecture produit (maison de marques UCY/Studio/Stays/Réseau, mégamenu,
> design system typographique et boutons) et les décisions produit en cours.
> CLAUDE.md reste pour les conventions de code ; docs/architecture.md est la
> référence produit/design (fichier à la racine du repo).

# UCY Studio — CLAUDE.md
Last updated: June 2026

## Project
- Repo: github.com/ucyweb28-svg/UCY_WEB_2026
- Live: ucyweb.fr / Staging: ucy-web-2026.vercel.app
- Stack: Next.js 14 App Router · TypeScript strict · Tailwind CSS v4
  · Framer Motion · next-intl (FR/EN) · Resend · Plausible
  · @phosphor-icons/react

## Palette
- Ink: #000807
- Pink: #DF57BC
- Purple: #3626A7
- Orange: #DE541E
- White: #FBF9FF
- Gradient: linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)

## Fonts
- Headings: Syne 700-800
- Body: DM Sans 400/500/600

## Rules (never break these)
- Never hardcode API keys
- Always run tsc --noEmit before committing
- Commits in English: feat/fix/chore: description
- All backgrounds must use palette colors only
- Never touch globals.css gradientShift keyframe

## Architecture

### App routes
- `app/layout.tsx` — root layout
- `app/[locale]/layout.tsx` — locale layout (fonts, Nav, Footer, AnnouncementBanner, i18n provider)
- `app/[locale]/page.tsx` — homepage
- `app/[locale]/contact/page.tsx` — contact page
- `app/[locale]/pricing/page.tsx` — pricing page
- `app/[locale]/devis/page.tsx` — quote request page (3-step form)
- `app/[locale]/mentions-legales/page.tsx` — legal notice page
- `app/[locale]/services/[slug]/page.tsx` — dynamic service detail page
- `app/api/contact/route.ts` — Resend email API route
- `middleware.ts` — next-intl locale middleware
- `i18n/request.ts` — next-intl request config

### components/layout
- `Nav.tsx` — sticky nav, hide-on-scroll, mobile fullscreen menu
- `Footer.tsx` — site footer
- `AnnouncementBanner.tsx` — top announcement bar

### components/sections
- `HeroSection.tsx` — homepage hero
- `TrustStrip.tsx` — client logos marquee
- `StatsBar.tsx` — key stats
- `ServicesSection.tsx` — services grid (homepage)
- `PortfolioSection.tsx` — case studies grid
- `ProcessSection.tsx` — "Notre processus" (dark, Dribbble-style cards)
- `TestimonialsSection.tsx` — testimonials
- `AISection.tsx` — AI differentiator section (dark, atmospheric bg)
- `PricingPreviewSection.tsx` — pricing teaser (homepage)
- `PricingSection.tsx` — full pricing page section
- `AboutSection.tsx` — about / team / manifesto
- `FooterCTA.tsx` — shared bottom CTA with mini contact form (used on homepage + service pages)
- `ContactSection.tsx` — contact page form/section
- `DevisSection.tsx` — 3-step quote request form
- `ServiceDetailSection.tsx` — full service detail page (hero, features, process, related projects)

#### components/sections/stays
- `StaysHero.tsx` — hero section UCY Stays (header clair fond #FBF9FF, sans photo de fond)
- `StaysShowcase.tsx` — carousel photos des logements
- `Collection.tsx` — grille de collections de séjours
- `BrandPillars.tsx` — piliers de marque Stays
- `TrustTeam.tsx` — section équipe/confiance
- `NewBuildDesign.tsx` — section design neuf
- `BecomePartner.tsx` — CTA partenariat propriétaires

### components/ui
- `Logo.tsx` — animated SVG logo
- `ArrowDiag.tsx` — diagonal arrow used site-wide
- `Badge.tsx` — pill badge (light/dark variants)
- `GlowButton.tsx` — primary CTA button (gradient/white/dark variants)
- `GradientGlow.tsx` — decorative gradient glow blob
- `ScrollReveal.tsx` — scroll-triggered reveal wrapper
- `SimpleIcon.tsx` — lightweight inline icon component
- `Button.tsx` — base shadcn/ui button (currently unused)

### components (root)
- `SEO.tsx` — metadata builder, Organization schema, locale types

### lib
- `lib/utils.ts` — shadcn `cn()` helper (clsx + tailwind-merge)
- `lib/utils/animations.ts` — Framer Motion variants (stagger, fadeUp…)
- `lib/utils/formatWhatsAppLink.ts` — WhatsApp link builder
- `lib/utils/gradientText.ts` — gradient text helper
- `lib/utils/pricing.ts` — pricing data source of truth
- `lib/utils/services.ts` — all 8 service pages data
- `lib/i18n/fr.json` / `lib/i18n/en.json` — translation dictionaries

## Pages
- / (homepage — 11 sections)
- /contact
- /pricing
- /devis (3-step form)
- /mentions-legales
- /services/[slug] (8 services: web-design, ui-ux, branding,
  strategie-digitale, seo, application-mobile, maintenance, e-commerce)
- /stays — brand UCY Stays (StaysHero, StaysShowcase carousel photos,
  Collection, BrandPillars, TrustTeam, NewBuildDesign, BecomePartner)

## Key files
- lib/utils/pricing.ts — pricing data source of truth
- lib/utils/services.ts — all 8 service pages data
- components/ui/Logo.tsx — animated SVG logo
- components/ui/ArrowDiag.tsx — diagonal arrow used site-wide
- components/layout/Nav.tsx — hide-on-scroll, mobile menu
- app/api/contact/route.ts — Resend email API
- public/images/ai-bg.jpg — AISection atmospheric background
- public/images/process-bg.jpg — homepage ProcessSection background
- public/images/process-bg2.jpg — service detail process section background
- public/favicon.svg — gradient UCY favicon (source for generated PNGs)
- public/favicon-32x32.png — generated favicon PNG

## Environment variables
- RESEND_API_KEY (in .env.local + Vercel)

## DO NOT TOUCH
- globals.css gradientShift keyframe
- public/logo.svg (source of truth for logo)
- public/images/ai-bg.jpg
- public/images/process-bg.jpg
- public/images/process-bg2.jpg
- DNS records in Hostinger (DKIM, MX, SPF, DMARC)
- Vercel Pro deployment config

## Current state

> **PIVOT JUIN 2026 — Stays mis en pause sur ce domaine.**
> Le code Stays est conservé dans le repo (composants, route /stays) mais n'est plus
> lié ni indexé depuis Studio. Focus exclusif sur Studio jusqu'à nouvel ordre.
> /stays a un noindex/nofollow robot meta — la page migrera sur un domaine séparé plus tard.
> Voir docs/architecture.md section 1 pour le détail du pivot maison de marques.

**Stays — décisions récentes (juin 2026):**
- Hero Stays pivoté vers header clair façon Studio (fond #FBF9FF, pas de photo en fond)
- Système de boutons pill noir unifié sur /stays (remplace les variants précédents)
- Design system typographique chiffré adopté (H1 88/64/40px desktop/tablette/mobile,
  H2 64/48/32px, H3 40/32/24px, Body 18/16/16px) — détail dans docs/architecture.md
- Architecture maison de marques formalisée : UCY (holding) > Studio / Stays / Réseau
- architecture.md ajouté à la racine du repo comme référence produit/design centrale

Last 20 commits:
- `3bcdf6f` revert: AboutSection fully restored to original pre-photo-changes
- `fa48c8e` fix: remove page transition flash on navigation
- `5d8682b` revert: AboutSection restored to original state before photo changes
- `4764193` fix: team photos height reduced to 420px
- `d4cee14` fix: devis page loading state prevents footer flash on navigation
- `9097897` feat: service process section bg image process-bg2 + remove pack timing line
- `9d4b22b` fix: feature card index numbers smaller top-right watermark
- `05c6af6` fix: use Next.js Link scroll=true for pricing→devis navigation
- `c4112b2` revert: Yonathan photo crop back to object-center
- `f15490b` fix: Yonathan photo crop centered on face
- `e8349cd` feat: UCY gradient favicon + updated email logo
- `7de5f3f` feat: Phosphor icons, testimonial quote mark, process card layout, AI title clamp
- `77bf5f8` fix: add missing onClick prop to GlowButton
- `a295183` fix: resolve scrollToTop import error - inline instead
- `b47a3e4` fix: AI section title 2 lines max correct font size
- `fc77754` fix: remove redundant ÉTAPE labels from process cards
- `44307ad` fix: shooting photo dagger symbol replaced with asterisk
- `5c24038` fix: AI section layout 55/45 columns + card pushed right
- `8715494` fix: testimonial quote mark spacing from body text
- `3a6a1d2` feat: process section grain texture background image

**Summary:** A failed Vercel build (missing `scrollToTop` util, then a missing
`onClick` prop on `GlowButton`) was fixed by inlining `window.scrollTo` calls and
extending `GlowButtonProps`. `@phosphor-icons/react` was installed and inline
glyphs (sparkle, checkmarks, arrows, hamburger/close) were replaced with Phosphor
icons across `AnnouncementBanner`, `Nav`, `AISection`, and `ContactSection`. The
homepage `TestimonialsSection` gained a large decorative gradient quote-mark
watermark; the homepage `ProcessSection` cards now align their icon and step
number in the same row; the `AISection` title is clamped to
`clamp(24px, 2.8vw, 40px)` for a 2–3 line max. A new gradient UCY favicon/app
icons and an updated email logo were added (matching logo-mark redesign). On
service detail pages, the feature-card index numbers were reduced to a subtle
32px top-right watermark, the "Notre processus" section gained a
`process-bg2.jpg` background with gradient overlay, and the pack-timing footer
line was removed. The pricing→devis CTA now uses `<Link scroll={true}>` instead
of manual `window.scrollTo` + `router.push`, and `/devis` is `force-dynamic`
with a proper spinner `Suspense` fallback (`@keyframes spin` added to
`globals.css`). A page-transition opacity fade + `::view-transition-*(root)`
reset were added to `app/[locale]/layout.tsx` / `globals.css` to address a
client-side navigation flash. Yonathan's team photo crop and the team photo
card height were each tried, then fully reverted back to their original values
(`objectPosition: 'center 20%'`, `height: 380`).

## Next session priorities
1. Full mobile review at 375px
2. Investigate whether the pricing→devis navigation flash is fully resolved
   (Suspense fallback was confirmed to never visibly render — root cause may
   be elsewhere)
3. Update memory/notes after each major change
