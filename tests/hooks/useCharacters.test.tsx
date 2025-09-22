import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters, useCharacter } from '@/hooks/api/useCharacters';
import { TestQueryWrapper } from '@tests/__mocks__/queryClient';
import {
  mockCharactersResponse,
  mockCharacter1,
} from '@tests/__mocks__/api';

// Mock the API service
jest.mock('@/services/api', () => ({
  getCharacters: jest.fn(),
  getCharacterById: jest.fn(),
  getMultipleCharacters: jest.fn(),
  searchCharacters: jest.fn(),
}));

// Import the mocked module
import * as apiService from '@/services/api';
const mockGetCharacters = apiService.getCharacters as jest.MockedFunction<typeof apiService.getCharacters>;
const mockGetCharacterById = apiService.getCharacterById as jest.MockedFunction<typeof apiService.getCharacterById>;

describe('useCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch characters successfully', async () => {
    mockGetCharacters.mockResolvedValueOnce(mockCharactersResponse);

    const { result } = renderHook(() => useCharacters(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCharactersResponse);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle error state', async () => {
    const errorMessage = 'Failed to fetch characters';
    mockGetCharacters.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCharacters(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
  });
});

describe('useCharacter', () => {
  it('should fetch single character successfully', async () => {
    mockGetCharacterById.mockResolvedValueOnce(mockCharacter1);

    const { result } = renderHook(() => useCharacter(1), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCharacter1);
    expect(mockGetCharacterById).toHaveBeenCalledWith(1);
  });
});