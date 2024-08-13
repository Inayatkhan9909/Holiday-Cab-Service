import React from 'react';
import {
  Grid,Card, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const BookingComponent = ({ PDbookings }) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (booking) => {
    // Add edit functionality here
  };

  const handleCancel = (booking) => {
    // Add cancel functionality here
  };

  return (
    <Grid item xs={12}>
      <Card className="shadow-lg">
        <CardHeader title="My Bookings" />
        <CardContent>
          <TableContainer component={Paper} className="overflow-x-auto">
            <Table aria-label="cab fares table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Pickup</TableCell>
                  <TableCell>Drop</TableCell>
                  <TableCell>Trip Type</TableCell>
                  <TableCell>Cab Type</TableCell>
                  <TableCell>Persons</TableCell>
                  <TableCell>Pickup Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Travel Date</TableCell>
                  <TableCell>Travel Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PDbookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.customername}</TableCell>
                    <TableCell>{booking.pickup}</TableCell>
                    <TableCell>{booking.drop}</TableCell>
                    <TableCell>{booking.ridetype}</TableCell>
                    <TableCell>{booking.cabtype}</TableCell>
                    <TableCell>{booking.persons}</TableCell>
                    <TableCell>{booking.pickupfulladdress}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{booking.contact}</TableCell>
                    <TableCell>{booking.tripfair}</TableCell>
                    <TableCell>{formatDate(booking.traveldate)}</TableCell>
                    <TableCell>{booking.traveltime}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(booking)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleCancel(booking)}>
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookingComponent;
