const Reservation = require('../models/reservation');

class ReservationController {
  async getReservation(req, res) {
    try {
      const { reservationCode } = req.params;
      const { lastName, email } = req.query;

      if (!reservationCode || (!lastName && !email)) {
        return res.status(400).json({
          status: 'error',
          message: 'Debe proporcionar el código de reserva y apellido o email'
        });
      }

      const query = {
        reservationCode: reservationCode.toUpperCase(),
        ...(lastName ? { passengerLastName: lastName.toUpperCase() } : {}),
        ...(email ? { passengerEmail: email.toLowerCase() } : {})
      };

      const reservation = await Reservation.findOne(query);

      if (!reservation) {
        return res.status(404).json({
          status: 'error',
          message: 'Reserva no encontrada'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: reservation
      });
    } catch (error) {
      console.error('Error al buscar reserva:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor'
      });
    }
  }
}

module.exports = new ReservationController(); 