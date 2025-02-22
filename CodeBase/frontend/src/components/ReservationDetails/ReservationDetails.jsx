import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Container,
  Button,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const StatusChip = ({ status }) => {
  const { t } = useTranslation();
  const statusConfig = {
    CONFIRMED: { color: 'success', label: t('details.status.CONFIRMED') },
    CANCELLED: { color: 'error', label: t('details.status.CANCELLED') },
    PENDING: { color: 'warning', label: t('details.status.PENDING') }
  };

  const config = statusConfig[status] || { color: 'default', label: status };

  return <Chip color={config.color} label={config.label} />;
};

const ReservationDetails = ({ reservation, onBack }) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language.startsWith('es') ? es : enUS;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h1">
            {t('details.title')}
          </Typography>
          <StatusChip status={reservation.status} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Código de Reserva
            </Typography>
            <Typography variant="body1" gutterBottom>
              {reservation.reservationCode}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Número de Vuelo
            </Typography>
            <Typography variant="body1" gutterBottom>
              {reservation.flightNumber}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Fecha de Salida
            </Typography>
            <Typography variant="body1" gutterBottom>
              {format(new Date(reservation.departureDate), 'PPP', { locale: currentLocale })}
            </Typography>
          </Grid>

          {reservation.returnDate && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Fecha de Retorno
              </Typography>
              <Typography variant="body1" gutterBottom>
                {format(new Date(reservation.returnDate), 'PPP', { locale: es })}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Servicios Contratados
            </Typography>
            <Box sx={{ mt: 1 }}>
              {reservation.services.map((service) => (
                <Chip
                  key={service}
                  label={service}
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            fullWidth
          >
            Volver a la Búsqueda
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ReservationDetails; 