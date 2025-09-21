/**
 * Definición de endpoints de la API de Rick and Morty
 */

import { APP_CONFIG, API_ENDPOINTS } from '@/constants';
import type {
  PaginationParams,
  CharacterFilters,
  EpisodeFilters,
} from '@/models';

/**
 * Construye la URL base para la API
 */
export function buildApiUrl(endpoint: string): string {
  return `${APP_CONFIG.apiBaseUrl}${endpoint}`;
}

/**
 * Construye la URL para obtener personajes con paginación
 */
export function buildCharactersUrl(params: PaginationParams): string {
  const url = new URL(buildApiUrl(API_ENDPOINTS.CHARACTERS));
  url.searchParams.set('page', params.page.toString());
  return url.toString();
}

/**
 * Construye la URL para obtener un personaje específico por ID
 */
export function buildCharacterByIdUrl(id: number): string {
  return buildApiUrl(`${API_ENDPOINTS.CHARACTERS}/${id}`);
}

/**
 * Construye la URL para obtener múltiples personajes por IDs
 */
export function buildMultipleCharactersUrl(ids: number[]): string {
  return buildApiUrl(`${API_ENDPOINTS.CHARACTERS}/${ids.join(',')}`);
}

/**
 * Construye la URL para buscar personajes con filtros
 */
export function buildCharactersSearchUrl(
  params: PaginationParams,
  filters: CharacterFilters,
): string {
  const url = new URL(buildApiUrl(API_ENDPOINTS.CHARACTERS));

  url.searchParams.set('page', params.page.toString());

  if (filters.name) {
    url.searchParams.set('name', filters.name);
  }

  if (filters.status) {
    url.searchParams.set('status', filters.status);
  }

  if (filters.species) {
    url.searchParams.set('species', filters.species);
  }

  if (filters.gender) {
    url.searchParams.set('gender', filters.gender);
  }

  return url.toString();
}

/**
 * Construye la URL para obtener episodios con paginación
 */
export function buildEpisodesUrl(params: PaginationParams): string {
  const url = new URL(buildApiUrl(API_ENDPOINTS.EPISODES));
  url.searchParams.set('page', params.page.toString());
  return url.toString();
}

/**
 * Construye la URL para obtener un episodio específico por ID
 */
export function buildEpisodeByIdUrl(id: number): string {
  return buildApiUrl(`${API_ENDPOINTS.EPISODES}/${id}`);
}

/**
 * Construye la URL para obtener múltiples episodios por IDs
 */
export function buildMultipleEpisodesUrl(ids: number[]): string {
  return buildApiUrl(`${API_ENDPOINTS.EPISODES}/${ids.join(',')}`);
}

/**
 * Construye la URL para buscar episodios con filtros
 */
export function buildEpisodesSearchUrl(
  params: PaginationParams,
  filters: EpisodeFilters,
): string {
  const url = new URL(buildApiUrl(API_ENDPOINTS.EPISODES));

  url.searchParams.set('page', params.page.toString());

  if (filters.name) {
    url.searchParams.set('name', filters.name);
  }

  if (filters.episode) {
    url.searchParams.set('episode', filters.episode);
  }

  return url.toString();
}
