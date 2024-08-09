import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';

const UnAuthorized = () => {
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Unauthorized Access
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" align="center" color="textSecondary" paragraph>
                        You do not have permission to view this page.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" href='/'>
                            Go to Homepage
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UnAuthorized;
