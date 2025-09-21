/**
 * Punto de entrada para todos los modelos de TypeScript
 * Re-exporta todos los tipos e interfaces para facilitar las importaciones
 */

// Character models
export type {
  Character,
  CharacterSummary,
  CharacterStatus,
  CharacterGender,
  CharacterLocation,
  CharacterOrigin,
  SelectedCharacters,
} from './Character';

// Episode models
export type { Episode, EpisodeSummary, EpisodeComparison } from './Episode';

// API Response models
export type {
  ApiResponse,
  ApiInfo,
  ApiError,
  ApiStatus,
  ApiState,
} from './ApiResponse';

/**
 * Tipos utilitarios para la aplicación
 */

/**
 * ID genérico para entidades
 */
export type EntityId = number;

/**
 * Parámetros de paginación
 */
export interface PaginationParams {
  page: number;
  limit?: number;
}

/**
 * Filtros para búsqueda de personajes
 */
export interface CharacterFilters {
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
}

/**
 * Filtros para búsqueda de episodios
 */
export interface EpisodeFilters {
  name?: string;
  episode?: string;
}

/**
 * Configuración de la aplicación
 */
export interface AppConfig {
  apiBaseUrl: string;
  itemsPerPage: number;
  maxRetries: number;
}

/**
 * Estado global de la aplicación
 */
export interface AppState {
  selectedCharacters: {
    character1: number | null;
    character2: number | null;
  };
  currentPage: {
    character1: number;
    character2: number;
  };
  filters: {
    character1: CharacterFilters;
    character2: CharacterFilters;
  };
}
