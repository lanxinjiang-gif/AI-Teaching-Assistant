import type { NextConfig } from "next";

// GitHub Pages serves this app as static files under
//   /AI-Teaching-Assistant/public/accounting-case-game/
// (right next to the standalone HTML games). The sub-path is only applied
// for production builds, so `npm run dev` still runs cleanly at
// http://localhost:3000 with no prefix.
const basePath =
  process.env.NODE_ENV === "production"
    ? "/AI-Teaching-Assistant/public/accounting-case-game"
    : "";

const nextConfig: NextConfig = {
  output: "export", // emit static HTML/JS into ./out — no Node server needed
  trailingSlash: true, // /game/x/ -> /game/x/index.html (works on static hosts)
  images: { unoptimized: true }, // no image optimizer available on a static host
  basePath,
  // Exposed to the browser bundle so image `src` values can prepend the
  // base path (this Next version does not do it for images automatically).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
