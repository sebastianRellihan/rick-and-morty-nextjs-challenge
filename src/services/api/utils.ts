/**
 * Utilidades adicionales para el servicio de API
 */

import type { Character, Episode } from '@/models';
import { extractIdFromUrl } from '@/lib/validations/api';
import { getMultipleEpisodes } from './rickAndMortyAPI';

/**
 * Obtiene todos los episodios de un personaje
 */
export async function getCharacterEpisodes(
  character: Character,
): Promise<Episode[]> {
  const episodeIds = character.episode.map(extractIdFromUrl);
  return getMultipleEpisodes(episodeIds);
}

/**
 * Obtiene los episodios de múltiples personajes
 */
export async function getMultipleCharactersEpisodes(
  characters: Character[],
): Promise<Episode[]> {
  const allEpisodeUrls = characters.flatMap(char => char.episode);
  const uniqueEpisodeIds = [...new Set(allEpisodeUrls.map(extractIdFromUrl))];

  return getMultipleEpisodes(uniqueEpisodeIds);
}

/**
 * Verifica si la API está disponible
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch('https://rickandmortyapi.com/api', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Obtiene información general de la API
 */
export async function getApiInfo(): Promise<{
  characters: string;
  locations: string;
  episodes: string;
}> {
  const response = await fetch('https://rickandmortyapi.com/api');

  if (!response.ok) {
    throw new Error('Failed to fetch API info');
  }

  const data = await response.json();
  return data;
}

/**
 * Calcula estadísticas de un conjunto de personajes
 */
export function calculateCharacterStats(characters: Character[]): {
  total: number;
  alive: number;
  dead: number;
  unknown: number;
  species: Record<string, number>;
  genders: Record<string, number>;
} {
  const stats = {
    total: characters.length,
    alive: 0,
    dead: 0,
    unknown: 0,
    species: {} as Record<string, number>,
    genders: {} as Record<string, number>,
  };

  characters.forEach(character => {
    // Contar por estado
    switch (character.status) {
      case 'Alive':
        stats.alive++;
        break;
      case 'Dead':
        stats.dead++;
        break;
      case 'unknown':
        stats.unknown++;
        break;
    }

    // Contar por especie
    stats.species[character.species] =
      (stats.species[character.species] || 0) + 1;

    // Contar por género
    stats.genders[character.gender] =
      (stats.genders[character.gender] || 0) + 1;
  });

  return stats;
}

/**
 * Calcula estadísticas de un conjunto de episodios
 */
export function calculateEpisodeStats(episodes: Episode[]): {
  total: number;
  seasons: Record<string, number>;
  averageCharactersPerEpisode: number;
} {
  const stats = {
    total: episodes.length,
    seasons: {} as Record<string, number>,
    averageCharactersPerEpisode: 0,
  };

  let totalCharacters = 0;

  episodes.forEach(episode => {
    // Extraer temporada del código de episodio (ej: S01E01)
    const seasonMatch = episode.episode.match(/S(\d+)/);
    const season = seasonMatch ? `Season ${seasonMatch[1]}` : 'Unknown';

    stats.seasons[season] = (stats.seasons[season] || 0) + 1;

    // Contar personajes
    totalCharacters += episode.characters.length;
  });

  stats.averageCharactersPerEpisode =
    episodes.length > 0 ? Math.round(totalCharacters / episodes.length) : 0;

  return stats;
}

/**
 * Formatea el tamaño de respuesta de la API para debugging
 */
export function formatResponseSize(data: unknown): string {
  const jsonString = JSON.stringify(data);
  const bytes = new TextEncoder().encode(jsonString).length;

  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
