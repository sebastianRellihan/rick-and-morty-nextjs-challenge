import {
  extractIdFromUrl,
  compareEpisodeIds,
  compareCharacterEpisodes,
  organizeEpisodesByComparison,
  getAllEpisodeIds,
  formatEpisodeCode,
  formatAirDate,
} from '@/lib/utils/episodeUtils';
import {
  mockCharacter1,
  mockEpisode1,
  mockEpisode2,
} from '@tests/__mocks__/api';
import type { Character } from '@/models';

// Additional mock character for testing
const mockCharacter2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/4',
  ],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

const mockEpisodes = [mockEpisode1, mockEpisode2];

describe('episodeUtils', () => {
  describe('extractIdFromUrl', () => {
    it('should extract ID from valid URL', () => {
      const url = 'https://rickandmortyapi.com/api/episode/1';
      expect(extractIdFromUrl(url)).toBe(1);
    });

    it('should extract ID from URL with trailing slash', () => {
      const url = 'https://rickandmortyapi.com/api/episode/42/';
      expect(extractIdFromUrl(url)).toBe(42);
    });

    it('should return null for invalid URL', () => {
      const url = 'invalid-url';
      expect(extractIdFromUrl(url)).toBeNull();
    });

    it('should return null for URL without ID', () => {
      const url = 'https://rickandmortyapi.com/api/episode/';
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

    it('should handle one empty array', () => {
      const character1Episodes = [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ];
      const character2Episodes: string[] = [];

      const result = compareEpisodeIds(character1Episodes, character2Episodes);

      expect(result.shared).toEqual([]);
      expect(result.onlyCharacter1).toEqual([1, 2]);
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

  describe('organizeEpisodesByComparison', () => {
    it('should organize episodes by comparison result', () => {
      const comparison = {
        shared: [1, 2],
        onlyCharacter1: [3],
        onlyCharacter2: [4],
      };

      const result = organizeEpisodesByComparison(mockEpisodes, comparison);

      expect(result.shared).toHaveLength(2);
      expect(result.onlyCharacter1).toHaveLength(0); // Episode 3 not in mockEpisodes
      expect(result.onlyCharacter2).toHaveLength(0); // Episode 4 not in mockEpisodes
    });

    it('should handle empty episodes array', () => {
      const comparison = {
        shared: [1, 2],
        onlyCharacter1: [3],
        onlyCharacter2: [4],
      };

      const result = organizeEpisodesByComparison([], comparison);

      expect(result.shared).toEqual([]);
      expect(result.onlyCharacter1).toEqual([]);
      expect(result.onlyCharacter2).toEqual([]);
    });
  });

  describe('getAllEpisodeIds', () => {
    it('should get all unique episode IDs from two characters', () => {
      const result = getAllEpisodeIds(mockCharacter1, mockCharacter2);

      expect(result.sort()).toEqual([1, 2, 3, 4]);
    });

    it('should handle null characters', () => {
      const result = getAllEpisodeIds(null, mockCharacter2);

      expect(result.sort()).toEqual([1, 2, 4]);
    });

    it('should handle both null characters', () => {
      const result = getAllEpisodeIds(null, null);

      expect(result).toEqual([]);
    });
  });

  describe('formatEpisodeCode', () => {
    it('should format episode code correctly', () => {
      expect(formatEpisodeCode('S01E01')).toBe('S01E01');
      expect(formatEpisodeCode('S02E10')).toBe('S02E10');
    });

    it('should handle empty string', () => {
      expect(formatEpisodeCode('')).toBe('');
    });
  });

  describe('formatAirDate', () => {
    it('should format air date correctly', () => {
      expect(formatAirDate('December 2, 2013')).toBe('December 2, 2013');
      expect(formatAirDate('January 1, 2020')).toBe('January 1, 2020');
    });

    it('should handle empty string', () => {
      expect(formatAirDate('')).toBe('');
    });
  });
});
