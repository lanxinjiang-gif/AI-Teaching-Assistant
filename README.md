# AI Teaching Assistant — Accounting Games

A growing collection of interactive games that make accounting classes fun, built with AI ("vibe coding"). Co-authored by **Lanxin / Lexi** and **dkangaroo**.

👉 **New to the repo or to GitHub? Read [COLLABORATION.md](COLLABORATION.md) first.**

---

## 🎮 Play the games (live)

The static HTML games are published automatically with GitHub Pages:

**https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/**

Anything pushed to the `main` branch goes live there — students just open the link, nothing to install.

> The game index (`public/repository.html`) uses **relative** links so they resolve correctly on the project Pages site (absolute `/...` paths break on GitHub project pages).

---

## Games in this repo

| Game | Folder | Type | Author | How to run |
|------|--------|------|--------|------------|
| Benford's Law Game | `public/benford-law-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| Cash Receipts Control Game | `public/cash-receipts-control-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| Decision Tree Builder Lab | `public/decision-tree-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| Fraud Symptoms Roleplay | `public/fraud-symptoms-roleplay-game/` | Static HTML | dkangaroo | Open in browser / Pages |
| ACC 214 Study Game | `public/acc214-study-game/acc214_game.html` | Static HTML | Lanxin / Lexi | Open in browser |
| Accounting Case Game | repo root (`src/`, `package.json`) | Next.js app | Lanxin / Lexi | `npm install` then `npm run dev` |

Index / landing pages: `index.html` ("Benford Audit Lab" landing) and `public/repository.html` ("Educational Game Repository").

---

## Two kinds of games here (important)

This repo holds **two different technologies**. Don't let them confuse you:

1. **Static HTML games** (Benford, Cash Receipts, Decision Tree, Fraud Roleplay, ACC 214) — single self-contained `.html` files. Just open them in a browser, or use the live Pages link above. No install, no build. Easiest for students.

2. **The Next.js app** ("Accounting Case Game") — a real web app with `src/`, `package.json`, etc. It does **not** run on GitHub Pages. To use it you must run `npm install && npm run dev` locally (or deploy it to Vercel).

### Accounting Case Game (the Next.js app)

Immersive, visual-novel style. 3 roles (Junior Accountant, Audit Associate, Controller), 4 company types (Retail, SaaS, Manufacturing, High Tech), branching cases with scoring and document review.

Three playable cases (each 4 stages, 100-pt scoring, perfect run = 100%):

- ✅ **Month-End Close: Missing Accruals** — accruals, prepaid amortization, deferred revenue
- ✅ **Revenue Recognition: The Multi-Element Deal** — ASC 606 five-step model on a bundled SaaS contract
- ✅ **Inventory Controls: The Missing Count** — count reconciliation, FOB cutoff, shrinkage, lower-of-cost-or-NRV

```bash
npm install
npm run dev
# open http://localhost:3000
```

---

## Working together

- Everyone works on the **`main`** branch.
- Each game lives in **its own folder** — stay in yours unless you're deliberately improving someone else's.
- **Pull before you start, push when you finish.**

Full beginner guide: **[COLLABORATION.md](COLLABORATION.md)**.
