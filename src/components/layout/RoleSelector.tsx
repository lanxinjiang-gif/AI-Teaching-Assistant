'use client';

import { motion } from 'framer-motion';
import { RoleAvatar } from '@/components/immersion/RoleAvatar';
import { roles } from '@/data/roles';
import { useGameStore } from '@/lib/state/gameStore';
import { fadeUp, staggerChildren } from '@/lib/motion/variants';

const seniority = ['', 'Beginner', 'Intermediate', 'Expert'];

const ringColor: Record<string, string> = {
  indigo: 'ring-indigo-400',
  emerald: 'ring-emerald-400',
  violet: 'ring-violet-400',
};

const selectedBg: Record<string, string> = {
  indigo: 'bg-indigo-50 border-indigo-400',
  emerald: 'bg-emerald-50 border-emerald-400',
  violet: 'bg-violet-50 border-violet-400',
};

export function RoleSelector() {
  const selectedRole = useGameStore((s) => s.selectedRole);
  const setRole = useGameStore((s) => s.setRole);

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Choose your role</p>
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <motion.button
              key={role.id}
              variants={fadeUp}
              onClick={() => setRole(role.id)}
              className={[
                'flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-center',
                isSelected ? (selectedBg[role.colorTheme] ?? 'bg-gray-50 border-gray-400') : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50',
              ].join(' ')}
            >
              <div className={`rounded-full ring-4 ring-offset-2 ${isSelected ? (ringColor[role.colorTheme] ?? 'ring-gray-400') : 'ring-transparent'} transition-all`}>
                <RoleAvatar roleId={role.id} size={64} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{role.label}</p>
                <p className="text-xs text-gray-400">{seniority[role.seniorityLevel]}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{role.description}</p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
