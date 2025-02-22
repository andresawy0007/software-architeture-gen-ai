const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 solicitudes por ventana por IP
  message: {
    status: 'error',
    message: 'Demasiadas solicitudes, por favor intente más tarde'
  }
});

module.exports = limiter; 