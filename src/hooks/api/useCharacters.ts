/**
 * Hooks para manejar datos de personajes con TanStack Query
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import type {
  Character,
  ApiResponse,
  PaginationParams,
  CharacterFilters,
} from '@/models';
import {
  getCharacters,
  getCharacterById,
  getMultipleCharacters,
  searchCharacters,
} from '@/services/api';

/**
 * Hook para obtener una página de personajes
 */
export function useCharacters(params: PaginationParams = { page: 1 }) {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => getCharacters(params),
    placeholderData: previousData => previousData, // Mantener datos anteriores durante paginación
  });
}

/**
 * Hook para obtener un personaje específico por ID
 */
export function useCharacter(id: number | null) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id!),
    enabled: !!id, // Solo ejecutar si hay ID
  });
}

/**
 * Hook para obtener múltiples personajes por IDs
 */
export function useMultipleCharacters(ids: number[]) {
  return useQuery({
    queryKey: ['characters', 'multiple', ids.sort()],
    queryFn: () => getMultipleCharacters(ids),
    enabled: ids.length > 0,
  });
}

/**
 * Hook para buscar personajes con filtros
 */
export function useSearchCharacters(
  params: PaginationParams,
  filters: CharacterFilters,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['characters', 'search', params, filters],
    queryFn: () => searchCharacters(params, filters),
    enabled:
      enabled &&
      (!!filters.name ||
        !!filters.status ||
        !!filters.species ||
        !!filters.gender),
    placeholderData: previousData => previousData,
  });
}

/**
 * Hook para paginación infinita de personajes (para scroll infinito)
 */
export function useInfiniteCharacters(filters: CharacterFilters = {}) {
  return useInfiniteQuery({
    queryKey: ['characters', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) =>
      searchCharacters({ page: pageParam }, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse<Character>) => {
      if (lastPage.info.next) {
        const url = new URL(lastPage.info.next);
        return parseInt(url.searchParams.get('page') || '1');
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage: ApiResponse<Character>) => {
      if (firstPage.info.prev) {
        const url = new URL(firstPage.info.prev);
        return parseInt(url.searchParams.get('page') || '1');
      }
      return undefined;
    },
  });
}
