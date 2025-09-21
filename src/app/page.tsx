import { CharacterListHydrated } from '@/components/features/CharacterList';
import { EpisodeComparisonSection } from '@/components/features/EpisodeComparison';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Header principal */}
      <header className={styles.header}>
        <h1 className={styles.title}>Rick and Morty</h1>
        <p className={styles.subtitle}>
          Select two characters to compare their episodes
        </p>
      </header>

      {/* Sección de selección de personajes con paginación unificada */}
      <section className={styles.charactersSection}>
        <CharacterListHydrated />
      </section>

      {/* Sección de comparación de episodios */}
      <section className={styles.episodesSection}>
        <EpisodeComparisonSection />
      </section>
    </div>
  );
}
