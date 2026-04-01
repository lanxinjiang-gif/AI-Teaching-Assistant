'use client';

import type { CompanyType, Role } from '@/lib/types/game';
import { RoleAvatar } from './RoleAvatar';

interface CompanyPanelProps {
  company: CompanyType;
  role: Role;
}

const accentBg: Record<string, string> = {
  amber: 'bg-amber-100 border-amber-300 text-amber-800',
  sky: 'bg-sky-100 border-sky-300 text-sky-800',
  orange: 'bg-orange-100 border-orange-300 text-orange-800',
  purple: 'bg-purple-100 border-purple-300 text-purple-800',
};

const roleBg: Record<string, string> = {
  indigo: 'bg-indigo-100 text-indigo-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  violet: 'bg-violet-100 text-violet-700',
};

export function CompanyPanel({ company, role }: CompanyPanelProps) {
  const companyStyle = accentBg[company.accentColor] ?? 'bg-gray-100 border-gray-300 text-gray-800';
  const roleStyle = roleBg[role.colorTheme] ?? 'bg-gray-100 text-gray-700';

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-sm">
      <RoleAvatar roleId={role.id} size={36} className="rounded-full ring-2 ring-white shadow" />
      <div className="flex flex-col min-w-0">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${roleStyle}`}>
          {role.label}
        </span>
        <span className={`text-xs font-medium mt-0.5 px-2 py-0.5 rounded-full border w-fit ${companyStyle}`}>
          {company.label}
        </span>
      </div>
    </div>
  );
}
