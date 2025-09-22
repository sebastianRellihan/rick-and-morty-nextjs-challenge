import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '@/components/ui/Card/CharacterCard';
import {
  mockCharacter1,
  mockDeadCharacter,
  mockUnknownCharacter,
} from '@tests/__mocks__/api';

describe('CharacterCard', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('should render character information correctly', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnSelect} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /Rick Sanchez/i }),
    ).toBeInTheDocument();
  });

  it('should render different status correctly', () => {
    render(
      <CharacterCard character={mockDeadCharacter} onClick={mockOnSelect} />,
    );

    expect(screen.getByText('Dead Character')).toBeInTheDocument();
    expect(screen.getByText('Dead')).toBeInTheDocument();
    expect(screen.getByText('Alien')).toBeInTheDocument();
  });

  it('should render unknown status correctly', () => {
    render(
      <CharacterCard character={mockUnknownCharacter} onClick={mockOnSelect} />,
    );

    expect(screen.getByText('Unknown Character')).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
    expect(screen.getByText('Robot')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnSelect} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnSelect).toHaveBeenCalledWith(mockCharacter1);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('should display status dot with correct color', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnSelect} />);

    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveAttribute('aria-label', 'Status: Alive');
  });

  it('should display status dot for dead character', () => {
    render(
      <CharacterCard character={mockDeadCharacter} onClick={mockOnSelect} />,
    );

    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveAttribute('aria-label', 'Status: Dead');
  });

  it('should display status dot for unknown character', () => {
    render(
      <CharacterCard character={mockUnknownCharacter} onClick={mockOnSelect} />,
    );

    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveAttribute('aria-label', 'Status: unknown');
  });

  it('should have proper accessibility attributes', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnSelect} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', 'Select character Rick Sanchez');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Image of Rick Sanchez');
  });

  it('should handle keyboard interaction', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnSelect} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });

    expect(mockOnSelect).toHaveBeenCalledWith(mockCharacter1);
  });
});
