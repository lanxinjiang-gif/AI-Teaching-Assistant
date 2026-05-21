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
      <section className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Bonus Lab</p>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Decision Tree Builder Lab</h2>
              <p className="max-w-2xl text-sm text-gray-600">
                Explore a standalone interactive game that teaches how a decision tree is built,
                tested, and applied.
              </p>
            </div>
          </div>
          <Link
            href="/decision-tree-game/index.html"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Launch Decision Tree Game
          </Link>
        </div>
      </section>
    </main>
  );
}
