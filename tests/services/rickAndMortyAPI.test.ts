import { getCharacters, getCharacterById, getMultipleCharacters, searchCharacters } from '@/services/api/rickAndMortyAPI';
import { mockCharactersResponse, mockCharacter1 } from '@tests/__mocks__/api';

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('rickAndMortyAPI', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('getCharacters', () => {
    it('should fetch characters successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharactersResponse,
      } as Response);

      const result = await getCharacters(1);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockCharactersResponse);
      }
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?page=1',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should handle fetch error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await getCharacters(1);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error.type).toBe('NETWORK_ERROR');
      }
    });

    it('should handle 404 response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'There is nothing here' }),
      } as Response);

      const result = await getCharacters(999);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.type).toBe('API_ERROR');
        expect(result.error.status).toBe(404);
      }
    });

    it('should retry on failure', async () => {
      // First call fails, second succeeds
      mockFetch
        .mockRejectedValueOnce(new Error('Temporary error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCharactersResponse,
        } as Response);

      const result = await getCharacters(1);

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('getCharacterById', () => {
    it('should fetch single character successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter1,
      } as Response);

      const result = await getCharacterById(1);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockCharacter1);
      }
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1',
        expect.any(Object)
      );
    });

    it('should handle invalid character ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'Character not found' }),
      } as Response);

      const result = await getCharacterById(9999);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.status).toBe(404);
      }
    });
  });

  describe('getMultipleCharacters', () => {
    it('should fetch multiple characters successfully', async () => {
      const characters = [mockCharacter1];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => characters,
      } as Response);

      const result = await getMultipleCharacters([1, 2]);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(characters);
      }
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1,2',
        expect.any(Object)
      );
    });

    it('should handle empty IDs array', async () => {
      const result = await getMultipleCharacters([]);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual([]);
      }
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('searchCharacters', () => {
    it('should search characters by name', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharactersResponse,
      } as Response);

      const result = await searchCharacters({ name: 'Rick' });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(mockCharactersResponse);
      }
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('name=Rick'),
        expect.any(Object)
      );
    });

    it('should search characters with multiple filters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharactersResponse,
      } as Response);

      const result = await searchCharacters({
        name: 'Rick',
        status: 'Alive',
        species: 'Human',
      });

      expect(result.success).toBe(true);
      const lastCall = mockFetch.mock.calls[mockFetch.mock.calls.length - 1];
      const url = lastCall[0] as string;
      
      expect(url).toContain('name=Rick');
      expect(url).toContain('status=Alive');
      expect(url).toContain('species=Human');
    });

    it('should handle search with no results', async () => {
      const emptyResponse = {
        info: { count: 0, pages: 1, next: null, prev: null },
        results: [],
      };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => emptyResponse,
      } as Response);

      const result = await searchCharacters({ name: 'NonexistentCharacter' });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.results).toHaveLength(0);
      }
    });
  });
});
