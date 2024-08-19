"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchgetcabtypes, selectgetCabtypes } from '../features/cabtypes/getCabtypesSlice';

const Cabs = () => {
  const dispatch = useDispatch();
  const { items: cabs, loading, error } = useSelector(selectgetCabtypes);

  useEffect(() => {
    dispatch(fetchgetcabtypes());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>Error loading cabs</Typography>;
  }

  const displayedCabs = cabs.slice(0, 3);

  return (
    <>
      <Typography
        className="mt-20 mb-8"
        sx={{
          fontSize: { lg: '2.5em', md: '2em', sm: '1.5em', xs: '1.2em' },
        }}
      >
        Cabs Available
      </Typography>
      {displayedCabs.map((cab, index) => (
        <Grid
          container
          key={cab.id}
          justifyContent={{
            xs: 'center',
            sm: index % 2 === 0 ? 'flex-start' : 'flex-end',
          }}
          width="90vw"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Grid
            container
            border="1px solid black"
            item
            xs={10}
            sm={10}
            md={8}
            lg={8}
            direction={index % 2 === 0 ? 'row' : 'row-reverse'}
            alignItems="center"
            spacing={2}
            padding="10px"
            justifyContent="center"
          >
            <Grid item xs={12} sm={6} alignItems="center" sx={{ margin: 'auto' }}>
              <CardMedia
                component="img"
                height="80%"
                width="100%"
                image={cab.cabimageurl}
                alt={cab.cabname}
                sx={{
                  borderRadius: '8px',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cab.cabname}
                </Typography>
                <Typography variant="body" color="text.secondary" sx={{ mb: 2 }}>
                  {cab.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" size="small" className="py-2 ">
                    Book
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      ))}
      
        <Grid
          container
          justifyContent="center"
          width="90vw"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Grid
            container
            border="1px solid black"
            item
            xs={10}
            sm={10}
            md={8}
            lg={8}
            alignItems="center"
            spacing={2}
            padding="10px"
            justifyContent="center"
          >
            <Grid item xs={12} alignItems="center" sx={{ margin: 'auto' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin:'auto', flexDirection:'column' }}>
                <Typography variant="body" color="text.secondary" sx={{m:'auto', mb: 2 }}>
                Click here to see all the cabs available
                </Typography>
                  <Button variant="contained"  className="py-2 w-1/3 m-auto" href='/cabs/cabtypes'>
                   All cabs
                  </Button>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
     
    </>
  );
};

export default Cabs;
