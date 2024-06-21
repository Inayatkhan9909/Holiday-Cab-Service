"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

const BookCab = () => {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState({ pickup: '', drop: '', tripType: '' });
    const [formData, setFormData] = useState({
        cabType: '',
        persons: '',
        mobile: '',
        date: '',
        time: '',
        fullAddress: '',
        price: '',
        pickup: '',
        drop: '',
        tripType: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pickup = params.get('pickup') || '';
        const drop = params.get('drop') || '';
        const tripType = params.get('tripType') || '';

        setSearchParams({ pickup, drop, tripType });

        // Fetch the price from the database
        const fetchPrice = async () => {
            try {
                const response = await fetch(`/api/cabfare?pickup=${pickup}&drop=${drop}`);
                const data = await response.json();
                setFormData((prevData) => ({ ...prevData, price: data.price }));
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };

        fetchPrice();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Handle form submission, such as saving booking details to the database
            console.log('Form Data:', formData);
            setErrors({});
        }
    };

    return (
        <>
            <Container maxWidth="100vw">
                {/* <LocationComponent/> */}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: { xs: "100%", sm: "80%" }, p: { xs: 2, sm: 4 }, margin: '5vh auto', border: '1px solid black' }}>
                    <Box gutterBottom sx={{ fontSize: { sm: "25px", xs: "22px" }, width: { sm: "50%", xs: "100%" }, m: 'auto', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>

                            <FormControl sx={{ m: 1, minWidth: { md: 180, sm: 130, xs: 100 } }} error={Boolean(errors.pickup)}>
                                <InputLabel id="pickup_select">Pickup</InputLabel>
                                <Select
                                    labelId="pickup_select"
                                    id="pickup"
                                    value={searchParams.pickup}
                                    name="pickup"
                                    label="Pickup"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Srinagar">Srinagar</MenuItem>
                                    <MenuItem value="Jammu">Jammu</MenuItem>
                                    <MenuItem value="Pahlagam">Pahlagam</MenuItem>
                                    <MenuItem value="Gulmarg">Gulmarg</MenuItem>
                                    <MenuItem value="Sonamarg">Sonamarg</MenuItem>
                                    <MenuItem value="Doodhpathri">Doodhpathri</MenuItem>
                                    <MenuItem value="Kargil">Kargil</MenuItem>
                                </Select>
                                {errors.pickup && <FormHelperText>{errors.pickup}</FormHelperText>}
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: { md: 180, sm: 130, xs: 100 } }} error={Boolean(errors.drop)}>
                                <InputLabel id="drop_select">Drop</InputLabel>
                                <Select
                                    labelId="drop_select"
                                    id="drop"
                                    value={searchParams.drop}
                                    label="Drop"
                                    name="drop"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Srinagar">Srinagar</MenuItem>
                                    <MenuItem value="Jammu">Jammu</MenuItem>
                                    <MenuItem value="Pahlagam">Pahlagam</MenuItem>
                                    <MenuItem value="Gulmarg">Gulmarg</MenuItem>
                                    <MenuItem value="Sonamarg">Sonamarg</MenuItem>
                                    <MenuItem value="Doodhpathri">Doodhpathri</MenuItem>
                                    <MenuItem value="Kargil">Kargil</MenuItem>
                                </Select>
                                {errors.drop && <FormHelperText>{errors.drop}</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>

                            <FormControl sx={{ m: 1, minWidth: { md: 180, sm: 130, xs: 100 } }} error={Boolean(errors.tripType)}>
                                <InputLabel id="trip_type_select">Trip type</InputLabel>
                                <Select
                                    labelId="trip_type_select"
                                    id="trip_type"
                                    value={searchParams.tripType}
                                    name="tripType"
                                    label="Trip type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="One way">One way</MenuItem>
                                    <MenuItem value="Round trip">Round trip</MenuItem>
                                </Select>
                                {errors.tripType && <FormHelperText>{errors.tripType}</FormHelperText>}
                            </FormControl>
                        </Box>
                        {searchParams.tripType === 'Round trip' && (
                            <Typography variant="body1" color="textSecondary">
                                Note: This round trip will include popular tourist points at the destination.
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 2 }}>
                        <FormControl sx={{ m: 1, minWidth: "15%" }} error={Boolean(errors.cabType)}>
                            <InputLabel id="cabType-label">Cab Type</InputLabel>
                            <Select
                                labelId="cabType-label"
                                id="cabType"
                                name="cabType"
                                value={formData.cabType}
                                onChange={handleChange}
                            >
                                <MenuItem value="Swift dzire">Swift dzire</MenuItem>
                                <MenuItem value="Honda Amaze">Honda Amaze</MenuItem>
                                <MenuItem value="Crysta">Crysta</MenuItem>
                                <MenuItem value="Innova">Innova</MenuItem>
                                <MenuItem value="Traveler">Traveler</MenuItem>
                            </Select>
                            {errors.cabType && <FormHelperText>{errors.cabType}</FormHelperText>}
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: "10%" }} error={Boolean(errors.persons)}>
                            <InputLabel id="persons-label">Persons</InputLabel>
                            <Select
                                labelId="persons-label"
                                id="persons"
                                name="persons"
                                value={formData.persons}
                                onChange={handleChange}
                            >
                                {Array.from({ length: 15 }, (_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                                ))}
                            </Select>
                            {errors.persons && <FormHelperText>{errors.persons}</FormHelperText>}
                        </FormControl>

                        <TextField
                            label="Mobile Number"
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            sx={{ m: 1, minWidth: "20%" }}
                            error={Boolean(errors.mobile)}
                            helperText={errors.mobile}
                        />

                        <TextField
                            label="Date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            sx={{ m: 1, minWidth: "20%" }}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.date)}
                            helperText={errors.date}
                        />

                        <TextField
                            label="Time"
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            sx={{ m: 1, minWidth: "20%" }}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.time)}
                            helperText={errors.time}
                        />

                        <TextField
                            label="Full Address"
                            type="text"
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            sx={{ m: 1, minWidth: "40%" }}
                            error={Boolean(errors.fullAddress)}
                            helperText={errors.fullAddress}
                        />

                        <Typography variant='h5' sx={{ m: 4 }}>
                            Price : Rs {formData.price}
                        </Typography>

                    </Box>

                    <Box sx={{ width: { sm: "50%", xs: "100%" }, m: 'auto', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
                        <Button type="submit" variant="contained" sx={{ m: 2, p: 1, px: { sm: 4, xs: 2 } }}>Book Cab</Button>
                        <Button variant="contained" sx={{ m: 2, p: 1, px: { sm: 4, xs: 2 } }}>Contact us</Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default BookCab;
