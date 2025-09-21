/**
 * Modelo de datos para un personaje de Rick and Morty
 * Basado en el schema de la API: https://rickandmortyapi.com/documentation/#character
 */

/**
 * Estados posibles de un personaje
 */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

/**
 * Géneros posibles de un personaje
 */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

/**
 * Información de ubicación de un personaje
 */
export interface CharacterLocation {
  name: string;
  url: string;
}

/**
 * Información de origen de un personaje
 */
export interface CharacterOrigin {
  name: string;
  url: string;
}

/**
 * Modelo completo de un personaje
 */
export interface Character {
  /** ID único del personaje */
  id: number;

  /** Nombre del personaje */
  name: string;

  /** Estado del personaje (vivo, muerto, desconocido) */
  status: CharacterStatus;

  /** Especie del personaje */
  species: string;

  /** Tipo/subtipo del personaje */
  type: string;

  /** Género del personaje */
  gender: CharacterGender;

  /** Información del origen del personaje */
  origin: CharacterOrigin;

  /** Ubicación actual del personaje */
  location: CharacterLocation;

  /** URL de la imagen del personaje */
  image: string;

  /** URLs de los episodios en los que aparece */
  episode: string[];

  /** URL de la API para obtener este personaje */
  url: string;

  /** Fecha de creación del registro */
  created: string;
}

/**
 * Versión simplificada de Character para listas y previews
 */
export interface CharacterSummary {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  image: string;
  episode: string[];
}

/**
 * Estado de selección de personajes para la comparación
 */
export interface SelectedCharacters {
  character1: Character | null;
  character2: Character | null;
}
