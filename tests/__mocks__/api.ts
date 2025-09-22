import type { Character, Episode, ApiResponse } from '@/models';

// Mock characters
export const mockCharacter1: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
  location: { name: 'Earth (Replacement Dimension)', url: 'https://rickandmortyapi.com/api/location/20' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

export const mockCharacter2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
  location: { name: 'Earth (Replacement Dimension)', url: 'https://rickandmortyapi.com/api/location/20' },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/4',
  ],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

export const mockDeadCharacter: Character = {
  ...mockCharacter1,
  id: 3,
  name: 'Dead Character',
  status: 'Dead',
  species: 'Alien',
};

export const mockUnknownCharacter: Character = {
  ...mockCharacter1,
  id: 4,
  name: 'Unknown Character',
  status: 'unknown',
  species: 'Robot',
};

// Mock episodes
export const mockEpisode1: Episode = {
  id: 1,
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  characters: ['https://rickandmortyapi.com/api/character/1', 'https://rickandmortyapi.com/api/character/2'],
  url: 'https://rickandmortyapi.com/api/episode/1',
  created: '2017-11-10T12:56:33.798Z',
};

export const mockEpisode2: Episode = {
  id: 2,
  name: 'Lawnmower Dog',
  air_date: 'December 9, 2013',
  episode: 'S01E02',
  characters: ['https://rickandmortyapi.com/api/character/1', 'https://rickandmortyapi.com/api/character/2'],
  url: 'https://rickandmortyapi.com/api/episode/2',
  created: '2017-11-10T12:56:33.916Z',
};

export const mockEpisode3: Episode = {
  id: 3,
  name: 'Anatomy Park',
  air_date: 'December 16, 2013',
  episode: 'S01E03',
  characters: ['https://rickandmortyapi.com/api/character/1'],
  url: 'https://rickandmortyapi.com/api/episode/3',
  created: '2017-11-10T12:56:34.022Z',
};

export const mockEpisode4: Episode = {
  id: 4,
  name: 'M. Night Shaym-Aliens!',
  air_date: 'January 13, 2014',
  episode: 'S01E04',
  characters: ['https://rickandmortyapi.com/api/character/2'],
  url: 'https://rickandmortyapi.com/api/episode/4',
  created: '2017-11-10T12:56:34.130Z',
};

// Mock API responses
export const mockCharactersResponse: ApiResponse<Character> = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null,
  },
  results: [mockCharacter1, mockCharacter2],
};

export const mockEpisodesResponse: ApiResponse<Episode> = {
  info: {
    count: 51,
    pages: 3,
    next: 'https://rickandmortyapi.com/api/episode?page=2',
    prev: null,
  },
  results: [mockEpisode1, mockEpisode2, mockEpisode3, mockEpisode4],
};

// Mock API functions
export const mockApiService = {
  getCharacters: jest.fn().mockResolvedValue(mockCharactersResponse),
  getCharacterById: jest.fn().mockResolvedValue(mockCharacter1),
  getMultipleCharacters: jest.fn().mockResolvedValue([mockCharacter1, mockCharacter2]),
  searchCharacters: jest.fn().mockResolvedValue(mockCharactersResponse),
  getEpisodes: jest.fn().mockResolvedValue(mockEpisodesResponse),
  getEpisodeById: jest.fn().mockResolvedValue(mockEpisode1),
  getMultipleEpisodes: jest.fn().mockResolvedValue([mockEpisode1, mockEpisode2, mockEpisode3, mockEpisode4]),
  searchEpisodes: jest.fn().mockResolvedValue(mockEpisodesResponse),
};
