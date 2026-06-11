// design-sync standalone substitute for `next/link`.
//
// next/link's bundled module graph reads several `process.env.__NEXT_*`
// build-time flags at module-init time (basePath, trailing-slash,
// i18n config, etc.). Outside a Next.js build `process` doesn't exist in
// the browser, so importing the real next/link throws
// `ReferenceError: process is not defined` while the design-sync bundle's
// IIFE evaluates — before window.<namespace> is even assigned, breaking
// every component in the bundle, not just the ones using <Link>.
//
// In a claude.ai/design preview there is no Next.js router anyway, so
// next/link's client-side navigation/prefetching has no meaning — a plain
// anchor is the correct standalone behavior. Aliased via
// .design-sync/tsconfig.json's `paths` (esbuild path-alias resolution),
// not a change to the real components.
import * as React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch, replace, scroll, shallow, passHref, legacyBehavior, ...rest },
  ref,
) {
  return <a ref={ref} href={href} {...rest} />;
});

export default Link;
