
import React from 'react';
import { Box, Typography } from '@mui/material';

const NoBookings = () => {
  return (
    <Box className="flex justify-center items-center h-screen">
      <Typography variant="h6" color="textSecondary">
        No bookings
      </Typography>
    </Box>
  );
};

export default NoBookings;
