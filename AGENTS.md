<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Team workflow for AI agents (Claude Code, Codex) — READ FIRST

This repo is shared by 3 collaborators, each driving an AI agent. Follow these
rules so work is never stranded on an unmerged branch again:

- Commit **directly to the `main` branch**. Do NOT create a new or feature
  branch unless the user explicitly asks. (Unmerged side branches have lost
  work before.)
- **Before committing**, run `git pull --rebase` to get teammates' latest.
- **After committing**, `git push` to `main`.
- If a push is rejected because someone pushed first, run `git pull --rebase`
  and push again.
- Each game lives in its own folder: static HTML games under `public/<game>/`,
  and the Next.js app under `src/` at the repo root. Only edit files for the
  game the user asked you to work on; do not touch other games' folders.
- Keep commit messages short and name the game you changed.

See `COLLABORATION.md` for the full human-facing workflow guide.
