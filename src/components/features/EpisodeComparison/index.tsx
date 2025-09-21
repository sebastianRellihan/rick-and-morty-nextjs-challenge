/**
 * Componente para comparación de episodios entre personajes
 */

'use client';

import { useEffect, useState } from 'react';
import { useCharacterStore } from '@/stores/characterStore';
import { useEpisodeComparison } from '@/hooks/api';
import { EpisodeList } from '@/components/features/EpisodeList';
import styles from './EpisodeComparison.module.css';

export function EpisodeComparisonSection() {
  const { character1, character2, hasBothCharacters } = useCharacterStore();
  const [mounted, setMounted] = useState(false);

  // Hook para comparación de episodios
  const {
    data: episodeComparison,
    isLoading: episodesLoading,
    error: episodesError,
  } = useEpisodeComparison(character1, character2);

  // Evitar hidration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Renderizar estado de carga durante hidratación
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Episode Comparison</h2>
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>
            Select two characters to see episode comparison
          </p>
          <div className={styles.emptyHint}>
            <span>Loading character selection...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!hasBothCharacters()) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Episode Comparison</h2>
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>
            Select two characters to compare episodes between them
          </p>
          <div className={styles.emptyHint}>
            {!character1 && !character2 && (
              <span>Select the first character above ↑</span>
            )}
            {character1 && !character2 && (
              <span>
                {character1.name} selected. Now select the second character
              </span>
            )}
            {!character1 && character2 && (
              <span>
                {character2.name} selected. Now select the first character
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Episode Comparison</h2>
      <div className={styles.comparisonInfo}>
        <span className={styles.vsText}>
          {character1?.name} vs {character2?.name}
        </span>
      </div>

      <div className={styles.episodesGrid}>
        {/* Character #1 Only Episodes */}
        <EpisodeList
          title={`${character1?.name} - Only Episodes`}
          episodes={episodeComparison?.onlyCharacter1}
          isLoading={episodesLoading}
          className={styles.episodeColumn}
        />

        {/* Shared Episodes */}
        <EpisodeList
          title="Shared Episodes"
          episodes={episodeComparison?.shared}
          isLoading={episodesLoading}
          highlight={true}
          className={`${styles.episodeColumn} ${styles.sharedColumn}`}
        />

        {/* Character #2 Only Episodes */}
        <EpisodeList
          title={`${character2?.name} - Only Episodes`}
          episodes={episodeComparison?.onlyCharacter2}
          isLoading={episodesLoading}
          className={styles.episodeColumn}
        />
      </div>

      {/* Error handling */}
      {episodesError && (
        <div className={styles.error}>
          <p>Error loading episodes: {episodesError.message}</p>
        </div>
      )}
    </div>
  );
}
