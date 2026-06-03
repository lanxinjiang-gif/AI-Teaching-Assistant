// Deploy base path. Empty in dev; the GitHub Pages sub-path in production.
// The value is injected by next.config.ts via NEXT_PUBLIC_BASE_PATH.
//
// Why this exists: in this version of Next.js, `basePath` is applied
// automatically to <Link>/router navigation, but NOT to next/image `src`
// or raw <img> `src`. So public assets must prepend it themselves.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix a public asset path (e.g. "/avatars/x.svg") with the deploy base path. */
export const asset = (path: string): string => `${BASE_PATH}${path}`;
