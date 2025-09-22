import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCard } from '@/components/ui/Card/CharacterCard';
import { mockCharacter1, mockDeadCharacter, mockUnknownCharacter } from '@tests/__mocks__/api';

describe('CharacterCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render character information', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnClick} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render different status correctly', () => {
    render(<CharacterCard character={mockDeadCharacter} onClick={mockOnClick} />);

    expect(screen.getByText('Dead Character')).toBeInTheDocument();
    expect(screen.getByText('Dead')).toBeInTheDocument();
    expect(screen.getByText('Alien')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockCharacter1);
  });

  it('should display status dot', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnClick} />);

    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toBeInTheDocument();
    expect(statusDot).toHaveAttribute('aria-label', 'Status: Alive');
  });

  it('should have accessibility attributes', () => {
    render(<CharacterCard character={mockCharacter1} onClick={mockOnClick} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', 'Select character Rick Sanchez');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Image of Rick Sanchez');
  });
});