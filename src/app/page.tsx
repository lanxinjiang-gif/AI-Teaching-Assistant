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
    </main>
  );
}
