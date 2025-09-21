/**
 * Punto de entrada para todos los servicios de API
 */

// Servicios principales
export {
  getCharacters,
  getCharacterById,
  getMultipleCharacters,
  searchCharacters,
  getEpisodes,
  getEpisodeById,
  getMultipleEpisodes,
  searchEpisodes,
} from './rickAndMortyAPI';

// Utilidades de endpoints
export {
  buildApiUrl,
  buildCharactersUrl,
  buildCharacterByIdUrl,
  buildMultipleCharactersUrl,
  buildCharactersSearchUrl,
  buildEpisodesUrl,
  buildEpisodeByIdUrl,
  buildMultipleEpisodesUrl,
  buildEpisodesSearchUrl,
} from './endpoints';

// Tipos
export type {
  FetchConfig,
  RetryOptions,
  FetchResult,
  CacheEntry,
  CacheConfig,
} from './types';

export { RickAndMortyApiError, NetworkError, TimeoutError } from './types';
