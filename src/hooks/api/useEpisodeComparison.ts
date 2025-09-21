/**
 * Hook especializado para la comparación de episodios entre personajes
 */

import { useMemo } from 'react';
import { useMultipleEpisodes } from './useEpisodes';
import {
  getAllEpisodeIds,
  organizeEpisodesByComparison,
  compareCharacterEpisodes,
} from '@/lib/utils/episodeUtils';
import type { Character } from '@/models';

/**
 * Hook para comparar episodios entre dos personajes
 */
export function useEpisodeComparison(
  character1: Character | null,
  character2: Character | null,
) {
  // Calcular IDs de episodios únicos
  const episodeIds = useMemo(() => {
    if (!character1 || !character2) return [];
    return getAllEpisodeIds(character1, character2);
  }, [character1, character2]);

  // Obtener todos los episodios
  const episodesQuery = useMultipleEpisodes(episodeIds);

  // Organizar episodios por comparación
  const comparisonData = useMemo(() => {
    if (!episodesQuery.data || !character1 || !character2) {
      return {
        onlyCharacter1: [],
        shared: [],
        onlyCharacter2: [],
      };
    }

    const comparisonIds = compareCharacterEpisodes(character1, character2);
    return organizeEpisodesByComparison(episodesQuery.data, comparisonIds);
  }, [episodesQuery.data, character1, character2]);

  return {
    ...episodesQuery,
    data: comparisonData,
    hasCharacters: !!(character1 && character2),
  };
}
