import type { ReactNode } from 'react';

// Minimal root layout required by Next.js.
// html/body and locale-specific setup live in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
