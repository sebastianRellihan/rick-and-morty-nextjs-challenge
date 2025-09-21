/**
 * Servicio principal para la API de Rick and Morty
 * Maneja todas las peticiones HTTP con reintentos, validación y manejo de errores
 */

import type {
  Character,
  Episode,
  ApiResponse,
  PaginationParams,
  CharacterFilters,
  EpisodeFilters,
} from '@/models';

import {
  isValidCharacter,
  isValidEpisode,
  isValidApiResponse,
} from '@/lib/validations/api';

import { APP_CONFIG, ERROR_MESSAGES } from '@/constants';

import {
  buildCharactersUrl,
  buildCharacterByIdUrl,
  buildMultipleCharactersUrl,
  buildCharactersSearchUrl,
  buildEpisodesUrl,
  buildEpisodeByIdUrl,
  buildMultipleEpisodesUrl,
  buildEpisodesSearchUrl,
} from './endpoints';

import type { FetchResult, RetryOptions } from './types';

/**
 * Configuración por defecto para reintentos
 */
const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: APP_CONFIG.maxRetries,
  delay: 1000,
  backoff: true,
};

/**
 * Timeout por defecto para peticiones (30 segundos)
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Realiza una petición HTTP con reintentos y manejo de errores
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = DEFAULT_RETRY_OPTIONS,
): Promise<FetchResult<T>> {
  let lastError: Error = new Error('Unknown error');

  for (let attempt = 0; attempt <= retryOptions.maxRetries; attempt++) {
    try {
      // Configurar timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Si la respuesta es exitosa, procesar datos
      if (response.ok) {
        const data = await response.json();
        return {
          data,
          error: null,
          status: response.status,
          ok: true,
        };
      }

      // Manejar errores HTTP
      const errorData = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));

      return {
        data: null,
        error: errorData,
        status: response.status,
        ok: false,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // No reintentar en el último intento
      if (attempt === retryOptions.maxRetries) {
        break;
      }

      // Calcular delay con backoff exponencial si está habilitado
      const delay = retryOptions.backoff
        ? retryOptions.delay * Math.pow(2, attempt)
        : retryOptions.delay;

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // Si llegamos aquí, todos los intentos fallaron
  return {
    data: null,
    error: {
      error:
        lastError.name === 'AbortError'
          ? ERROR_MESSAGES.NETWORK_ERROR
          : lastError.message,
    },
    status: 0,
    ok: false,
  };
}

/**
 * SERVICIOS DE PERSONAJES
 */

/**
 * Obtiene una página de personajes
 */
export async function getCharacters(
  params: PaginationParams = { page: 1 },
): Promise<ApiResponse<Character>> {
  const url = buildCharactersUrl(params);
  const result = await fetchWithRetry<ApiResponse<Character>>(url);

  if (!result.ok || !result.data) {
    throw new Error(result.error?.error || ERROR_MESSAGES.GENERIC_ERROR);
  }

  // Validar estructura de respuesta
  if (!isValidApiResponse(result.data, isValidCharacter)) {
    throw new Error('Invalid API response structure for characters');
  }

  return result.data;
}

/**
 * Obtiene un personaje específico por ID
 */
export async function getCharacterById(id: number): Promise<Character> {
  const url = buildCharacterByIdUrl(id);
  const result = await fetchWithRetry<Character>(url);

  if (!result.ok || !result.data) {
    throw new Error(
      result.status === 404
        ? ERROR_MESSAGES.CHARACTER_NOT_FOUND
        : result.error?.error || ERROR_MESSAGES.GENERIC_ERROR,
    );
  }

  // Validar estructura del personaje
  if (!isValidCharacter(result.data)) {
    throw new Error('Invalid character data structure');
  }

  return result.data;
}

/**
 * Obtiene múltiples personajes por sus IDs
 */
