const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Reservation = require('../../src/models/reservation');
const jwt = require('jsonwebtoken');

describe('Reservation API Integration Tests', () => {
  let mongoServer;
  let token;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    
    // Crear token de prueba
    token = jwt.sign({ id: 'test-user' }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Reservation.deleteMany({});
  });

  describe('GET /api/reservations/:reservationCode', () => {
    it('should return 401 without token', async () => {
      await request(app)
        .get('/api/reservations/TEST123')
        .expect(401);
    });

    it('should return 404 for non-existent reservation', async () => {
      await request(app)
        .get('/api/reservations/NOTFOUND')
        .set('Authorization', `Bearer ${token}`)
        .query({ lastName: 'PÉREZ' })
        .expect(404);
    });

    it('should return reservation details when found', async () => {
      const testReservation = new Reservation({
        reservationCode: 'TEST123',
        passengerLastName: 'PÉREZ',
        passengerEmail: 'test@email.com',
        flightNumber: 'LA123',
        departureDate: new Date('2024-12-25'),
        status: 'CONFIRMED'
      });
      await testReservation.save();

      const response = await request(app)
        .get('/api/reservations/TEST123')
        .set('Authorization', `Bearer ${token}`)
        .query({ lastName: 'PÉREZ' })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.reservationCode).toBe('TEST123');
      expect(response.body.data.passengerLastName).toBe('PÉREZ');
    });
  });
}); 