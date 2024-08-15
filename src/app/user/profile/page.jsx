"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  selectUser,
  selectLoading as selectUserLoading,
  selectError as selectUserError,
} from "../../features/user/userSlice";
import {
  fetchUserPDbookings,
  selectUserPDbooking,
  selectLoading as selectBookingLoading,
  selectError as selectBookingError,
} from "../../features/user/userPDbookingSlice";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import BookingComponent from "@/app/components/BookingComponent";
import NoBookings from "@/app/components/Nobookings";

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

  if (userLoading || bookingLoading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (userError || bookingError) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography color="error">
          Error: {userError || bookingError}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="p-4">
      <Typography variant="h4" gutterBottom align="center">
        User Profile
      </Typography>
      {user && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card className="shadow-lg">
              <CardHeader title="Personal Information" />
              <CardContent>
                <Typography variant="body1">
                  <strong>Name:</strong> {user.firstname} {user.lastname}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                {user.isAdmin && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    href="/admin"
                  >
                    Admin
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
          {PDbookings.length > 0 ? (
            <BookingComponent PDbookings={PDbookings} />
          ) : (
            <NoBookings />
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Page;
