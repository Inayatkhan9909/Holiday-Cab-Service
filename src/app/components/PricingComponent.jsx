// components/PricingComponent.js
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PricingComponent = () => {
  const prices = [
    { service: 'Indica/Etios/Swift Desire', value: 2500 },
    { service: 'Tavera/Xylo', value: 3000 },
    { service: 'Innova/Ertiga', value: 3300 },
    { service: 'Innova Crysta', value: 4500 },
    { service: 'Fortuner', value: 6500 },
    { service: 'Tempo Traveller 14 seater', value: 6000 },
    { service: 'Tempo Traveller 17 seater', value: 7500 },
    { service: 'Mini Bus 27 seater', value: 8500 },
  ];



  return (
    <Box className=" inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Box className="relative w-full max-w-lg bg-white rounded-lg shadow-lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom="1px solid #e0e0e0">
          <Typography id="price-modal-title" variant="h6" component="h2">
            Kashmir Taxi Service Prices 2024
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="body1" component="p" gutterBottom>
            Updated Kashmir Taxi Service Prices for the Year 2024 are:
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="pricing table">
              <TableHead>
                <TableRow>
                  <TableCell>Taxi Service</TableCell>
                  <TableCell align="right">Price/Day (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prices.map((price, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {price.service}
                    </TableCell>
                    <TableCell align="right">{price.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingComponent;
