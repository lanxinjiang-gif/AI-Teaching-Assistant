import { RoleSelector } from '@/components/layout/RoleSelector';
import { CompanySelector } from '@/components/layout/CompanySelector';
import { CasePicker } from '@/components/layout/CasePicker';

// Standalone HTML games are published on GitHub Pages, so link to their live
// URLs (they live outside this app's base path). Opening them works the same
// whether this app is run locally or from Pages.
const PAGES_BASE = 'https://lanxinjiang-gif.github.io/AI-Teaching-Assistant/public';

const standaloneGames = [
  {
    tag: 'Data Lab',
    title: 'Decision Tree Builder Lab',
    blurb:
      'Explore how a decision tree is built, tested, and applied through an interactive standalone game.',
    href: `${PAGES_BASE}/decision-tree-game/index.html`,
    cta: 'Launch Decision Tree Game',
  },
  {
    tag: 'Audit Lab',
    title: 'Benford Audit Lab',
    blurb:
      'Practice spotting when Benford’s Law is useful, when it is misleading, and how it supports audit follow-up.',
    href: `${PAGES_BASE}/benford-law-game/index.html`,
    cta: 'Launch Benford Game',
  },
  {
    tag: 'Control Lab',
    title: 'Cash Receipts Control Lab',
    blurb:
      'Walk the receipts cycle role by role and see how six internal control activities protect custody, logging, deposit, and reconciliation.',
    href: `${PAGES_BASE}/cash-receipts-control-game/index.html`,
    cta: 'Launch Cash Receipts Game',
  },
  {
    tag: 'Fraud Lab',
    title: 'Fraud Signal Briefing',
    blurb:
      'Lead a cross-functional vendor review meeting and connect accounting, purchasing, and HR clues before weak fraud signals get ignored.',
    href: `${PAGES_BASE}/fraud-symptoms-roleplay-game/index.html`,
    cta: 'Launch Fraud Symptoms Game',
  },
  {
    tag: 'Review Lab',
    title: 'ACC 214 · Full Course Review',
    blurb:
      'Run the departments of Saucy Apple Mfg. Co. — cost behavior, ABC, variances, and capital budgeting — as a whole-semester managerial-accounting review.',
    href: `${PAGES_BASE}/acc214-course-review/index.html`,
    cta: 'Launch Full Course Review',
  },
  {
    tag: 'Cost Lab',
    title: 'ACC 214 · Cost Estimation Challenge',
    blurb:
      'A Chapter 3 detective story: play the consultant on three client cases — a baffling water bill, vanishing pottery profits, and a $200K regression bet — solved with account analysis, high-low, and regression. Wrong turns play out in the client’s P&L; a mistake log tracks what to review.',
    href: `${PAGES_BASE}/acc214-cost-estimation/index.html`,
    cta: 'Launch Cost Estimation Game',
  },
];

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Accounting Case Game</h1>
        <p className="text-gray-500 text-sm">Step into the role. Close the books. Don&apos;t miss a thing.</p>
      </div>
      <RoleSelector />
      <CompanySelector />
      <CasePicker />
      <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Interactive Labs</p>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Standalone Practice Games</h2>
            <p className="max-w-3xl text-sm text-gray-600">
              Focused single-topic labs — decision trees, Benford&apos;s Law, cash receipts
              controls, fraud signals, and a managerial-accounting review — each playable on its own.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {standaloneGames.map((game) => (
            <article
              key={game.title}
              className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">{game.tag}</p>
              <h3 className="mt-2 text-xl font-black text-gray-900">{game.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{game.blurb}</p>
              <a
                href={game.href}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                {game.cta}
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
