"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';

const Search = () => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [tripType, setTripType] = useState('');
  const [pickupError, setPickupError] = useState(false);
  const [dropError, setDropError] = useState(false);
  const [tripTypeError, setTripTypeError] = useState(false);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    setPickupError(false);
    setDropError(false);
    setTripTypeError(false);

    let valid = true;
    if (!pickup) {
      setPickupError(true);
      valid = false;
    }
    if (!drop) {
      setDropError(true);
      valid = false;
    }
    if (!tripType) {
      setTripTypeError(true);
      valid = false;
    }

    if (valid) {
      router.push(`/cabs/bookcab?pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}&tripType=${encodeURIComponent(tripType)}`);
    }
  };

  return (
    <Typography
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        width: { xs: '90vw' },
        border: '1px solid black'
      }}
    >
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: { md: '100%', sm: '100%', xs: '100%' } },
          display: { sm: 'flex', xs: 'block' }
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1, minWidth: { md: 200, sm: 150, sx: 120 } }} error={pickupError}>
          <InputLabel id="pickup_select">Pickup</InputLabel>
          <Select
            labelId="pickup_select"
            id="pickup"
            value={pickup}
            label="Pickup"
            onChange={(e) => setPickup(e.target.value)}
          >
            <MenuItem value="Srinagar">Srinagar</MenuItem>
            <MenuItem value="Jammu">Jammu</MenuItem>
            <MenuItem value="Pahlagam">Pahlagam</MenuItem>
            <MenuItem value="Gulmarg">Gulmarg</MenuItem>
            <MenuItem value="Sonamarg">Sonamarg</MenuItem>
            <MenuItem value="Doodhpathri">Doodhpathri</MenuItem>
            <MenuItem value="Kargil">Kargil</MenuItem>
          </Select>
          {pickupError && <FormHelperText>Pickup location is required.</FormHelperText>}
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: { md: 200, sm: 150, sx: 120 } }} error={dropError}>
          <InputLabel id="drop_select">Drop</InputLabel>
          <Select
            labelId="drop_select"
            id="drop"
            value={drop}
            label="Drop"
            onChange={(e) => setDrop(e.target.value)}
          >
            <MenuItem value="Srinagar">Srinagar</MenuItem>
            <MenuItem value="Jammu">Jammu</MenuItem>
            <MenuItem value="Pahlagam">Pahlagam</MenuItem>
            <MenuItem value="Gulmarg">Gulmarg</MenuItem>
            <MenuItem value="Sonamarg">Sonamarg</MenuItem>
            <MenuItem value="Doodhpathri">Doodhpathri</MenuItem>
            <MenuItem value="Kargil">Kargil</MenuItem>
          </Select>
          {dropError && <FormHelperText>Drop location is required.</FormHelperText>}
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: { md: 200, sm: 150, sx: 120 } }} error={tripTypeError}>
          <InputLabel id="trip_type_select">Type</InputLabel>
          <Select
            labelId="trip_type_select"
            id="trip_type"
            value={tripType}
            label="Type"
            onChange={(e) => setTripType(e.target.value)}
          >
            <MenuItem value="One way">One way</MenuItem>
            <MenuItem value="Round trip">Round trip</MenuItem>
          </Select>
          {tripTypeError && <FormHelperText>Trip type is required.</FormHelperText>}
        </FormControl>
      </Box>
      <Button
        type="submit"
        variant="contained"
        size="small"
        sx={{
          width: { xs: '40%', sm: '25ch' },
          mt: 2,
          py: 2
        }}
      >
        Search
      </Button>
    </Typography>
  );
};

export default Search;
