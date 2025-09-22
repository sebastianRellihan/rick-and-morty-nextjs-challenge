import {
  buildApiUrl,
  buildCharactersUrl,
  buildCharacterByIdUrl,
  buildMultipleCharactersUrl,
  buildCharactersSearchUrl,
  buildEpisodesUrl,
  buildEpisodeByIdUrl,
  buildMultipleEpisodesUrl,
  buildEpisodesSearchUrl,
} from '@/services/api/endpoints';

describe('API Endpoints', () => {
  describe('buildApiUrl', () => {
    it('should build basic API URL', () => {
      const url = buildApiUrl('/character');
      expect(url).toBe('https://rickandmortyapi.com/api/character');
    });

    it('should handle trailing slash', () => {
      const url = buildApiUrl('/character/');
      expect(url).toBe('https://rickandmortyapi.com/api/character/');
    });
  });

  describe('Character endpoints', () => {
    it('should build characters URL with page', () => {
      const url = buildCharactersUrl(2);
      expect(url).toBe('https://rickandmortyapi.com/api/character?page=2');
    });

    it('should build characters URL without page', () => {
      const url = buildCharactersUrl();
      expect(url).toBe('https://rickandmortyapi.com/api/character');
    });

    it('should build character by ID URL', () => {
      const url = buildCharacterByIdUrl(1);
      expect(url).toBe('https://rickandmortyapi.com/api/character/1');
    });

    it('should build multiple characters URL', () => {
      const url = buildMultipleCharactersUrl([1, 2, 3]);
      expect(url).toBe('https://rickandmortyapi.com/api/character/1,2,3');
    });

    it('should build characters search URL with single parameter', () => {
      const url = buildCharactersSearchUrl({ name: 'Rick' });
      expect(url).toBe('https://rickandmortyapi.com/api/character?name=Rick');
    });

    it('should build characters search URL with multiple parameters', () => {
      const url = buildCharactersSearchUrl({
        name: 'Rick',
        status: 'Alive',
        species: 'Human',
        page: 2,
      });

      expect(url).toContain('https://rickandmortyapi.com/api/character?');
      expect(url).toContain('name=Rick');
      expect(url).toContain('status=Alive');
      expect(url).toContain('species=Human');
      expect(url).toContain('page=2');
    });

    it('should handle empty search parameters', () => {
      const url = buildCharactersSearchUrl({});
      expect(url).toBe('https://rickandmortyapi.com/api/character');
    });

    it('should encode special characters in search', () => {
      const url = buildCharactersSearchUrl({ name: 'Rick & Morty' });
      expect(url).toBe(
        'https://rickandmortyapi.com/api/character?name=Rick%20%26%20Morty',
      );
    });
  });

  describe('Episode endpoints', () => {
    it('should build episodes URL with page', () => {
      const url = buildEpisodesUrl(3);
      expect(url).toBe('https://rickandmortyapi.com/api/episode?page=3');
    });

    it('should build episodes URL without page', () => {
      const url = buildEpisodesUrl();
      expect(url).toBe('https://rickandmortyapi.com/api/episode');
    });

    it('should build episode by ID URL', () => {
      const url = buildEpisodeByIdUrl(5);
      expect(url).toBe('https://rickandmortyapi.com/api/episode/5');
    });

    it('should build multiple episodes URL', () => {
      const url = buildMultipleEpisodesUrl([1, 5, 10]);
      expect(url).toBe('https://rickandmortyapi.com/api/episode/1,5,10');
    });

    it('should build episodes search URL', () => {
      const url = buildEpisodesSearchUrl({ name: 'Pilot', episode: 'S01E01' });

      expect(url).toContain('https://rickandmortyapi.com/api/episode?');
      expect(url).toContain('name=Pilot');
      expect(url).toContain('episode=S01E01');
    });

    it('should handle empty episode search parameters', () => {
      const url = buildEpisodesSearchUrl({});
      expect(url).toBe('https://rickandmortyapi.com/api/episode');
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined values in search parameters', () => {
      const url = buildCharactersSearchUrl({
        name: 'Rick',
        status: undefined,
        species: 'Human',
      });

      expect(url).toContain('name=Rick');
      expect(url).toContain('species=Human');
      expect(url).not.toContain('status=');
    });

    it('should handle empty string values in search parameters', () => {
      const url = buildCharactersSearchUrl({
        name: '',
        status: 'Alive',
      });

      expect(url).not.toContain('name=');
      expect(url).toContain('status=Alive');
    });

    it('should handle numeric values in search parameters', () => {
      const url = buildCharactersSearchUrl({
        name: 'Rick',
        page: 1,
      });

      expect(url).toContain('name=Rick');
      expect(url).toContain('page=1');
    });
  });
});
