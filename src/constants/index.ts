import type { AppConfig, CharacterStatus, CharacterGender } from '@/models';

/**
 * Constantes globales de la aplicación
 */

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const ROUTES = {
  HOME: '/',
} as const;

/**
 * Configuración de la aplicación
 */
export const APP_CONFIG: AppConfig = {
  apiBaseUrl: API_BASE_URL,
  itemsPerPage: 20, // La API devuelve 20 items por página por defecto
  maxRetries: 3,
};

/**
 * Endpoints de la API
 */
export const API_ENDPOINTS = {
  CHARACTERS: '/character',
  EPISODES: '/episode',
  LOCATIONS: '/location',
} as const;

/**
 * Estados válidos de personajes
 */
export const CHARACTER_STATUSES: readonly CharacterStatus[] = [
  'Alive',
  'Dead',
  'unknown',
] as const;

/**
 * Géneros válidos de personajes
 */
export const CHARACTER_GENDERS: readonly CharacterGender[] = [
  'Female',
  'Male',
  'Genderless',
  'unknown',
] as const;

/**
 * Paleta de colores del sistema de diseño
 * Estos valores coinciden con las variables CSS en globals.css
 */
export const COLORS = {
  BLACK: '#0d1f2d',
  DARK_BLUE: '#166678',
  LIGHT_GREEN: '#f0ffef',
  ACID_GREEN: '#93f373',
  BLUE: '#79e7ff',
} as const;

/**
 * Breakpoints para responsive design
 */
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
} as const;

/**
 * Mensajes de error
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  NOT_FOUND: 'No se encontraron resultados.',
  GENERIC_ERROR: 'Ha ocurrido un error inesperado.',
  CHARACTER_NOT_FOUND: 'Personaje no encontrado.',
  EPISODE_NOT_FOUND: 'Episodio no encontrado.',
} as const;
