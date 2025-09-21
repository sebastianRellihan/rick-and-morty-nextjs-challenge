/**
 * Client Component para lista de personajes con paginación y selección
 */

'use client';

import { Suspense, useState } from 'react';
import { useCharacters } from '@/hooks/api';
import { useCharacterStore } from '@/stores/characterStore';
import {
  CharacterCard,
  Pagination,
  CharacterCardSkeletonGrid,
  ErrorMessage,
} from '@/components/ui';
import type { Character } from '@/models';
import styles from './CharacterList.module.css';

interface CharacterListClientProps {
  /** Título de la lista */
  title: string;
  /** Slot del personaje (1 o 2) */
  characterSlot: 1 | 2;
}

export function CharacterListClient({
  title,
  characterSlot,
}: CharacterListClientProps) {
  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Hook de TanStack Query para obtener personajes
  const {
    data: charactersResponse,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useCharacters({ page: currentPage });

  // Store de Zustand para selección
  const { character1, character2, setCharacter1, setCharacter2 } =
    useCharacterStore();

  // Determinar qué personaje está seleccionado en este slot
  const selectedCharacter = characterSlot === 1 ? character1 : character2;

  // Función para manejar selección de personaje
  const handleCharacterSelect = (character: Character) => {
    if (characterSlot === 1) {
      // Si es el mismo personaje, deseleccionar
      if (selectedCharacter?.id === character.id) {
        setCharacter1(null);
      } else {
        setCharacter1(character);
      }
    } else {
      // Si es el mismo personaje, deseleccionar
      if (selectedCharacter?.id === character.id) {
        setCharacter2(null);
      } else {
        setCharacter2(character);
      }
    }
  };

  // Manejo de errores
  if (error) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <ErrorMessage
          message={`Error loading characters: ${error.message}`}
          onRetry={() => refetch()}
          variant="error"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Título de la sección */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {selectedCharacter && (
          <div className={styles.selectedInfo}>
            <span className={styles.selectedLabel}>Selected:</span>
            <span className={styles.selectedName}>
              {selectedCharacter.name}
            </span>
            <button
              className={styles.clearButton}
              onClick={() =>
                characterSlot === 1 ? setCharacter1(null) : setCharacter2(null)
              }
              aria-label={`Deselect ${selectedCharacter.name}`}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Lista de personajes */}
      <Suspense fallback={<CharacterCardSkeletonGrid count={6} />}>
        {isLoading ? (
          <CharacterCardSkeletonGrid count={6} />
        ) : (
          <>
            <div className={styles.grid}>
              {charactersResponse?.results.map(character => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacter?.id === character.id}
                  onClick={handleCharacterSelect}
                />
              ))}
            </div>

            {/* Paginación */}
            {charactersResponse?.info && (
              <Pagination
                currentPage={currentPage}
                totalPages={charactersResponse.info.pages}
                onPageChange={setCurrentPage}
                isLoading={isFetching}
              />
            )}
          </>
        )}
      </Suspense>
    </div>
  );
}
