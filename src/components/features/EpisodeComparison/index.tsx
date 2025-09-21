/**
 * Componente para comparación de episodios entre personajes
 */

'use client';

import { useEffect, useState } from 'react';
import { useCharacterStore } from '@/stores/characterStore';
import styles from './EpisodeComparison.module.css';

export function EpisodeComparisonSection() {
  const { character1, character2, hasBothCharacters } = useCharacterStore();
  const [mounted, setMounted] = useState(false);

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
          <div className={styles.emptyIcon}>📺</div>
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
          <div className={styles.emptyIcon}>📺</div>
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
        <div className={styles.episodeColumn}>
          <h3 className={styles.columnTitle}>
            {character1?.name} - Only Episodes
          </h3>
          <div className={styles.placeholder}>
            <p>Unique episodes of {character1?.name}</p>
            <span className={styles.comingSoon}>Coming soon...</span>
          </div>
        </div>

        <div className={`${styles.episodeColumn} ${styles.sharedColumn}`}>
          <h3 className={styles.columnTitle}>Shared Episodes</h3>
          <div className={styles.placeholder}>
            <p>Episodes where both appear</p>
            <span className={styles.comingSoon}>Coming soon...</span>
          </div>
        </div>

        <div className={styles.episodeColumn}>
          <h3 className={styles.columnTitle}>
            {character2?.name} - Only Episodes
          </h3>
          <div className={styles.placeholder}>
            <p>Unique episodes of {character2?.name}</p>
            <span className={styles.comingSoon}>Coming soon...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
