import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationSearch from '../ReservationSearch';
import { searchReservation } from '../../../services/reservationService';

// Mock del servicio
jest.mock('../../../services/reservationService');

describe('ReservationSearch Component', () => {
  const mockOnReservationFound = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search form correctly', () => {
    render(<ReservationSearch onReservationFound={mockOnReservationFound} />);
    
    expect(screen.getByLabelText(/código de reserva/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar reserva/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<ReservationSearch onReservationFound={mockOnReservationFound} />);
    
    const submitButton = screen.getByRole('button', { name: /buscar reserva/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/el código de reserva es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/debe proporcionar apellido o email/i)).toBeInTheDocument();
    });
  });

  it('calls onReservationFound when search is successful', async () => {
    const mockReservation = {
      reservationCode: 'ABC123',
      passengerLastName: 'PÉREZ',
      status: 'CONFIRMED'
    };

    searchReservation.mockResolvedValueOnce(mockReservation);

    render(<ReservationSearch onReservationFound={mockOnReservationFound} />);
    
    await userEvent.type(screen.getByLabelText(/código de reserva/i), 'ABC123');
    await userEvent.type(screen.getByLabelText(/apellido/i), 'PÉREZ');
    
    fireEvent.click(screen.getByRole('button', { name: /buscar reserva/i }));

    await waitFor(() => {
      expect(searchReservation).toHaveBeenCalledWith({
        reservationCode: 'ABC123',
        lastName: 'PÉREZ',
        email: ''
      });
      expect(mockOnReservationFound).toHaveBeenCalledWith(mockReservation);
    });
  });

  it('shows error message when search fails', async () => {
    searchReservation.mockRejectedValueOnce({
      response: { data: { message: 'Reserva no encontrada' } }
    });

    render(<ReservationSearch onReservationFound={mockOnReservationFound} />);
    
    await userEvent.type(screen.getByLabelText(/código de reserva/i), 'ABC123');
    await userEvent.type(screen.getByLabelText(/apellido/i), 'PÉREZ');
    
    fireEvent.click(screen.getByRole('button', { name: /buscar reserva/i }));

    await waitFor(() => {
      expect(screen.getByText('Reserva no encontrada')).toBeInTheDocument();
    });
  });
}); 