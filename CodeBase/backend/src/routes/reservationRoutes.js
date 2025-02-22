const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');
const rateLimiter = require('../middleware/rateLimiter');

router.get(
  '/reservations/:reservationCode',
  rateLimiter,
  authMiddleware,
  reservationController.getReservation
);

module.exports = router; 