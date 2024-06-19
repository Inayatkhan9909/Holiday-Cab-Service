"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

const BookCab = () => {
    const router = useRouter();  
    const [searchParams, setSearchParams] = useState({ pickup: '', drop: '', tripType: '' });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchParams({
            pickup: params.get('pickup') || '',
            drop: params.get('drop') || '',
            tripType: params.get('tripType') || ''
        });
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Search Results
            </Typography>
            <Typography variant="h6">Pickup: {searchParams.pickup}</Typography>
            <Typography variant="h6">Drop: {searchParams.drop}</Typography>
            <Typography variant="h6">Trip Type: {searchParams.tripType}</Typography>
            {/* Display cab options and rates here */}
        </Box>
    );
};

export default BookCab;
