const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  reservationCode: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  passengerLastName: {
    type: String,
    required: true,
    index: true
  },
  passengerEmail: {
    type: String,
    required: true,
    index: true
  },
  flightNumber: {
    type: String,
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: Date,
  status: {
    type: String,
    enum: ['CONFIRMED', 'CANCELLED', 'PENDING'],
    default: 'PENDING'
  },
  services: [{
    type: String,
    enum: ['BAGGAGE', 'MEAL', 'SEAT_SELECTION']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índices compuestos para optimizar las búsquedas
reservationSchema.index({ reservationCode: 1, passengerLastName: 1 });
reservationSchema.index({ reservationCode: 1, passengerEmail: 1 });

module.exports = mongoose.model('Reservation', reservationSchema); 