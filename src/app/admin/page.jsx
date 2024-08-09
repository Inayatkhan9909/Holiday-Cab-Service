"use client";
import React from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Adminpage = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" gutterBottom align="center">
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pick & Drop cabs
              </Typography>
           
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleNavigation('/admin/pickdrop')}
              >
                View Pick & Drop
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                View bookings
              </Typography>
              <Typography variant="body2">
             View all the bookings done in pick and drop
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleNavigation('/admin/packages')}
              >
               Bookings
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Edit Contact Page
              </Typography>
              <Typography variant="body2">
                Click to edit the contact page.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleNavigation('/contact')}
              >
                Edit Contact Page
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more sections as needed */}
      </Grid>
    </Box>
  );
};

export default Adminpage;
