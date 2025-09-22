import { renderHook, waitFor } from '@testing-library/react';
import { useEpisodes, useEpisode, useMultipleEpisodes } from '@/hooks/api/useEpisodes';
import { TestQueryWrapper } from '@tests/__mocks__/queryClient';
import { mockEpisodesResponse, mockEpisode1, mockApiService } from '@tests/__mocks__/api';

// Mock the API service
jest.mock('@/services/api', () => mockApiService);

describe('useEpisodes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch episodes successfully', async () => {
    mockApiService.getEpisodes.mockResolvedValueOnce(mockEpisodesResponse);

    const { result } = renderHook(() => useEpisodes(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockEpisodesResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useEpisodes(), {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle error state', async () => {
    const errorMessage = 'Failed to fetch episodes';
    mockApiService.getEpisodes.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useEpisodes(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});

describe('useEpisode', () => {
  it('should fetch single episode successfully', async () => {
    mockApiService.getEpisodeById.mockResolvedValueOnce(mockEpisode1);

    const { result } = renderHook(() => useEpisode(1), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockEpisode1);
    expect(mockApiService.getEpisodeById).toHaveBeenCalledWith(1);
  });

  it('should not fetch when id is undefined', () => {
    const { result } = renderHook(() => useEpisode(undefined), {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.data).toBeUndefined();
    expect(mockApiService.getEpisodeById).not.toHaveBeenCalled();
  });
});

describe('useMultipleEpisodes', () => {
  it('should fetch multiple episodes successfully', async () => {
    const ids = [1, 2, 3];
    const expectedEpisodes = [mockEpisode1];
    mockApiService.getMultipleEpisodes.mockResolvedValueOnce(expectedEpisodes);

    const { result } = renderHook(() => useMultipleEpisodes(ids), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(expectedEpisodes);
    expect(mockApiService.getMultipleEpisodes).toHaveBeenCalledWith(ids);
  });

  it('should not fetch when ids array is empty', () => {
    const { result } = renderHook(() => useMultipleEpisodes([]), {
      wrapper: TestQueryWrapper,
    });

    expect(result.current.data).toBeUndefined();
    expect(mockApiService.getMultipleEpisodes).not.toHaveBeenCalled();
  });

  it('should handle enabled/disabled state', async () => {
    const ids = [1, 2];
    
    const { result, rerender } = renderHook(
      ({ enabled }) => useMultipleEpisodes(ids, { enabled }),
      {
        wrapper: TestQueryWrapper,
        initialProps: { enabled: false },
      }
    );

    expect(result.current.data).toBeUndefined();
    expect(mockApiService.getMultipleEpisodes).not.toHaveBeenCalled();

    rerender({ enabled: true });

    await waitFor(() => {
      expect(mockApiService.getMultipleEpisodes).toHaveBeenCalledWith(ids);
    });
  });
});
