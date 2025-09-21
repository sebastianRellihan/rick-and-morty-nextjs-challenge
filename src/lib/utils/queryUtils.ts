/**
 * Utilidades para TanStack Query con Server Components
 */

import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getCharacters } from '@/services/api';

/**
 * Crea un QueryClient para Server Components
 */
export function createServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  });
}

/**
 * Prefetch de la primera página de personajes
 */
export async function prefetchCharacters(
  queryClient: QueryClient,
  page: number = 1,
) {
  await queryClient.prefetchQuery({
    queryKey: ['characters', { page }],
    queryFn: () => getCharacters({ page }),
  });
}

/**
 * Deshidrata el estado del QueryClient para SSR
 */
export function dehydrateQueryClient(queryClient: QueryClient) {
  return dehydrate(queryClient);
}
