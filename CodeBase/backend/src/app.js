const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const { handleError } = require('./utils/errorHandler');
const reservationRoutes = require('./routes/reservationRoutes');

// Cargar variables de entorno
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', reservationRoutes);

// Manejo de rutas no encontradas
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `No se puede encontrar ${req.originalUrl} en este servidor`
  });
});

// Manejador de errores global
app.use(handleError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en puerto ${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Cerrando servidor...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app; 