# AI Teaching Assistant — Accounting Games

A growing collection of interactive games that make accounting classes fun, built with AI ("vibe coding"). Co-authored by **Lanxin / Lexi** and **dkangaroo**.

👉 **New to the repo or to GitHub? Read [COLLABORATION.md](COLLABORATION.md) first.**

---

## 🎮 Play the games (live)

All static HTML games are published with GitHub Pages — students just click a link, nothing to install. Pushing to `main` updates them automatically.

**🎯 Game hub (all games in one page):**
https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/repository.html

**Direct links:**

| Game | Live link |
|------|-----------|
| Benford's Law Game | https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/benford-law-game/ |
| Cash Receipts Control Game | https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/cash-receipts-control-game/ |
| Decision Tree Builder Lab | https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/decision-tree-game/ |
| Fraud Symptoms Roleplay | https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/fraud-symptoms-roleplay-game/ |
| ACC 214 Study Game | https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/acc214-study-game/acc214_game.html |
| Accounting Case Game | https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/accounting-case-game/ |

> The **bare site URL** (`…/AI-Teaching-Assistant/`) redirects to the game hub. The **Accounting Case Game** is a Next.js app that is now published to Pages as a **static export** (folder `public/accounting-case-game/`), so students reach it with a plain link like every other game. After changing its code, rebuild it with `npm run build:pages` (see below).

---

## Games in this repo

| Game | Folder | Type | Author | How to run |
|------|--------|------|--------|------------|
| Benford's Law Game | `public/benford-law-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| Cash Receipts Control Game | `public/cash-receipts-control-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| Decision Tree Builder Lab | `public/decision-tree-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| Fraud Symptoms Roleplay | `public/fraud-symptoms-roleplay-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| ACC 214 Study Game | `public/acc214-study-game/acc214_game.html` | Static HTML | Lanxin / Lexi | Open in browser |
| Accounting Case Game | `src/` → builds into `public/accounting-case-game/` | Next.js (static export) | Lanxin / Lexi | Play on Pages, or `npm install && npm run dev` |

Index / landing pages: `index.html` ("Benford Audit Lab" landing) and `public/repository.html` ("Educational Game Repository").

---

## Two kinds of games here (important)

This repo holds **two different technologies**. Don't let them confuse you:

1. **Static HTML games** (Benford, Cash Receipts, Decision Tree, Fraud Roleplay, ACC 214) — single self-contained `.html` files. Just open them in a browser, or use the live Pages link above. No install, no build. Easiest for students.

2. **The Next.js app** ("Accounting Case Game") — a real web app with `src/`, `package.json`, etc. Unlike the others it has a build step, but it is **published to GitHub Pages as a static export** (in `public/accounting-case-game/`), so students open it with a plain link like every other game. For local development run `npm install && npm run dev`; after changing its code, run `npm run build:pages` to refresh what Pages serves.

### Accounting Case Game (the Next.js app)

Immersive, visual-novel style. 3 roles (Junior Accountant, Audit Associate, Controller), 4 company types (Retail, SaaS, Manufacturing, High Tech), branching cases with scoring and document review.

Three playable cases (each 4 stages, 100-pt scoring, perfect run = 100%):

- ✅ **Month-End Close: Missing Accruals** — accruals, prepaid amortization, deferred revenue
- ✅ **Revenue Recognition: The Multi-Element Deal** — ASC 606 five-step model on a bundled SaaS contract
- ✅ **Inventory Controls: The Missing Count** — count reconciliation, FOB cutoff, shrinkage, lower-of-cost-or-NRV

**▶ Play it live:** https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public/accounting-case-game/

```bash
npm install
npm run dev          # local development at http://localhost:3000
npm run build:pages  # rebuild the published static export in public/accounting-case-game/
```

> The published version is the committed contents of `public/accounting-case-game/`. It is **generated** by `npm run build:pages` — edit the source in `src/`, never that folder by hand, then rerun the command and commit the result.

---

## Working together

- Everyone works on the **`main`** branch.
- Each game lives in **its own folder** — stay in yours unless you're deliberately improving someone else's.
- **Pull before you start, push when you finish.**

Full beginner guide: **[COLLABORATION.md](COLLABORATION.md)**.
