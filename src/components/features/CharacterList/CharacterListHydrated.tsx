/**
 * Wrapper para evitar problemas de hidratación con Zustand
 */

'use client';

import { useEffect, useState } from 'react';
import { CharacterListDual } from './CharacterListDual';
import { CharacterCardSkeletonGrid } from '@/components/ui';

export function CharacterListHydrated() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CharacterCardSkeletonGrid count={12} />;
  }

  return <CharacterListDual />;
}
