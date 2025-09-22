import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/ui/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('should render pagination with correct page numbers', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should highlight current page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('should call onPageChange when page number is clicked', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should disable Previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should navigate to previous page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should navigate to next page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('should handle single page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should limit displayed pages when totalPages is large', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={20}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show pages around current page, not all 20
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('20')).not.toBeInTheDocument();
  });

  it('should handle keyboard navigation', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const pageButton = screen.getByText('4');
    fireEvent.keyDown(pageButton, { key: 'Enter' });
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('should have proper accessibility attributes', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveAttribute('aria-label', 'Pagination');

    const currentPage = screen.getByText('3');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });
});
