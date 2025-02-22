import { rest } from 'msw';

export const handlers = [
  rest.get('/api/reservations/:reservationCode', (req, res, ctx) => {
    const { reservationCode } = req.params;
    const { lastName, email } = req.url.searchParams;

    if (reservationCode === 'TEST123' && lastName === 'PÉREZ') {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'success',
          data: {
            reservationCode: 'TEST123',
            passengerLastName: 'PÉREZ',
            flightNumber: 'LA123',
            departureDate: '2024-12-25T10:00:00Z',
            status: 'CONFIRMED',
            services: ['BAGGAGE', 'MEAL']
          }
        })
      );
    }

    return res(
      ctx.status(404),
      ctx.json({
        status: 'error',
        message: 'Reserva no encontrada'
      })
    );
  })
]; 