
import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const packages = [
  {
    id: 1,
    title: 'Kashmir valley',
    description: 'Enjoy the sunny beaches with our exclusive package.',
    image: '/images/pexels-imadclicks-9883020.jpg',
  },
  {
    id: 2,
    title: 'Gulmarg',
    description: 'Enjoy the sunny beaches with our exclusive package.',
    image: '/images/pexels-salman-mansuri-597168-15317850.jpg',
  },
  {
    id: 3,
    title: 'Gurez',
    description: 'Experience the thrill of mountain adventures.',
    image: '/images/Gurez_valley_image.jpg',
  },
  {
    id: 4,
    title: 'Pahlagam',
    description: 'Explore the city with our guided tours.',
    image: '/images/pahalgam_image.jpg',
  },
  {
    id: 5,
    title: 'Sonamarg',
    description: 'Relax on a luxury cruise with our special package.',
    image: '/images/Sonamarg_image.jpg',
  },
];

const Packages = () => {
  const displayedPackages = packages.slice(0, 3);

  return (
    <>
      <Typography 
        variant='h4'
        className="mt-20 mb-6 w-screen text-3xl text-center"
      >
        Popular destinations
      </Typography>
      <Grid 
        container 
        spacing={6} 
        sx={{
          width: '90vw',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {displayedPackages.map((pkg) => (
          <Grid item key={pkg.id} lg={3} md={4} sm={6} xs={12}>
            <Card
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={pkg.image}
                alt={pkg.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pkg.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {pkg.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                  }}
                >
                  <Button variant="contained" size="small" className="py-2 mt-4">
                    Book
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',  
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
                  Explore all the famous and beautyfull destinations with us and book your trip now 
                </Typography>
              <Link href="/cabs/allpackages" passHref>
                <Button variant="outlined" size="large" className='mt-10'>
                   All Packages
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Packages;
