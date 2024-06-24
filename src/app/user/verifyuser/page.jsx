"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const VerifyUser = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const params = new URLSearchParams(window.location.search);
  const  email  = params.get('email') || "";
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
console.log(email)
    try {
      const response = await fetch('/api/user/Verifyuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        router.push("/user/login")
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          p: 3,
          border: '1px solid grey',
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Verify Your Account
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please enter the OTP sent to your email to verify your account.
        </Typography>
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant="body2" color="success" gutterBottom>
            {success}
          </Typography>
        )}
        <TextField
          fullWidth
          margin="normal"
          label="OTP"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Verify OTP
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyUser;
