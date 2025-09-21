/**
 * Utilidades para manejo de episodios
 */

/**
 * Extrae el ID de una URL de episodio de la API
 */
export function extractEpisodeId(url: string): number {
  const match = url.match(/\/(\d+)$/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Compara episodios de dos personajes y devuelve arrays separados
 */
export function compareEpisodes(
  character1Episodes: string[],
  character2Episodes: string[],
): {
  onlyCharacter1: number[];
  shared: number[];
  onlyCharacter2: number[];
} {
  const char1Ids = character1Episodes.map(extractEpisodeId);
  const char2Ids = character2Episodes.map(extractEpisodeId);

  const char1Set = new Set(char1Ids);
  const char2Set = new Set(char2Ids);

  const onlyCharacter1 = char1Ids.filter(id => !char2Set.has(id));
  const onlyCharacter2 = char2Ids.filter(id => !char1Set.has(id));
  const shared = char1Ids.filter(id => char2Set.has(id));

  return {
    onlyCharacter1: [...new Set(onlyCharacter1)],
    shared: [...new Set(shared)],
    onlyCharacter2: [...new Set(onlyCharacter2)],
  };
}
