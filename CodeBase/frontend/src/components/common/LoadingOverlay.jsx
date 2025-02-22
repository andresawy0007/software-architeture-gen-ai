import React from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoadingOverlay = ({ open, message }) => {
  const { t } = useTranslation();

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column'
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      {message && (
        <Box mt={2}>
          <Typography variant="h6">{message}</Typography>
        </Box>
      )}
    </Backdrop>
  );
};

export default LoadingOverlay; 