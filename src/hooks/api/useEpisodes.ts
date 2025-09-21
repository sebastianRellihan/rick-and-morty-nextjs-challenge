/**
 * Hooks para manejar datos de episodios con TanStack Query
 */

import { useQuery } from '@tanstack/react-query';
import type { PaginationParams, EpisodeFilters } from '@/models';
import {
  getEpisodes,
  getEpisodeById,
  getMultipleEpisodes,
  searchEpisodes,
} from '@/services/api';

/**
 * Hook para obtener una página de episodios
 */
export function useEpisodes(params: PaginationParams = { page: 1 }) {
  return useQuery({
    queryKey: ['episodes', params],
    queryFn: () => getEpisodes(params),
    placeholderData: previousData => previousData,
  });
}

/**
 * Hook para obtener un episodio específico por ID
 */
export function useEpisode(id: number | null) {
  return useQuery({
    queryKey: ['episode', id],
    queryFn: () => getEpisodeById(id!),
    enabled: !!id,
  });
}

/**
 * Hook para obtener múltiples episodios por IDs
 */
export function useMultipleEpisodes(ids: number[]) {
  return useQuery({
    queryKey: ['episodes', 'multiple', ids.sort()],
    queryFn: () => getMultipleEpisodes(ids),
    enabled: ids.length > 0,
    staleTime: 10 * 60 * 1000, // Los episodios cambian menos, cache por 10 minutos
  });
}

/**
 * Hook para buscar episodios con filtros
 */
export function useSearchEpisodes(
  params: PaginationParams,
  filters: EpisodeFilters,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ['episodes', 'search', params, filters],
    queryFn: () => searchEpisodes(params, filters),
    enabled: enabled && (!!filters.name || !!filters.episode),
    placeholderData: previousData => previousData,
  });
}
