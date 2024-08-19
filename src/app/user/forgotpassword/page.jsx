"use client"
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Alert } from '@mui/material';
import { Dialog, DialogContent, } from '@mui/material';
import LoadingComponent from '@/app/components/LoadingComponent'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadDialog, setloadDialog] = useState(false);

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

    try {
      setloadDialog(true);
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
    finally {
      setloadDialog(false);
    }
  };

  const handledialogClose = (event, reason) => {
    if ((reason && reason === "backdropClick") || "escapeKeyDown") {
      console.log("backdropClicked. Not closing dialog.");
      return;
    }
    console.log("reason empty");
    setloadDialog(false);
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

      <Dialog open={loadDialog} onClose={handledialogClose}
        style={{ backgroundColor: 'transparent' }}
        overlayStyle={{ backgroundColor: 'transparent' }}
        title='Loading'
        titleStyle={{ paddingTop: '0px', paddingLeft: '45px', fontSize: '15px', lineHeight: '40px' }}
      >

        <DialogContent>
          <LoadingComponent />
        </DialogContent>

      </Dialog>
    </Container>
  );
};

export default ForgotPassword;
