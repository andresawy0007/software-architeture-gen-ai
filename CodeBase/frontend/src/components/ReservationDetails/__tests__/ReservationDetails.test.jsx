import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReservationDetails from '../ReservationDetails';

describe('ReservationDetails Component', () => {
  const mockReservation = {
    reservationCode: 'ABC123',
    flightNumber: 'LA123',
    passengerLastName: 'PÉREZ',
    departureDate: '2024-12-25T10:00:00Z',
    status: 'CONFIRMED',
    services: ['BAGGAGE', 'MEAL']
  };

  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders reservation details correctly', () => {
    render(<ReservationDetails reservation={mockReservation} onBack={mockOnBack} />);
    
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('LA123')).toBeInTheDocument();
    expect(screen.getByText('Confirmada')).toBeInTheDocument();
    expect(screen.getByText('BAGGAGE')).toBeInTheDocument();
    expect(screen.getByText('MEAL')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    render(<ReservationDetails reservation={mockReservation} onBack={mockOnBack} />);
    
    const backButton = screen.getByRole('button', { name: /volver/i });
    fireEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('shows correct status chip color', () => {
    const { rerender } = render(
      <ReservationDetails 
        reservation={{ ...mockReservation, status: 'CONFIRMED' }} 
        onBack={mockOnBack} 
      />
    );
    expect(screen.getByText('Confirmada')).toHaveClass('MuiChip-colorSuccess');

    rerender(
      <ReservationDetails 
        reservation={{ ...mockReservation, status: 'CANCELLED' }} 
        onBack={mockOnBack} 
      />
    );
    expect(screen.getByText('Cancelada')).toHaveClass('MuiChip-colorError');
  });
}); 