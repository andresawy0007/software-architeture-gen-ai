import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './i18n';  // Import i18n configuration
import ReservationSearch from './components/ReservationSearch/ReservationSearch';
import ReservationDetails from './components/ReservationDetails/ReservationDetails';
import PageTransition from './components/common/PageTransition';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

function App() {
  const [reservation, setReservation] = useState(null);

  const handleReservationFound = (foundReservation) => {
    setReservation(foundReservation);
  };

  const handleBack = () => {
    setReservation(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageTransition>
        {!reservation ? (
          <ReservationSearch onReservationFound={handleReservationFound} />
        ) : (
          <ReservationDetails reservation={reservation} onBack={handleBack} />
        )}
      </PageTransition>
    </ThemeProvider>
  );
}

export default App; 