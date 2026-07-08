// Build the Next.js app as a static site and place it under
//   public/accounting-case-game/
// so GitHub Pages serves it right next to the standalone HTML games.
// Re-runnable and cross-platform (Windows / macOS / Linux).
//
//   npm run build:pages
//
import { execSync } from 'node:child_process';
import { rmSync, renameSync, cpSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'out');
const appDir = path.join(root, 'public', 'accounting-case-game');

// The standalone games live in public/, which Next copies wholesale into the
// export. Drop those duplicates so the app folder only holds the app + the
// assets it actually uses (avatars/, scenes/, favicon, etc.).
const dropFromExport = [
  'benford-law-game',
  'cash-receipts-control-game',
  'decision-tree-game',
  'fraud-symptoms-roleplay-game',
  'acc214-course-review',
  'acc214-cost-estimation',
  'audit-detective-game',
  'repository.html',
];

const rimraf = (p) => rmSync(p, { recursive: true, force: true });

console.log('[build:pages] cleaning previous export…');
rimraf(appDir); // must be gone before the build, or Next copies it into itself
rimraf(outDir);

console.log('[build:pages] running next build (static export)…');
execSync('next build', { stdio: 'inherit' });

console.log('[build:pages] removing duplicated standalone games from export…');
for (const name of dropFromExport) {
  rimraf(path.join(outDir, name));
}

console.log('[build:pages] moving out/ -> public/accounting-case-game/ …');
try {
  renameSync(outDir, appDir);
} catch {
  // Fallback if a direct rename is not permitted (e.g. across mounts).
  cpSync(outDir, appDir, { recursive: true });
  rimraf(outDir);
}

if (!existsSync(path.join(appDir, 'index.html'))) {
  console.error('[build:pages] ERROR: index.html missing — the export failed.');
  process.exit(1);
}
console.log('[build:pages] done. Static app is at public/accounting-case-game/');
