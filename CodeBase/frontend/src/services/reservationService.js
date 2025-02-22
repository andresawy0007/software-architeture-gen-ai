import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Configuración del cliente axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Manejar error de autenticación
      console.error('Error de autenticación');
    }
    return Promise.reject(error);
  }
);

export const searchReservation = async ({ reservationCode, lastName, email }) => {
  try {
    const params = new URLSearchParams();
    if (lastName) params.append('lastName', lastName);
    if (email) params.append('email', email);

    const response = await apiClient.get(
      `/reservations/${reservationCode}?${params.toString()}`
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
}; 