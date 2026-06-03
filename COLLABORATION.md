# How We Collaborate (Beginner's Guide)

For the three of us — **Lanxin / Lexi** and **dkangaroo** — sharing this repo. We're new to GitHub, so this is written plainly. Read it once and keep it handy.

---

## 1. The one idea: GitHub is NOT Dropbox

Dropbox syncs your files automatically and live. **Git does not.** Nothing moves until you say so. The whole workflow is a three-step cycle:

> ### 🔑 Golden rule: **PULL → EDIT → PUSH**
> **Pull** (download teammates' latest) **before** you start.
> **Push** (upload your changes) **after** you finish.

Forget to *pull* first → you edit an old copy.
Forget to *push* after → your teammate can't see your work.

---

## 2. What went wrong before (so we don't repeat it)

dkangaroo built four great games, but committed them to a **separate branch** (`accountinggames`) and never merged it into `main`. Lanxin works on `main`. Result: each of us was invisible to the other for weeks.

**Lesson → Everyone works on the `main` branch.** Don't create long-lived side branches. (Short branches for review are fine — see Section 6 — but merge them back within a day or two.)

---

## 3. Stay in your own folder

Each game has its own folder. If two people never edit the same file, you can **never** collide. Easy.

| Folder | Owner | What |
|--------|-------|------|
| `public/benford-law-game/` | dkangaroo | Benford's Law game |
| `public/cash-receipts-control-game/` | dkangaroo | Cash Receipts Control game |
| `public/decision-tree-game/` | dkangaroo | Decision Tree Builder Lab |
| `public/fraud-symptoms-roleplay-game/` | dkangaroo | Fraud Symptoms Roleplay |
| `public/acc214-study-game/` | Lanxin / Lexi | ACC 214 Study Game |
| `src/`, `package.json`, configs (repo root) | Lanxin / Lexi | Next.js "Accounting Case Game" |
| `index.html`, `public/repository.html` | dkangaroo | Landing + game-index pages |

Want to improve someone else's game? Allowed — just see Section 5 first.

---

## 4. The daily cycle — step by step

### Option A: GitHub Desktop (recommended if you don't like the command line)

Install: https://desktop.github.com → sign in → "Clone a repository" → pick `AI-Teaching-Assistant`. Then, every session:

1. **Pull first.** Top bar → click **"Fetch origin"**, then **"Pull origin"** if it offers.
2. **Edit** your files in your normal editor (VS Code, etc.).
3. **Commit.** Bottom-left: type a short **Summary** ("Add round 2 to Benford game") → click **"Commit to main"**.
4. **Push.** Top bar → **"Push origin"**.

Memorize: **Fetch/Pull → edit → Commit → Push.**

### Option B: Command line / Claude Code

```bash
git pull              # 1. get latest (do this FIRST)
# ...edit your files...
git add -A            # 2. stage your changes
git commit -m "Add round 2 to Benford game"   # 3. save a snapshot
git push              # 4. upload
```

> Both tools talk to the same GitHub. It's totally fine for dkangaroo to use Desktop while Lanxin uses the command line.

---

## 5. Improving each other's games

**Small change** (fix a typo, tweak a question):
1. Message your teammate: "I'm editing your Benford game for 10 min."
2. Pull → make the change → push. Done.

**Bigger change, or you want them to review it first** → use a Pull Request (Section 6).

The only thing that causes pain: **two people editing the same file at the same time.** Avoid it by telling each other what you're touching, and always pulling first.

---

## 6. Pull Requests (for review — optional, learn later)

A Pull Request (PR) lets a teammate see and approve your change before it joins `main`. Use it when improving someone else's work and you want a second look.

**GitHub Desktop:** "Current Branch" → **New Branch** (name it e.g. `improve-benford`) → make edits → Commit → **Push** → click **"Create Pull Request"** (opens the website) → your teammate reviews and clicks **"Merge"**.

**Command line:**
```bash
git checkout -b improve-benford   # new branch
# ...edit, then...
git add -A && git commit -m "Improve Benford hints"
git push -u origin improve-benford
# then open the repo on github.com and click "Compare & pull request"
```

After it's merged, everyone does a normal `git pull` to get it.

---

## 7. Publishing to students (GitHub Pages)

The repo is already live at:

**https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/**

- It publishes the **static HTML games** automatically: push to `main` → live in ~1 minute.
- The **Next.js app** is *not* published here (Pages can't build it). Run it locally with `npm run dev`, or deploy it separately to Vercel.

> ⚠️ **Path issue to fix sometime:** Pages serves from the repo root (`/`), but the games live under `public/`, and `repository.html` links them as `/<game>/index.html`. Those links may 404 on the live site. Two easy fixes (pick one later): (a) in GitHub repo **Settings → Pages**, set the source folder to `/public`; or (b) update the links to include `public/`. Not urgent — flagged so it's not forgotten.

---

## 8. When something "conflicts" — don't panic

If two people changed the **same lines**, Git pauses and reports a **merge conflict**. Nothing is lost. GitHub Desktop shows both versions side by side; you pick which lines to keep, save, and commit. It feels scary the first time and is routine after that.

**Avoid conflicts almost entirely:** separate folders + pull before you start + tell each other what you're editing.

---

## Quick reference

| I want to… | GitHub Desktop | Command line |
|------------|----------------|--------------|
| Get teammates' latest | Fetch origin / Pull origin | `git pull` |
| Save my work locally | type Summary → Commit to main | `git add -A && git commit -m "..."` |
| Share my work | Push origin | `git push` |
| Start a review branch | Current Branch → New Branch | `git checkout -b my-branch` |

**Remember: Pull before. Push after. Stay in your folder. Work on `main`.**
