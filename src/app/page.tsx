import Link from 'next/link';
import { RoleSelector } from '@/components/layout/RoleSelector';
import { CompanySelector } from '@/components/layout/CompanySelector';
import { CasePicker } from '@/components/layout/CasePicker';

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
              Launch focused labs for decision trees, Benford&apos;s Law, and cash receipts
              controls without leaving the accounting game branch.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Data Lab</p>
            <h3 className="mt-2 text-xl font-black text-gray-900">Decision Tree Builder Lab</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Explore how a decision tree is built, tested, and applied through an interactive
              standalone game.
            </p>
            <Link
              href="/decision-tree-game/index.html"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Launch Decision Tree Game
            </Link>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Audit Lab</p>
            <h3 className="mt-2 text-xl font-black text-gray-900">Benford Audit Lab</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Practice spotting when Benford&apos;s Law is useful, when it is misleading, and
              how it supports audit follow-up.
            </p>
            <Link
              href="/benford-law-game/index.html"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Launch Benford Game
            </Link>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Control Lab</p>
            <h3 className="mt-2 text-xl font-black text-gray-900">Cash Receipts Control Lab</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Walk the receipts cycle role by role and see how six internal control activities
              protect custody, logging, deposit, and reconciliation.
            </p>
            <Link
              href="/cash-receipts-control-game/index.html"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Launch Cash Receipts Game
            </Link>
          </article>
          <article className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Fraud Lab</p>
            <h3 className="mt-2 text-xl font-black text-gray-900">Fraud Signal Briefing</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Lead a cross-functional vendor review meeting and connect accounting, purchasing,
              and HR clues before weak fraud signals get ignored.
            </p>
            <Link
              href="/fraud-symptoms-roleplay-game/index.html"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Launch Fraud Symptoms Game
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
