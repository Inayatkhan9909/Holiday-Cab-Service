"use client"
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Alert } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required');
      return;
    }

    // Perform the API call to request password reset
    try {
      const response = await fetch('/api/user/Forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess('Password reset link has been sent to your email');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box m={'auto'} mt={12} width={'50%'}>
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit} >
          <Box mb={2}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
              required
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Request Password Reset
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
