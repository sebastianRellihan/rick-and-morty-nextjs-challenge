import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters, useCharacter, useMultipleCharacters } from '@/hooks/api/useCharacters';
import { TestQueryWrapper } from '@tests/__mocks__/queryClient';
import { mockCharactersResponse, mockCharacter1, mockApiService } from '@tests/__mocks__/api';

// Mock the API service
jest.mock('@/services/api', () => mockApiService);

describe('useCharacters', () => {
  it('should fetch characters successfully', async () => {
    mockApiService.getCharacters.mockResolvedValueOnce(mockCharactersResponse);

    const { result } = renderHook(() => useCharacters(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCharactersResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useCharacters(), {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle error state', async () => {
    const errorMessage = 'Failed to fetch characters';
    mockApiService.getCharacters.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useCharacters(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });

  it('should refetch when page changes', async () => {
    mockApiService.getCharacters.mockResolvedValue(mockCharactersResponse);

    const { result, rerender } = renderHook(
      ({ page }) => useCharacters(page),
      {
        wrapper: TestQueryWrapper,
        initialProps: { page: 1 },
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.getCharacters).toHaveBeenCalledWith(1);

    rerender({ page: 2 });

    await waitFor(() => {
      expect(mockApiService.getCharacters).toHaveBeenCalledWith(2);
    });
  });
});

describe('useCharacter', () => {
  it('should fetch single character successfully', async () => {
    mockApiService.getCharacterById.mockResolvedValueOnce(mockCharacter1);

    const { result } = renderHook(() => useCharacter(1), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCharacter1);
    expect(mockApiService.getCharacterById).toHaveBeenCalledWith(1);
  });

  it('should not fetch when id is undefined', () => {
    const { result } = renderHook(() => useCharacter(undefined), {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.data).toBeUndefined();
    expect(mockApiService.getCharacterById).not.toHaveBeenCalled();
  });
});

describe('useMultipleCharacters', () => {
  it('should fetch multiple characters successfully', async () => {
    const ids = [1, 2];
    const expectedCharacters = [mockCharacter1, mockApiService.mockCharacter2];
    mockApiService.getMultipleCharacters.mockResolvedValueOnce(expectedCharacters);

    const { result } = renderHook(() => useMultipleCharacters(ids), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(expectedCharacters);
    expect(mockApiService.getMultipleCharacters).toHaveBeenCalledWith(ids);
  });

  it('should not fetch when ids array is empty', () => {
    const { result } = renderHook(() => useMultipleCharacters([]), {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.data).toBeUndefined();
    expect(mockApiService.getMultipleCharacters).not.toHaveBeenCalled();
  });
});
