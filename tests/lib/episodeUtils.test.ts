import {
  extractIdFromUrl,
  compareEpisodeIds,
  compareCharacterEpisodes,
  formatEpisodeCode,
  formatAirDate,
} from '@/lib/utils/episodeUtils';
import { mockCharacter1 } from '@tests/__mocks__/api';
import type { Character } from '@/models';

const mockCharacter2: Character = {
  ...mockCharacter1,
  id: 2,
  name: 'Morty Smith',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/4',
  ],
};

describe('episodeUtils', () => {
  describe('extractIdFromUrl', () => {
    it('should extract ID from valid URL', () => {
      const url = 'https://rickandmortyapi.com/api/episode/1';
      expect(extractIdFromUrl(url)).toBe(1);
    });

    it('should return null for invalid URL', () => {
      const url = 'invalid-url';
      expect(extractIdFromUrl(url)).toBeNull();
    });
  });

  describe('compareEpisodeIds', () => {
    it('should return shared and unique episodes', () => {
      const character1Episodes = [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
        'https://rickandmortyapi.com/api/episode/3',
      ];
      const character2Episodes = [
        'https://rickandmortyapi.com/api/episode/2',
        'https://rickandmortyapi.com/api/episode/3',
        'https://rickandmortyapi.com/api/episode/4',
      ];

      const result = compareEpisodeIds(character1Episodes, character2Episodes);

      expect(result.shared).toEqual([2, 3]);
      expect(result.onlyCharacter1).toEqual([1]);
      expect(result.onlyCharacter2).toEqual([4]);
    });

    it('should handle empty arrays', () => {
      const result = compareEpisodeIds([], []);

      expect(result.shared).toEqual([]);
      expect(result.onlyCharacter1).toEqual([]);
      expect(result.onlyCharacter2).toEqual([]);
    });
  });

  describe('compareCharacterEpisodes', () => {
    it('should compare episodes between two characters', () => {
      const result = compareCharacterEpisodes(mockCharacter1, mockCharacter2);

      expect(result.shared).toEqual([1, 2]);
      expect(result.onlyCharacter1).toEqual([3]);
      expect(result.onlyCharacter2).toEqual([4]);
    });

    it('should handle null characters', () => {
      const result = compareCharacterEpisodes(null, mockCharacter2);

      expect(result.shared).toEqual([]);
      expect(result.onlyCharacter1).toEqual([]);
      expect(result.onlyCharacter2).toEqual([1, 2, 4]);
    });
  });

  describe('formatEpisodeCode', () => {
    it('should format episode code correctly', () => {
      expect(formatEpisodeCode('S01E01')).toBe('S01E01');
    });
  });

  describe('formatAirDate', () => {
    it('should return air date as is', () => {
      expect(formatAirDate('December 2, 2013')).toBe('December 2, 2013');
    });

    it('should handle empty string', () => {
      expect(formatAirDate('')).toBe('');
    });
  });
});