export async function getMultipleCharacters(
  ids: number[],
): Promise<Character[]> {
  if (ids.length === 0) {
    return [];
  }

  if (ids.length === 1) {
    const character = await getCharacterById(ids[0]);
    return [character];
  }

  const url = buildMultipleCharactersUrl(ids);
  const result = await fetchWithRetry<Character[]>(url);

  if (!result.ok || !result.data) {
    throw new Error(result.error?.error || ERROR_MESSAGES.GENERIC_ERROR);
  }

  // Validar cada personaje
  if (!Array.isArray(result.data) || !result.data.every(isValidCharacter)) {
    throw new Error('Invalid characters data structure');
  }

  return result.data;
}

/**
 * Busca personajes con filtros
 */
export async function searchCharacters(
  params: PaginationParams,
  filters: CharacterFilters,
): Promise<ApiResponse<Character>> {
  const url = buildCharactersSearchUrl(params, filters);
  const result = await fetchWithRetry<ApiResponse<Character>>(url);

  if (!result.ok || !result.data) {
    if (result.status === 404) {
      // La API devuelve 404 cuando no hay resultados
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }

    throw new Error(result.error?.error || ERROR_MESSAGES.GENERIC_ERROR);
  }

  // Validar estructura de respuesta
  if (!isValidApiResponse(result.data, isValidCharacter)) {
    throw new Error('Invalid API response structure for character search');
  }

  return result.data;
}

/**
 * SERVICIOS DE EPISODIOS
 */

/**
 * Obtiene una página de episodios
 */
export async function getEpisodes(
  params: PaginationParams = { page: 1 },
): Promise<ApiResponse<Episode>> {
  const url = buildEpisodesUrl(params);
  const result = await fetchWithRetry<ApiResponse<Episode>>(url);

  if (!result.ok || !result.data) {
    throw new Error(result.error?.error || ERROR_MESSAGES.GENERIC_ERROR);
  }

  // Validar estructura de respuesta
  if (!isValidApiResponse(result.data, isValidEpisode)) {
    throw new Error('Invalid API response structure for episodes');
  }

  return result.data;
}

/**
 * Obtiene un episodio específico por ID
 */
export async function getEpisodeById(id: number): Promise<Episode> {
  const url = buildEpisodeByIdUrl(id);
  const result = await fetchWithRetry<Episode>(url);

  if (!result.ok || !result.data) {
    throw new Error(
      result.status === 404
        ? ERROR_MESSAGES.EPISODE_NOT_FOUND
        : result.error?.error || ERROR_MESSAGES.GENERIC_ERROR,
    );
  }

  // Validar estructura del episodio
  if (!isValidEpisode(result.data)) {
    throw new Error('Invalid episode data structure');
  }

  return result.data;
}

/**
 * Obtiene múltiples episodios por sus IDs
 */
export async function getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) {
    return [];
  }

  if (ids.length === 1) {
    const episode = await getEpisodeById(ids[0]);
    return [episode];
  }

  const url = buildMultipleEpisodesUrl(ids);
  const result = await fetchWithRetry<Episode[]>(url);

  if (!result.ok || !result.data) {
    throw new Error(result.error?.error || ERROR_MESSAGES.GENERIC_ERROR);
  }

  // Validar cada episodio
  if (!Array.isArray(result.data) || !result.data.every(isValidEpisode)) {
    throw new Error('Invalid episodes data structure');
  }

  return result.data;
}

/**
 * Busca episodios con filtros
 */
export async function searchEpisodes(
  params: PaginationParams,
  filters: EpisodeFilters,
): Promise<ApiResponse<Episode>> {
  const url = buildEpisodesSearchUrl(params, filters);
  const result = await fetchWithRetry<ApiResponse<Episode>>(url);

  if (!result.ok || !result.data) {
    if (result.status === 404) {
      // La API devuelve 404 cuando no hay resultados
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }

    throw new Error(result.error?.error || ERROR_MESSAGES.GENERIC_ERROR);
  }

  // Validar estructura de respuesta
  if (!isValidApiResponse(result.data, isValidEpisode)) {
    throw new Error('Invalid API response structure for episode search');
  }

  return result.data;
}
