"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, selectUser, selectLoading as selectUserLoading, selectError as selectUserError } from '../../features/user/userSlice';
import { fetchUserPDbookings, selectUserPDbooking, selectLoading as selectBookingLoading, selectError as selectBookingError } from '../../features/user/userPDbookingSlice';
import {
  Box, Grid, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, IconButton, CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

const Page = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userPDbookings = useSelector(selectUserPDbooking);
  const userLoading = useSelector(selectUserLoading);
  const userError = useSelector(selectUserError);
  const bookingLoading = useSelector(selectBookingLoading);
  const bookingError = useSelector(selectBookingError);
  const [PDbookings, setPDbookings] = useState([]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user._id) {
      console.log("User data complete");
      dispatch(fetchUserPDbookings(user._id));
    } else {
      console.log("User data not complete");
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (Array.isArray(userPDbookings)) {
      setPDbookings(userPDbookings);
    } else {
      setPDbookings([]);
    }
  }, [userPDbookings]);

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

  if (userLoading || bookingLoading) {
    return <Box className="flex justify-center items-center h-screen"><CircularProgress /></Box>;
  }

  if (userError || bookingError) {
    return <Box className="flex justify-center items-center h-screen"><Typography color="error">Error: {userError || bookingError}</Typography></Box>;
  }

  return (
    <Box className="p-4">
      <Typography variant="h4" gutterBottom align="center">User Profile</Typography>
      {user && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className="shadow-lg">
              <CardHeader title="Personal Information" />
              <CardContent>
                <Typography variant="body1"><strong>Name:</strong> {user.firstname} {user.lastname}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
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
        </Grid>
      )}
    </Box>
  );
};

export default Page;
