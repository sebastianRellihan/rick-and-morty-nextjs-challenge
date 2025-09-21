/**
 * Store de Zustand para manejar la selección de personajes
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '@/models';

interface CharacterState {
  /** Personaje seleccionado en la posición 1 */
  character1: Character | null;
  /** Personaje seleccionado en la posición 2 */
  character2: Character | null;

  /** Acciones para manejar la selección */
  setCharacter1: (character: Character | null) => void;
  setCharacter2: (character: Character | null) => void;
  clearCharacter1: () => void;
  clearCharacter2: () => void;
  clearAllCharacters: () => void;

  /** Utilidades */
  hasCharacter1: () => boolean;
  hasCharacter2: () => boolean;
  hasBothCharacters: () => boolean;
  areCharactersSelected: () => boolean;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      character1: null,
      character2: null,

      // Acciones
      setCharacter1: (character: Character | null) => {
        set({ character1: character });
      },

      setCharacter2: (character: Character | null) => {
        set({ character2: character });
      },

      clearCharacter1: () => {
        set({ character1: null });
      },

      clearCharacter2: () => {
        set({ character2: null });
      },

      clearAllCharacters: () => {
        set({ character1: null, character2: null });
      },

      // Utilidades
      hasCharacter1: () => {
        return get().character1 !== null;
      },

      hasCharacter2: () => {
        return get().character2 !== null;
      },

      hasBothCharacters: () => {
        const { character1, character2 } = get();
        return character1 !== null && character2 !== null;
      },

      areCharactersSelected: () => {
        const { character1, character2 } = get();
        return character1 !== null || character2 !== null;
      },
    }),
    {
      name: 'character-selection', // Nombre para localStorage
      partialize: state => ({
        character1: state.character1,
        character2: state.character2,
      }),
    },
  ),
);
