import React, { useState } from 'react';
import { 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Container,
  Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { searchReservation } from '../../services/reservationService';
import LoadingOverlay from '../common/LoadingOverlay';

const ReservationSearch = ({ onReservationFound }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    reservationCode: Yup.string()
      .required(t('search.validation.requiredCode'))
      .min(6, t('search.validation.minCode', { min: 6 }))
      .max(10, t('search.validation.maxCode', { max: 10 })),
    lastName: Yup.string()
      .when('email', {
        is: (email) => !email || email.length === 0,
        then: () => Yup.string().required(t('search.validation.requiredField')),
      }),
    email: Yup.string()
      .email(t('search.validation.invalidEmail'))
      .when('lastName', {
        is: (lastName) => !lastName || lastName.length === 0,
        then: () => Yup.string().required(t('search.validation.requiredField')),
      }),
  });

  const formik = useFormik({
    initialValues: {
      reservationCode: '',
      lastName: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        setIsLoading(true);
        const reservation = await searchReservation(values);
        onReservationFound(reservation);
      } catch (err) {
        setError(
          err.response?.data?.message || 
          (err.message === 'Network Error' ? t('errors.network') : t('errors.default'))
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <LoadingOverlay open={isLoading} message={t('search.loading')} />
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t('search.title')}
        </Typography>
        
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="reservationCode"
              name="reservationCode"
              label={t('search.reservationCode')}
              value={formik.values.reservationCode}
              onChange={formik.handleChange}
              error={formik.touched.reservationCode && Boolean(formik.errors.reservationCode)}
              helperText={formik.touched.reservationCode && formik.errors.reservationCode}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label={t('search.lastName')}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label={t('search.email')}
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }}
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
          >
            {t('search.searchButton')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ReservationSearch; 