'use client';

import Image from 'next/image';
import type { RoleId } from '@/lib/types/game';
import { asset } from '@/lib/basePath';

interface RoleAvatarProps {
  roleId: RoleId;
  size?: number;
  className?: string;
}

export function RoleAvatar({ roleId, size = 48, className = '' }: RoleAvatarProps) {
  // SVG viewBox is 80×90 — maintain that aspect ratio
  return (
    <Image
      src={asset(`/avatars/${roleId}.svg`)}
      alt={roleId}
      width={size}
      height={Math.round(size * 1.125)}
      style={{ height: 'auto' }}
      className={className}
      priority
      unoptimized
    />
  );
}
