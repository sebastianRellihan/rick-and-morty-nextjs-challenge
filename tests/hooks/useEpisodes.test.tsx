import { renderHook, waitFor } from '@testing-library/react';
import { useEpisodes, useEpisode } from '@/hooks/api/useEpisodes';
import { TestQueryWrapper } from '@tests/__mocks__/queryClient';
import { mockEpisodesResponse, mockEpisode1 } from '@tests/__mocks__/api';

// Mock the API service
jest.mock('@/services/api', () => ({
  getEpisodes: jest.fn(),
  getEpisodeById: jest.fn(),
  getMultipleEpisodes: jest.fn(),
  searchEpisodes: jest.fn(),
}));

// Import the mocked module
import * as apiService from '@/services/api';
const mockGetEpisodes = apiService.getEpisodes as jest.MockedFunction<typeof apiService.getEpisodes>;
const mockGetEpisodeById = apiService.getEpisodeById as jest.MockedFunction<typeof apiService.getEpisodeById>;

describe('useEpisodes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch episodes successfully', async () => {
    mockGetEpisodes.mockResolvedValueOnce(mockEpisodesResponse);

    const { result } = renderHook(() => useEpisodes(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockEpisodesResponse);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle error state', async () => {
    const errorMessage = 'Failed to fetch episodes';
    mockGetEpisodes.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useEpisodes(), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
  });
});

describe('useEpisode', () => {
  it('should fetch single episode successfully', async () => {
    mockGetEpisodeById.mockResolvedValueOnce(mockEpisode1);

    const { result } = renderHook(() => useEpisode(1), {
      wrapper: TestQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockEpisode1);
    expect(mockGetEpisodeById).toHaveBeenCalledWith(1);
  });
});