import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Cabs = () => {
    const Cabs = [
        {
            id: 1,
            title: 'Switft Dezire',
            description: 'Enjoy the sunny beaches with our exclusive package.',
            image: '/pexels-salman-mansuri-597168-15317850.jpg',
        },
        {
            id: 2,
            title: 'Amaze',
            description: 'Experience the thrill of mountain adventures.',
            image: '/pexels-salman-mansuri-597168-15317850.jpg',
        },
        {
            id: 3,
            title: 'Innova',
            description: 'Explore the city with our guided tours.',
            image: '/pexels-salman-mansuri-597168-15317850.jpg',
        },
        {
            id: 4,
            title: 'Traveller',
            description: 'Relax on a luxury cruise with our special package.',
            image: '/pexels-salman-mansuri-597168-15317850.jpg',
        },
    ];
    return (
        <>
        <Typography className="mt-20 mb-8"
         sx={{
          fontSize: {lg:'2.5em' ,md:'2em',sm:'1.5em', xs:'1.2em'}
        }}
        >
          Cabs Available
        </Typography>
        {Cabs.map((cab, index) => (
          <Grid
            container
            // spacing={4}
            key={cab.id}
            justifyContent={{
              xs: 'center', 
              sm: index % 2 === 0 ? 'flex-start' : 'flex-end', 
            }}
            width='90vw'
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
              padding='10px'
              justifyContent='center'
            >
              <Grid item xs={12} sm={6} 
              alignItems='center'
              sx={{margin:'auto'}}
              >
                <CardMedia
                  component="img"
                  height="80%"
                  width="100%"
                  image={cab.image}
                  alt={cab.title}
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
                    {cab.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {cab.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" size="small" className="py-2">
                      Book
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </>
  
    )
}

export default Cabs