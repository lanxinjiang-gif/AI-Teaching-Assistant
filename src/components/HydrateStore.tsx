'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/state/gameStore';

export function HydrateStore() {
  const hydrate = useGameStore((s) => s.hydrate);
  useEffect(() => { hydrate(); }, [hydrate]);
  return null;
}
