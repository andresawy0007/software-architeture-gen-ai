const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ReservationController = require('../../../src/controllers/reservationController');
const Reservation = require('../../../src/models/reservation');

describe('ReservationController', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Reservation.deleteMany({});
  });

  describe('getReservation', () => {
    it('should return 404 when reservation not found', async () => {
      const req = {
        params: { reservationCode: 'NOTFOUND' },
        query: { lastName: 'PÉREZ' }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ReservationController.getReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Reserva no encontrada'
      });
    });

    it('should return reservation when found', async () => {
      const testReservation = new Reservation({
        reservationCode: 'TEST123',
        passengerLastName: 'PÉREZ',
        passengerEmail: 'test@email.com',
        flightNumber: 'LA123',
        departureDate: new Date('2024-12-25'),
        status: 'CONFIRMED'
      });
      await testReservation.save();

      const req = {
        params: { reservationCode: 'TEST123' },
        query: { lastName: 'PÉREZ' }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ReservationController.getReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: expect.objectContaining({
          reservationCode: 'TEST123',
          passengerLastName: 'PÉREZ'
        })
      });
    });

    it('should return 400 when missing required parameters', async () => {
      const req = {
        params: { reservationCode: 'TEST123' },
        query: {}
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await ReservationController.getReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Debe proporcionar el código de reserva y apellido o email'
      });
    });
  });
}); 