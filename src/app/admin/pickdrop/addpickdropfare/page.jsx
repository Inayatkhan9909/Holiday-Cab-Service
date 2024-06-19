"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import {  ToastContainer,toast } from "react-toastify";

const PickDrop = () => {
  const [formData, setFormData] = useState({
    ridecode: '',
    pickup: '',
    drop: '',
    onewayfair: '',
    roundtripfair: '',
    cabtype: ''
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.ridecode) newErrors.ridecode = 'Ride code is required';
    if (!formData.pickup) newErrors.pickup = 'Pickup location is required';
    if (!formData.drop) newErrors.drop = 'Drop location is required';
    if (!formData.onewayfair) newErrors.onewayfair = 'One way fare is required';
    if (!formData.roundtripfair) newErrors.roundtripfair = 'Round trip fare is required';
    if (!formData.cabtype) newErrors.cabtype = 'Cab type is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch('/api/admin/PickupDropfare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        router.push('/admin/pickdrop');
      } else {

        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, border: '1px solid black', width: '50vw', margin: ' 5vh auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Pick & Drop Cab Fare </Typography>

        <TextField
          label="Ride code"
          type="text"
          name="ridecode"
          value={formData.ridecode}
          onChange={handleChange}
          error={!!errors.ridecode}
          helperText={errors.ridecode}
          sx={{ m: 1, minWidth: "80%" }}
        />

        <TextField
          label="Pickup"
          type="text"
          name="pickup"
          value={formData.pickup}
          onChange={handleChange}
          error={!!errors.pickup}
          helperText={errors.pickup}
          sx={{ m: 1, minWidth: "80%" }}
        />

        <TextField
          label="Drop"
          type="text"
          name="drop"
          value={formData.drop}
          onChange={handleChange}
          error={!!errors.drop}
          helperText={errors.drop}
          sx={{ m: 1, minWidth: "80%" }}
        />

        <TextField
          label="OneWay Fair"
          type="number"
          name="onewayfair"
          value={formData.onewayfair}
          onChange={handleChange}
          error={!!errors.onewayfair}
          helperText={errors.onewayfair}
          sx={{ m: 1, minWidth: "80%" }}
        />
        <TextField
          label="Round Trip Fair"
          type="number"
          name="roundtripfair"
          value={formData.roundtripfair}
          onChange={handleChange}
          error={!!errors.roundtripfair}
          helperText={errors.roundtripfair}
          sx={{ m: 1, minWidth: "80%" }}
        />


        <FormControl sx={{ m: 1, minWidth: "80%" }}>
          <InputLabel id="cabtype-label" >Cab Type</InputLabel>
          <Select
            labelId="cabtype-label"
            id="cabtype"
            name="cabtype"
            value={formData.cabtype}
            onChange={handleChange}
            error={!!errors.cabtype}
            sx={{ mt: 1 }}
          >
            <MenuItem value="Swift dzire">Swift dzire</MenuItem>
            <MenuItem value="Honda Amaze">Honda Amaze</MenuItem>
            <MenuItem value="Crysta">Crysta</MenuItem>
            <MenuItem value="Innova">Innova</MenuItem>
            <MenuItem value="Traveler">Traveler</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ m: 2, p: 1, px: 4 }}>Add</Button>
      </Box>

    </>
  );
};

export default PickDrop;
