'use client';

import Image from 'next/image';
import type { RoleId } from '@/lib/types/game';

interface RoleAvatarProps {
  roleId: RoleId;
  size?: number;
  className?: string;
}

export function RoleAvatar({ roleId, size = 48, className = '' }: RoleAvatarProps) {
  return (
    <Image
      src={`/avatars/${roleId}.svg`}
      alt={roleId}
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
