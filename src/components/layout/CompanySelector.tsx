'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { companies } from '@/data/companies';
import { useGameStore } from '@/lib/state/gameStore';
import { fadeUp, staggerChildren } from '@/lib/motion/variants';
import { asset } from '@/lib/basePath';

const accentBorder: Record<string, string> = {
  amber: 'border-amber-400 bg-amber-50',
  sky: 'border-sky-400 bg-sky-50',
  orange: 'border-orange-400 bg-orange-50',
  purple: 'border-purple-400 bg-purple-50',
};

export function CompanySelector() {
  const selectedCompanyType = useGameStore((s) => s.selectedCompanyType);
  const setCompanyType = useGameStore((s) => s.setCompanyType);

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Choose your company</p>
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {companies.map((company) => {
          const isSelected = selectedCompanyType === company.id;
          return (
            <motion.button
              key={company.id}
              variants={fadeUp}
              onClick={() => setCompanyType(company.id)}
              className={[
                'flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-200 text-left',
                isSelected ? (accentBorder[company.accentColor] ?? 'border-gray-400 bg-gray-50') : 'bg-white border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              <div className="relative w-full h-20 overflow-hidden">
                <Image
                  src={asset(`/scenes/${company.sceneId}.svg`)}
                  alt={company.label}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-3 py-2">
                <p className="font-bold text-sm text-gray-900">{company.label}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{company.description}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
