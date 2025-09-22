/**
 * Modelo de datos para un episodio de Rick and Morty
 * Basado en el schema de la API: https://rickandmortyapi.com/documentation/#episode
 */

/**
 * Modelo completo de un episodio
 */
export interface Episode {
  /** ID único del episodio */
  id: number;
  /** Nombre del episodio */
  name: string;
  /** Fecha de emisión */
  air_date: string;
  /** Código del episodio (ej: S01E01) */
  episode: string;
  /** URLs de los personajes que aparecen en este episodio */
  characters: string[];
  /** URL de la API para obtener este episodio */
  url: string;
  /** Fecha de creación del registro */
  created: string;
}

/**
 * Versión simplificada de Episode para listas
 */
export interface EpisodeSummary {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

/**
 * Resultado de la comparación de episodios entre personajes
 */
export interface EpisodeComparison {
  /** Episodios donde solo aparece el personaje 1 */
  onlyCharacter1: Episode[];
  /** Episodios donde aparecen ambos personajes */
  shared: Episode[];
  /** Episodios donde solo aparece el personaje 2 */
  onlyCharacter2: Episode[];
}
