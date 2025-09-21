/**
 * Validaciones para datos de la API
 * Funciones para validar que los datos recibidos cumplen con los modelos esperados
 */

import type {
  Character,
  Episode,
  ApiResponse,
  CharacterStatus,
  CharacterGender,
} from '@/models';
import { CHARACTER_STATUSES, CHARACTER_GENDERS } from '@/constants';

/**
 * Valida si un valor es un estado de personaje válido
 */
export function isValidCharacterStatus(
  status: string,
): status is CharacterStatus {
  return CHARACTER_STATUSES.includes(status as CharacterStatus);
}

/**
 * Valida si un valor es un género de personaje válido
 */
export function isValidCharacterGender(
  gender: string,
): gender is CharacterGender {
  return CHARACTER_GENDERS.includes(gender as CharacterGender);
}

/**
 * Valida si un objeto es un personaje válido
 */
export function isValidCharacter(data: unknown): data is Character {
  if (!data || typeof data !== 'object') return false;

  const character = data as Record<string, unknown>;

  return (
    typeof character.id === 'number' &&
    typeof character.name === 'string' &&
    typeof character.status === 'string' &&
    isValidCharacterStatus(character.status) &&
    typeof character.species === 'string' &&
    typeof character.type === 'string' &&
    typeof character.gender === 'string' &&
    isValidCharacterGender(character.gender) &&
    typeof character.image === 'string' &&
    Array.isArray(character.episode) &&
    character.episode.every(ep => typeof ep === 'string') &&
    typeof character.url === 'string' &&
    typeof character.created === 'string'
  );
}

/**
 * Valida si un objeto es un episodio válido
 */
export function isValidEpisode(data: unknown): data is Episode {
  if (!data || typeof data !== 'object') return false;

  const episode = data as Record<string, unknown>;

  return (
    typeof episode.id === 'number' &&
    typeof episode.name === 'string' &&
    typeof episode.air_date === 'string' &&
    typeof episode.episode === 'string' &&
    Array.isArray(episode.characters) &&
    episode.characters.every(char => typeof char === 'string') &&
    typeof episode.url === 'string' &&
    typeof episode.created === 'string'
  );
}

/**
 * Valida si un objeto es una respuesta de API válida
 */
export function isValidApiResponse<T>(
  data: unknown,
  validator: (item: unknown) => item is T,
): data is ApiResponse<T> {
  if (!data || typeof data !== 'object') return false;

  const response = data as Record<string, unknown>;

  // Validar estructura de info
  const info = response.info;
  if (!info || typeof info !== 'object') return false;

  const infoObj = info as Record<string, unknown>;
  if (
    typeof infoObj.count !== 'number' ||
    typeof infoObj.pages !== 'number' ||
    (infoObj.next !== null && typeof infoObj.next !== 'string') ||
    (infoObj.prev !== null && typeof infoObj.prev !== 'string')
  ) {
    return false;
  }

  // Validar array de resultados
  const results = response.results;
  if (!Array.isArray(results)) return false;

  // Validar cada elemento del array
  return results.every(validator);
}

/**
 * Extrae el ID de una URL de la API
 */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Valida si una URL es válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitiza una cadena para búsqueda
 */
export function sanitizeSearchString(search: string): string {
  return search.trim().toLowerCase();
}
