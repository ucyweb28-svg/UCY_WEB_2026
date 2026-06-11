# design-sync notes — UCY Studio UI Kit

Synced: 2026-06-12. Target project: "UCY Studio UI Kit" (`projectId` in `config.json`).

## Scope

This repo is the UCY Studio marketing site (Next.js app), not a published
component-library package. Per Yonathan's choice, only `/components/ui` is
synced (6 generic primitives: Button, Badge, GlowButton, GradientGlow,
ScrollReveal, SimpleIcon), via the converter's synth-entry (no-build)
fallback. Preview scope for this pass is **floor cards only** — all 6 ship
fully functional (real bundled code, real `.d.ts`, real `.prompt.md`) but
with the converter's default unauthored "floor card" preview. Rich previews
(`./design-sync/previews/<Name>.tsx`) can be authored in a future sync.

## Re-sync steps (every time)

This repo has no `dist/` and no compiled stylesheet, so two prep steps must
run before `package-build.mjs`, in order:

1. `node .ds-sync/build-css.mjs` — compiles `app/globals.css` (Tailwind v4)
   via `@tailwindcss/postcss` into `.design-sync/.cache/tailwind-compiled.css`,
   with a Google Fonts `@import` + `:root` font-var preamble prepended (see
   "Fonts" below). `cfg.cssEntry` points at this generated file — it's
   gitignored (`.design-sync/.cache/.gitignore` contains `*`), so this step
   must run on every clone/re-sync, not just once.
2. `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules <repo>/node_modules --out ./ds-bundle`

Then `node .ds-sync/package-validate.mjs ./ds-bundle` (Playwright + Chromium
must be installed in `.ds-sync/`: `npm i -D playwright && npx playwright
install chromium`).

`.ds-sync/` (staged converter scripts + its own `node_modules`) and
`ds-bundle/` (build output) are both gitignored — regenerate by copying the
skill's `non-storybook/` base files + `lib/` + `storybook/` into `.ds-sync/`
and `npm i esbuild ts-morph @types/react playwright` there.

## Fonts: Google Fonts CDN substitution

The site uses `next/font/google` (Syne + DM Sans) which inject
`--font-syne`/`--font-dm-sans` at Next build time — not available outside a
Next build. `build-css.mjs` substitutes a Google Fonts CDN `@import` (Syne +
DM Sans, weights 400–800) plus manual `:root { --font-syne; --font-dm-sans }`
declarations, prepended to the compiled CSS. `validate` reports
`[FONT_REMOTE]` for this — informational, not an error.

## `next/link` → standalone shim (`process is not defined` fix)

**This is the load-bearing fix in this config — do not drop it on re-sync.**

`Button.tsx` and `GlowButton.tsx` import `next/link`. Bundling `next/link`
pulls in `next/dist/client/...` modules that read several
`process.env.__NEXT_*` flags (basePath, trailing-slash, i18n) at module-init
time via esbuild's eager CJS interop. `process` doesn't exist in a browser,
so `_ds_bundle.js`'s top-level IIFE throws `ReferenceError: process is not
defined` during evaluation — before `window.UcyStudio` is even assigned,
which fails **every** component in the bundle (`[BUNDLE_EXPORT]` 6/6), not
just the two using `<Link>`.

Fix: `.design-sync/tsconfig.json` (a design-sync-local tsconfig, NOT the
app's `tsconfig.json`) adds a `paths` alias:

```json
"next/link": ["./.design-sync/shims/next-link"]
```

`.design-sync/shims/next-link.tsx` is a tiny standalone `<a>`-based
substitute (forwards `href`/`className`/`style`/`target`/`rel`/etc.). In a
claude.ai/design preview there's no Next.js router anyway, so `next/link`'s
client-side navigation has no meaning — a plain anchor is the correct
standalone behavior. `cfg.tsconfig` points at `.design-sync/tsconfig.json`
(which also re-declares the app's `@/*` path alias, since `paths` doesn't
merge through `extends` when read by the converter's path-resolution plugin).

If a future component imports another `next/*` module that hits the same
issue, add a similar shim + `paths` entry rather than editing
`.ds-sync/lib/bundle.mjs` (shared converter file — don't fork).

## `dtsPropsFor`

None of the 6 components ship a `.d.ts` (no `dist/`), and `SimpleIcon`'s
local props interface is named `Props` (not `SimpleIconProps`). All 6 have
hand-written `cfg.dtsPropsFor` bodies in `config.json`, transcribed from each
component's own prop interface. If a component's props change, update
`dtsPropsFor` to match.

## Render check

All 6 components: 0 errors, 0 `bad`, 0 `thin`, 0 `variantsIdentical`, all
`fallbackCard: true` (expected — floor cards by design for this pass).
Build took 2 iterations (1st failed on the `next/link` issue above, fixed,
2nd passed clean).
