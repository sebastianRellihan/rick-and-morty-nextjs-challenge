/**
 * Utilidades para manejo de episodios
 */

import type { Character, Episode, EpisodeComparison } from '@/models';
import { extractIdFromUrl } from '@/lib/validations/api';

/**
 * Extrae el ID de una URL de episodio de la API
 * @deprecated Usar extractIdFromUrl de validations/api.ts
 */
export function extractEpisodeId(url: string): number {
  return extractIdFromUrl(url);
}

/**
 * Compara episodios de dos personajes y devuelve IDs separados
 */
export function compareEpisodeIds(
  character1Episodes: string[],
  character2Episodes: string[],
): {
  onlyCharacter1: number[];
  shared: number[];
  onlyCharacter2: number[];
} {
  const char1Ids = character1Episodes.map(extractIdFromUrl);
  const char2Ids = character2Episodes.map(extractIdFromUrl);

  const char1Set = new Set(char1Ids);
  const char2Set = new Set(char2Ids);

  const onlyCharacter1 = char1Ids.filter(id => !char2Set.has(id));
  const onlyCharacter2 = char2Ids.filter(id => !char1Set.has(id));
  const shared = char1Ids.filter(id => char2Set.has(id));

  return {
    onlyCharacter1: [...new Set(onlyCharacter1)],
    shared: [...new Set(shared)],
    onlyCharacter2: [...new Set(onlyCharacter2)],
  };
}

/**
 * Compara episodios de dos personajes usando objetos Character
 */
export function compareCharacterEpisodes(
  character1: Character,
  character2: Character,
): {
  onlyCharacter1: number[];
  shared: number[];
  onlyCharacter2: number[];
} {
  return compareEpisodeIds(character1.episode, character2.episode);
}

/**
 * Organiza episodios según la comparación de personajes
 */
export function organizeEpisodesByComparison(
  episodes: Episode[],
  comparisonIds: {
    onlyCharacter1: number[];
    shared: number[];
    onlyCharacter2: number[];
  },
): EpisodeComparison {
  const episodeMap = new Map(episodes.map(ep => [ep.id, ep]));

  return {
    onlyCharacter1: comparisonIds.onlyCharacter1
      .map(id => episodeMap.get(id))
      .filter((ep): ep is Episode => ep !== undefined),
    shared: comparisonIds.shared
      .map(id => episodeMap.get(id))
      .filter((ep): ep is Episode => ep !== undefined),
    onlyCharacter2: comparisonIds.onlyCharacter2
      .map(id => episodeMap.get(id))
      .filter((ep): ep is Episode => ep !== undefined),
  };
}

/**
 * Obtiene todos los IDs únicos de episodios de dos personajes
 */
export function getAllEpisodeIds(
  character1: Character,
  character2: Character,
): number[] {
  const allUrls = [...character1.episode, ...character2.episode];
  const allIds = allUrls.map(extractIdFromUrl);
  return [...new Set(allIds)];
}

/**
 * Formatea el código de episodio (ej: "S01E01")
 */
export function formatEpisodeCode(episode: string): string {
  return episode.toUpperCase();
}

/**
 * Formatea la fecha de emisión
 */
export function formatAirDate(airDate: string): string {
  try {
    const date = new Date(airDate);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return airDate;
  }
}
