/**
 * Constantes globales de la aplicación
 */

export const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const ROUTES = {
  HOME: '/',
} as const;

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
