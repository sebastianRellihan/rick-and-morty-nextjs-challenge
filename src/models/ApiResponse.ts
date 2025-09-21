/**
 * Modelos para las respuestas de la API de Rick and Morty
 * Todas las respuestas paginadas siguen el mismo patrón
 */

/**
 * Información de paginación que incluye la API
 */
export interface ApiInfo {
  /** Número total de registros */
  count: number;

  /** Número total de páginas */
  pages: number;

  /** URL de la página siguiente (null si es la última) */
  next: string | null;

  /** URL de la página anterior (null si es la primera) */
  prev: string | null;
}

/**
 * Respuesta paginada genérica de la API
 */
export interface ApiResponse<T> {
  /** Información de paginación */
  info: ApiInfo;

  /** Array de resultados del tipo especificado */
  results: T[];
}

/**
 * Respuesta de error de la API
 */
export interface ApiError {
  /** Mensaje de error */
  error: string;
}

/**
 * Estados posibles de una petición a la API
 */
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Estado genérico para manejar peticiones de API con React Query
 */
export interface ApiState<T> {
  data: T | null;
  status: ApiStatus;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
