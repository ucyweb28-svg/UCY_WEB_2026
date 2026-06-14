# UCY Studio — CLAUDE.md
Last updated: June 2026

## Project
- Repo: github.com/ucyweb28-svg/UCY_WEB_2026
- Live: ucyweb.fr / Staging: ucy-web-2026.vercel.app
- Stack: Next.js 14 App Router · TypeScript strict · Tailwind CSS v4
  · Framer Motion · next-intl (FR/EN) · Resend · Plausible

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

## Key files
- lib/utils/pricing.ts — pricing data source of truth
- lib/utils/services.ts — all 8 service pages data
- components/ui/Logo.tsx — animated SVG logo
- components/ui/ArrowDiag.tsx — diagonal arrow used site-wide
- components/layout/Nav.tsx — hide-on-scroll, mobile menu
- app/api/contact/route.ts — Resend email API

## Environment variables
- RESEND_API_KEY (in .env.local + Vercel)

## DO NOT TOUCH
- globals.css gradientShift keyframe
- public/logo.svg (source of truth for logo)
- DNS records in Hostinger (DKIM, MX, SPF, DMARC)
- Vercel Pro deployment config

## Current state

Last 20 commits:
- `6d0f105` feat: service pages use shared FooterCTA component
- `831a840` fix: service process section dark mode aligned with homepage
- `8f41ec7` fix: process cards number positioning + duration badge alignment
- `f0e1380` fix: revert bg color to official #FBF9FF palette value
- `6617265` fix: nav background aligned to #f5f3ee palette
- `09e0f14` fix: process section title simplified + remove subtitle and footer line
- `2dd336a` feat: AI section full redesign with atmospheric background
- `28f60d9` fix: homepage process section wider container and cards
- `8e1c334` fix: process card index numbers subtle crop effect all service pages
- `52d35e9` fix: hero title overflow + feature card index number positioning
- `0e20d18` fix: service process section contrast and readability
- `11f5e2c` fix: e-commerce slug + hero sizing + mobile text overflow
- `8cbf183` feat: service process section gradient wrapper Dribbble style
- `f7e6a12` fix: service page subtitles single line across all 7 services
- `6a06a34` fix: pricing middle card bg white with purple border
- `8cd7804` feat: process section Dribbble-style card container redesign
- `2b7e113` feat: service pages feature section editorial index cards
- `63ae64a` feat: process section horizontal timeline with gradient line and styled arrows
- `9ab0e20` feat: service pages hero full-bleed parallax background
- `04a2da9` feat: 7 dedicated service pages with dynamic routing

**Summary:** The 8 service detail pages were built out (dynamic routing, full-bleed
parallax hero, editorial feature cards, gradient "process" wrapper). The process
section went through several iterations on both the homepage and service pages
(horizontal timeline → Dribbble-style cards → wider container → contrast fixes →
simplified header → number/badge alignment), and was finally aligned to a shared
dark-mode style matching the homepage's `ProcessSection`. The homepage `AISection`
got a full visual redesign with an atmospheric background. Pricing's middle card
and the nav background were corrected to match the official palette. Most recently,
the service pages' dark "Prêt à démarrer votre projet ?" CTA was removed and
replaced with the shared `FooterCTA` component (also used on the homepage).

## Next session priorities
1. Full mobile review at 375px
2. Update memory/notes after each major change
