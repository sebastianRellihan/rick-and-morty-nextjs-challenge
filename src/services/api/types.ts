/**
 * Tipos específicos para el servicio de API
 */

import type { ApiError } from '@/models';

/**
 * Configuración para peticiones fetch
 */
export interface FetchConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

/**
 * Opciones para reintentos de peticiones
 */
export interface RetryOptions {
  maxRetries: number;
  delay: number;
  backoff: boolean;
}

/**
 * Resultado de una petición HTTP
 */
export interface FetchResult<T> {
  data: T | null;
  error: ApiError | null;
  status: number;
  ok: boolean;
}

/**
 * Errores específicos de la API de Rick and Morty
 */
export class RickAndMortyApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string,
  ) {
    super(message);
    this.name = 'RickAndMortyApiError';
  }
}

/**
 * Error de red/conexión
 */
export class NetworkError extends Error {
  constructor(
    message: string,
    public originalError: unknown,
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Error de timeout
 */
export class TimeoutError extends Error {
  constructor(message: string = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Estados de cache para optimización
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * Configuración del cache
 */
export interface CacheConfig {
  ttl: number; // Time to live en milisegundos
  maxSize: number; // Máximo número de entradas
  enabled: boolean;
}
