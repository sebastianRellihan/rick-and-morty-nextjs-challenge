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
  });

  describe('Character endpoints', () => {
    it('should build characters URL with page', () => {
      const url = buildCharactersUrl({ page: 2 });
      expect(url).toBe('https://rickandmortyapi.com/api/character?page=2');
    });

    it('should build character by ID URL', () => {
      const url = buildCharacterByIdUrl(1);
      expect(url).toBe('https://rickandmortyapi.com/api/character/1');
    });

    it('should build multiple characters URL', () => {
      const url = buildMultipleCharactersUrl([1, 2, 3]);
      expect(url).toBe('https://rickandmortyapi.com/api/character/1,2,3');
    });

    it('should build characters search URL', () => {
      const url = buildCharactersSearchUrl({ page: 1 }, { name: 'Rick' });
      expect(url).toContain('https://rickandmortyapi.com/api/character?');
      expect(url).toContain('name=Rick');
      expect(url).toContain('page=1');
    });
  });

  describe('Episode endpoints', () => {
    it('should build episodes URL with page', () => {
      const url = buildEpisodesUrl({ page: 3 });
      expect(url).toBe('https://rickandmortyapi.com/api/episode?page=3');
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
      const url = buildEpisodesSearchUrl({ page: 1 }, { name: 'Pilot' });
      expect(url).toContain('https://rickandmortyapi.com/api/episode?');
      expect(url).toContain('name=Pilot');
      expect(url).toContain('page=1');
    });
  });
});
