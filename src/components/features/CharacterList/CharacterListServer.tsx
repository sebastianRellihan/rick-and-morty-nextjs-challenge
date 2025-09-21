/**
 * Server Component para lista de personajes con prefetching
 */

import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { getCharacters } from '@/services/api';
import { CharacterListClient } from './CharacterListClient';

interface CharacterListServerProps {
  /** Título de la lista */
  title: string;
  /** Slot del personaje (1 o 2) */
  characterSlot: 1 | 2;
  /** Página inicial */
  initialPage?: number;
}

export async function CharacterListServer({
  title,
  characterSlot,
  initialPage = 1,
}: CharacterListServerProps) {
  // Crear QueryClient para el servidor
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  });

  // Prefetch de la primera página de personajes
  await queryClient.prefetchQuery({
    queryKey: ['characters', { page: initialPage }],
    queryFn: () => getCharacters({ page: initialPage }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CharacterListClient title={title} characterSlot={characterSlot} />
    </HydrationBoundary>
  );
}
