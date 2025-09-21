/**
 * Componente que maneja ambas listas de personajes con una sola paginación
 */

'use client';

import { useState, useMemo } from 'react';
import { useCharacters } from '@/hooks/api';
import { useCharacterStore } from '@/stores/characterStore';
import {
  CharacterCard,
  Pagination,
  CharacterCardSkeletonGrid,
  ErrorMessage,
} from '@/components/ui';
import type { Character } from '@/models';
import styles from './CharacterListDual.module.css';

export function CharacterListDual() {
  // Estado de paginación compartido
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

  // Dividir personajes en dos grupos
  const { leftCharacters, rightCharacters } = useMemo(() => {
    if (!charactersResponse?.results) {
      return { leftCharacters: [], rightCharacters: [] };
    }

    const characters = charactersResponse.results;
    const midPoint = Math.ceil(characters.length / 2);

    return {
      leftCharacters: characters.slice(0, midPoint),
      rightCharacters: characters.slice(midPoint),
    };
  }, [charactersResponse?.results]);

  // Funciones de selección
  const handleCharacter1Select = (character: Character) => {
    if (character1?.id === character.id) {
      setCharacter1(null);
    } else {
      setCharacter1(character);
    }
  };

  const handleCharacter2Select = (character: Character) => {
    if (character2?.id === character.id) {
      setCharacter2(null);
    } else {
      setCharacter2(character);
    }
  };

  // Manejo de errores
  if (error) {
    return (
      <div className={styles.container}>
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
      {/* Grid de dos columnas */}
      <div className={styles.charactersGrid}>
        {/* Columna Character #1 */}
        <div className={styles.characterColumn}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Character #1</h3>
            {character1 && (
              <div className={styles.selectedInfo}>
                <span className={styles.selectedLabel}>Selected:</span>
                <span className={styles.selectedName}>{character1.name}</span>
                <button
                  className={styles.clearButton}
                  onClick={() => setCharacter1(null)}
                  aria-label={`Deselect ${character1.name}`}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <CharacterCardSkeletonGrid count={Math.ceil(10 / 2)} />
          ) : (
            <div className={styles.cardGrid}>
              {leftCharacters.map(character => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={character1?.id === character.id}
                  onClick={handleCharacter1Select}
                />
              ))}
            </div>
          )}
        </div>

        {/* Columna Character #2 */}
        <div className={styles.characterColumn}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Character #2</h3>
            {character2 && (
              <div className={styles.selectedInfo}>
                <span className={styles.selectedLabel}>Selected:</span>
                <span className={styles.selectedName}>{character2.name}</span>
                <button
                  className={styles.clearButton}
                  onClick={() => setCharacter2(null)}
                  aria-label={`Deselect ${character2.name}`}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <CharacterCardSkeletonGrid count={Math.floor(10 / 2)} />
          ) : (
            <div className={styles.cardGrid}>
              {rightCharacters.map(character => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={character2?.id === character.id}
                  onClick={handleCharacter2Select}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Paginación centralizada */}
      {charactersResponse?.info && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            totalPages={charactersResponse.info.pages}
            onPageChange={setCurrentPage}
            isLoading={isFetching}
          />
        </div>
      )}
    </div>
  );
}
