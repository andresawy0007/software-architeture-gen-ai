import React from 'react';
import { Fade, Slide } from '@mui/material';

const PageTransition = ({ children, direction = 'up' }) => {
  return (
    <Fade in timeout={450}>
      <Slide direction={direction} in mountOnEnter unmountOnExit timeout={400}>
        {children}
      </Slide>
    </Fade>
  );
};

export default PageTransition; 