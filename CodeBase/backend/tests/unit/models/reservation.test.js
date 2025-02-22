const mongoose = require('mongoose');
const Reservation = require('../../../src/models/reservation');

describe('Reservation Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Reservation.deleteMany();
  });

  it('should create & save reservation successfully', async () => {
    const validReservation = new Reservation({
      reservationCode: 'ABC123',
      passengerLastName: 'PÉREZ',
      passengerEmail: 'perez@email.com',
      flightNumber: 'LA123',
      departureDate: new Date('2024-12-25'),
      status: 'CONFIRMED'
    });

    const savedReservation = await validReservation.save();
    
    expect(savedReservation._id).toBeDefined();
    expect(savedReservation.reservationCode).toBe('ABC123');
    expect(savedReservation.status).toBe('CONFIRMED');
  });

  it('should fail to save reservation without required fields', async () => {
    const reservationWithoutRequiredField = new Reservation({
      passengerLastName: 'PÉREZ'
    });

    let err;
    try {
      await reservationWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should fail to save reservation with invalid status', async () => {
    const reservationWithInvalidStatus = new Reservation({
      reservationCode: 'ABC123',
      passengerLastName: 'PÉREZ',
      passengerEmail: 'perez@email.com',
      flightNumber: 'LA123',
      departureDate: new Date('2024-12-25'),
      status: 'INVALID_STATUS'
    });

    let err;
    try {
      await reservationWithInvalidStatus.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
}); 